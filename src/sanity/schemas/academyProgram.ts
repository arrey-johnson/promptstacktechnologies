import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Academy program editorial content.
 *
 * Admissions availability is NOT controlled here.
 * ACADEMY_APPLICATIONS_ENABLED (application config) remains authoritative.
 * Do not add an applicationOpen field that can bypass operational enablement.
 */
export const academyProgram = defineType({
  name: "academyProgram",
  title: "Academy Program",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "curriculum", title: "Curriculum" },
    { name: "operations", title: "Operational copy" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: {
        source: "title",
        maxLength: 96,
        // Only approved program slugs should be published.
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          const value = slug?.current;
          const allowed = [
            "software-engineering",
            "artificial-intelligence",
            "cybersecurity",
          ];
          if (!value) return "Slug is required.";
          if (!allowed.includes(value)) {
            return `Slug must be one of: ${allowed.join(", ")}`;
          }
          return true;
        }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "overview",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Paused", value: "paused" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "active",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortPromise",
      title: "Short promise",
      type: "text",
      rows: 2,
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "text",
      rows: 3,
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "overview",
      description: "Leave empty when not confirmed.",
    }),
    defineField({
      name: "visual",
      title: "Visual treatment",
      type: "string",
      group: "overview",
      options: {
        list: [
          { title: "Software", value: "software" },
          { title: "AI", value: "ai" },
          { title: "Cybersecurity", value: "cybersecurity" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whoForHeading",
      title: "Who it's for — heading",
      type: "string",
      group: "overview",
    }),
    defineField({
      name: "whoForIntro",
      title: "Who it's for — intro",
      type: "text",
      rows: 3,
      group: "overview",
    }),
    defineField({
      name: "whoForItems",
      title: "Who it's for — items",
      type: "array",
      group: "overview",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "learningRoadmap",
      title: "Learning roadmap",
      type: "array",
      group: "curriculum",
      of: [defineArrayMember({ type: "roadmapStage" })],
    }),
    defineField({
      name: "practicalSkills",
      title: "Practical skills",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
      description: "Optional. Do not invent tool lists as the value proposition.",
    }),
    defineField({
      name: "projects",
      title: "Example project types",
      type: "array",
      group: "curriculum",
      of: [defineArrayMember({ type: "exampleProjectType" })],
    }),
    defineField({
      name: "teachingMethod",
      title: "Teaching method",
      type: "text",
      rows: 4,
      group: "curriculum",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "professionalWorkflows",
      title: "Professional workflows",
      type: "array",
      group: "curriculum",
      of: [defineArrayMember({ type: "workflowTheme" })],
    }),
    defineField({
      name: "demonstrableOutcomes",
      title: "Demonstrable outcomes",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      group: "operations",
      description: "Leave empty when unknown. Do not fabricate.",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "operations",
      description: "Leave empty when unknown. Do not fabricate.",
    }),
    defineField({
      name: "scheduleText",
      title: "Schedule text",
      type: "text",
      rows: 2,
      group: "operations",
      description: "Leave empty when unknown. Do not fabricate.",
    }),
    defineField({
      name: "feeText",
      title: "Fee text",
      type: "text",
      rows: 2,
      group: "operations",
      description: "Leave empty when unknown. Do not fabricate fees.",
    }),
    defineField({
      name: "cohortText",
      title: "Cohort text",
      type: "text",
      rows: 2,
      group: "operations",
      description: "Leave empty when unknown. Do not fabricate cohorts.",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "operations",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "overview",
      initialValue: false,
    }),
    defineField({
      name: "cardSuitedFor",
      title: "Program card — suited for",
      type: "text",
      rows: 2,
      group: "overview",
    }),
    defineField({
      name: "cardPracticalFocus",
      title: "Program card — practical focus",
      type: "text",
      rows: 2,
      group: "overview",
    }),
    defineField({
      name: "cardMayBuild",
      title: "Program card — may build",
      type: "text",
      rows: 2,
      group: "overview",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
