import Image from "next/image";
import Link from "next/link";
import { FOOTER, type Locale } from "@/lib/i18n";

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = FOOTER[locale];
  const prefix = locale === "de" ? "/de" : "";

  return (
    <footer className="site-footer">
      <div className="footer-watermark" aria-hidden="true" />
      <div className="container footer-inner">
        <a href="#top" className="footer-logo">
          <Image
            src="/assets/logo.png"
            alt="When I Die™"
            className="footer-logo-image"
            width={120}
            height={48}
            loading="lazy"
          />
        </a>
        <p className="footer-copy">{t.tagline}</p>
        <nav className="footer-links" aria-label="Footer">
          <a href="mailto:hello@whenidie.us">{t.contact}</a>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <Link href={`${prefix}/privacy`}>{t.privacy}</Link>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <Link href={`${prefix}/terms`}>{t.terms}</Link>
        </nav>
        <p className="footer-meta">
          © {new Date().getFullYear()} When I Die™. {t.rights}
        </p>
      </div>
    </footer>
  );
}
