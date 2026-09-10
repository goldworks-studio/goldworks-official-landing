import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/sections/footer";
import { LanguageSelect } from "@/components/language-select";
import {
  documentLanguages,
  legalPath,
  localeDetails,
  type LegalDocument,
  type PrivacyLocale,
} from "@/lib/legal-locales";
import { site } from "@/lib/site";

type Props = {
  title: string;
  eyebrow: string;
  intro: string;
  children: ReactNode;
  locale?: PrivacyLocale;
  documentPath?: LegalDocument;
};

export function LegalLayout({
  title,
  eyebrow,
  intro,
  children,
  locale = "en",
  documentPath = "/privacy/",
}: Props) {
  const copy = localeDetails[locale];
  const date = new Intl.DateTimeFormat(copy.language, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${site.policyDate}T00:00:00Z`));
  const options = documentLanguages(documentPath).map((value) => ({
    value,
    label: localeDetails[value].name,
    language: localeDetails[value].language,
    href: legalPath(value, documentPath),
  }));
  return (
    <div lang={copy.language}>
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <SiteHeader />
      <main id="main" className="legal-page">
        <div className="legal-wrap">
          <div className="legal-heading-row">
            <p className="legal-eyebrow">{eyebrow}</p>
            <LanguageSelect
              locale={locale}
              label={copy.languageLabel}
              hint={copy.selectionHint}
              options={options}
            />
          </div>
          <noscript>
            <nav
              className="legal-language-fallback"
              aria-label={copy.languageLabel}
            >
              {options.map((option) => (
                <Link
                  key={option.value}
                  href={option.href}
                  hrefLang={option.language}
                  lang={option.language}
                  aria-current={option.value === locale ? "page" : undefined}
                >
                  {option.label}
                </Link>
              ))}
            </nav>
          </noscript>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <div className="legal-meta">
            <span>
              {copy.operator}: {site.name}
            </span>
            <span>
              {copy.effective}: <time dateTime={site.policyDate}>{date}</time>
            </span>
            <span>
              {copy.contact}: <a href={`mailto:${site.email}`}>{site.email}</a>
            </span>
          </div>
          {children}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
