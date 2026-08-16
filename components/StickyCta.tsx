"use client";

import { useEffect, useRef, useState } from "react";
import { StartCtaLink } from "@/components/StartCtaLink";
import type { Locale } from "@/lib/i18n";

export function StickyCta({
  watchSectionId,
  locale = "en",
}: {
  watchSectionId: string;
  locale?: Locale;
}) {
  const [visible, setVisible] = useState(false);
  const inViewRef = useRef(false);

  useEffect(() => {
    const section = document.getElementById(watchSectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) setVisible(false);
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(section);

    function onScroll() {
      if (window.scrollY > 350 && !inViewRef.current) setVisible(true);
      else if (window.scrollY <= 350) setVisible(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [watchSectionId]);

  const text =
    locale === "de"
      ? "Starte deinen Plan in unter einer Minute."
      : "Start your plan in under a minute.";
  const loggedOutText = locale === "de" ? "Plan starten" : "Start your plan";
  const loggedInText = locale === "de" ? "Zu deinem Plan" : "Go to your plan";

  return (
    <div
      className={`sticky-cta-bar sticky-cta-bar--subtle${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <span className="sticky-cta-text">{text}</span>
      <StartCtaLink
        className="btn secondary-btn sticky-cta-btn wid-cta-start"
        loggedOutText={loggedOutText}
        loggedInText={loggedInText}
      />
    </div>
  );
}
