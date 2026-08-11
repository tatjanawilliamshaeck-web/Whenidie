"use client";

import { useState } from "react";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthCard } from "@/components/AuthCard";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/login` }
    );

    setSubmitting(false);
    if (resetError) {
      setError(resetError.message || "Something went wrong.");
      return;
    }
    setSent(true);
  }

  return (
    <div className="page-app page-forgot">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AuthHeader links={[{ href: "/login", label: "Log in" }, { href: "/", label: "Home" }]} />
      <AuthCard
        title="Reset password"
        subtitle="Enter your email and we'll send you a link to set a new password."
        error={error}
        onDismissError={() => setError(null)}
        success={sent ? <p>Check your email for a reset link. If you don&rsquo;t see it, check spam.</p> : null}
        footer={<a href="/login">Back to log in</a>}
      >
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="forgot-email">
            Email
          </label>
          <input
            type="email"
            id="forgot-email"
            className="auth-input"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="btn primary-btn auth-btn" disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
