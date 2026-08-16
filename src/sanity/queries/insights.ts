import { defineQuery } from "next-sanity";

export const homepageInsightsQuery = defineQuery(`
  *[_type == "insight" && defined(slug.current) && defined(publishedAt)]
  | order(featured desc, publishedAt desc)[0...4] {
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

export const insightSlugsQuery = defineQuery(`
  *[_type == "insight" && defined(slug.current) && defined(publishedAt)]{
    "slug": slug.current
  }
`);
