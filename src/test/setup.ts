/**
 * Vitest setup — isolate tests from developer .env.local / shell leakage.
 * Tests that need Sanity or Academy CMS must set env explicitly inside the test.
 */

const CLEAR_KEYS = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "SANITY_API_READ_TOKEN",
  "SANITY_API_WRITE_TOKEN",
  "SANITY_PREVIEW_SECRET",
  "DRAFT_MODE_SECRET",
  "SANITY_REVALIDATE_SECRET",
  "ACADEMY_CONTENT_SOURCE",
  "INSIGHTS_DEV_FIXTURES",
  "NEXT_PUBLIC_GTM_ID",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "ACADEMY_APPLICATIONS_ENABLED",
] as const;

for (const key of CLEAR_KEYS) {
  delete process.env[key];
}

// Stable public URL for metadata/sitemap tests unless a test overrides.
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
}
