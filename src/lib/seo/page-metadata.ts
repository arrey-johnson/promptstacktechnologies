import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createPageMetadata({
  title,
  description,
  path,
  robots,
}: {
  title: string;
  description: string;
  path: string;
  /** Page-level override (e.g. interim privacy noindex, confirmation noindex). */
  robots?: Metadata["robots"];
}): Metadata {
  const absoluteTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url: path,
    },
    twitter: {
      title: absoluteTitle,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}
