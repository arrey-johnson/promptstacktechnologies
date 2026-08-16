import { defineArrayMember, defineField, defineType } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(8).max(140),
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().min(40).max(280),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Software", value: "software" },
          { title: "AI & Automation", value: "ai-automation" },
          { title: "Digital Growth", value: "digital-growth" },
          { title: "Business Operations", value: "business-operations" },
          { title: "Technology Strategy", value: "technology-strategy" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "insightBody",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
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
                return "Provide alt text for the featured image.";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
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
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
      description: "Optional. Do not invent authors.",
    }),
    defineField({
      name: "relatedInsights",
      title: "Related Insights",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "insight" }],
        }),
      ],
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
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "featuredImage",
    },
  },
});
