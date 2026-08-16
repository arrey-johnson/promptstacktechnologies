import {
  getAcademyProgramBySlug as getLocalProgramBySlug,
  getActiveAcademyPrograms as getLocalActivePrograms,
  programCards as localProgramCards,
} from "@/content/academy/programs";
import type { AcademyProgram, ProgramCard } from "@/content/academy/types";
import { getAcademyContentSource } from "@/sanity/env";
import { fetchSanityData } from "@/sanity/lib/fetch";
import {
  mapSanityAcademyProgram,
  mapSanityProgramCard,
  type SanityAcademyProgramDoc,
} from "@/sanity/lib/mappers/academyProgram";
import {
  academyProgramBySlugQuery,
  academyProgramsQuery,
} from "@/sanity/queries";
import { academyProgramTag } from "@/sanity/lib/tags";

/**
 * Academy content source adapter.
 *
 * LOCAL (default): approved TypeScript modules from Epic 7.
 * SANITY: published Sanity academyProgram documents (ACADEMY_CONTENT_SOURCE=sanity).
 *
 * Admissions CTAs remain gated by ACADEMY_APPLICATIONS_ENABLED — never CMS.
 */
export async function getActiveAcademyPrograms(): Promise<
  readonly AcademyProgram[]
> {
  if (getAcademyContentSource() === "local") {
    return getLocalActivePrograms();
  }

  const docs = await fetchSanityData<SanityAcademyProgramDoc[]>(
    academyProgramsQuery,
    {},
    { tags: academyProgramTag() },
  );
  if (!docs) {
    console.warn(
      "[academy] Sanity source selected but fetch failed; falling back to local.",
    );
    return getLocalActivePrograms();
  }

  const mapped = docs
    .map(mapSanityAcademyProgram)
    .filter((item): item is AcademyProgram => item !== null)
    .filter((item) => item.status === "active");

  if (mapped.length === 0) {
    console.warn(
      "[academy] Sanity source returned zero active programs; falling back to local.",
    );
    return getLocalActivePrograms();
  }

  return mapped;
}

export async function getAcademyProgramBySlug(
  slug: string,
): Promise<AcademyProgram | undefined> {
  if (getAcademyContentSource() === "local") {
    return getLocalProgramBySlug(slug);
  }

  const doc = await fetchSanityData<SanityAcademyProgramDoc>(
    academyProgramBySlugQuery,
    { slug },
    { tags: academyProgramTag(slug) },
  );
  if (!doc) {
    return getLocalProgramBySlug(slug);
  }
  return mapSanityAcademyProgram(doc) ?? getLocalProgramBySlug(slug);
}

export async function getAcademyProgramCards(): Promise<readonly ProgramCard[]> {
  if (getAcademyContentSource() === "local") {
    return localProgramCards;
  }

  const docs = await fetchSanityData<SanityAcademyProgramDoc[]>(
    academyProgramsQuery,
    {},
    { tags: academyProgramTag() },
  );
  if (!docs?.length) {
    return localProgramCards;
  }

  const cards = docs
    .map((doc) => {
      const program = mapSanityAcademyProgram(doc);
      if (!program || program.status !== "active") return null;
      return mapSanityProgramCard(program, {
        suitedFor: doc.cardSuitedFor,
        practicalFocus: doc.cardPracticalFocus,
        mayBuild: doc.cardMayBuild,
      });
    })
    .filter((card): card is ProgramCard => card !== null);

  return cards.length > 0 ? cards : localProgramCards;
}

export async function getAcademyProgramSlugs(): Promise<string[]> {
  const programs = await getActiveAcademyPrograms();
  return programs.map((program) => program.slug);
}
