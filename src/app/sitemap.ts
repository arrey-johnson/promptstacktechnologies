import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/env";
import { getAcademyProgramSlugs } from "@/lib/academy/get-programs";
import { getPublishedInsightSlugs } from "@/lib/insights/get-insights";
import { buildSitemapEntries } from "@/lib/seo/sitemap-entries";
import { getPublishedCaseStudySlugs } from "@/lib/work/get-case-studies";

/**
 * Public sitemap.
 * Published Insight documents may appear now that Epic 10 routes exist.
 * Drafts, Studio, confirmations, fixtures, and placeholders are excluded.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [workSlugs, academyProgramSlugs, insightSlugs] = await Promise.all([
    getPublishedCaseStudySlugs(),
    getAcademyProgramSlugs(),
    getPublishedInsightSlugs(),
  ]);

  return buildSitemapEntries({
    baseUrl: getSiteUrl(),
    workSlugs,
    academyProgramSlugs,
    insightSlugs,
  });
}
