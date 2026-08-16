/**
 * Content integrity for CMS-ready placeholders (Work, Insights, etc.).
 *
 * CODE: `isPlaceholder` / TODO_CONTENT markers are fine.
 * DEVELOPMENT / PREVIEW UI: may show placeholders with a clear preview label.
 * PRODUCTION UI: never render fictional projects/articles as real proof.
 */

export type PlaceholderRecord = {
  isPlaceholder: boolean;
};

export type ContentIntegrityEnv = {
  nodeEnv?: string;
  vercelEnv?: string;
};

function readEnv(overrides?: ContentIntegrityEnv): Required<ContentIntegrityEnv> {
  return {
    nodeEnv: overrides?.nodeEnv ?? process.env.NODE_ENV ?? "production",
    vercelEnv: overrides?.vercelEnv ?? process.env.VERCEL_ENV ?? "",
  };
}

/**
 * Whether non-production placeholder records may appear in the rendered UI.
 * Production (including Vercel production) never shows fictional proof.
 * Local development and Vercel preview may show labeled development previews.
 */
export function allowPlaceholderContent(overrides?: ContentIntegrityEnv): boolean {
  const { nodeEnv, vercelEnv } = readEnv(overrides);

  if (vercelEnv === "production") {
    return false;
  }

  if (vercelEnv === "preview" || vercelEnv === "development") {
    return true;
  }

  return nodeEnv !== "production";
}

/** Keep only real (non-placeholder) records for production rendering. */
export function filterPublishableContent<T extends PlaceholderRecord>(
  items: readonly T[],
): T[] {
  return items.filter((item) => !item.isPlaceholder);
}

export function resolveEditorialSet<T extends PlaceholderRecord>(
  featured: T,
  secondary: readonly T[],
  overrides?: ContentIntegrityEnv,
): {
  mode: "preview" | "publishable";
  featured: T | null;
  secondary: T[];
  hasItems: boolean;
} {
  if (allowPlaceholderContent(overrides)) {
    return {
      mode: "preview",
      featured,
      secondary: [...secondary],
      hasItems: true,
    };
  }

  const publishableFeatured = featured.isPlaceholder ? null : featured;
  const publishableSecondary = filterPublishableContent(secondary);

  return {
    mode: "publishable",
    featured: publishableFeatured,
    secondary: publishableSecondary,
    hasItems: Boolean(publishableFeatured) || publishableSecondary.length > 0,
  };
}
