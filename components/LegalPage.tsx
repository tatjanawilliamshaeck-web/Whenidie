import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LegalPage({
  crumb,
  title,
  updated,
  locale = "en",
  children,
}: {
  crumb: string;
  title: string;
  updated: string;
  locale?: Locale;
  children: React.ReactNode;
}) {
  const prefix = locale === "de" ? "/de" : "";
  const backLabel = locale === "de" ? "← Zurück zur Startseite" : "← Back to home";
  const homeLabel = locale === "de" ? "Start" : "Home";
  const updatedLabel = locale === "de" ? "Zuletzt aktualisiert" : "Last updated";

  return (
    <main id="main-content" className="page-main">
      <div className="container">
        <div className="page-content">
          <div className="page-hero-nav page-hero-nav--legal">
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
          <div className="page-hero-brand page-hero-brand--legal">
            <Image src="/assets/Logo.svg" alt="When I Die™" className="page-hero-logo" width={120} height={48} />
          </div>
          <h1>{title}</h1>
          <p className="page-updated">
            {updatedLabel}: {updated}
          </p>
          {children}
        </div>
      </div>
    </main>
  );
}
