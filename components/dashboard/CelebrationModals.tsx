"use client";

import Image from "next/image";

export function MilestoneModal({
  chapterName,
  message,
  icon,
  showShareCta,
  tone = "light",
  onClose,
  onShare,
}: {
  chapterName: string;
  message: string;
  icon: string;
  showShareCta: boolean;
  tone?: "light" | "heavy";
  onClose: () => void;
  onShare: () => void;
}) {
  return (
    <div
      className={`milestone-modal${tone === "heavy" ? " milestone-modal--quiet" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="milestone-heading"
    >
      <div className="milestone-backdrop" onClick={onClose} />
      <div className="milestone-content">
        {tone === "light" ? (
          <div className="milestone-glow" aria-hidden="true" />
        ) : null}
        <p className="milestone-icon" aria-hidden="true">
          <Image src={icon} alt="" width={32} height={32} />
        </p>
        <h2 id="milestone-heading" className="milestone-heading">
          {tone === "heavy"
            ? `${chapterName} — done.`
            : `${chapterName} complete!`}
        </h2>
        <p className="milestone-message">{message}</p>
        {showShareCta ? (
          <div className="milestone-share-wrap">
            <p className="milestone-share-text">
              Share your progress with someone you trust so they know about your
              plan.
            </p>
            <button
              type="button"
              className="btn secondary-btn milestone-share-btn"
              onClick={onShare}
            >
              Invite someone you trust
            </button>
          </div>
        ) : null}
        <div className="milestone-actions">
          <button type="button" className="btn primary-btn" onClick={onClose}>
            Continue
          </button>
        </div>
        <button
          type="button"
          className="milestone-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export function UnlockModal({
  chapterName,
  onClose,
}: {
  chapterName: string;
  onClose: () => void;
}) {
  return (
    <div
      className="unlock-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unlock-heading"
    >
      <div className="unlock-backdrop" onClick={onClose} />
      <div className="unlock-content">
        <h2 id="unlock-heading" className="unlock-heading">
          New chapter unlocked
        </h2>
        <p className="unlock-chapter-name">{chapterName}</p>
        <button type="button" className="btn primary-btn" onClick={onClose}>
          Keep going
        </button>
      </div>
    </div>
  );
}

export function ReliefModal({
  humorLine,
  onClose,
  onInvite,
}: {
  humorLine: string;
  onClose: () => void;
  onInvite: () => void;
}) {
  return (
    <div
      className="relief-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="relief-heading"
    >
      <div className="relief-backdrop" onClick={onClose} />
      <div className="relief-content">
        <div className="relief-glow" aria-hidden="true" />
        <div className="relief-check" aria-hidden="true">
          ✓
        </div>
        <h2 id="relief-heading" className="relief-heading">
          That&apos;s a really good thing you just did.
        </h2>
        <p className="relief-subtext">
          Most people never organize this stuff.
          <br />
          You just made things much easier for the people who care about you.
        </p>
        <p className="relief-reinforce">{humorLine}</p>
        <div className="relief-actions">
          <button
            type="button"
            className="btn primary-btn relief-cta"
            onClick={onClose}
          >
            Keep going
          </button>
          <button
            type="button"
            className="btn secondary-btn"
            onClick={onInvite}
          >
            Invite someone you trust
          </button>
          <button type="button" className="btn secondary-btn" onClick={onClose}>
            Finish later
          </button>
        </div>
        <button
          type="button"
          className="relief-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export function Toast({
  message,
  bloom,
}: {
  message: string;
  bloom?: boolean;
}) {
  return (
    <div
      className={`toast${bloom ? " toast--bloom" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
