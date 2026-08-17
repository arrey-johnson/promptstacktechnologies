import { afterEach, describe, expect, it } from "vitest";
import { getPublicEnv } from "./env";

const ORIGINAL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (ORIGINAL === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL;
  }
});

describe("getPublicEnv", () => {
  it("accepts a valid site URL and strips trailing slash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://promptstack.example/";
    const result = getPublicEnv();
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_SITE_URL).toBe(
        "https://promptstack.example",
      );
    }
  });

  it("rejects a missing site URL", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const result = getPublicEnv();
    expect(result.success).toBe(false);
  });

  it("rejects an invalid site URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
    const result = getPublicEnv();
    expect(result.success).toBe(false);
  });

  it("normalizes Promptstack production URL to https www", () => {
    process.env.NEXT_PUBLIC_SITE_URL =
      "http://www.promptstacktechnologies.com/";
    const result = getPublicEnv();
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_SITE_URL).toBe(
        "https://www.promptstacktechnologies.com",
      );
    }
  });
});
