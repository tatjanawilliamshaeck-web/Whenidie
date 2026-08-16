"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbkqqdn";

const COPY: Record<Locale, { yourEmail: string; placeholder: string; joining: string; getUpdates: string; inTitle: string; inText: string }> = {
  en: {
    yourEmail: "Your email",
    placeholder: "your@email.com",
    joining: "Joining…",
    getUpdates: "Get updates",
    inTitle: "You're in.",
    inText: "Occasional updates. No spam.",
  },
  de: {
    yourEmail: "Deine E-Mail",
    placeholder: "deine@email.de",
    joining: "Wird gesendet…",
    getUpdates: "Updates erhalten",
    inTitle: "Du bist dabei.",
    inText: "Gelegentliche Updates. Kein Spam.",
  },
};

export function WaitlistForm({ locale = "en" }: { locale?: Locale }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const t = COPY[locale];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "done" : "idle");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="form-success">
        <p className="form-success-title">{t.inTitle}</p>
        <p className="form-success-text">{t.inText}</p>
      </div>
    );
  }

  return (
    <form className="email-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px" }}
      />
      <label className="email-label" htmlFor="email">
        {t.yourEmail}
      </label>
      <div className="email-input-row">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="email-input"
          placeholder={t.placeholder}
          autoComplete="email"
        />
        <button type="submit" className="btn secondary-btn email-button" disabled={status === "loading"}>
          {status === "loading" ? t.joining : t.getUpdates}
        </button>
      </div>
    </form>
  );
}
