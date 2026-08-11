import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#top" className="skip-link">
        Skip to main content
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
