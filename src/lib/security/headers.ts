/**
 * Production security headers.
 * CSP is allowlist-based (no nonce) to avoid forcing dynamic rendering across
 * a mostly static/ISR marketing site. Studio uses a slightly looser script policy.
 */

const SHARED_SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

/**
 * Baseline CSP for marketing pages.
 * Includes: Next.js, Sanity CDN images, Turnstile, optional GTM/GA4.
 * Does not claim nonce-based strict CSP.
 */
export function buildMarketingContentSecurityPolicy(options?: {
  allowUnsafeEval?: boolean;
}): string {
  const scriptSrc = [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    ...(options?.allowUnsafeEval ? ["'unsafe-eval'"] : []),
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://challenges.cloudflare.com",
    "https://vercel.live",
  ].join(" ");

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    scriptSrc,
    [
      "style-src",
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
    ].join(" "),
    [
      "img-src",
      "'self'",
      "data:",
      "blob:",
      "https://cdn.sanity.io",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
      "https://*.googletagmanager.com",
    ].join(" "),
    [
      "font-src",
      "'self'",
      "data:",
      "https://fonts.gstatic.com",
    ].join(" "),
    [
      "connect-src",
      "'self'",
      "https://cdn.sanity.io",
      "https://*.api.sanity.io",
      "https://*.sanity.io",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://www.googletagmanager.com",
      "https://*.googletagmanager.com",
      "https://challenges.cloudflare.com",
      "https://vercel.live",
    ].join(" "),
    [
      "frame-src",
      "'self'",
      "https://www.googletagmanager.com",
      "https://challenges.cloudflare.com",
      "https://vercel.live",
    ].join(" "),
    "form-action 'self'",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

/**
 * Studio / Presentation needs broader script freedom for Sanity tooling.
 * Still blocks framing by third parties.
 */
export function buildStudioContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://core.sanity-cdn.com",
      "https://*.sanity.io",
      "blob:",
    ].join(" "),
    [
      "style-src",
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
    ].join(" "),
    [
      "img-src",
      "'self'",
      "data:",
      "blob:",
      "https://cdn.sanity.io",
      "https://*.sanity.io",
    ].join(" "),
    [
      "font-src",
      "'self'",
      "data:",
      "https://fonts.gstatic.com",
    ].join(" "),
    [
      "connect-src",
      "'self'",
      "https://*.api.sanity.io",
      "https://*.sanity.io",
      "https://cdn.sanity.io",
      "wss://*.sanity.io",
      "https://core.sanity-cdn.com",
    ].join(" "),
    ["frame-src", "'self'", "https://*.sanity.io", "blob:"].join(" "),
    ["worker-src", "'self'", "blob:"].join(" "),
    "form-action 'self'",
  ];

  return directives.join("; ");
}

export function getMarketingSecurityHeaders(isProductionHttps: boolean) {
  const allowUnsafeEval = process.env.NODE_ENV !== "production";
  const headers = [
    ...SHARED_SECURITY_HEADERS,
    {
      key: "Content-Security-Policy",
      value: buildMarketingContentSecurityPolicy({ allowUnsafeEval }),
    },
  ];

  if (isProductionHttps) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    });
  }

  return headers;
}

export function getStudioSecurityHeaders(isProductionHttps: boolean) {
  const headers = [
    ...SHARED_SECURITY_HEADERS,
    {
      key: "Content-Security-Policy",
      value: buildStudioContentSecurityPolicy(),
    },
  ];

  if (isProductionHttps) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    });
  }

  return headers;
}
