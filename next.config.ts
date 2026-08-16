import type { NextConfig } from "next";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

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
};

export default nextConfig;
