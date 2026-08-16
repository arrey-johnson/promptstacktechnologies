import { academyProgram } from "./academyProgram";
import { caseStudy } from "./caseStudy";
import { insight } from "./insight";
import {
  caseStudyTestimonial,
  exampleProjectType,
  faqItem,
  insightBody,
  outcomeMetric,
  roadmapStage,
  seo,
  socialLink,
  workflowTheme,
} from "./objects";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Documents
  caseStudy,
  insight,
  academyProgram,
  siteSettings,
  // Objects
  seo,
  outcomeMetric,
  faqItem,
  roadmapStage,
  exampleProjectType,
  workflowTheme,
  caseStudyTestimonial,
  socialLink,
  insightBody,
];
