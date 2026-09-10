import Link from "next/link";
import { Wordmark } from "@/components/site-header";
import {
  legalPath,
  localeDetails,
  type PrivacyLocale,
} from "@/lib/legal-locales";

export function Footer({ locale = "en" }: { locale?: PrivacyLocale }) {
  const copy = localeDetails[locale];
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Wordmark />
        <p>{copy.tagline}</p>
        <a href="mailto:support@goldworks.net">support@goldworks.net</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GoldWorks</span>
        <div>
          <Link href={legalPath(locale)}>{copy.privacy}</Link>
          <Link href={legalPath(locale, "/account-deletion/")}>
            {copy.deletion}
          </Link>
        </div>
      </div>
    </footer>
  );
}
