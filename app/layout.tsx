import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whenidie.us"),
  title: {
    default: "When I Die™ – Make life easier for the people you love",
    template: "%s – When I Die™",
  },
  description:
    "Start in 10 minutes. Capture the essentials—who to call, where things are—so your family never has to guess. Private. When I Die™.",
  openGraph: {
    title: "When I Die™ – Make life easier for the people you love",
    description:
      "Start in 10 minutes. Capture the essentials. Private. Only shared with people you choose. When I Die™.",
    type: "website",
    images: ["/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "When I Die™ – Make life easier for the people you love",
    description:
      "Start in 10 minutes. Capture the essentials. Private. Only shared with people you choose. When I Die™.",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
