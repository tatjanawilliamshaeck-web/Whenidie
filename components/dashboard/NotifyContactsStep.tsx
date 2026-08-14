"use client";

import { useState } from "react";
import Image from "next/image";

const DEFAULT_MESSAGE =
  "Hey — I just started a plan on When I Die™. It's got the important stuff in one place in case anything ever happens.\n\nI'll keep it updated. You'll be able to see my progress here.";

export function NotifyContactsStep({
  onNotify,
  onSkip,
}: {
  onNotify: (emails: string[], message: string) => Promise<void>;
  onSkip: () => void;
}) {
  const [emailsInput, setEmailsInput] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const emails = Array.from(
      new Set(
        emailsInput
          .split(/[,\n]/)
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean)
      )
    );
    if (!emails.length) {
      setError("Add at least one email, or skip for now.");
      return;
    }
    const invalid = emails.find((e) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
    if (invalid) {
      setError(`That doesn't look like a valid email: ${invalid}`);
      return;
    }
    setSubmitting(true);
    await onNotify(emails, message);
    setSubmitting(false);
  }

  return (
    <section className="dashboard-section dashboard-question-current" id="question-current-section">
      <div className="question-card-container">
        <div className="question-card-single" role="article">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Image src="/assets/Logo.svg" alt="" width={64} height={26} aria-hidden="true" />
          </div>
          <h2 className="question-card-single__title" style={{ textAlign: "center" }}>
            Who should we tell you&rsquo;ve started a plan?
          </h2>
          <p className="question-card-single__prompt" style={{ textAlign: "center" }}>
            They&rsquo;ll get a short note letting them know, and can check in on your progress anytime.
            They won&rsquo;t see your actual answers unless you choose to share them later.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="question-card-single__input">
              <label className="auth-label" htmlFor="notify-emails">
                Their email(s)
              </label>
              <textarea
                id="notify-emails"
                className="auth-input auth-textarea"
                rows={2}
                placeholder="partner@email.com, sibling@email.com"
                value={emailsInput}
                onChange={(e) => setEmailsInput(e.target.value)}
              />
            </div>
            <div className="question-card-single__story question-card-single__story--expandable">
              <label className="auth-label" htmlFor="notify-message">
                Message they&rsquo;ll receive
              </label>
              <textarea
                id="notify-message"
                className="auth-input auth-textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {error ? (
              <p className="auth-error" role="alert" style={{ marginTop: "0.75rem" }}>
                <span>{error}</span>
              </p>
            ) : null}
            <div className="question-nav-actions" style={{ marginTop: "1.25rem" }}>
              <div className="question-nav-actions__left">
                <button type="button" className="btn ghost-btn btn--nav question-nav-skip" onClick={onSkip}>
                  Skip for now
                </button>
              </div>
              <button type="submit" className="btn primary-btn btn--nav" disabled={submitting}>
                {submitting ? "Sending…" : "Let them know"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
