"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { StartCtaLink } from "@/components/StartCtaLink";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
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
          {NAV_LINKS.map((link) => (
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
            loggedOutText="Start"
            loggedInText="Go to your plan"
          />
        </nav>
      </div>
      <div className="announcement-bar">No doom. No guilt. Snacks encouraged.</div>
    </header>
  );
}
