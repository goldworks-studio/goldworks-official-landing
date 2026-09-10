import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="GoldWorks home">
      <span>GoldWorks</span>
    </Link>
  );
}
export function SiteHeader() {
  return (
    <header className="site-header">
      <Wordmark />
      <nav aria-label="Main navigation">
        <Link href="/#studio">Studio</Link>
        <Link className="header-contact" href="/#contact">
          Contact <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
