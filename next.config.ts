import type { NextConfig } from "next";
import {
  getMarketingSecurityHeaders,
  getStudioSecurityHeaders,
} from "./src/lib/security/headers";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

/** Emit HSTS from Next only when we positively know HTTPS production. */
function shouldEmitHsts(): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  const vercelEnv = process.env.VERCEL_ENV?.trim();
  const siteEnv = process.env.SITE_ENV?.trim();
  const isProdSignal =
    vercelEnv === "production" || siteEnv === "production";
  return (
    isProdSignal &&
    (siteUrl.startsWith("https://") ||
      siteUrl.includes("promptstacktechnologies.com"))
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: projectId
      ? [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: `/images/${projectId}/**`,
          },
        ]
      : [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: "/images/**",
          },
        ],
  },
  async headers() {
    const emitHsts = shouldEmitHsts();
    return [
      {
        source: "/studio/:path*",
        headers: getStudioSecurityHeaders(emitHsts),
      },
      {
        source: "/((?!studio).*)",
        headers: getMarketingSecurityHeaders(emitHsts),
      },
    ];
  },
};

export default nextConfig;
