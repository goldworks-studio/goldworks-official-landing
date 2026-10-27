import type { Metadata } from "next";
import { basePath } from "@/lib/site";
import { getTermsCopy } from "@/lib/terms-copy";
import {
  legalLocales,
  legalPath,
  localeDetails,
  type LegalLocale,
} from "@/lib/legal-locales";

export function termsMetadata(locale: LegalLocale): Metadata {
  const { title, description } = getTermsCopy(locale);
  const url = `${basePath}${legalPath(locale, "/terms/")}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          legalLocales.map((value) => [
            localeDetails[value].language,
            `${basePath}${legalPath(value, "/terms/")}`,
          ]),
        ),
        "x-default": `${basePath}/terms/`,
      },
    },
    openGraph: {
      title: `${title} | GoldWorks`,
      description,
      locale: localeDetails[locale].openGraph,
      url,
    },
  };
}
