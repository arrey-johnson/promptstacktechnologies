import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/env";
import { getAcademyProgramSlugs } from "@/lib/academy/get-programs";
import { buildSitemapEntries } from "@/lib/seo/sitemap-entries";
import { getPublishedCaseStudySlugs } from "@/lib/work/get-case-studies";

/**
 * Public sitemap.
 * Insight routes are omitted until Epic 10 implements them.
 * Drafts, Studio, confirmations, and placeholders are excluded.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [workSlugs, academyProgramSlugs] = await Promise.all([
    getPublishedCaseStudySlugs(),
    getAcademyProgramSlugs(),
  ]);

  return buildSitemapEntries({
    baseUrl: getSiteUrl(),
    workSlugs,
    academyProgramSlugs,
    // Explicit empty — schema may exist, routes do not.
    insightSlugs: [],
  });
}
