import Image from "next/image";
import Link from "next/link";

export function LegalPage({
  crumb,
  title,
  updated,
  children,
}: {
  crumb: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="page-main">
      <div className="container">
        <div className="page-content">
          <div className="page-hero-nav page-hero-nav--legal">
            <Link href="/" className="back-link">
              ← Back to home
            </Link>
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li aria-current="page">{crumb}</li>
              </ol>
            </nav>
          </div>
          <div className="page-hero-brand page-hero-brand--legal">
            <Image src="/assets/Logo.svg" alt="When I Die™" className="page-hero-logo" width={120} height={48} />
          </div>
          <h1>{title}</h1>
          <p className="page-updated">Last updated: {updated}</p>
          {children}
        </div>
      </div>
    </main>
  );
}
