import type {
  AcademyProgram,
  ProgramCard,
} from "@/content/academy/types";

export type SanityAcademyProgramDoc = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  status?: string | null;
  heroHeading?: string | null;
  shortPromise?: string | null;
  overview?: string | null;
  audience?: string | null;
  level?: string | null;
  visual?: string | null;
  whoForHeading?: string | null;
  whoForIntro?: string | null;
  whoForItems?: string[] | null;
  prerequisites?: string[] | null;
  outcomes?: string[] | null;
  learningRoadmap?: Array<{
    id?: string | null;
    title?: string | null;
    summary?: string | null;
    items?: string[] | null;
  }> | null;
  practicalSkills?: string[] | null;
  technologies?: string[] | null;
  projects?: Array<{ title?: string | null; body?: string | null }> | null;
  teachingMethod?: string | null;
  professionalWorkflows?: Array<{
    title?: string | null;
    body?: string | null;
  }> | null;
  demonstrableOutcomes?: string[] | null;
  format?: string | null;
  duration?: string | null;
  scheduleText?: string | null;
  feeText?: string | null;
  cohortText?: string | null;
  faq?: Array<{ question?: string | null; answer?: string | null }> | null;
  cardSuitedFor?: string | null;
  cardPracticalFocus?: string | null;
  cardMayBuild?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

const allowedSlugs = [
  "software-engineering",
  "artificial-intelligence",
  "cybersecurity",
] as const;

type AllowedSlug = (typeof allowedSlugs)[number];

function isAllowedSlug(value: string | null | undefined): value is AllowedSlug {
  return Boolean(
    value && (allowedSlugs as readonly string[]).includes(value),
  );
}

function isVisual(
  value: string | null | undefined,
): value is AcademyProgram["visual"] {
  return value === "software" || value === "ai" || value === "cybersecurity";
}

function isStatus(
  value: string | null | undefined,
): value is AcademyProgram["status"] {
  return (
    value === "active" ||
    value === "upcoming" ||
    value === "paused" ||
    value === "archived"
  );
}

/** Map Sanity academy program → stable AcademyProgram domain type. */
export function mapSanityAcademyProgram(
  doc: SanityAcademyProgramDoc,
): AcademyProgram | null {
  if (
    !isAllowedSlug(doc.slug) ||
    !doc.title?.trim() ||
    !doc.heroHeading?.trim() ||
    !doc.shortPromise?.trim() ||
    !doc.overview?.trim() ||
    !doc.audience?.trim() ||
    !doc.teachingMethod?.trim() ||
    !isVisual(doc.visual) ||
    !isStatus(doc.status ?? "active")
  ) {
    return null;
  }

  const roadmap =
    doc.learningRoadmap
      ?.filter(
        (stage) =>
          stage?.id?.trim() &&
          stage.title?.trim() &&
          stage.summary?.trim() &&
          (stage.items?.length ?? 0) > 0,
      )
      .map((stage) => ({
        id: stage.id!.trim(),
        title: stage.title!.trim(),
        summary: stage.summary!.trim(),
        items: (stage.items ?? []).map((item) => item.trim()).filter(Boolean),
      })) ?? [];

  return {
    title: doc.title.trim(),
    slug: doc.slug,
    status: doc.status as AcademyProgram["status"],
    heroHeading: doc.heroHeading.trim(),
    shortPromise: doc.shortPromise.trim(),
    overview: doc.overview.trim(),
    audience: doc.audience.trim(),
    level: doc.level?.trim() || null,
    prerequisites: (doc.prerequisites ?? []).map((s) => s.trim()).filter(Boolean),
    outcomes: (doc.outcomes ?? []).map((s) => s.trim()).filter(Boolean),
    learningRoadmap: roadmap,
    practicalSkills: (doc.practicalSkills ?? [])
      .map((s) => s.trim())
      .filter(Boolean),
    technologies: doc.technologies?.length
      ? doc.technologies.map((s) => s.trim()).filter(Boolean)
      : null,
    projects:
      doc.projects
        ?.filter((p) => p?.title?.trim() && p.body?.trim())
        .map((p) => ({
          title: p.title!.trim(),
          body: p.body!.trim(),
        })) ?? [],
    teachingMethod: doc.teachingMethod.trim(),
    professionalWorkflows:
      doc.professionalWorkflows
        ?.filter((w) => w?.title?.trim() && w.body?.trim())
        .map((w) => ({
          title: w.title!.trim(),
          body: w.body!.trim(),
        })) ?? [],
    demonstrableOutcomes: (doc.demonstrableOutcomes ?? [])
      .map((s) => s.trim())
      .filter(Boolean),
    format: doc.format?.trim() || null,
    duration: doc.duration?.trim() || null,
    scheduleText: doc.scheduleText?.trim() || null,
    feeText: doc.feeText?.trim() || null,
    cohortText: doc.cohortText?.trim() || null,
    // Never take applicationOpen from CMS — admissions flag is operational config.
    applicationOpen: null,
    faq:
      doc.faq
        ?.filter((item) => item?.question?.trim() && item.answer?.trim())
        .map((item) => ({
          question: item.question!.trim(),
          answer: item.answer!.trim(),
        })) ?? [],
    seo: {
      title: doc.seo?.metaTitle?.trim() || doc.title.trim(),
      description:
        doc.seo?.metaDescription?.trim() || doc.shortPromise.trim(),
    },
    visual: doc.visual,
    whoFor: {
      heading: doc.whoForHeading?.trim() || "Who this program is for",
      intro: doc.whoForIntro?.trim() || doc.audience.trim(),
      items: (doc.whoForItems ?? []).map((s) => s.trim()).filter(Boolean),
    },
  };
}

export function mapSanityProgramCard(
  program: AcademyProgram,
  extras?: {
    suitedFor?: string | null;
    practicalFocus?: string | null;
    mayBuild?: string | null;
  },
): ProgramCard {
  return {
    slug: program.slug,
    title: program.title,
    shortPromise: program.shortPromise,
    suitedFor: extras?.suitedFor?.trim() || program.audience,
    practicalFocus:
      extras?.practicalFocus?.trim() || program.teachingMethod,
    mayBuild:
      extras?.mayBuild?.trim() ||
      program.projects[0]?.title ||
      "Practical projects you can demonstrate.",
    href: `/academy/programs/${program.slug}`,
  };
}
