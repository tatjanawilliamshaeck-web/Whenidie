"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthCard } from "@/components/AuthCard";
import { createClient } from "@/lib/supabase/client";
import { friendlySignupError } from "@/lib/auth-errors";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingConfirmEmail, setPendingConfirmEmail] = useState<string | null>(
    null,
  );
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const normalizedEmail = email
      .trim()
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, "");
    if (
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setError("That doesn’t look like an email. Double-check and try again.");
      return;
    }
    if (password.length < 6) {
      setError(
        "Password needs at least 6 characters. Pick something you’ll remember.",
      );
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { display_name: displayName.trim() || null },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (signUpError) {
      setError(friendlySignupError(signUpError.message));
      setSubmitting(false);
      return;
    }
    // Supabase returns a fake "success" (no error) for an already-registered email when
    // email confirmation is on, to avoid leaking which emails exist. A real new signup
    // has a non-empty identities array; a repeat signup for an existing account comes
    // back with identities: [].
    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      setError(
        "That email is already signed up. Try logging in, or use a different email.",
      );
      setSubmitting(false);
      return;
    }
    if (data.user && !data.session) {
      setPendingConfirmEmail(normalizedEmail);
      setInfo(
        "Almost there! Check your email for a confirmation link, then log in.",
      );
      setSubmitting(false);
      return;
    }
    router.push("/dashboard");
  }

  async function handleResend() {
    if (!pendingConfirmEmail) return;
    setResendState("sending");
    const supabase = createClient();
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: pendingConfirmEmail,
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    if (resendError) {
      setError(friendlySignupError(resendError.message));
      setResendState("idle");
      return;
    }
    setResendState("sent");
  }

  return (
    <div className="page-app page-signup">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AuthHeader
        links={[
          { href: "/login", label: "Log in" },
          { href: "/", label: "Home" },
        ]}
      />
      <AuthCard
        title="Start your plan"
        subtitle="Start your plan in under a minute. Free. No doom, no guilt."
        error={error}
        onDismissError={() => setError(null)}
        success={
          info ? (
            <>
              <p>{info}</p>
              {pendingConfirmEmail ? (
                <p className="auth-resend">
                  {resendState === "sent" ? (
                    "Sent again — check your inbox (and spam folder)."
                  ) : (
                    <>
                      Didn&rsquo;t get it?{" "}
                      <button
                        type="button"
                        className="inline-link"
                        onClick={handleResend}
                        disabled={resendState === "sending"}
                      >
                        {resendState === "sending"
                          ? "Sending…"
                          : "Resend the confirmation email"}
                      </button>
                    </>
                  )}
                </p>
              ) : null}
            </>
          ) : null
        }
        footer={
          <>
            Already have an account? <a href="/login">Log in</a>
          </>
        }
      >
        {!pendingConfirmEmail ? (
          <>
            <p className="auth-why">
              We only use your email to save your plan and, if you like, send
              one question a month. No spam.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-label" htmlFor="signup-email">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                className="auth-input"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="auth-label" htmlFor="signup-password">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                className="auth-input"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label className="auth-label" htmlFor="signup-name">
                Display name <span className="auth-optional">(optional)</span>
              </label>
              <input
                type="text"
                id="signup-name"
                className="auth-input"
                autoComplete="name"
                placeholder="How you want to appear in your plan"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <button
                type="submit"
                className="btn primary-btn auth-btn"
                disabled={submitting}
              >
                {submitting ? "Starting…" : "Start my plan"}
              </button>
            </form>
          </>
        ) : null}
      </AuthCard>
    </div>
  );
}
