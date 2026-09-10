import type { Metadata } from "next";
import { basePath } from "@/lib/site";
import {
  legalPath,
  localeDetails,
  privacyLocales,
  type PrivacyLocale,
} from "@/lib/legal-locales";

export function privacyMetadata(
  locale: PrivacyLocale,
  description: string,
): Metadata {
  const details = localeDetails[locale];
  return {
    title: details.privacy,
    description,
    alternates: {
      canonical: `${basePath}${legalPath(locale)}`,
      languages: {
        ...Object.fromEntries(
          privacyLocales.map((value) => [
            localeDetails[value].language,
            `${basePath}${legalPath(value)}`,
          ]),
        ),
        "x-default": `${basePath}/privacy/`,
      },
    },
    openGraph: {
      title: `${details.privacy} | GoldWorks`,
      description,
      locale: details.openGraph,
      url: `${basePath}${legalPath(locale)}`,
    },
  };
}
