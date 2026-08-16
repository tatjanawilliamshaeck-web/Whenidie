import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function PageHero({
  crumb,
  eyebrow,
  title,
  tagline,
  locale = "en",
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  tagline?: string;
  locale?: Locale;
  children?: React.ReactNode;
}) {
  const prefix = locale === "de" ? "/de" : "";
  const backLabel =
    locale === "de" ? "← Zurück zur Startseite" : "← Back to home";
  const homeLabel = locale === "de" ? "Start" : "Home";

  return (
    <section className="section page-hero-section">
      <div className="container">
        <div className="page-hero-inner">
          <div className="page-hero-nav">
            <Link href={prefix || "/"} className="back-link">
              {backLabel}
            </Link>
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <ol>
                <li>
                  <Link href={prefix || "/"}>{homeLabel}</Link>
                </li>
                <li aria-current="page">{crumb}</li>
              </ol>
            </nav>
          </div>
          <div className="page-hero-brand">
            <Image
              src="/assets/logo.png"
              alt="When I Die™"
              className="page-hero-logo"
              width={120}
              height={48}
            />
          </div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {tagline ? <p className="page-hero-tagline">{tagline}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
