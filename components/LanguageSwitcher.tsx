"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      <Link
        href={localizedPath(pathname, "en")}
        className={`lang-switcher-flag${locale === "en" ? " lang-switcher-flag--active" : ""}`}
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        🇺🇸
      </Link>
      <Link
        href={localizedPath(pathname, "de")}
        className={`lang-switcher-flag${locale === "de" ? " lang-switcher-flag--active" : ""}`}
        aria-label="Deutsch"
        aria-current={locale === "de" ? "true" : undefined}
      >
        🇩🇪
      </Link>
    </div>
  );
}
