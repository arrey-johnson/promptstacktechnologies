import type { ContentIntegrityEnv } from "@/lib/content-integrity";

/**
 * Explicit development-only Insights visual fixtures.
 *
 * Requires INSIGHTS_DEV_FIXTURES=true AND a non-production environment.
 * Never enables fixtures in production (NODE_ENV or Vercel production).
 */
export function areInsightsDevFixturesEnabled(
  overrides?: ContentIntegrityEnv & { insightsDevFixtures?: string },
): boolean {
  const flag =
    overrides?.insightsDevFixtures ??
    process.env.INSIGHTS_DEV_FIXTURES ??
    "";
  if (flag.trim().toLowerCase() !== "true") {
    return false;
  }

  const nodeEnv = overrides?.nodeEnv ?? process.env.NODE_ENV ?? "production";
  const vercelEnv = overrides?.vercelEnv ?? process.env.VERCEL_ENV ?? "";

  if (vercelEnv === "production") return false;
  if (nodeEnv === "production" && vercelEnv !== "preview") return false;

  return true;
}
