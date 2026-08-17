import Image from "next/image";
import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { homepageInsights, type InsightPreview } from "@/content/homepage";
import { getHomepageInsights } from "@/lib/insights/get-homepage-insights";
import { DevelopmentPreviewLabel } from "./DevelopmentPreviewLabel";
import { VisualPlaceholder } from "./VisualPlaceholder";

function InsightCard({
  article,
  featured = false,
  preview = false,
}: {
  article: InsightPreview;
  featured?: boolean;
  preview?: boolean;
}) {
  const isPreviewPlaceholder = preview && article.isPlaceholder;

  return (
    <article
      className={
        featured
          ? "grid gap-6 border-t border-border-soft pt-8 lg:grid-cols-12 lg:gap-10 lg:border-t-0 lg:pt-0"
          : "border-t border-border-soft pt-8"
      }
      data-placeholder={article.isPlaceholder ? "true" : undefined}
    >
      {featured ? (
        <div className="lg:col-span-7">
          {article.imageSrc && !article.isPlaceholder ? (
            <div className="relative aspect-[16/10] overflow-hidden border border-border-soft bg-surface-muted">
              <Image
                src={article.imageSrc}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          ) : (
            <VisualPlaceholder
              kind="insight"
              className="border border-border-soft"
              label={`${article.title} visual`}
            />
          )}
        </div>
      ) : null}

      <div
        className={
          featured ? "flex flex-col justify-center lg:col-span-5" : undefined
        }
      >
        {isPreviewPlaceholder ? (
          <DevelopmentPreviewLabel noun="Insight" />
        ) : null}

        <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
          {article.category}
        </p>
        <h3
          className={
            featured
              ? "mt-3 text-2xl font-medium text-text-primary md:text-3xl"
              : "mt-2 text-xl font-medium text-text-primary md:text-2xl"
          }
        >
          {isPreviewPlaceholder ? (
            <span>{article.title}</span>
          ) : (
            <a
              href={article.href}
              className="transition-colors duration-200 hover:text-accent"
              data-analytics={
                featured
                  ? "cta_insight_featured"
                  : `cta_insight_${article.id}`
              }
            >
              {article.title}
            </a>
          )}
        </h3>
        <Text muted className="mt-3">
          {article.excerpt}
        </Text>
      </div>
    </article>
  );
}

export async function InsightsPreview() {
  const { heading, body, cta } = homepageInsights;
  const editorial = await getHomepageInsights();
  const hasItems =
    Boolean(editorial.featured) || editorial.secondary.length > 0;

  return (
    <Section
      tone="primary"
      spacious
      data-section="insights"
      aria-labelledby="homepage-insights-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Heading
              id="homepage-insights-heading"
              level={2}
              className="text-text-primary"
            >
              {heading}
            </Heading>
            <Text size="lead" muted className="mt-4">
              {body}
            </Text>
          </div>
          <Button
            href={cta.href}
            variant="secondary"
            data-analytics="cta_insights_index"
          >
            {cta.label}
          </Button>
        </div>

        {hasItems ? (
          <>
            {editorial.featured ? (
              <div className="mt-10 lg:mt-12">
                <InsightCard
                  article={editorial.featured}
                  featured
                  preview={editorial.mode === "preview"}
                />
              </div>
            ) : null}

            {editorial.secondary.length > 0 ? (
              <div className="mt-4 grid gap-0 md:mt-8 md:grid-cols-2 md:gap-12">
                {editorial.secondary.map((article) => (
                  <InsightCard
                    key={article.id}
                    article={article}
                    preview={editorial.mode === "preview"}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-10 max-w-2xl text-[1.0625rem] leading-relaxed text-text-secondary md:text-lg">
            Featured Insights will appear here once articles are published.
          </p>
        )}
      </Container>
    </Section>
  );
}
