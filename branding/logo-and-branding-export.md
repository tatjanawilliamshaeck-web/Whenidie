# When I Die™ — logo & branding export

Everything below is the actual live branding code from the site, pulled together so you
can hand it to ChatGPT (or any designer) for a redesign pass. After a replacement is
ready, send me the new SVG/PNG files and I'll drop them into the same file paths listed
under each asset — nothing else in the code needs to change as long as the filenames
and dimensions stay compatible.

---

## 1. Primary logo — `public/assets/Logo.svg`

This is the one mark that matters most: it's used everywhere — header, footer, every
page hero, the dashboard, legal pages, the print view, chapter navigation. It's a
flower-with-teardrops mark above a two-line "When I Die" wordmark with a TM.

```svg
<svg width="420" height="420" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="When I Die logo">
  <defs>
    <style type="text/css">
      .outline { stroke: #000000; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .petal { fill: #F7F7F7; stroke: #000000; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
      .heart { fill: #F4CC45; stroke: #000000; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
      .stem { fill: #29B44A; stroke: #000000; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
      .leaf { fill: #72D456; stroke: #000000; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
      .water { fill: #4E9CDA; }
      .waterRipple1 { fill: #99CBF3; }
      .waterRipple2 { fill: #B8DCF5; stroke: #000000; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
      .teardrop { fill: #F7F7F7; stroke: #000000; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
      .wordmark { fill: #000000; font-family: Georgia, 'Times New Roman', serif; font-weight: 700; letter-spacing: -0.03em; }
      .tm { fill: #000000; font-family: Arial, Helvetica, sans-serif; font-weight: 700; }
    </style>
  </defs>

  <!-- Puddle: draw first, kept well above wordmark so no blue under text -->
  <g transform="translate(512 275)">
    <ellipse class="water" cx="0" cy="488" rx="110" ry="30" />
    <ellipse class="waterRipple1" cx="0" cy="485" rx="62" ry="14" />
    <ellipse class="waterRipple2" cx="0" cy="485" rx="62" ry="14" />
  </g>

  <!-- Flower + stem + leaves + teardrops (on top of puddle) -->
  <g transform="translate(512 275)">
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(0)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(45)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(90)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(135)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(180)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(225)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(270)" />
    <ellipse class="petal" cx="0" cy="-112" rx="34" ry="84" transform="rotate(315)" />

    <path class="heart" d="M 0 6 C -8 -12, -30 -28, -54 -28 C -85 -28, -108 -5, -108 27 C -108 58, -85 82, -56 106 L 0 153 L 56 106 C 85 82, 108 58, 108 27 C 108 -5, 85 -28, 54 -28 C 30 -28, 8 -12, 0 6 Z" />

    <path class="stem" d="M -10 145 C -12 190, -16 244, -20 304 C -24 362, -25 426, -17 475 L 8 475 C 3 425, 6 355, 14 286 C 20 230, 21 183, 20 145 Z" />

    <path class="leaf" d="M -76 336 C -125 317, -164 289, -186 248 C -140 246, -97 267, -54 307 C -60 317, -67 327, -76 336 Z" />
    <path class="leaf" d="M 16 300 C 62 275, 109 251, 160 253 C 137 292, 95 321, 39 334 C 33 324, 25 313, 16 300 Z" />

    <!-- Three teardrops to the right, slightly above the puddle (dripping) -->
    <path class="teardrop" transform="translate(165 200) scale(1.4)" d="M 0 -22 C 14 -22, 22 0, 0 28 C -22 0, -14 -22, 0 -22 Z" />
    <path class="teardrop" transform="translate(158 280) scale(1.2)" d="M 0 -22 C 14 -22, 22 0, 0 28 C -22 0, -14 -22, 0 -22 Z" />
    <path class="teardrop" transform="translate(168 355) scale(1)" d="M 0 -22 C 14 -22, 22 0, 0 28 C -22 0, -14 -22, 0 -22 Z" />
  </g>

  <!-- Wordmark (clear gap below puddle) -->
  <text x="512" y="840" text-anchor="middle" class="wordmark" font-size="150">When I</text>
  <text x="512" y="970" text-anchor="middle" class="wordmark" font-size="150">Die</text>
  <text x="626" y="925" class="tm" font-size="42">TM</text>
</svg>
```

**Used in:** `components/Header.tsx`, `components/Footer.tsx`, `components/PageHero.tsx`,
`components/LegalPage.tsx`, `components/AuthHeader.tsx`, `components/dashboard/PlanPreview.tsx`,
`components/dashboard/ChapterNav.tsx`, the FAQ pages (EN + DE), the dashboard page, the
print view, and `app/layout.tsx` (Open Graph / Twitter share image).

Rendered at various sizes (mostly 120×48 wide-format crops for header use, and small
48×19 / 80×32 / 20×20 crops used as decorative daisy accents) — so a replacement needs
to work both as a full lockup (flower + wordmark) and read clearly when cropped down to
just the flower.

---

