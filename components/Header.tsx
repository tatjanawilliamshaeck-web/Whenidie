"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { StartCtaLink } from "@/components/StartCtaLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NAV_LABELS, ANNOUNCEMENT, type Locale } from "@/lib/i18n";

export function Header({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const labels = NAV_LABELS[locale];
  const prefix = locale === "de" ? "/de" : "";

  const navLinks = [
    { href: prefix || "/", label: labels.home },
    { href: `${prefix}/how-it-works`, label: labels.howItWorks },
    { href: `${prefix}/about`, label: labels.about },
    { href: `${prefix}/faq`, label: labels.faq },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={prefix || "/"} className="logo">
          <Image
            src="/assets/Logo.svg"
            alt="When I Die™"
            className="logo-image"
            width={120}
            height={48}
            priority
          />
        </Link>
        <button
          type="button"
          className={`nav-toggle${navOpen ? " nav-open" : ""}`}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <nav className={`nav${navOpen ? " nav-open" : ""}`} id="main-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : undefined}
              onClick={() => setNavOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <StartCtaLink
            className="nav-cta wid-cta-start"
            loggedOutText={labels.start}
            loggedInText={labels.yourPlan}
          />
          <LanguageSwitcher locale={locale} />
        </nav>
      </div>
      <div className="announcement-bar">{ANNOUNCEMENT[locale]}</div>
    </header>
  );
}
