import Image from "next/image";
import Link from "next/link";

export function PageHero({
  crumb,
  eyebrow,
  title,
  tagline,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  tagline?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="section page-hero-section">
      <div className="container">
        <div className="page-hero-inner">
          <div className="page-hero-nav">
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
          <div className="page-hero-brand">
            <Image src="/assets/Logo.svg" alt="When I Die™" className="page-hero-logo" width={120} height={48} />
          </div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {tagline ? <p className="page-hero-tagline">{tagline}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
