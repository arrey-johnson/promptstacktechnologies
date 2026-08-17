import type { Metadata } from "next";
import { getSiteUrl } from "@/config/env";
import { getRobotsMetadata } from "@/config/indexing";
import { siteConfig } from "@/config/site";

export function createRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const verificationToken =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    // Environment-aware — see src/config/indexing.ts (not permanently noindex).
    robots: getRobotsMetadata(),
    ...(verificationToken
      ? {
          verification: {
            google: verificationToken,
          },
        }
      : {}),
  };
}
