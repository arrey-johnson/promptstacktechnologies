import { defineQuery } from "next-sanity";

const insightListProjection = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  featured,
  featuredImage,
  publishedAt,
  author,
  seo
`;

export const homepageInsightsQuery = defineQuery(`
  *[_type == "insight" && defined(slug.current) && defined(publishedAt)]
  | order(featured desc, publishedAt desc)[0...4] {
    ${insightListProjection}
  }
`);

export const insightsIndexQuery = defineQuery(`
  *[_type == "insight" && defined(slug.current) && defined(publishedAt)
    && ($category == "" || category == $category)]
  | order(featured desc, publishedAt desc) {
    ${insightListProjection}
  }
`);

export const featuredInsightQuery = defineQuery(`
  *[_type == "insight" && featured == true && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc)[0] {
    ${insightListProjection}
  }
`);

export const insightBySlugQuery = defineQuery(`
  *[_type == "insight" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    body,
    featuredImage,
    publishedAt,
    featured,
    author,
    "relatedSlugs": relatedInsights[]->slug.current,
    seo
  }
`);

export const insightsBySlugsQuery = defineQuery(`
  *[_type == "insight" && slug.current in $slugs && defined(publishedAt)]
  | order(publishedAt desc) {
    ${insightListProjection}
  }
`);

export const relatedInsightsByCategoryQuery = defineQuery(`
  *[_type == "insight"
    && defined(slug.current)
    && defined(publishedAt)
    && category == $category
    && slug.current != $excludeSlug]
  | order(publishedAt desc)[0...3] {
    ${insightListProjection}
  }
`);

export const insightSlugsQuery = defineQuery(`
  *[_type == "insight" && defined(slug.current) && defined(publishedAt)]{
    "slug": slug.current
  }
`);
