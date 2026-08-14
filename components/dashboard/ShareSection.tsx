"use client";

import { useState } from "react";
import { INVITE_MESSAGE_TEMPLATES, categoriesForQuestionIds, getQuestionsByCategory } from "@/lib/plan";

export type Share = {
  id: string;
  email: string;
  invite_token: string | null;
  invite_sent_at: string | null;
  opened_at: string | null;
  allowed_question_ids: string[] | null;
};

const TONE_STYLES = ["responsible", "funny", "sweet", "smartass", "custom", "surprise"] as const;
const TONE_LABELS: Record<(typeof TONE_STYLES)[number], string> = {
  responsible: "Responsible",
  funny: "Funny",
  sweet: "Sweet",
  smartass: "Smartass",
  custom: "Write my own",
  surprise: "Surprise me",
};

function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function inviteLink(token: string | null): string {
  if (!token || typeof window === "undefined") return "";
  return `${window.location.origin}/view-invite?token=${encodeURIComponent(token)}`;
}

export function ShareSection({
  shares,
  onAddShare,
  onRemoveShare,
  onCopy,
  onToast,
}: {
  shares: Share[];
  onAddShare: (email: string, allowedCategories: string[] | null) => Promise<void>;
  onRemoveShare: (id: string) => void;
  onCopy: (text: string) => void;
  onToast: (message: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState<(typeof TONE_STYLES)[number]>("responsible");
  const [message, setMessage] = useState(INVITE_MESSAGE_TEMPLATES.responsible as string);
  const [fullPlan, setFullPlan] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const categoryGroups = getQuestionsByCategory();
  const opened = shares.filter((s) => s.opened_at);

  function selectTone(style: (typeof TONE_STYLES)[number]) {
    setTone(style);
    if (style === "surprise") {
      setMessage(pickRandom(INVITE_MESSAGE_TEMPLATES.surprise as string[]));
    } else if (style === "custom") {
      // keep current message, let them write their own
    } else {
      setMessage(INVITE_MESSAGE_TEMPLATES[style] as string);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setSubmitting(true);
    await onAddShare(trimmed, fullPlan ? null : categories.length ? categories : null);
    setSubmitting(false);
    setEmail("");
    setFullPlan(true);
    setCategories([]);
    setTone("responsible");
    setMessage(INVITE_MESSAGE_TEMPLATES.responsible as string);
  }

  return (
    <section id="dashboard-shared" className="dashboard-section dashboard-shared access-management" aria-labelledby="invitation-heading">
      <div className="invitation-card">
        <p className="invitation-eyebrow">Share your plan</p>
        <h2 id="invitation-heading" className="invitation-heading">
          Choose someone you trust
        </h2>
        <p className="invitation-intro">If something ever happens, they can access your plan. You stay in control.</p>
        <ul className="share-reassurance" aria-hidden="true">
          <li>They won&apos;t see anything unless you send the link</li>
          <li>You can revoke access anytime</li>
        </ul>

        <form className="share-form share-form--redesign" onSubmit={handleSubmit}>
          <div className="share-form-block">
            <label className="auth-label" htmlFor="share-email">
              Who do you trust with this?
            </label>
            <div className="share-form-row">
              <input
                type="email"
                id="share-email"
                className="auth-input"
                placeholder="their@email.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="share-form-block share-message-block">
            <span className="auth-label">How do you want to tell them?</span>
            <div className="message-style-pills" role="group" aria-label="Message tone">
              {TONE_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`message-style-pill${tone === style ? " active" : ""}${style === "surprise" ? " message-style-pill--surprise" : ""}`}
                  aria-pressed={tone === style}
                  onClick={() => selectTone(style)}
                >
                  {TONE_LABELS[style]}
                </button>
              ))}
            </div>
            <label className="auth-label" htmlFor="share-message-body">
              Message they&apos;ll receive
            </label>
            <textarea
              id="share-message-body"
              className="auth-input auth-textarea share-message-body"
              rows={5}
              placeholder="Edit your message here…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="share-message-actions">
              <button type="submit" className="btn primary-btn" disabled={submitting}>
                {submitting ? "Inviting…" : "Invite them"}
              </button>
              <button
                type="button"
                className="btn secondary-btn btn--small"
                onClick={() => {
                  if (!message.trim()) {
                    onToast("Write or pick a message first");
                    return;
                  }
                  onCopy(message.trim());
                  onToast("Message copied");
                }}
              >
                Copy message
              </button>
            </div>
          </div>

          {categoryGroups.length > 0 ? (
            <div className="share-categories-wrap">
              <span className="auth-label">What can they see?</span>
              <label className="share-category-option">
                <input type="checkbox" checked={fullPlan} onChange={(e) => setFullPlan(e.target.checked)} /> Full plan
              </label>
              <div className="share-category-checkboxes">
                {categoryGroups.map((g) => (
                  <label className="share-category-option" key={g.category}>
                    <input
                      type="checkbox"
                      disabled={fullPlan}
                      checked={categories.includes(g.category)}
                      onChange={(e) => {
                        setCategories((prev) =>
                          e.target.checked ? [...prev, g.category] : prev.filter((c) => c !== g.category)
                        );
                      }}
                    />{" "}
                    {g.category}
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </form>

        {shares.length > 0 ? (
          <section className="sent-invites-section" aria-labelledby="sent-invites-heading">
            <h2 id="sent-invites-heading" className="sent-invites-heading">
              People you&apos;ve shared with
            </h2>
            <p className="shared-summary">
              You&apos;ve shared with {shares.length} person(s).{" "}
              {opened.length
                ? `${opened.length} have opened the link—so you know they received it.`
                : "None have opened the link yet."}
            </p>
            {opened.length > 0 ? (
              <div className="recent-activity">
                <span className="recent-activity-label">Recent activity</span>
                {opened
                  .slice()
                  .sort((a, b) => new Date(b.opened_at!).getTime() - new Date(a.opened_at!).getTime())
                  .slice(0, 5)
                  .map((s) => (
                    <span className="recent-activity-item" key={s.id}>
                      {s.email} opened your plan · {new Date(s.opened_at!).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                  ))}
              </div>
            ) : null}
            <div className="shared-overview-wrap shared-list--overview">
              <div className="shared-overview-header" aria-hidden="true">
                <span className="shared-overview-col shared-overview-who">Who</span>
                <span className="shared-overview-col shared-overview-what">What they can see</span>
                <span className="shared-overview-col shared-overview-sent">Link sent</span>
                <span className="shared-overview-col shared-overview-opened">Opened?</span>
                <span className="shared-overview-col shared-overview-actions">Actions</span>
              </div>
              <div className="shared-list">
                {shares.map((s) => {
                  const link = inviteLink(s.invite_token);
                  const shareCategories = s.allowed_question_ids?.length
                    ? categoriesForQuestionIds(s.allowed_question_ids)
                    : [];
                  const whatStr = shareCategories.length ? shareCategories.join(", ") : "Full plan";
                  const sentStr = s.invite_sent_at ? new Date(s.invite_sent_at).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—";
                  return (
                    <div className="shared-item shared-item--overview" key={s.id}>
                      <span className="shared-overview-col shared-overview-who">
                        <span className="shared-item-email">{s.email}</span>
                      </span>
                      <span className="shared-overview-col shared-overview-what">{whatStr}</span>
                      <span className="shared-overview-col shared-overview-sent">{sentStr}</span>
                      <span className="shared-overview-col shared-overview-opened">
                        {s.opened_at ? (
                          <span className="shared-opened-yes" title="They opened the link">
                            Yes, {new Date(s.opened_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
                          </span>
                        ) : (
                          <span className="shared-opened-no">Not yet</span>
                        )}
                      </span>
                      <span className="shared-overview-col shared-overview-actions">
                        {link ? (
                          <button
                            type="button"
                            className="shared-item-copy-link"
                            onClick={() => {
                              onCopy(link);
                              onToast("Invite link copied");
                            }}
                          >
                            Copy link
                          </button>
                        ) : null}
                        <button type="button" className="shared-item-remove" onClick={() => onRemoveShare(s.id)}>
                          Revoke access
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          <p className="empty-shared">You haven&apos;t shared with anyone yet. Add someone below when you&apos;re ready.</p>
        )}
      </div>
    </section>
  );
}
