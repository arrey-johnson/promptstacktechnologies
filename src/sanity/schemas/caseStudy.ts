import { defineArrayMember, defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "proof", title: "Proof" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contentType",
      title: "Content type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Client case study", value: "client-case-study" },
          { title: "Project", value: "project" },
          { title: "Internal", value: "internal" },
          { title: "Academy", value: "academy" },
        ],
        layout: "radio",
      },
      initialValue: "client-case-study",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      group: "content",
      description: "Leave empty until permission is confirmed.",
    }),
    defineField({
      name: "clientPermissionConfirmed",
      title: "Client identity permission confirmed",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Software Solutions", value: "software" },
          { title: "AI & Automation", value: "ai-automation" },
          { title: "Digital Marketing", value: "digital-marketing" },
          { title: "Multi-disciplinary", value: "multi-disciplinary" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "content",
      description: "Lower numbers appear first among peers.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().min(40).max(400),
    }),
    defineField({
      name: "businessProblem",
      title: "Business problem",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyItMattered",
      title: "Why it mattered",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "implementation",
      title: "Implementation",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 4,
      group: "content",
      description: "Qualitative outcomes are fine when metrics are unavailable.",
    }),
    defineField({
      name: "outcomeMetrics",
      title: "Verified metrics",
      type: "array",
      group: "proof",
      of: [defineArrayMember({ type: "outcomeMetric" })],
      description: "Optional. Only verified numbers.",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !value) {
                return "Provide alt text for the hero image.";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "caseStudyTestimonial",
      group: "proof",
    }),
    defineField({
      name: "relatedWork",
      title: "Related work",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
        }),
      ],
    }),
    defineField({
      name: "completedAt",
      title: "Completed / published date",
      type: "date",
      group: "content",
      description: "Only when factual.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Featured, then sort order",
      name: "featuredSort",
      by: [
        { field: "featured", direction: "desc" },
        { field: "sortOrder", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
