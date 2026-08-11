"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthCard } from "@/components/AuthCard";
import { createClient } from "@/lib/supabase/client";
import { friendlyLoginError } from "@/lib/auth-errors";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get("message") === "session-ended") {
      setError("Your session ended. Please log in again.");
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(searchParams.get("next") || "/dashboard");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(friendlyLoginError(signInError.message));
      setSubmitting(false);
      return;
    }
    router.push(searchParams.get("next") || "/dashboard");
  }

  return (
    <AuthCard
      title="Log in"
      subtitle="Welcome back. Your plan is right where you left it."
      error={error}
      onDismissError={() => setError(null)}
      footer={
        <>
          Don&rsquo;t have an account? <a href="/signup">Join the free beta</a>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label" htmlFor="login-email">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          className="auth-input"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label" htmlFor="login-password">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          className="auth-input"
          required
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="auth-forgot">
          <a href="/forgot-password">Forgot password?</a>
        </p>

        <button type="submit" className="btn primary-btn auth-btn" disabled={submitting}>
          {submitting ? "Loading…" : "Log in"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <div className="page-app page-login">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AuthHeader links={[{ href: "/signup", label: "Join the free beta" }, { href: "/", label: "Home" }]} />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
