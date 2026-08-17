import Link from "next/link";
import { Container } from "@/components/ui";
import {
  INSIGHT_CATEGORIES,
  insightCategoryLabels,
  type InsightCategory,
} from "@/types/insight";

type InsightsCategoryNavProps = {
  active: InsightCategory | null;
};

function chipClass(isActive: boolean): string {
  return isActive
    ? "inline-flex shrink-0 rounded-[var(--radius-button)] bg-brand-navy px-3.5 py-2 text-sm font-medium text-white"
    : "inline-flex shrink-0 rounded-[var(--radius-button)] px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent";
}

/**
 * Editorial category chips.
 * Mobile: single-row horizontal scroll with edge fades so overflow is discoverable.
 * Desktop: wrap is fine; chips remain compact and secondary to the listing.
 */
export function InsightsCategoryNav({ active }: InsightsCategoryNavProps) {
  return (
    <nav
      aria-label="Insight categories"
      data-section="insights-categories"
      className="border-y border-border-soft bg-surface-primary"
    >
      <Container className="py-4 md:py-5">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-surface-primary to-transparent md:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-surface-primary to-transparent md:hidden"
          />
          <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            <li className="shrink-0">
              <Link
                href="/insights"
                className={chipClass(active === null)}
                aria-current={active === null ? "page" : undefined}
              >
                All
              </Link>
            </li>
            {INSIGHT_CATEGORIES.map((category) => {
              const isActive = active === category;
              return (
                <li key={category} className="shrink-0">
                  <Link
                    href={`/insights?category=${category}`}
                    className={chipClass(isActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {insightCategoryLabels[category]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
