import Link from "next/link";
import { Container, Heading, Text } from "@/components/ui";
import { formatInsightDate, type InsightListItem } from "@/types/insight";

type RelatedInsightsProps = {
  items: InsightListItem[];
};

export function RelatedInsights({ items }: RelatedInsightsProps) {
  if (items.length === 0) return null;

  return (
    <section
      data-section="related-insights"
      aria-labelledby="related-insights-heading"
      className="border-t border-border-soft bg-surface-primary"
    >
      <Container className="py-14 md:py-16 lg:py-20">
        <Heading
          id="related-insights-heading"
          level={2}
          className="text-text-primary"
        >
          Related Insights
        </Heading>
        <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
          {items.map((article) => {
            const dateLabel = formatInsightDate(article.publishedAt);
            return (
              <li key={article.id}>
                <article>
                  <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
                    {article.categoryLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-medium text-text-primary">
                    <Link
                      href={article.href}
                      className="transition-colors hover:text-accent"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <Text muted className="mt-3">
                    {article.excerpt}
                  </Text>
                  {dateLabel ? (
                    <p className="mt-4 text-sm text-text-secondary">
                      <time dateTime={article.publishedAt ?? undefined}>
                        {dateLabel}
                      </time>
                    </p>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
