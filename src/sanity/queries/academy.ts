import { defineQuery } from "next-sanity";

const academyProgramFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  status,
  heroHeading,
  shortPromise,
  overview,
  audience,
  level,
  visual,
  whoForHeading,
  whoForIntro,
  whoForItems,
  prerequisites,
  outcomes,
  learningRoadmap[]{ id, title, summary, items },
  practicalSkills,
  technologies,
  projects[]{ title, body },
  teachingMethod,
  professionalWorkflows[]{ title, body },
  demonstrableOutcomes,
  format,
  duration,
  scheduleText,
  feeText,
  cohortText,
  faq[]{ question, answer },
  featured,
  cardSuitedFor,
  cardPracticalFocus,
  cardMayBuild,
  seo
`;

export const academyProgramsQuery = defineQuery(`
  *[_type == "academyProgram" && defined(slug.current)] | order(title asc) {
    ${academyProgramFields}
  }
`);

export const academyProgramBySlugQuery = defineQuery(`
  *[_type == "academyProgram" && slug.current == $slug][0] {
    ${academyProgramFields}
  }
`);
