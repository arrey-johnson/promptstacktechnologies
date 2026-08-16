import { CommercialCTA } from "@/components/solutions";
import {
  TrustPageHero,
  WorkDocumentation,
  WorkEmptyState,
  WorkListing,
} from "@/components/trust";
import { workCta, workHero, workMeta } from "@/content/work";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { getWorkListing } from "@/lib/work/get-case-studies";

export const metadata = createPageMetadata({
  title: workMeta.title,
  description: workMeta.description,
  path: "/work",
});

export default async function WorkPage() {
  const listing = await getWorkListing();
  const hasItems = listing.items.length > 0;

  return (
    <main id="main-content">
      <TrustPageHero
        {...workHero}
        analyticsPrefix="work"
        visual="work"
      />

      {hasItems ? (
        <WorkListing
          featured={listing.featured}
          items={listing.items}
          mode={listing.mode}
        />
      ) : (
        <WorkEmptyState />
      )}

      <WorkDocumentation />
      <CommercialCTA {...workCta} />
    </main>
  );
}
