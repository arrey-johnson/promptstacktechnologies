import { defineField, defineType } from "sanity";

/** Editorial SEO object — never controls operational/security route indexing. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Request noindex (editorial pages only)",
      type: "boolean",
      description:
        "Only affects editorial Work/Insights/Academy pages. Conversion and operational routes remain code-controlled.",
      initialValue: false,
    }),
  ],
});

export const outcomeMetric = defineType({
  name: "outcomeMetric",
  title: "Verified metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "Only publish owner-verified figures. Never invent percentages.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "verificationNote",
      title: "Internal verification note",
      type: "text",
      rows: 2,
      description: "Internal only — not rendered on the public site.",
    }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
});

export const roadmapStage = defineType({
  name: "roadmapStage",
  title: "Learning roadmap stage",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Stage id",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(1),
    }),
  ],
});

export const exampleProjectType = defineType({
  name: "exampleProjectType",
  title: "Example project type",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});

export const workflowTheme = defineType({
  name: "workflowTheme",
  title: "Professional workflow theme",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});

export const caseStudyTestimonial = defineType({
  name: "caseStudyTestimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "person",
      title: "Person",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),
    defineField({
      name: "permissionConfirmed",
      title: "Permission confirmed",
      type: "boolean",
      initialValue: false,
      description: "Do not publish without confirmed permission.",
    }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
});

/** Constrained Portable Text — editorial content only, not a page builder. */
export const insightBody = defineType({
  name: "insightBody",
  title: "Insight body",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto"],
                  }),
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) =>
            rule.required().error("Meaningful images need alt text."),
        }),
      ],
    },
  ],
});