## 2. Browser tab icon — `app/icon.svg`

Small simplified flower mark, picked up automatically by Next.js as the favicon (no
manual `<link>` needed — replacing this file is enough).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="18" r="8" fill="#e8f4fc"/>
  <path fill="#1ca45a" d="M16 8c-1 0-2 .5-2.5 1.2L16 12l2.5-2.8C18 8.5 17 8 16 8z"/>
  <path fill="#f9c846" d="M16 6l-1.5 3L11 10l3.5-.5L16 14l1.5-4.5L21 10l-3.5-1L16 6z"/>
  <circle cx="16" cy="10" r="2" fill="#f9c846"/>
  <path fill="none" stroke="#1ca45a" stroke-width="1.2" d="M16 16v6"/>
  <path fill="#1ca45a" d="M14 20l2 2 2-2z"/>
</svg>
```

---

## 3. Daisy petal progress — `public/assets/petal-filled.svg` / `petal-empty.svg`

Powers the "daisy blooms as you answer questions" progress ring in the dashboard and
hero card (`components/dashboard/DaisyProgress.tsx`). Eight of these petals are
arranged in a circle and rendered filled or empty depending on progress.

**petal-filled.svg**
```svg
<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="20" cy="10" rx="18" ry="8" fill="#F5C542" stroke="#1F1F1F" stroke-width="2"/>
</svg>
```

**petal-empty.svg**
```svg
<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="20" cy="10" rx="18" ry="8" fill="#F4F4F4" stroke="#1F1F1F" stroke-width="2"/>
</svg>
```

---

## 4. Fallback chapter icon — `public/assets/icon-document.svg`

Default icon shown in the dashboard when a question chapter has no specific icon set.

```svg
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="6" width="24" height="28" rx="3" fill="#FFF8E6" stroke="#1F1F1F" stroke-width="2"/>
  <line x1="12" y1="16" x2="28" y2="16" stroke="#1F1F1F" stroke-width="2"/>
  <line x1="12" y1="22" x2="24" y2="22" stroke="#1F1F1F" stroke-width="2"/>
</svg>
```

---

## 5. Brand colors — CSS custom properties (`styles/site.css` `:root`)

```css
:root {
  --bg: #f5f5f7;
  --bg-soft: #ffffff;
  --bg-softer: #e5e7eb;
  --fg: #111827;
  --muted: #374151;
  --accent: #f9c846;        /* yellow — the flower's heart/center */
  --accent-soft: rgba(249, 200, 70, 0.16);
  --accent-strong: #34a0ff; /* blue — the "puddle" / water */
  --border-subtle: #1f2933;
  --green: #1ca45a;         /* stem */
  --blue: #34a0ff;          /* water */
  --violet: #ffffff;
  --danger: #ef4444;
  --radius-lg: 18px;
  --radius-md: 12px;
  --radius-pill: 999px;
}
```

Plain-language palette for a designer brief:
- **Yellow `#F9C846` / `#F4CC45`** — the flower's heart, primary accent, used on buttons and highlights
- **Green `#1CA45A` / `#29B44A` / `#72D456`** — stem and leaves, secondary accent
- **Blue `#34A0FF` / `#4E9CDA`** — the "puddle" under the flower (a teardrop/water motif — ties into the brand's "tears but also growth" idea)
- **Ink `#111827` / `#1F1F1F`** — text and outlines
- **Off-white `#F5F5F7` / `#FFF8E6`** — backgrounds

## 6. Typography

- **Playfair Display** (serif) — headings, the logo wordmark style. Loaded via `next/font/google` in `app/layout.tsx`, weights 500/700.
- **Inter** (sans-serif) — body text, UI chrome. Weights 300–700.

---

## 7. Assets that exist but aren't currently used anywhere live

Found in `public/assets/` but not referenced by any page/component right now — safe to
ignore unless you want them redesigned too:

- `public/assets/favicon.svg` (superseded by `app/icon.svg`, which is what Next.js actually serves)
- `public/assets/daisy-divider.svg`, `daisy-watermark.svg`
- `public/assets/icon-chat.svg`, `icon-checklist.svg`, `icon-envelope.svg`, `icon-music.svg`, `icon-notebook.svg`
- `public/assets/illustration-*.svg` (photo, keys, note, sparkle, document)
- PNG exports of the logo (`WhenIDie_Logo_Primary.png`, `WhenIDie_Logo_IconOnly.png`, `WhenIDie_Logo_Watermark.png`, `logo.png`, `logo-primary.png`, `logo-daisy.png`, `daisy-hero.png`)

---

## What to send back

For a clean swap, the most useful deliverables from a redesign are:
1. **Logo.svg** — full lockup (flower + "When I Die™" wordmark), ideally as clean vector SVG
2. **A square icon-only crop** (for the browser tab / app icon, replaces `app/icon.svg`)
3. Confirmation of hex codes if the palette changes, so I can update the CSS variables in one place

Send whatever ChatGPT produces and I'll wire it in.
