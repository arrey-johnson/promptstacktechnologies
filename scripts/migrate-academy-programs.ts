/**
 * Idempotent migration: approved local Academy programs → Sanity documents.
 *
 * Usage (never auto-run against production):
 *   SANITY_API_WRITE_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   npx tsx scripts/migrate-academy-programs.ts
 *
 * Requirements:
 * - Does not enable applications
 * - Does not fabricate null operational fields
 * - Skips existing documents with the same slug
 */

import { createClient } from "@sanity/client";
import { artificialIntelligenceProgram } from "../src/content/academy/artificial-intelligence";
import { cybersecurityProgram } from "../src/content/academy/cybersecurity";
import { softwareEngineeringProgram } from "../src/content/academy/software-engineering";
import type { AcademyProgram } from "../src/content/academy/types";
import { programCards } from "../src/content/academy/programs";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function toSanityDoc(program: AcademyProgram) {
  const card = programCards.find((item) => item.slug === program.slug);

  return {
    _type: "academyProgram" as const,
    title: program.title,
    slug: { _type: "slug" as const, current: program.slug },
    status: program.status,
    heroHeading: program.heroHeading,
    shortPromise: program.shortPromise,
    overview: program.overview,
    audience: program.audience,
    level: program.level ?? undefined,
    visual: program.visual,
    whoForHeading: program.whoFor.heading,
    whoForIntro: program.whoFor.intro,
    whoForItems: [...program.whoFor.items],
    prerequisites: [...program.prerequisites],
    outcomes: [...program.outcomes],
    learningRoadmap: program.learningRoadmap.map((stage) => ({
      _type: "roadmapStage" as const,
      _key: stage.id,
      id: stage.id,
      title: stage.title,
      summary: stage.summary,
      items: [...stage.items],
    })),
    practicalSkills: [...program.practicalSkills],
    technologies: program.technologies ? [...program.technologies] : undefined,
    projects: program.projects.map((project, index) => ({
      _type: "exampleProjectType" as const,
      _key: `project-${index}`,
      title: project.title,
      body: project.body,
    })),
    teachingMethod: program.teachingMethod,
    professionalWorkflows: program.professionalWorkflows.map((item, index) => ({
      _type: "workflowTheme" as const,
      _key: `workflow-${index}`,
      title: item.title,
      body: item.body,
    })),
    demonstrableOutcomes: [...program.demonstrableOutcomes],
    // Preserve null operational fields as omitted — do not fabricate.
    format: program.format ?? undefined,
    duration: program.duration ?? undefined,
    scheduleText: program.scheduleText ?? undefined,
    feeText: program.feeText ?? undefined,
    cohortText: program.cohortText ?? undefined,
    faq: program.faq.map((item, index) => ({
      _type: "faqItem" as const,
      _key: `faq-${index}`,
      question: item.question,
      answer: item.answer,
    })),
    featured: false,
    cardSuitedFor: card?.suitedFor,
    cardPracticalFocus: card?.practicalFocus,
    cardMayBuild: card?.mayBuild,
    seo: {
      _type: "seo" as const,
      metaTitle: program.seo.title,
      metaDescription: program.seo.description,
      noIndex: false,
    },
  };
}

async function main() {
  const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requireEnv("NEXT_PUBLIC_SANITY_DATASET");
  const token = requireEnv("SANITY_API_WRITE_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01",
    useCdn: false,
  });

  const programs = [
    softwareEngineeringProgram,
    artificialIntelligenceProgram,
    cybersecurityProgram,
  ];

  for (const program of programs) {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "academyProgram" && slug.current == $slug][0]{ _id }`,
      { slug: program.slug },
    );

    if (existing?._id) {
      console.log(`Skip existing: ${program.slug} (${existing._id})`);
      continue;
    }

    const created = await client.create(toSanityDoc(program));
    console.log(`Created: ${program.slug} (${created._id})`);
  }

  console.log("Academy migration complete. Applications were not enabled.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
