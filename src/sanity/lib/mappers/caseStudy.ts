import type {
  CaseStudy,
  CaseStudyCategory,
  CaseStudyContentType,
  CaseStudyMetric,
} from "@/types/case-study";
import { caseStudyCategoryLabels } from "@/types/case-study";
import { resolveSanityImage } from "../../image";

export type SanityCaseStudyDoc = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  contentType?: string | null;
  clientName?: string | null;
  clientPermissionConfirmed?: boolean | null;
  industry?: string | null;
  category?: string | null;
  featured?: boolean | null;
  sortOrder?: number | null;
  summary?: string | null;
  businessProblem?: string | null;
  whyItMattered?: string | null;
  approach?: string | null;
  solution?: string | null;
  implementation?: string | null;
  outcome?: string | null;
  outcomeMetrics?: Array<{
    label?: string | null;
    value?: string | null;
  }> | null;
  services?: string[] | null;
  technologies?: string[] | null;
  heroImage?: Parameters<typeof resolveSanityImage>[0];
  gallery?: Array<Parameters<typeof resolveSanityImage>[0]> | null;
  testimonial?: {
    quote?: string | null;
    person?: string | null;
    role?: string | null;
    organization?: string | null;
    permissionConfirmed?: boolean | null;
  } | null;
  relatedSlugs?: Array<string | null> | null;
  completedAt?: string | null;
};

const contentTypes: CaseStudyContentType[] = [
  "client-case-study",
  "project",
  "internal",
  "academy",
];

const categories: CaseStudyCategory[] = [
  "software",
  "ai-automation",
  "digital-marketing",
  "multi-disciplinary",
];

function isContentType(value: string | null | undefined): value is CaseStudyContentType {
  return Boolean(value && contentTypes.includes(value as CaseStudyContentType));
}

function isCategory(value: string | null | undefined): value is CaseStudyCategory {
  return Boolean(value && categories.includes(value as CaseStudyCategory));
}

function mapMetrics(
  metrics: SanityCaseStudyDoc["outcomeMetrics"],
): CaseStudyMetric[] {
  if (!metrics?.length) return [];
  return metrics
    .filter((m): m is { label: string; value: string } =>
      Boolean(m?.label?.trim() && m?.value?.trim()),
    )
    .map((m) => ({ label: m.label.trim(), value: m.value.trim() }));
}

/** Map Sanity case study → stable application CaseStudy type. */
export function mapSanityCaseStudy(doc: SanityCaseStudyDoc): CaseStudy | null {
  if (!doc.slug || !doc.title || !doc.summary || !doc.businessProblem || !doc.solution) {
    return null;
  }
  if (!isCategory(doc.category) || !isContentType(doc.contentType ?? "project")) {
    return null;
  }

  const hero = resolveSanityImage(doc.heroImage ?? null, { width: 1600 });
  const gallery =
    doc.gallery
      ?.map((image) => resolveSanityImage(image, { width: 1200 }))
      .filter((image): image is { src: string; alt: string } => Boolean(image)) ??
    [];

  const canShowClient =
    Boolean(doc.clientPermissionConfirmed) && Boolean(doc.clientName?.trim());

  const testimonial =
    doc.testimonial?.permissionConfirmed &&
    doc.testimonial.quote?.trim() &&
    doc.testimonial.person?.trim()
      ? {
          quote: doc.testimonial.quote.trim(),
          person: doc.testimonial.person.trim(),
          role: doc.testimonial.role?.trim() || undefined,
          organization: doc.testimonial.organization?.trim() || undefined,
        }
      : null;

  return {
    id: doc._id,
    title: doc.title.trim(),
    slug: doc.slug,
    contentType: doc.contentType as CaseStudyContentType,
    clientName: canShowClient ? doc.clientName!.trim() : null,
    industry: doc.industry?.trim() || null,
    category: doc.category,
    categoryLabel: caseStudyCategoryLabels[doc.category],
    heroImage: hero
      ? { src: hero.src, alt: hero.alt || doc.title.trim() }
      : null,
    summary: doc.summary.trim(),
    businessProblem: doc.businessProblem.trim(),
    whyItMattered: doc.whyItMattered?.trim() || null,
    approach: doc.approach?.trim() || null,
    solution: doc.solution.trim(),
    implementation: doc.implementation?.trim() || null,
    outcome: doc.outcome?.trim() || null,
    outcomeMetrics: mapMetrics(doc.outcomeMetrics),
    services: (doc.services ?? []).map((s) => s.trim()).filter(Boolean),
    technologies: (doc.technologies ?? []).map((s) => s.trim()).filter(Boolean),
    gallery,
    testimonial,
    featured: Boolean(doc.featured),
    relatedSlugs: (doc.relatedSlugs ?? []).filter(
      (slug): slug is string => Boolean(slug),
    ),
    isPlaceholder: false,
  };
}
