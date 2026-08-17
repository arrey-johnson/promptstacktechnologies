import { insightsDevFixtureNotice } from "@/content/insights";
import {
  InsightCommercialBridge,
  InsightsCategoryNav,
  InsightsEmptyState,
  InsightsFeatured,
  InsightsHero,
  InsightsListing,
} from "@/components/insights";
import type { InsightsListingResult } from "@/lib/insights/get-insights";

type InsightsIndexViewProps = {
  listing: InsightsListingResult;
};

export function InsightsIndexView({ listing }: InsightsIndexViewProps) {
  const showDevLabel = listing.mode === "development-fixtures";
  const hasItems = listing.items.length > 0;
  const featured = listing.featured;
  const listItems = featured
    ? listing.items.filter((item) => item.id !== featured.id)
    : listing.items;

  return (
    <main id="main-content">
      <InsightsHero />

      {showDevLabel ? (
        <p className="border-b border-border-soft bg-brand-lavender/25 px-4 py-3 text-center text-sm text-text-secondary">
          {insightsDevFixtureNotice}
        </p>
      ) : null}

      {hasItems ? (
        <>
          {featured ? (
            <InsightsFeatured article={featured} showDevLabel={showDevLabel} />
          ) : null}
          <InsightsCategoryNav active={listing.category} />
          <InsightsListing items={listItems} showDevLabel={showDevLabel} />
          <InsightCommercialBridge category={listing.category} />
        </>
      ) : (
        <>
          <InsightsCategoryNav active={listing.category} />
          <InsightsEmptyState />
        </>
      )}
    </main>
  );
}
