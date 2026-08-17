/**
 * Insights editorial copy + development-only visual fixtures.
 *
 * Fixtures are NEVER Sanity documents and must never render in production.
 */

import type { InsightArticle, InsightListItem } from "@/types/insight";

export const insightsIndexCopy = {
  eyebrow: "Insights",
  heading:
    "Practical thinking for businesses using technology to improve how they work and grow.",
  supporting:
    "Explore perspectives on software, artificial intelligence, automation, digital growth and the operational decisions behind better business systems.",
} as const;

export const insightsEmptyState = {
  heading: "Insights are being prepared",
  body: "Promptstack will publish practical perspectives on software, AI, automation, digital growth and business operations — focused on what businesses should understand, decide or improve.",
  primaryCta: { label: "Explore Solutions", href: "/solutions" },
  secondaryCta: { label: "How We Work", href: "/how-we-work" },
  tertiaryCta: { label: "Start a Project", href: "/start-a-project" },
} as const;

export const insightsDevFixtureNotice =
  "Development preview — not published Promptstack Insights." as const;

const fixtureBodyBase = [
  {
    _type: "block",
    _key: "p1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "This development preview article exists only so the Insights layouts can be reviewed before real editorial content is published. It is not a Promptstack Insight.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "h2a",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s2",
        text: "What this preview is for",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "p2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s3",
        text: "Use this page to inspect typography, heading rhythm, lists, quotes and commercial bridges. Production visitors never see these fixtures.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "h3a",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s4",
        text: "Checklist for visual review",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "li1",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s5",
        text: "Comfortable reading measure on desktop",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "li2",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s6",
        text: "Clear H2 and H3 spacing",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "li3",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s7",
        text: "Restrained blockquote treatment",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "li4",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s8",
        text: "Safe link styling for internal and external destinations",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "q1",
    style: "blockquote",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s9",
        text: "Content first. The quote style should support reading, not compete with it.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "p3",
    style: "normal",
    markDefs: [
      {
        _type: "link",
        _key: "link1",
        href: "/solutions",
      },
      {
        _type: "link",
        _key: "link2",
        href: "https://example.com",
      },
    ],
    children: [
      {
        _type: "span",
        _key: "s10",
        text: "Internal example: ",
        marks: [],
      },
      {
        _type: "span",
        _key: "s11",
        text: "Explore Solutions",
        marks: ["link1"],
      },
      {
        _type: "span",
        _key: "s12",
        text: ". External example: ",
        marks: [],
      },
      {
        _type: "span",
        _key: "s13",
        text: "example.com",
        marks: ["link2"],
      },
      {
        _type: "span",
        _key: "s14",
        text: ".",
        marks: [],
      },
    ],
  },
] as const;

function fixtureArticle(partial: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: InsightListItem["category"];
  categoryLabel: string;
  featured?: boolean;
  publishedAt: string;
}): InsightArticle {
  return {
    id: partial.id,
    slug: partial.slug,
    href: `/insights/${partial.slug}`,
    title: partial.title,
    excerpt: partial.excerpt,
    category: partial.category,
    categoryLabel: partial.categoryLabel,
    publishedAt: partial.publishedAt,
    featured: partial.featured ?? false,
    author: null,
    imageSrc: null,
    imageAlt: partial.title,
    isDevelopmentFixture: true,
    body: [...fixtureBodyBase],
    relatedSlugs: [],
    seo: {
      metaTitle: null,
      metaDescription: null,
      ogImageSrc: null,
      noIndex: true,
    },
  };
}

/**
 * Obviously generic development fixtures for layout review only.
 * Titles intentionally signal they are not published Promptstack articles.
 */
export const insightsDevFixtures: InsightArticle[] = [
  fixtureArticle({
    id: "dev-fixture-featured",
    slug: "development-preview-featured-operations",
    title: "Development Preview: Business Operations Article",
    excerpt:
      "A labeled development fixture used to review the featured Insight composition, category treatment and listing rhythm before real articles exist.",
    category: "business-operations",
    categoryLabel: "Business Operations",
    featured: true,
    publishedAt: "2026-01-15T10:00:00.000Z",
  }),
  fixtureArticle({
    id: "dev-fixture-software",
    slug: "development-preview-software-systems",
    title: "Development Preview: Software Systems Article",
    excerpt:
      "A labeled development fixture for reviewing Software category filtering and article-detail typography without inventing Promptstack content.",
    category: "software",
    categoryLabel: "Software",
    publishedAt: "2026-01-12T10:00:00.000Z",
  }),
  fixtureArticle({
    id: "dev-fixture-ai",
    slug: "development-preview-ai-automation",
    title: "Development Preview: AI & Automation Article",
    excerpt:
      "A labeled development fixture for reviewing AI & Automation category presentation and related-insight placement.",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    publishedAt: "2026-01-10T10:00:00.000Z",
  }),
  fixtureArticle({
    id: "dev-fixture-growth",
    slug: "development-preview-digital-growth",
    title: "Development Preview: Digital Growth Article",
    excerpt:
      "A labeled development fixture for reviewing Digital Growth listing cards and the commercial bridge after the article.",
    category: "digital-growth",
    categoryLabel: "Digital Growth",
    publishedAt: "2026-01-08T10:00:00.000Z",
  }),
  fixtureArticle({
    id: "dev-fixture-strategy",
    slug: "development-preview-technology-strategy",
    title: "Development Preview: Technology Strategy Article",
    excerpt:
      "A labeled development fixture for reviewing Technology Strategy metadata, long titles and no-image article layouts.",
    category: "technology-strategy",
    categoryLabel: "Technology Strategy",
    publishedAt: "2026-01-05T10:00:00.000Z",
  }),
];

export function insightListItemFromArticle(
  article: InsightArticle,
): InsightListItem {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    href: article.href,
    excerpt: article.excerpt,
    category: article.category,
    categoryLabel: article.categoryLabel,
    publishedAt: article.publishedAt,
    featured: article.featured,
    author: article.author,
    imageSrc: article.imageSrc,
    imageAlt: article.imageAlt,
    isDevelopmentFixture: article.isDevelopmentFixture,
  };
}
