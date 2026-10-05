import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioCaseStudy } from "@/components/portfolio/portfolio-case-study";
import { getCmsData } from "@/lib/cms/store";
import { getRequestLocale } from "@/lib/i18n/locale";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { portfolioItems } = await getCmsData();
  const item = portfolioItems.find((entry) => entry.slug === slug);
  return {
    title: item?.title || "Portfolio",
    description: item?.summary || (item ? `${item.category} — ${item.title}` : undefined),
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [cms, locale] = await Promise.all([getCmsData(), getRequestLocale()]);
  const item = cms.portfolioItems.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const index = cms.portfolioItems.findIndex((entry) => entry.id === item.id);
  const next = cms.portfolioItems[(index + 1) % cms.portfolioItems.length];

  return <PortfolioCaseStudy item={item} next={next} locale={locale} />;
}
