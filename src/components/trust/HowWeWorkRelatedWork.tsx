import { RelatedWorkPreview } from "@/components/solutions";
import { homepageWork } from "@/content/homepage";
import { getHomepageSelectedWork } from "@/lib/work/get-case-studies";
import type { RelatedWorkItem } from "@/content/solutions/types";

function toRelated(item: {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  href: string;
}): RelatedWorkItem {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    problem: item.problem,
    solution: item.solution,
    href: item.href,
    isPlaceholder: false,
  };
}

/**
 * How We Work related projects — same real Work source as homepage Selected Work.
 */
export async function HowWeWorkRelatedWork() {
  const cms = await getHomepageSelectedWork();

  const resolved =
    cms.source === "sanity"
      ? {
          featured: cms.featured ? toRelated(cms.featured) : null,
          secondary: cms.secondary.map(toRelated),
          mode: "publishable" as const,
        }
      : undefined;

  return (
    <RelatedWorkPreview
      heading="Related work"
      supporting="See how Promptstack's process shows up in real project stories."
      emptyMessage="Related project stories will appear here once approved case studies are published."
      cta={{ label: "View Our Work", href: "/work" }}
      featured={homepageWork.featured}
      secondary={homepageWork.secondary}
      resolved={resolved}
      analyticsPrefix="how_we_work"
    />
  );
}
