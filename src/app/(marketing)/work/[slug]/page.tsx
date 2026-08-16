import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/trust";
import { siteConfig } from "@/config/site";
import {
  getPublishedCaseStudyBySlug,
  getPublishedCaseStudySlugs,
} from "@/lib/work/get-case-studies";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getPublishedCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Work",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: {
      canonical: `/work/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.title} | ${siteConfig.name}`,
      description: caseStudy.summary,
      url: `/work/${caseStudy.slug}`,
    },
  };
}

/**
 * Case-study detail route.
 * Only real (non-placeholder) published records resolve.
 * Placeholder development data never becomes a public detail URL.
 */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getPublishedCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main id="main-content">
      <CaseStudyDetail caseStudy={caseStudy} />
    </main>
  );
}
