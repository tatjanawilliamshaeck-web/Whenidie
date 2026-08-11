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
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("That doesn’t look like an email. Double-check and try again.");
      return;
    }
    if (password.length < 6) {
      setError("Password needs at least 6 characters. Pick something you’ll remember.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: { data: { display_name: displayName.trim() || null } },
    });

    if (signUpError) {
      setError(friendlySignupError(signUpError.message));
      setSubmitting(false);
      return;
    }
    if (data.user && !data.session) {
      setInfo("Almost there! Check your email for a confirmation link, then log in.");
      setSubmitting(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="page-app page-signup">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AuthHeader links={[{ href: "/login", label: "Log in" }, { href: "/", label: "Home" }]} />
      <AuthCard
        title="Join the free beta"
        subtitle="Start your plan in under a minute. Free. No doom, no guilt."
        error={error}
        onDismissError={() => setError(null)}
        success={info}
        footer={
          <>
            Already have an account? <a href="/login">Log in</a>
          </>
        }
      >
        <p className="auth-why">
          We only use your email to save your plan and, if you like, send one question a month.
          No spam.
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

          <button type="submit" className="btn primary-btn auth-btn" disabled={submitting}>
            {submitting ? "Starting…" : "Start my plan"}
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
