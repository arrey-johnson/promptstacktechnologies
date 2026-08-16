import { artificialIntelligenceProgram } from "./artificial-intelligence";
import { cybersecurityProgram } from "./cybersecurity";
import { softwareEngineeringProgram } from "./software-engineering";
import type { AcademyProgram, ProgramCard } from "./types";

export const academyProgramsMeta = {
  title: "Academy Programs",
  description:
    "Compare Promptstack Academy programs in Software Engineering, Artificial Intelligence and Cybersecurity — practical paths built around Learn · Build · Ship.",
  path: "/academy/programs",
} as const;

export const academyProgramsIndex = {
  eyebrow: "Programs",
  heading: "Choose a practical learning path",
  supporting:
    "Each program helps learners develop capability through structured learning, projects and professional workflows. Explore the path that matches the work you want to become able to do.",
} as const;

const activePrograms = [
  softwareEngineeringProgram,
  artificialIntelligenceProgram,
  cybersecurityProgram,
] as const satisfies readonly AcademyProgram[];

export function getActiveAcademyPrograms(): readonly AcademyProgram[] {
  return activePrograms.filter((program) => program.status === "active");
}

export function getAcademyProgramBySlug(
  slug: string,
): AcademyProgram | undefined {
  return activePrograms.find((program) => program.slug === slug);
}

export const academyProgramSlugs = activePrograms.map(
  (program) => program.slug,
);

export const programCards: readonly ProgramCard[] = [
  {
    slug: "software-engineering",
    title: softwareEngineeringProgram.title,
    shortPromise: softwareEngineeringProgram.shortPromise,
    suitedFor:
      "Learners who want to design, build, test and ship software they can demonstrate.",
    practicalFocus:
      "Capability progression from foundations through application development and delivery workflows.",
    mayBuild:
      "Web tools, data-backed interfaces and collaborative software projects.",
    href: "/academy/programs/software-engineering",
  },
  {
    slug: "artificial-intelligence",
    title: artificialIntelligenceProgram.title,
    shortPromise: artificialIntelligenceProgram.shortPromise,
    suitedFor:
      "Learners who want practical AI capability grounded in judgement and responsibility.",
    practicalFocus:
      "Understanding AI systems, disciplined tool use and building useful AI-powered solutions.",
    mayBuild:
      "AI-assisted workflows, constrained assistants and applied AI project features.",
    href: "/academy/programs/artificial-intelligence",
  },
  {
    slug: "cybersecurity",
    title: cybersecurityProgram.title,
    shortPromise: cybersecurityProgram.shortPromise,
    suitedFor:
      "Learners who want defensive cybersecurity foundations with professional discipline.",
    practicalFocus:
      "Systems, risk awareness, defensive labs and clear security communication.",
    mayBuild:
      "Documented defensive labs, configuration reviews and professional security exercises.",
    href: "/academy/programs/cybersecurity",
  },
];
