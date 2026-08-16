import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
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
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
