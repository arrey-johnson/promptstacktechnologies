import type { CaseStudy } from "@/types/case-study";

export const workMeta = {
  title: "Our Work",
  description:
    "See how Promptstack turns business problems into working solutions. Case studies document the problem, approach, solution and outcome behind selected projects.",
} as const;

export const workHero = {
  eyebrow: "Our Work",
  heading: "See how business problems become working solutions.",
  supporting:
    "Promptstack documents selected projects around the problem, the approach, the solution and the outcome — so evidence stays grounded in real work rather than vague claims.",
  primaryCta: { label: "Start a Project", href: "/start-a-project" },
  secondaryCta: { label: "How We Work", href: "/how-we-work" },
} as const;

export const workDocumentation = {
  heading: "How case studies are documented",
  intro:
    "When a project is ready to publish, we present it in a form that helps a business visitor evaluate fit — not as a decorative portfolio tile.",
  steps: [
    {
      title: "Problem",
      body: "What was slowing the business down or limiting growth.",
    },
    {
      title: "Approach",
      body: "How Promptstack understood the need and chose a direction.",
    },
    {
      title: "Solution",
      body: "What was designed, built, automated or activated.",
    },
    {
      title: "Outcome",
      body: "What changed — using verified results only, never invented metrics.",
    },
  ],
} as const;

export const workEmptyState = {
  heading: "Detailed case studies are being prepared",
  body: "We're preparing detailed case studies that show the problem, approach and outcome behind selected Promptstack projects. Until those approved stories are ready, this page remains ready for real evidence — not placeholders presented as proof.",
  primaryCta: { label: "Start a Project", href: "/start-a-project" },
  secondaryCta: { label: "See How We Work", href: "/how-we-work" },
} as const;

export const workCategoriesExplainer = {
  heading: "How work may be categorized",
  intro:
    "When published projects exist, they can be identified clearly so client work, internal products and Academy projects are never blurred.",
  items: [
    "Software Solutions",
    "AI & Automation",
    "Digital Marketing",
    "Multi-disciplinary",
    "Internal Promptstack Project",
    "Academy Project",
  ],
} as const;

export const workCta = {
  heading: "Ready to improve something in your business?",
  subheading: "Tell us what you are trying to improve.",
  body: "You do not need to know the technical solution. Explain the problem, and we will help determine the right approach.",
  cta: { label: "Start a Project", href: "/start-a-project" },
  analyticsId: "cta_work_final",
} as const;

/**
 * TODO_CONTENT: Replace with real CMS CaseStudy documents.
 * Placeholder records are for development/preview listing only.
 * They must never resolve as public /work/[slug] pages in production.
 */
export const workPreviewRecords: CaseStudy[] = [
  {
    id: "preview-operations",
    title: "Business operations system",
    slug: "business-operations-system",
    contentType: "client-case-study",
    clientName: null,
    industry: null,
    category: "software",
    categoryLabel: "Software Solutions",
    heroImage: null,
    summary:
      "Software shaped around day-to-day operational workflows that previously depended on spreadsheets and manual coordination.",
    businessProblem:
      "Important processes still depended on spreadsheets, repeated entry and manual coordination.",
    whyItMattered:
      "Teams lacked a shared source of truth, which slowed decisions and created avoidable errors.",
    approach:
      "Map the real workflow first, then design software around how the business actually operates.",
    solution:
      "A practical operations system shaped around the team's process rather than forcing a generic tool onto the work.",
    implementation: null,
    outcome: null,
    outcomeMetrics: [],
    services: ["Custom Software Development", "Business Management Systems"],
    technologies: [],
    gallery: [],
    testimonial: null,
    featured: true,
    relatedSlugs: [],
    isPlaceholder: true,
  },
  {
    id: "preview-automation",
    title: "Workflow automation engagement",
    slug: "workflow-automation-engagement",
    contentType: "project",
    clientName: null,
    industry: null,
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    heroImage: null,
    summary:
      "Practical automation that reduces repetitive follow-up and keeps handoffs moving between systems and people.",
    businessProblem:
      "Teams spent valuable time on repetitive follow-up and predictable administrative handoffs.",
    whyItMattered: null,
    approach: null,
    solution:
      "Automation designed around clear rules, system connections and human review where judgment is required.",
    implementation: null,
    outcome: null,
    outcomeMetrics: [],
    services: ["Business Process Automation", "Workflow Automation"],
    technologies: [],
    gallery: [],
    testimonial: null,
    featured: false,
    relatedSlugs: [],
    isPlaceholder: true,
  },
];
