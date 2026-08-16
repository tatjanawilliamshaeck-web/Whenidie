import { StartCtaLink } from "@/components/StartCtaLink";
import type { Locale } from "@/lib/i18n";

export function SectionCta({ locale = "en" }: { locale?: Locale }) {
  const text = locale === "de" ? "Bereit? Starte deinen Plan. Kostenlos." : "Ready? Start your plan. It's free.";
  const loggedOutText = locale === "de" ? "Kostenlos beitreten" : "Join the free beta";
  const loggedInText = locale === "de" ? "Zu deinem Plan" : "Go to your plan";

  return (
    <section className="section">
      <div className="container">
        <div className="section-cta">
          <p className="section-cta-text">{text}</p>
          <StartCtaLink
            className="btn primary-btn section-cta-btn wid-cta-start"
            loggedOutText={loggedOutText}
            loggedInText={loggedInText}
          />
        </div>
      </div>
    </section>
  );
}
