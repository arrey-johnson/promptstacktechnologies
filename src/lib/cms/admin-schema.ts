import type { CmsCollection } from "./types";

export type FieldType =
  | "text"
  | "textarea"
  | "boolean"
  | "image"
  | "stringList"
  | "link"
  | "cta"
  | "featureList"
  | "linkList"
  | "object"
  | "objectList";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  /** Nested fields for object / objectList / link / cta */
  fields?: FieldDef[];
  /** Label for one item in a list */
  itemLabel?: string;
  /** Placeholder when adding a new list item */
  newItem?: () => unknown;
};

export type ObjectSchema = {
  kind: "object";
  sections: Array<{
    id: string;
    label: string;
    description?: string;
    fields: FieldDef[];
  }>;
};

export type ListSchema = {
  kind: "list";
  itemLabel: string;
  /** Field keys used for the card title / subtitle in the list view */
  titleKey: string;
  subtitleKey?: string;
  newItem: () => Record<string, unknown>;
  fields: FieldDef[];
};

export type CollectionSchema = ObjectSchema | ListSchema;

const linkFields: FieldDef[] = [
  { key: "label", label: "Label", type: "text" },
  { key: "href", label: "Link URL", type: "text", help: "Example: /about or https://…" },
];

const ctaFields: FieldDef[] = [
  { key: "label", label: "Button text", type: "text" },
  { key: "href", label: "Button link", type: "text" },
];

const featureFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "body", label: "Description", type: "textarea" },
];

