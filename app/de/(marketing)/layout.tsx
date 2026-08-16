import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocaleHtmlLang } from "@/components/LocaleHtmlLang";

export default function GermanMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocaleHtmlLang locale="de" />
      <a href="#top" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <Header locale="de" />
      {children}
      <Footer locale="de" />
    </>
  );
}
