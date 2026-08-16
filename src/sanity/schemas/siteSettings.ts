import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Verified corporate/site details only.
 * Must NOT control secrets, Turnstile, admissions, brand colors, or nav IA.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "organizationLegalName",
      title: "Organization legal name",
      type: "string",
    }),
    defineField({
      name: "organizationShortDescription",
      title: "Short organization description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerDescriptor",
      title: "Footer descriptor",
      type: "string",
      description: "Optional short line under the company name in the footer.",
    }),
    defineField({
      name: "businessEmail",
      title: "Business email",
      type: "string",
      validation: (rule) =>
        rule.email().warning("Use a verified contact email only."),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address / location",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
      description: "Only verified profiles. Leave empty rather than inventing.",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Open Graph image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
