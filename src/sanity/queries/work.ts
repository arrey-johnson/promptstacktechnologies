import { defineQuery } from "next-sanity";

const caseStudyFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  contentType,
  clientName,
  clientPermissionConfirmed,
  industry,
  category,
  featured,
  sortOrder,
  summary,
  businessProblem,
  whyItMattered,
  approach,
  solution,
  implementation,
  outcome,
  outcomeMetrics[]{ label, value, verificationNote },
  services,
  technologies,
  heroImage,
  gallery[]{ ..., alt },
  testimonial,
  "relatedSlugs": relatedWork[]->slug.current,
  completedAt,
  seo
`;

export const caseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(featured desc, sortOrder asc, title asc) {
    ${caseStudyFields}
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ${caseStudyFields}
  }
`);

export const caseStudySlugsQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }
`);

export const caseStudiesByCategoryQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current) && (category == $category || category == "multi-disciplinary")]
  | order(featured desc, sortOrder asc, title asc) {
    ${caseStudyFields}
  }
`);

export const homepageCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]
  | order(featured desc, sortOrder asc, title asc)[0...4] {
    ${caseStudyFields}
  }
`);
