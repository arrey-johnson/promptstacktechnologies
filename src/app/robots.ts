import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/env";
import { getIndexingPolicy } from "@/config/indexing";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const policy = getIndexingPolicy();

  // Non-production: discourage crawling entirely (meta robots also noindex).
  if (!policy.index) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio",
        "/studio/",
        "/api/",
        "/project-request-received",
        "/academy/application-received",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
