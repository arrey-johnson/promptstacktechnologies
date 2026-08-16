import type { PlaceholderRecord } from "@/lib/content-integrity";

/**
 * CMS-ready case study / project model (docs/09).
 * Fields are optional at render time — UI omits absent values.
 */

export type CaseStudyContentType =
  | "client-case-study"
  | "project"
  | "internal"
  | "academy";

export type CaseStudyCategory =
  | "software"
  | "ai-automation"
  | "digital-marketing"
  | "multi-disciplinary";

export type CaseStudyMetric = {
  label: string;
  /** Only verified metrics may be published. */
  value: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  person: string;
  role?: string;
  organization?: string;
};

export type CaseStudy = PlaceholderRecord & {
  id: string;
  title: string;
  slug: string;
  contentType: CaseStudyContentType;
  /** Omit or null until permission confirmed. */
  clientName: string | null;
  industry: string | null;
  category: CaseStudyCategory;
  categoryLabel: string;
  heroImage: CaseStudyImage | null;
  summary: string;
  businessProblem: string;
  whyItMattered: string | null;
  approach: string | null;
  solution: string;
  implementation: string | null;
  outcome: string | null;
  outcomeMetrics: CaseStudyMetric[];
  services: string[];
  technologies: string[];
  gallery: CaseStudyImage[];
  testimonial: CaseStudyTestimonial | null;
  featured: boolean;
  relatedSlugs: string[];
};

export const caseStudyCategoryLabels: Record<CaseStudyCategory, string> = {
  software: "Software Solutions",
  "ai-automation": "AI & Automation",
  "digital-marketing": "Digital Marketing",
  "multi-disciplinary": "Multi-disciplinary",
};

export function contentTypeLabel(type: CaseStudyContentType): string {
  switch (type) {
    case "client-case-study":
      return "Client case study";
    case "project":
      return "Project";
    case "internal":
      return "Internal Promptstack project";
    case "academy":
      return "Academy project";
    default:
      return "Project";
  }
}
