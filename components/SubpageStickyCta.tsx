"use client";

import { useEffect, useState } from "react";
import { StartCtaLink } from "@/components/StartCtaLink";

export function SubpageStickyCta({
  text,
  loggedOutText = "Join the free beta",
  loggedInText = "Go to your plan",
}: {
  text: string;
  loggedOutText?: string;
  loggedInText?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky-cta-bar sticky-cta-bar--subpage${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <span className="sticky-cta-text">{text}</span>
      <StartCtaLink
        className="btn primary-btn sticky-cta-btn wid-cta-start"
        loggedOutText={loggedOutText}
        loggedInText={loggedInText}
      />
    </div>
  );
}
