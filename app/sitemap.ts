import type { MetadataRoute } from "next";
import { basePath, site } from "@/lib/site";
import { legalPath, localeDetails, privacyLocales } from "@/lib/legal-locales";

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
      privacyLocales.map((locale) => ({
        url: `${site.url}${basePath}${legalPath(locale)}`,
        alternates: {
          languages: Object.fromEntries(
            privacyLocales.map((value) => [
              localeDetails[value].language,
              `${site.url}${basePath}${legalPath(value)}`,
            ]),
          ),
        },
      })),
    );
}
