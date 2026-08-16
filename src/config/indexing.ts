/**
 * Centralized search-indexing policy for Promptstack.
 *
 * Rules:
 * - local development → noindex, nofollow
 * - preview / staging → noindex, nofollow
 * - production → index, follow
 *
 * Do NOT decide from NODE_ENV alone. Vercel preview deployments also run with
 * NODE_ENV=production, so we prefer VERCEL_ENV / explicit SITE_ENV.
 *
 * Fail-safe default: noindex unless the runtime is positively identified as
 * production. This prevents local/preview builds from being indexed and
 * prevents accidental inheritance of development noindex on production only
 * when production signals are absent — production deploys must set
 * VERCEL_ENV=production (automatic on Vercel) or SITE_ENV=production.
 */

export type DeploymentEnvironment =
  | "development"
  | "preview"
  | "staging"
  | "production";

export type IndexingPolicy = {
  environment: DeploymentEnvironment;
  index: boolean;
  follow: boolean;
  /** Short audit trail for logs/tests — not shown to end users. */
  reason: string;
};

type IndexingEnvInput = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  SITE_ENV?: string;
};

function normalize(value: string | undefined): string | undefined {
  const trimmed = value?.trim().toLowerCase();
  return trimmed || undefined;
}

/**
 * Resolve the deployment environment from explicit signals.
 * Order of precedence:
 * 1. SITE_ENV (explicit operator override for any host)
 * 2. VERCEL_ENV (Vercel platform: production | preview | development)
 * 3. NODE_ENV=development → development
 * 4. Otherwise → preview (safe non-production default)
 */
export function resolveDeploymentEnvironment(
  env: IndexingEnvInput = process.env,
): DeploymentEnvironment {
  const siteEnv = normalize(env.SITE_ENV);
  if (
    siteEnv === "production" ||
    siteEnv === "staging" ||
    siteEnv === "preview" ||
    siteEnv === "development"
  ) {
    return siteEnv;
  }

  const vercelEnv = normalize(env.VERCEL_ENV);
  if (vercelEnv === "production") {
    return "production";
  }
  if (vercelEnv === "preview") {
    return "preview";
  }
  if (vercelEnv === "development") {
    return "development";
  }

  if (normalize(env.NODE_ENV) === "development") {
    return "development";
  }

  // NODE_ENV=production without VERCEL_ENV/SITE_ENV (e.g. local `next start`)
  // is treated as non-production so it cannot be indexed by accident.
  return "preview";
}

export function getIndexingPolicy(
  env: IndexingEnvInput = process.env,
): IndexingPolicy {
  const environment = resolveDeploymentEnvironment(env);
  const allowIndexing = environment === "production";

  return {
    environment,
    index: allowIndexing,
    follow: allowIndexing,
    reason: allowIndexing
      ? `Indexing enabled for production (${describeSignals(env)}).`
      : `Indexing disabled for ${environment} (${describeSignals(env)}).`,
  };
}

function describeSignals(env: IndexingEnvInput): string {
  const parts = [
    `SITE_ENV=${env.SITE_ENV ?? "unset"}`,
    `VERCEL_ENV=${env.VERCEL_ENV ?? "unset"}`,
    `NODE_ENV=${env.NODE_ENV ?? "unset"}`,
  ];
  return parts.join(", ");
}

/** Convenience for Next.js Metadata.robots */
export function getRobotsMetadata(env: IndexingEnvInput = process.env) {
  const policy = getIndexingPolicy(env);
  return {
    index: policy.index,
    follow: policy.follow,
  };
}
