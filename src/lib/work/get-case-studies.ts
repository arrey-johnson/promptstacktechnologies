import { workPreviewRecords } from "@/content/work";
import {
  allowPlaceholderContent,
  filterPublishableContent,
  type ContentIntegrityEnv,
} from "@/lib/content-integrity";
import { fetchSanityData } from "@/sanity/lib/fetch";
import {
  mapSanityCaseStudy,
  type SanityCaseStudyDoc,
} from "@/sanity/lib/mappers/caseStudy";
import {
  caseStudiesByCategoryQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  homepageCaseStudiesQuery,
} from "@/sanity/queries";
import { isSanityConfigured } from "@/sanity/env";
import { caseStudyTag } from "@/sanity/lib/tags";
import type { CaseStudy, CaseStudyCategory } from "@/types/case-study";
import type { WorkProject } from "@/content/homepage";
import type { RelatedWorkItem } from "@/content/solutions/types";

async function fetchSanityCaseStudies(): Promise<CaseStudy[] | null> {
  if (!isSanityConfigured()) return null;
  const docs = await fetchSanityData<SanityCaseStudyDoc[]>(
    caseStudiesQuery,
    {},
    { tags: caseStudyTag() },
  );
  if (!docs) return null;
  return docs
    .map(mapSanityCaseStudy)
    .filter((item): item is CaseStudy => item !== null);
}

/**
 * Source list for Work content.
 * Sanity configured → published CMS documents only (never placeholders).
 * Sanity not configured → local development preview records + integrity gate.
 */
async function getAllCaseStudyRecords(): Promise<{
  source: "sanity" | "local";
  items: CaseStudy[];
}> {
  const fromCms = await fetchSanityCaseStudies();
  if (fromCms !== null) {
    return { source: "sanity", items: fromCms };
  }
  return { source: "local", items: [...workPreviewRecords] };
}

export type WorkListingResult = {
  mode: "preview" | "publishable";
  source: "sanity" | "local";
  items: CaseStudy[];
  featured: CaseStudy | null;
};

/** Listing records for /work */
export async function getWorkListing(
  overrides?: ContentIntegrityEnv,
): Promise<WorkListingResult> {
  const { source, items: all } = await getAllCaseStudyRecords();

  if (source === "sanity") {
    const featured =
      all.find((item) => item.featured) ?? all[0] ?? null;
    return {
      mode: "publishable",
      source,
      items: all,
      featured,
    };
  }

  if (allowPlaceholderContent(overrides)) {
    const featured =
      all.find((item) => item.featured) ?? all[0] ?? null;
    return {
      mode: "preview",
      source,
      items: all,
      featured,
    };
  }

  const publishable = filterPublishableContent(all);
  const featured =
    publishable.find((item) => item.featured) ?? publishable[0] ?? null;

  return {
    mode: "publishable",
    source,
    items: publishable,
    featured,
  };
}

/**
 * Detail pages only resolve real (non-placeholder) case studies.
 * Placeholder slugs never become public case-study URLs.
 */
export async function getPublishedCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  if (isSanityConfigured()) {
    const doc = await fetchSanityData<SanityCaseStudyDoc>(
      caseStudyBySlugQuery,
      { slug },
      { tags: caseStudyTag(slug) },
    );
    if (!doc) return null;
    return mapSanityCaseStudy(doc);
  }

  const match = workPreviewRecords.find((item) => item.slug === slug);
  if (!match || match.isPlaceholder) {
    return null;
  }
  return match;
}

/** Static params for /work/[slug] — only real publishable slugs. */
export async function getPublishedCaseStudySlugs(): Promise<string[]> {
  if (isSanityConfigured()) {
    const rows = await fetchSanityData<Array<{ slug: string }>>(
      caseStudySlugsQuery,
      {},
      { tags: caseStudyTag() },
    );
    return (rows ?? []).map((row) => row.slug).filter(Boolean);
  }
  return filterPublishableContent(workPreviewRecords).map((item) => item.slug);
}

function caseStudyToWorkProject(study: CaseStudy): WorkProject {
  return {
    id: study.id,
    title: study.title,
    category: study.categoryLabel,
    problem: study.businessProblem,
    solution: study.solution,
    outcome: study.outcome,
    href: `/work/${study.slug}`,
    imageSrc: study.heroImage?.src ?? null,
    imageAlt: study.heroImage?.alt ?? study.title,
    isPlaceholder: false,
  };
}

function caseStudyToRelatedWork(study: CaseStudy): RelatedWorkItem {
  return {
    id: study.id,
    title: study.title,
    category: study.categoryLabel,
    problem: study.businessProblem,
    solution: study.solution,
    href: `/work/${study.slug}`,
    isPlaceholder: false,
  };
}

/**
 * Homepage Selected Work from Sanity when configured.
 * Returns null source items when CMS empty / unavailable → truthful empty UI.
 * When Sanity not configured → local placeholder integrity path (caller).
 */
export async function getHomepageSelectedWork(): Promise<{
  source: "sanity" | "local";
  featured: WorkProject | null;
  secondary: WorkProject[];
}> {
  if (!isSanityConfigured()) {
    return { source: "local", featured: null, secondary: [] };
  }

  const docs = await fetchSanityData<SanityCaseStudyDoc[]>(
    homepageCaseStudiesQuery,
    {},
    { tags: caseStudyTag() },
  );
  const items = (docs ?? [])
    .map(mapSanityCaseStudy)
    .filter((item): item is CaseStudy => item !== null);

  if (items.length === 0) {
    return { source: "sanity", featured: null, secondary: [] };
  }

  const [first, ...rest] = items;
  return {
    source: "sanity",
    featured: first ? caseStudyToWorkProject(first) : null,
    secondary: rest.slice(0, 2).map(caseStudyToWorkProject),
  };
}

export async function getRelatedWorkForCategory(
  category: CaseStudyCategory,
): Promise<{
  source: "sanity" | "local";
  featured: RelatedWorkItem | null;
  secondary: RelatedWorkItem[];
}> {
  if (!isSanityConfigured()) {
    return { source: "local", featured: null, secondary: [] };
  }

  const docs = await fetchSanityData<SanityCaseStudyDoc[]>(
    caseStudiesByCategoryQuery,
    { category },
    { tags: caseStudyTag() },
  );
  const items = (docs ?? [])
    .map(mapSanityCaseStudy)
    .filter((item): item is CaseStudy => item !== null);

  if (items.length === 0) {
    return { source: "sanity", featured: null, secondary: [] };
  }

  const [first, ...rest] = items;
  return {
    source: "sanity",
    featured: first ? caseStudyToRelatedWork(first) : null,
    secondary: rest.slice(0, 3).map(caseStudyToRelatedWork),
  };
}
