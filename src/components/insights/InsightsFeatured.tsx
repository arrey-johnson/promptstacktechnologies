import Image from "next/image";
import Link from "next/link";
import { Container, Heading, Text } from "@/components/ui";
import { DevelopmentPreviewLabel } from "@/components/home/DevelopmentPreviewLabel";
import { formatInsightDate, type InsightListItem } from "@/types/insight";

type InsightsFeaturedProps = {
  article: InsightListItem;
  showDevLabel?: boolean;
};

export function InsightsFeatured({
  article,
  showDevLabel = false,
}: InsightsFeaturedProps) {
  const dateLabel = formatInsightDate(article.publishedAt);

  return (
    <section
      data-section="insights-featured"
      aria-labelledby="insights-featured-heading"
      className="bg-surface-soft"
    >
      <Container className="py-12 md:py-16 lg:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
          Featured
        </p>
        <article className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
          {article.imageSrc ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted lg:col-span-7">
              <Image
                src={article.imageSrc}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="min-h-[14rem] bg-[linear-gradient(135deg,rgba(203,174,211,0.45),rgba(27,38,59,0.08))] lg:col-span-7 lg:min-h-[22rem]"
            />
          )}

          <div className="lg:col-span-5">
            {showDevLabel || article.isDevelopmentFixture ? (
              <div className="mb-4">
                <DevelopmentPreviewLabel noun="Insight" />
              </div>
            ) : null}
            <p className="text-sm font-medium uppercase tracking-[0.11em] text-text-secondary">
              {article.categoryLabel}
              {dateLabel ? (
                <>
                  <span aria-hidden="true" className="mx-2 text-border-strong">
                    ·
                  </span>
                  <time dateTime={article.publishedAt ?? undefined}>
                    {dateLabel}
                  </time>
                </>
              ) : null}
            </p>
            <Heading
              id="insights-featured-heading"
              level={2}
              className="mt-4 text-text-primary"
            >
              <Link
                href={article.href}
                className="transition-colors hover:text-accent"
                data-analytics="cta_insight_featured_index"
              >
                {article.title}
              </Link>
            </Heading>
            <Text muted className="mt-4">
              {article.excerpt}
            </Text>
            <Link
              href={article.href}
              className="mt-6 inline-flex text-sm font-medium text-accent transition-colors hover:text-brand-navy"
              data-analytics="cta_insight_featured_read"
            >
              Read Insight
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
