/**
 * Environment variable validation for the application foundation.
 * Secrets must never use the NEXT_PUBLIC_ prefix.
 */

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
    data: { NEXT_PUBLIC_SITE_URL: siteUrl.replace(/\/$/, "") },
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
