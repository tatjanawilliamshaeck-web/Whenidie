"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbkqqdn";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

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
        <p className="form-success-title">You&rsquo;re in.</p>
        <p className="form-success-text">Occasional updates. No spam.</p>
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
        Your email
      </label>
      <div className="email-input-row">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="email-input"
          placeholder="your@email.com"
          autoComplete="email"
        />
        <button type="submit" className="btn secondary-btn email-button" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Get updates"}
        </button>
      </div>
    </form>
  );
}
