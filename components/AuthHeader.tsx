import Image from "next/image";
import Link from "next/link";

export function AuthHeader({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <Image
            src="/assets/logo.png"
            alt="When I Die™"
            className="logo-image"
            width={120}
            height={48}
            priority
          />
        </Link>
        <nav className="nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="announcement-bar">
        Your life, your wishes, your extremely specific playlist.
      </div>
    </header>
  );
}
