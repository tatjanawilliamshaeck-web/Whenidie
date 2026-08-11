import { StartCtaLink } from "@/components/StartCtaLink";

export function SectionCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-cta">
          <p className="section-cta-text">Ready? Start your plan. It&apos;s free.</p>
          <StartCtaLink
            className="btn primary-btn section-cta-btn wid-cta-start"
            loggedOutText="Join the free beta"
            loggedInText="Go to your plan"
          />
        </div>
      </div>
    </section>
  );
}
