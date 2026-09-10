import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/sections/footer";
import { site } from "@/lib/site";

type Props = {
  title: string;
  eyebrow: string;
  intro: string;
  children: ReactNode;
  locale?: "en" | "ko";
  alternateHref?: string;
};

export function LegalLayout({
  title,
  eyebrow,
  intro,
  children,
  locale = "en",
  alternateHref,
}: Props) {
  const korean = locale === "ko";
  return (
    <div lang={locale}>
      <a className="skip-link" href="#main">
        {korean ? "본문으로 바로가기" : "Skip to content"}
      </a>
      <SiteHeader />
      <main id="main" className="legal-page">
        <div className="legal-wrap">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <div className="legal-meta">
            <span>
              {korean ? "운영자" : "Operator"}: {site.name}
            </span>
            <span>
              {korean ? "시행일" : "Effective date"}:{" "}
              <time dateTime={site.policyDate}>
                {korean ? "2026년 9월 10일" : "September 10, 2026"}
              </time>
            </span>
            <span>
              {korean ? "문의" : "Contact"}:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </span>
          </div>
          {alternateHref && (
            <nav
              className="legal-language"
              aria-label={korean ? "문서 언어" : "Document language"}
            >
              <span aria-current="page">{korean ? "Korean" : "English"}</span>
              <Link href={alternateHref} hrefLang={korean ? "en" : "ko"}>
                {korean ? "Read in English" : "Read in Korean"}
              </Link>
            </nav>
          )}
          {children}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