const processStepFields: FieldDef[] = [
  { key: "title", label: "Step title", type: "text" },
  { key: "body", label: "Step description", type: "textarea" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

export const ADMIN_SCHEMAS: Record<CmsCollection, CollectionSchema> = {
  settings: {
    kind: "object",
    sections: [
      {
        id: "basics",
        label: "Site basics",
        description: "Name and contact details shown across the site.",
        fields: [
          { key: "siteName", label: "Site name", type: "text" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "contactEmail", label: "Contact email", type: "text" },
          { key: "phone", label: "Phone", type: "text" },
          { key: "location", label: "Location", type: "text" },
        ],
      },
      {
        id: "seo",
        label: "Search / SEO",
        fields: [
          {
            key: "seo",
            label: "SEO",
            type: "object",
            fields: [
              { key: "title", label: "Default page title", type: "text" },
              { key: "description", label: "Default description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "cta",
        label: "Header button",
        fields: [
          { key: "cta", label: "Header CTA", type: "cta", fields: ctaFields },
        ],
      },
      {
        id: "nav",
        label: "Main navigation",
        fields: [
          {
            key: "nav",
            label: "Menu links",
            type: "linkList",
            itemLabel: "Menu link",
            fields: linkFields,
            newItem: () => ({ label: "New link", href: "/" }),
          },
        ],
      },
      {
        id: "footer",
        label: "Footer",
        fields: [
          {
            key: "footerColumns",
            label: "Footer columns",
            type: "objectList",
            itemLabel: "Column",
            newItem: () => ({ title: "New column", links: [] }),
            fields: [
              { key: "title", label: "Column title", type: "text" },
              {
                key: "links",
                label: "Links",
                type: "linkList",
                itemLabel: "Link",
                fields: linkFields,
                newItem: () => ({ label: "Link", href: "/" }),
              },
            ],
          },
          {
            key: "socials",
            label: "Social links",
            type: "linkList",
            itemLabel: "Social link",
            fields: linkFields,
            newItem: () => ({ label: "LinkedIn", href: "https://" }),
          },
        ],
      },
      {
        id: "newsletter",
        label: "Newsletter",
        fields: [
          {
            key: "newsletter",
            label: "Newsletter block",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "consent", label: "Consent text", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },

  home: {
    kind: "object",
    sections: [
      {
        id: "hero",
        label: "Hero",
        description: "The first thing visitors see on the homepage.",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label above headline", type: "text" },
              { key: "heading", label: "Headline", type: "textarea" },
              {
                key: "accentWords",
                label: "Highlighted words",
                type: "stringList",
                help: "Words in the headline that should stand out.",
                itemLabel: "Word",
                newItem: () => "",
              },
              { key: "supporting", label: "Supporting sentence", type: "textarea" },
              { key: "primaryCta", label: "Primary button", type: "cta", fields: ctaFields },
              { key: "secondaryCta", label: "Secondary button", type: "cta", fields: ctaFields },
              { key: "videoSrc", label: "Hero video URL", type: "text" },
            ],
          },
        ],
      },
      {
        id: "servicesIntro",
        label: "Services intro",
        fields: [
          {
            key: "servicesIntro",
            label: "Services intro",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "portfolioTeaser",
        label: "Portfolio teaser",
        fields: [
          {
            key: "portfolioTeaser",
            label: "Portfolio teaser",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "cta", label: "Button", type: "cta", fields: ctaFields },
            ],
          },
        ],
      },
      {
        id: "partners",
        label: "Partners",
        fields: [
          {
            key: "partners",
            label: "Partners",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              {
                key: "items",
                label: "Partner logos",
                type: "objectList",
                itemLabel: "Partner",
                newItem: () => ({ name: "Partner", logoSrc: "/brand/" }),
                fields: [
                  { key: "name", label: "Name", type: "text" },
                  { key: "logoSrc", label: "Logo image path", type: "image" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "process",
        label: "Process",
        fields: [
          {
            key: "process",
            label: "Process",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              {
                key: "steps",
                label: "Steps",
                type: "objectList",
                itemLabel: "Step",
                fields: processStepFields,
                newItem: () => ({ title: "New step", body: "" }),
              },
            ],
          },
        ],
      },
      {
        id: "purpose",
        label: "Purpose / brief",
        fields: [
          {
            key: "purpose",
            label: "Purpose",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              {
                key: "body",
                label: "Paragraphs",
                type: "stringList",
                itemLabel: "Paragraph",
                newItem: () => "",
              },
            ],
          },
        ],
      },
      {
        id: "whyUs",
        label: "Why Promptstack / fit",
        fields: [
          {
            key: "whyUs",
            label: "Why us",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              {
                key: "items",
                label: "Points",
                type: "featureList",
                itemLabel: "Point",
                fields: featureFields,
                newItem: () => ({ title: "New point", body: "" }),
              },
            ],
          },
        ],
      },
      {
        id: "productsTeaser",
        label: "Products teaser",
        fields: [
          {
            key: "productsTeaser",
            label: "Products teaser",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "aboutTeaser",
        label: "About teaser",
        fields: [
          {
            key: "aboutTeaser",
            label: "About teaser",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              {
                key: "body",
                label: "Paragraphs",
                type: "stringList",
                itemLabel: "Paragraph",
                newItem: () => "",
              },
            ],
          },
        ],
      },
      {
        id: "finalCta",
        label: "Final call to action",
        fields: [
          {
            key: "finalCta",
            label: "Final CTA",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "cta", label: "Button", type: "cta", fields: ctaFields },
              { key: "imageSrc", label: "Background image", type: "image" },
            ],
          },
        ],
      },
    ],
  },

  about: {
    kind: "object",
    sections: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Headline", type: "textarea" },
              { key: "body", label: "Intro text", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "story",
        label: "Why we exist",
        fields: [
          {
            key: "story",
            label: "Story",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              {
                key: "body",
                label: "Paragraphs",
                type: "stringList",
                itemLabel: "Paragraph",
                newItem: () => "",
              },
            ],
          },
        ],
      },
      {
        id: "vision",
        label: "Our vision",
        fields: [
          {
            key: "vision",
            label: "Vision",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              {
                key: "body",
                label: "Paragraphs",
                type: "stringList",
                itemLabel: "Paragraph",
                newItem: () => "",
              },
            ],
          },
        ],
      },
      {
        id: "howWeWin",
        label: "How we intend to succeed",
        fields: [
          {
            key: "howWeWin",
            label: "How we win",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Intro", type: "textarea" },
              {
                key: "items",
                label: "Points",
                type: "featureList",
                itemLabel: "Point",
                fields: featureFields,
                newItem: () => ({ title: "New point", body: "" }),
              },
            ],
          },
        ],
      },
      {
        id: "values",
        label: "Standards / values",
        fields: [
          {
            key: "values",
            label: "Values",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              {
                key: "items",
                label: "Values",
                type: "featureList",
                itemLabel: "Value",
                fields: featureFields,
                newItem: () => ({ title: "New value", body: "" }),
              },
            ],
          },
        ],
      },
      {
        id: "ceoWord",
        label: "Word from the CEO",
        description: "Hidden on the site for now, but you can still edit the copy here.",
        fields: [
          {
            key: "ceoWord",
            label: "CEO word",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "quote", label: "Quote", type: "textarea" },
              { key: "name", label: "Name", type: "text" },
              { key: "role", label: "Role", type: "text" },
              { key: "credentials", label: "Credentials", type: "textarea" },
              { key: "imageSrc", label: "Photo", type: "image" },
              { key: "imageAlt", label: "Photo description", type: "text" },
            ],
          },
        ],
      },
      {
        id: "teamIntro",
        label: "Team intro",
        fields: [
          {
            key: "teamIntro",
            label: "Team intro",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "capabilities",
        label: "What we deliver",
        fields: [
          {
            key: "capabilities",
            label: "Capabilities",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              {
                key: "items",
                label: "Items",
                type: "featureList",
                itemLabel: "Item",
                fields: featureFields,
                newItem: () => ({ title: "New item", body: "" }),
              },
            ],
          },
        ],
      },
      {
        id: "contactBand",
        label: "Contact band",
        fields: [
          {
            key: "contactBand",
            label: "Contact band",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },

  servicesPage: {
    kind: "object",
    sections: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "cta",
        label: "Call to action",
        fields: [
          {
            key: "cta",
            label: "CTA",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "cta", label: "Button", type: "cta", fields: ctaFields },
            ],
          },
        ],
      },
    ],
  },

  productsPage: {
    kind: "object",
    sections: [
      {
        id: "main",
        label: "Products page",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
          { key: "emptyState", label: "Empty-state message", type: "textarea" },
        ],
      },
    ],
  },

  portfolioPage: {
    kind: "object",
    sections: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "primaryCta", label: "Primary button", type: "cta", fields: ctaFields },
              { key: "secondaryCta", label: "Secondary button", type: "cta", fields: ctaFields },
              { key: "imageSrc", label: "Hero image", type: "image" },
            ],
          },
        ],
      },
      {
        id: "grid",
        label: "Project grid",
        fields: [
          {
            key: "grid",
            label: "Grid intro",
            type: "object",
            fields: [
              { key: "eyebrow", label: "Small label", type: "text" },
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "cta",
        label: "Call to action",
        fields: [
          {
            key: "cta",
            label: "CTA",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "cta", label: "Button", type: "cta", fields: ctaFields },
            ],
          },
          { key: "emptyState", label: "Empty-state message", type: "textarea" },
        ],
      },
    ],
  },

  careersPage: {
    kind: "object",
    sections: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "imageSrc", label: "Background image", type: "image" },
            ],
          },
        ],
      },
      {
        id: "whyJoin",
        label: "Why join",
        fields: [
          {
            key: "whyJoin",
            label: "Why join",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              {
                key: "items",
                label: "Bullet points",
                type: "stringList",
                itemLabel: "Point",
                newItem: () => "",
              },
            ],
          },
        ],
      },
      {
        id: "roles",
        label: "Open roles section",
        fields: [
          { key: "openRolesHeading", label: "Open roles heading", type: "text" },
          { key: "emptyState", label: "No roles message", type: "textarea" },
          {
            key: "alert",
            label: "Email alert box",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },

  contact: {
    kind: "object",
    sections: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          {
            key: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "body", label: "Description", type: "textarea" },
              { key: "imageSrc", label: "Background image", type: "image" },
            ],
          },
        ],
      },
      {
        id: "form",
        label: "Contact form",
        fields: [
          {
            key: "intents",
            label: "Subject options",
            type: "stringList",
            itemLabel: "Option",
            help: "Choices shown in the subject dropdown.",
            newItem: () => "New subject",
          },
          {
            key: "formLabels",
            label: "Form labels",
            type: "object",
            fields: [
              { key: "name", label: "Name field label", type: "text" },
              { key: "email", label: "Email field label", type: "text" },
              { key: "phone", label: "Phone field label", type: "text" },
              { key: "subject", label: "Subject field label", type: "text" },
              { key: "message", label: "Message field label", type: "text" },
              { key: "consent", label: "Consent text", type: "textarea" },
              { key: "submit", label: "Submit button text", type: "text" },
            ],
          },
        ],
      },
    ],
  },

  serviceItems: {
    kind: "list",
    itemLabel: "Service",
    titleKey: "name",
    subtitleKey: "summary",
    newItem: () => ({
      id: uid("service"),
      name: "New service",
      summary: "",
      body: "",
      detailBody: "",
      details: [],
      problem: "",
      process: [],
      modules: [],
      courses: [],
      feeNote: "",
      outcomes: [],
      audience: "",
      faqs: [],
      href: "/services",
      imageSrc: "",
      imageAlt: "",
    }),
    fields: [
      { key: "name", label: "Service name", type: "text" },
      { key: "summary", label: "Short summary (cards)", type: "textarea" },
      { key: "body", label: "Short body", type: "textarea" },
      { key: "detailBody", label: "Longer detail page text", type: "textarea" },
      { key: "problem", label: "Problem we solve", type: "textarea" },
      { key: "audience", label: "Who it’s for", type: "textarea" },
      { key: "href", label: "Page link", type: "text", help: "Example: /services/academy" },
      { key: "imageSrc", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image description", type: "text" },
      {
        key: "details",
        label: "Bullet highlights",
        type: "stringList",
        itemLabel: "Highlight",
        newItem: () => "",
      },
      {
        key: "process",
        label: "How it works",
        type: "featureList",
        itemLabel: "Step",
        fields: featureFields,
        newItem: () => ({ title: "Step", body: "" }),
      },
      {
        key: "modules",
        label: "Modules / deeper blocks",
        type: "featureList",
        itemLabel: "Module",
        fields: featureFields,
        newItem: () => ({ title: "Module", body: "" }),
      },
      {
        key: "outcomes",
        label: "Outcomes",
        type: "stringList",
        itemLabel: "Outcome",
        newItem: () => "",
      },
      {
        key: "faqs",
        label: "FAQs",
        type: "featureList",
        itemLabel: "FAQ",
        fields: [
          { key: "title", label: "Question", type: "text" },
          { key: "body", label: "Answer", type: "textarea" },
        ],
        newItem: () => ({ title: "Question?", body: "" }),
      },
      {
        key: "courses",
        label: "Academy courses",
        type: "objectList",
        itemLabel: "Course",
        help: "Used mainly for Academy (fees + curriculum).",
        newItem: () => ({
          id: uid("course"),
          name: "New course",
          fee: "",
          duration: "",
          summary: "",
          curriculum: [],
          outcomes: [],
        }),
        fields: [
          { key: "name", label: "Course name", type: "text" },
          { key: "fee", label: "Fee", type: "text", help: "Example: 250,000 FCFA" },
          { key: "duration", label: "Duration", type: "text" },
          { key: "summary", label: "Summary", type: "textarea" },
          {
            key: "curriculum",
            label: "Curriculum topics",
            type: "stringList",
            itemLabel: "Topic",
            newItem: () => "",
          },
          {
            key: "outcomes",
            label: "Course outcomes",
            type: "stringList",
            itemLabel: "Outcome",
            newItem: () => "",
          },
        ],
      },
      { key: "feeNote", label: "Fee note", type: "textarea" },
      {
        key: "id",
        label: "Internal ID",
        type: "text",
        help: "Leave as-is unless you know what you’re doing.",
      },
    ],
  },

  products: {
    kind: "list",
    itemLabel: "Product",
    titleKey: "name",
    subtitleKey: "summary",
    newItem: () => {
      const name = "New product";
      return {
        id: uid("product"),
        slug: slugify(name),
        name,
        status: "Coming soon",
        summary: "",
        body: "",
        ctaLabel: "Learn more",
      };
    },
    fields: [
      { key: "name", label: "Product name", type: "text" },
      { key: "slug", label: "URL slug", type: "text" },
      { key: "status", label: "Status", type: "text", help: "Example: Coming soon" },
      { key: "summary", label: "Short summary", type: "textarea" },
      { key: "body", label: "Full description", type: "textarea" },
      { key: "ctaLabel", label: "Button text", type: "text" },
    ],
  },

  portfolioItems: {
    kind: "list",
    itemLabel: "Project",
    titleKey: "title",
    subtitleKey: "category",
    newItem: () => {
      const title = "New project";
      return {
        id: uid("project"),
        slug: slugify(title),
        title,
        category: "Web",
        imageSrc: "/brand/",
        imageAlt: title,
        href: "",
      };
    },
    fields: [
      { key: "title", label: "Project title", type: "text" },
      { key: "slug", label: "URL slug", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "imageSrc", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image description", type: "text" },
      { key: "href", label: "External link (optional)", type: "text" },
    ],
  },

  jobs: {
    kind: "list",
    itemLabel: "Job",
    titleKey: "title",
    subtitleKey: "location",
    newItem: () => {
      const title = "New role";
      return {
        id: uid("job"),
        slug: slugify(title),
        title,
        employmentType: "Full-time",
        location: "Douala / Remote",
        workType: "Hybrid",
        summary: "",
        body: "",
        responsibilities: [],
        requirements: [],
        published: false,
      };
    },
    fields: [
      { key: "title", label: "Job title", type: "text" },
      { key: "slug", label: "URL slug", type: "text" },
      { key: "published", label: "Published (visible on site)", type: "boolean" },
      { key: "employmentType", label: "Employment type", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "workType", label: "Work type", type: "text", help: "Example: Hybrid, Remote, On-site" },
      { key: "summary", label: "Short summary", type: "textarea" },
      { key: "body", label: "Full description", type: "textarea" },
      {
        key: "responsibilities",
        label: "Responsibilities",
        type: "stringList",
        itemLabel: "Responsibility",
        newItem: () => "",
      },
      {
        key: "requirements",
        label: "Requirements",
        type: "stringList",
        itemLabel: "Requirement",
        newItem: () => "",
      },
    ],
  },

  team: {
    kind: "list",
    itemLabel: "Team member",
    titleKey: "name",
    subtitleKey: "role",
    newItem: () => ({
      id: uid("team"),
      name: "New team member",
      role: "Role",
      bio: "",
      imageSrc: "",
      imageAlt: "",
      linkedinHref: "",
    }),
    fields: [
      { key: "name", label: "Full name", type: "text" },
      { key: "role", label: "Role / title", type: "text" },
      { key: "bio", label: "Short bio", type: "textarea" },
      { key: "imageSrc", label: "Photo", type: "image", help: "Path like /brand/team/name.jpg" },
      { key: "imageAlt", label: "Photo description", type: "text" },
      { key: "linkedinHref", label: "LinkedIn URL", type: "text" },
    ],
  },

  posts: {
    kind: "list",
    itemLabel: "Post",
    titleKey: "title",
    subtitleKey: "category",
    newItem: () => {
      const title = "New post";
      return {
        id: uid("post"),
        slug: slugify(title),
        title,
        excerpt: "",
        category: "Insights",
        publishedAt: new Date().toISOString().slice(0, 10),
        body: "",
        published: false,
      };
    },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "slug", label: "URL slug", type: "text" },
      { key: "published", label: "Published (visible on site)", type: "boolean" },
      { key: "category", label: "Category", type: "text" },
      { key: "publishedAt", label: "Publish date", type: "text", help: "YYYY-MM-DD" },
      { key: "excerpt", label: "Short excerpt", type: "textarea" },
      { key: "body", label: "Article body", type: "textarea" },
    ],
  },

  legal: {
    kind: "list",
    itemLabel: "Legal page",
    titleKey: "title",
    subtitleKey: "slug",
    newItem: () => ({
      slug: uid("legal"),
      title: "New legal page",
      body: "",
    }),
    fields: [
      { key: "title", label: "Page title", type: "text" },
      { key: "slug", label: "URL slug", type: "text", help: "Example: privacy" },
      { key: "body", label: "Page content", type: "textarea" },
    ],
  },
};
