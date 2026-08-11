"use client";

import { useEffect, useRef, useState } from "react";
import { StartCtaLink } from "@/components/StartCtaLink";

export function StickyCta({ watchSectionId }: { watchSectionId: string }) {
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
      { threshold: 0.1 }
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

  return (
    <div
      className={`sticky-cta-bar sticky-cta-bar--subtle${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <span className="sticky-cta-text">Start your plan in under a minute.</span>
      <StartCtaLink
        className="btn secondary-btn sticky-cta-btn wid-cta-start"
        loggedOutText="Start your plan"
        loggedInText="Go to your plan"
      />
    </div>
  );
}
