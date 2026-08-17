import type { Metadata } from "next";
import { InsightsIndexView } from "@/components/insights/InsightsIndexView";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { getInsightsListing } from "@/lib/insights/get-insights";
import { insightsIndexCopy } from "@/content/insights";

type InsightsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description: insightsIndexCopy.supporting,
  path: "/insights",
});

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const params = await searchParams;
  const listing = await getInsightsListing({ category: params.category });

  return <InsightsIndexView listing={listing} />;
}
