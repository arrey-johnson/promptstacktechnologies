import Image from "next/image";
import Link from "next/link";
import { Container, Heading, Text } from "@/components/ui";
import { DevelopmentPreviewLabel } from "@/components/home/DevelopmentPreviewLabel";
import { formatInsightDate, type InsightListItem } from "@/types/insight";

type InsightsListingProps = {
  items: InsightListItem[];
  showDevLabel?: boolean;
};

function InsightListRow({
  article,
  showDevLabel,
}: {
  article: InsightListItem;
  showDevLabel: boolean;
}) {
  const dateLabel = formatInsightDate(article.publishedAt);

  return (
    <article
      className="grid gap-6 border-t border-border-soft py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10 md:py-10"
      data-development-fixture={
        article.isDevelopmentFixture ? "true" : undefined
      }
    >
      {article.imageSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted md:col-span-4">
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 28vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className={article.imageSrc ? "md:col-span-8" : "md:col-span-10"}>
        {showDevLabel || article.isDevelopmentFixture ? (
          <div className="mb-3">
            <DevelopmentPreviewLabel noun="Insight" />
          </div>
        ) : null}
        <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
          {article.categoryLabel}
          {dateLabel ? (
            <>
              <span aria-hidden="true" className="mx-2 text-border-strong">
                ·
              </span>
              <time
                className="text-text-secondary"
                dateTime={article.publishedAt ?? undefined}
              >
                {dateLabel}
              </time>
            </>
          ) : null}
        </p>
        <h2 className="mt-3 text-2xl font-medium text-text-primary md:text-3xl">
          <Link
            href={article.href}
            className="transition-colors hover:text-accent"
            data-analytics={`cta_insight_${article.slug}`}
          >
            {article.title}
          </Link>
        </h2>
        <Text muted className="mt-3 max-w-2xl">
          {article.excerpt}
        </Text>
        {article.author ? (
          <p className="mt-4 text-sm text-text-secondary">{article.author}</p>
        ) : null}
      </div>
    </article>
  );
}

export function InsightsListing({
  items,
  showDevLabel = false,
}: InsightsListingProps) {
  if (items.length === 0) return null;

  return (
    <section
      data-section="insights-listing"
      aria-labelledby="insights-listing-heading"
      className="bg-surface-primary"
    >
      <Container className="py-12 md:py-16 lg:py-20">
        <Heading
          id="insights-listing-heading"
          level={2}
          className="text-text-primary"
        >
          All Insights
        </Heading>
        <div className="mt-8 md:mt-10">
          {items.map((article) => (
            <InsightListRow
              key={article.id}
              article={article}
              showDevLabel={showDevLabel}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
