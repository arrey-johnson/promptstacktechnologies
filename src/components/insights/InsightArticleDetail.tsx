import Image from "next/image";
import { Container, Heading, Text } from "@/components/ui";
import { DevelopmentPreviewLabel } from "@/components/home/DevelopmentPreviewLabel";
import { InsightPortableText } from "./InsightPortableText";
import {
  formatInsightDate,
  type InsightArticle,
} from "@/types/insight";

type InsightArticleDetailProps = {
  article: InsightArticle;
};

export function InsightArticleDetail({ article }: InsightArticleDetailProps) {
  const dateLabel = formatInsightDate(article.publishedAt);

  return (
    <article data-section="insight-article">
      <header className="bg-surface-primary">
        <Container className="pt-10 md:pt-14 lg:pt-16">
          <div className="mx-auto max-w-3xl">
            {article.isDevelopmentFixture ? (
              <div className="mb-5">
                <DevelopmentPreviewLabel noun="Insight" />
              </div>
            ) : null}
            <p className="text-sm font-medium uppercase tracking-[0.11em] text-accent">
              {article.categoryLabel}
            </p>
            <Heading
              level={1}
              className="mt-4 text-text-primary"
            >
              {article.title}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {article.excerpt}
            </Text>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-secondary">
              {dateLabel ? (
                <time dateTime={article.publishedAt ?? undefined}>
                  {dateLabel}
                </time>
              ) : null}
              {dateLabel && article.author ? (
                <span aria-hidden="true">·</span>
              ) : null}
              {article.author ? <span>{article.author}</span> : null}
            </div>
          </div>

          {article.imageSrc ? (
            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden bg-surface-muted md:mt-12">
              <Image
                src={article.imageSrc}
                alt={article.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="object-cover"
              />
            </div>
          ) : null}
        </Container>
      </header>

      <div className="bg-surface-primary">
        <Container className="py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[42rem]">
            <InsightPortableText value={article.body} />
          </div>
        </Container>
      </div>
    </article>
  );
}
