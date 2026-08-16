export type AcademyCta = {
  label: string;
  href: string;
};

export type AcademyFaqItem = {
  question: string;
  answer: string;
};

export type RoadmapStage = {
  id: string;
  title: string;
  summary: string;
  items: readonly string[];
};

export type ExampleProjectType = {
  title: string;
  body: string;
};

export type WorkflowTheme = {
  title: string;
  body: string;
};

/**
 * Typed Academy program model aligned with future Sanity `AcademyProgram`.
 * Unknown operational fields remain null/undefined and must render gracefully.
 */
export type AcademyProgram = {
  title: string;
  slug: "software-engineering" | "artificial-intelligence" | "cybersecurity";
  status: "active" | "upcoming" | "paused" | "archived";
  /** Concise program page H1 */
  heroHeading: string;
  shortPromise: string;
  overview: string;
  audience: string;
  /** Confirmed level only — omit fabrication. */
  level?: string | null;
  prerequisites: readonly string[];
  outcomes: readonly string[];
  learningRoadmap: readonly RoadmapStage[];
  /** Practical emphasis — not a laundry list of tools as the value proposition. */
  practicalSkills: readonly string[];
  technologies?: readonly string[] | null;
  projects: readonly ExampleProjectType[];
  teachingMethod: string;
  professionalWorkflows: readonly WorkflowTheme[];
  demonstrableOutcomes: readonly string[];
  format?: string | null;
  duration?: string | null;
  scheduleText?: string | null;
  feeText?: string | null;
  cohortText?: string | null;
  applicationOpen?: boolean | null;
  faq: readonly AcademyFaqItem[];
  seo: {
    title: string;
    description: string;
  };
  /** Visual treatment key for program differentiation. */
  visual: "software" | "ai" | "cybersecurity";
  whoFor: {
    heading: string;
    intro: string;
    items: readonly string[];
  };
};

export type ProgramCard = {
  slug: AcademyProgram["slug"];
  title: string;
  shortPromise: string;
  suitedFor: string;
  practicalFocus: string;
  mayBuild: string;
  href: string;
};
