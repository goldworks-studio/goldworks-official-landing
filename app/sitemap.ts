import type { MetadataRoute } from "next";
import { basePath, site } from "@/lib/site";
import { legalPath, localeDetails, legalLocales } from "@/lib/legal-locales";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/privacy/byeolmong/",
    "/account-deletion/",
    "/ko/privacy/byeolmong/",
    "/ko/account-deletion/",
  ]
    .map((path) => ({ url: `${site.url}${basePath}${path}` }))
    .concat(
      (["/privacy/", "/terms/"] as const).flatMap((document) =>
        legalLocales.map((locale) => ({
          url: `${site.url}${basePath}${legalPath(locale, document)}`,
          alternates: {
            languages: Object.fromEntries(
              legalLocales.map((value) => [
                localeDetails[value].language,
                `${site.url}${basePath}${legalPath(value, document)}`,
              ]),
            ),
          },
        })),
      ),
    );
}
