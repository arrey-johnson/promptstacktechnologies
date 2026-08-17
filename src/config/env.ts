/**
 * Environment variable validation for the application foundation.
 * Secrets must never use the NEXT_PUBLIC_ prefix.
 */

export const CANONICAL_PRODUCTION_ORIGIN =
  "https://www.promptstacktechnologies.com";

type EnvResult =
  | { success: true; data: { NEXT_PUBLIC_SITE_URL: string } }
  | { success: false; error: string };

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Normalize Promptstack production hostnames to the canonical https www origin.
 * Prevents sitemap/robots/canonicals from emitting http:// or apex duplicates
 * when NEXT_PUBLIC_SITE_URL is misconfigured.
 */
export function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return trimmed;
  }

  const host = url.hostname.toLowerCase();
  if (
    host === "promptstacktechnologies.com" ||
    host === "www.promptstacktechnologies.com"
  ) {
    return CANONICAL_PRODUCTION_ORIGIN;
  }

  return `${url.protocol}//${url.host}${url.pathname}`.replace(/\/$/, "");
}

/**
 * Validates public environment required for Epic 1 foundation.
 * Later epics will extend this schema when CMS/forms/analytics credentials are wired.
 */
export function getPublicEnv(): EnvResult {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return {
      success: false,
      error:
        "Missing NEXT_PUBLIC_SITE_URL. Copy .env.example to .env.local and set the site URL.",
    };
  }

  if (!isValidHttpUrl(siteUrl)) {
    return {
      success: false,
      error: `NEXT_PUBLIC_SITE_URL must be a valid http(s) URL. Received: ${siteUrl}`,
    };
  }

  return {
    success: true,
    data: { NEXT_PUBLIC_SITE_URL: normalizeSiteUrl(siteUrl) },
  };
}

/** Safe for metadata — falls back to localhost in development only. */
export function getSiteUrl(): string {
  const result = getPublicEnv();
  if (result.success) {
    return result.data.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  throw new Error(result.error);
}
