"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/** Root layout can't know which locale segment rendered it, so each locale's
 * marketing layout sets the <html lang> attribute itself on mount. */
export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
