import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { legalPath, type LegalLocale } from "@/lib/legal-locales";
import { getTermsCopy } from "@/lib/terms-copy";
import { site } from "@/lib/site";

export function TermsDocument({ locale = "en" }: { locale?: LegalLocale }) {
  const copy = getTermsCopy(locale);
  return (
    <LegalLayout
      documentPath="/terms/"
      effectiveDate={site.termsDate}
      locale={locale}
      title={copy.title}
      eyebrow={`GOLDWORKS / ${copy.title.toUpperCase()}`}
      intro={copy.intro}
    >
      <div className="legal-columns">
        <nav className="legal-toc" aria-label={copy.tocLabel}>
          <p>{copy.contentsLabel}</p>
          <ol>
            {copy.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-content">
          {copy.sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <h2>
                {index + 1}. {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.id === "purchases" && (
                <ul>
                  <li>
                    <a href="https://store.steampowered.com/subscriber_agreement/">
                      {copy.links.steamTerms}
                    </a>
                  </li>
                  <li>
                    <a href="https://store.steampowered.com/steam_refunds/">
                      {copy.links.steamRefunds}
                    </a>
                  </li>
                </ul>
              )}
              {section.id === "availability" && (
                <p>
                  <Link href={legalPath(locale, "/account-deletion/")}>
                    {copy.links.deletion}
                  </Link>
                </p>
              )}
              {section.id === "privacy" && (
                <p>
                  <Link href={legalPath(locale, "/privacy/")}>
                    {copy.links.privacy}
                  </Link>
                </p>
              )}
              {section.id === "contact" && (
                <div className="legal-contact">
                  <p>
                    <strong>{copy.links.contact}</strong>
                    <br />
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </LegalLayout>
  );
}
