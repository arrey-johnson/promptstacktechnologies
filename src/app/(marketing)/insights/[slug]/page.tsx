import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  InsightArticleDetail,
  InsightCommercialBridge,
  RelatedInsights,
} from "@/components/insights";
import { AnalyticsViewBeacon } from "@/components/analytics";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/config/env";
import {
  getInsightBySlug,
  getPublishedInsightSlugs,
  getRelatedInsights,
} from "@/lib/insights/get-insights";
import { createPageMetadata } from "@/lib/seo/page-metadata";

type InsightDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InsightDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);

  if (!article) {
    return { title: "Insights" };
  }

  const title = article.seo.metaTitle || article.title;
  const description = article.seo.metaDescription || article.excerpt;
  const ogImage = article.seo.ogImageSrc || article.imageSrc;

  return {
    ...createPageMetadata({
      title,
      description,
      path: `/insights/${article.slug}`,
      robots: article.isDevelopmentFixture || article.seo.noIndex
        ? { index: false, follow: false }
        : undefined,
    }),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/insights/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

function buildArticleJsonLd(article: NonNullable<
  Awaited<ReturnType<typeof getInsightBySlug>>
>) {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  if (article.publishedAt) {
    data.datePublished = article.publishedAt;
  }
  if (article.imageSrc) {
    data.image = [article.imageSrc];
  }
  if (article.author) {
    data.author = {
      "@type": "Person",
      name: article.author,
    };
  }

  return data;
}

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedInsights(article);
  const jsonLd = article.isDevelopmentFixture
    ? null
    : buildArticleJsonLd(article);

  return (
    <main id="main-content">
      <AnalyticsViewBeacon
        event="insight_view"
        payload={{ slug: article.slug }}
      />
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <InsightArticleDetail article={article} />
      <RelatedInsights items={related} />
      <InsightCommercialBridge category={article.category} />
    </main>
  );
}
