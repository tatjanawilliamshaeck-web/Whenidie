export type Locale = "en" | "de";

export const NAV_LABELS: Record<
  Locale,
  {
    home: string;
    howItWorks: string;
    about: string;
    faq: string;
    start: string;
    yourPlan: string;
  }
> = {
  en: {
    home: "Home",
    howItWorks: "How it works",
    about: "About",
    faq: "FAQ",
    start: "Start",
    yourPlan: "Your plan",
  },
  de: {
    home: "Start",
    howItWorks: "So funktioniert’s",
    about: "Über uns",
    faq: "FAQ",
    start: "Loslegen",
    yourPlan: "Dein Plan",
  },
};

export const ANNOUNCEMENT: Record<Locale, string> = {
  en: "No doom. No guilt. Snacks encouraged.",
  de: "Kein Weltuntergang. Kein schlechtes Gewissen. Snacks ausdrücklich erwünscht.",
};

export const FOOTER: Record<
  Locale,
  {
    tagline: string;
    contact: string;
    privacy: string;
    terms: string;
    rights: string;
  }
> = {
  en: {
    tagline: "Built slowly and thoughtfully. Snacks encouraged.",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved.",
  },
  de: {
    tagline: "Langsam, sorgfältig und mit ausreichend Snacks gebaut.",
    contact: "Kontakt",
    privacy: "Datenschutz",
    terms: "AGB",
    rights: "Alle Rechte vorbehalten.",
  },
};

/** English routes have no prefix; German routes live under /de. Only
 * marketing pages are translated so far — signup/login/dashboard stay
 * English-only until a later pass. */
export function localizedPath(pathname: string, target: Locale): string {
  const isDe = pathname === "/de" || pathname.startsWith("/de/");
  const withoutPrefix = isDe ? pathname.replace(/^\/de/, "") || "/" : pathname;
  if (target === "en") return withoutPrefix;
  return withoutPrefix === "/" ? "/de" : `/de${withoutPrefix}`;
}
