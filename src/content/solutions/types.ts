import type { PlaceholderRecord } from "@/lib/content-integrity";

export type SolutionCta = {
  label: string;
  href: string;
};

export type ProblemSignal = {
  title: string;
  body: string;
};

export type CapabilityItem = {
  title: string;
  body: string;
};

export type UseCaseItem = {
  title: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FlowStep = {
  label: string;
  detail?: string;
};

export type RelatedWorkItem = PlaceholderRecord & {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  href: string;
};

export type SolutionHeroContent = {
  eyebrow: string;
  heading: string;
  supporting: string;
  primaryCta: SolutionCta;
  secondaryCta: SolutionCta;
  visual: "overview" | "software" | "automation" | "marketing";
};
