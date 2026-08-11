import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-watermark" aria-hidden="true" />
      <div className="container footer-inner">
        <a href="#top" className="footer-logo">
          <Image
            src="/assets/Logo.svg"
            alt="When I Die™"
            className="footer-logo-image"
            width={120}
            height={48}
            loading="lazy"
          />
        </a>
        <p className="footer-copy">Built slowly and thoughtfully. Snacks encouraged.</p>
        <nav className="footer-links" aria-label="Footer">
          <a href="mailto:hello@whenidie.us">Contact</a>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <Link href="/privacy">Privacy</Link>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <Link href="/terms">Terms</Link>
        </nav>
        <p className="footer-meta">© {new Date().getFullYear()} When I Die™. All rights reserved.</p>
      </div>
    </footer>
  );
}
