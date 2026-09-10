import type { MetadataRoute } from "next";
import { basePath, site } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/privacy/", "/privacy/byeolmong/", "/account-deletion/"].map(
    (path) => ({ url: `${site.url}${basePath}${path}` }),
  );
}
