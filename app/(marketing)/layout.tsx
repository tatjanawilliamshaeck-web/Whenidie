import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleHtmlLang } from "@/components/LocaleHtmlLang";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocaleHtmlLang locale="en" />
      <a href="#top" className="skip-link">
        Skip to main content
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
