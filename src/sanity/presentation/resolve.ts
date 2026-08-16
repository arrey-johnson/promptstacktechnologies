import type { PresentationPluginOptions } from "sanity/presentation";

/**
 * Presentation / Visual Editing document → URL mapping.
 * Prioritizes Work, Work detail, and Academy programs.
 */
export const presentationResolve: PresentationPluginOptions["resolve"] = {
  locations: {
    caseStudy: {
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Case study",
            href: doc?.slug ? `/work/${doc.slug}` : "/work",
          },
          { title: "Work index", href: "/work" },
        ],
      }),
    },
    insight: {
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Insight",
            href: doc?.slug ? `/insights/${doc.slug}` : "/insights",
          },
          { title: "Homepage Insights", href: "/" },
        ],
      }),
    },
    academyProgram: {
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Program",
            href: doc?.slug
              ? `/academy/programs/${doc.slug}`
              : "/academy/programs",
          },
          { title: "Programs index", href: "/academy/programs" },
        ],
      }),
    },
    siteSettings: {
      select: { title: "organizationLegalName" },
      resolve: () => ({
        locations: [{ title: "Homepage", href: "/" }],
      }),
    },
  },
};
