import { describe, expect, it } from "vitest";
import {
  getIndexingPolicy,
  getRobotsMetadata,
  resolveDeploymentEnvironment,
} from "./indexing";

describe("resolveDeploymentEnvironment", () => {
  it("uses SITE_ENV when explicitly set", () => {
    expect(
      resolveDeploymentEnvironment({
        SITE_ENV: "staging",
        VERCEL_ENV: "production",
        NODE_ENV: "production",
      }),
    ).toBe("staging");
  });

  it("uses VERCEL_ENV when SITE_ENV is unset", () => {
    expect(
      resolveDeploymentEnvironment({
        VERCEL_ENV: "preview",
        NODE_ENV: "production",
      }),
    ).toBe("preview");
    expect(
      resolveDeploymentEnvironment({
        VERCEL_ENV: "production",
        NODE_ENV: "production",
      }),
    ).toBe("production");
  });

  it("treats NODE_ENV=development as development", () => {
    expect(
      resolveDeploymentEnvironment({
        NODE_ENV: "development",
      }),
    ).toBe("development");
  });

  it("does not treat NODE_ENV=production alone as production", () => {
    expect(
      resolveDeploymentEnvironment({
        NODE_ENV: "production",
      }),
    ).toBe("preview");
  });
});

describe("getIndexingPolicy", () => {
  it("allows index/follow only in production", () => {
    const production = getIndexingPolicy({
      VERCEL_ENV: "production",
      NODE_ENV: "production",
    });
    expect(production.index).toBe(true);
    expect(production.follow).toBe(true);
    expect(production.environment).toBe("production");
  });

  it("disables indexing for local development", () => {
    const local = getIndexingPolicy({ NODE_ENV: "development" });
    expect(local.index).toBe(false);
    expect(local.follow).toBe(false);
    expect(local.environment).toBe("development");
  });

  it("disables indexing for Vercel preview even when NODE_ENV is production", () => {
    const preview = getIndexingPolicy({
      VERCEL_ENV: "preview",
      NODE_ENV: "production",
    });
    expect(preview.index).toBe(false);
    expect(preview.follow).toBe(false);
    expect(preview.environment).toBe("preview");
  });

  it("disables indexing for staging", () => {
    const staging = getIndexingPolicy({
      SITE_ENV: "staging",
      NODE_ENV: "production",
    });
    expect(staging.index).toBe(false);
    expect(staging.follow).toBe(false);
  });

  it("allows indexing when SITE_ENV=production on non-Vercel hosts", () => {
    const production = getIndexingPolicy({
      SITE_ENV: "production",
      NODE_ENV: "production",
    });
    expect(production.index).toBe(true);
    expect(production.follow).toBe(true);
  });
});

describe("getRobotsMetadata", () => {
  it("maps production policy to indexable robots", () => {
    expect(
      getRobotsMetadata({
        VERCEL_ENV: "production",
        NODE_ENV: "production",
      }),
    ).toEqual({ index: true, follow: true });
  });

  it("maps non-production policy to noindex/nofollow", () => {
    expect(
      getRobotsMetadata({
        VERCEL_ENV: "preview",
        NODE_ENV: "production",
      }),
    ).toEqual({ index: false, follow: false });
  });
});
