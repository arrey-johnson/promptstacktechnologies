import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots route", () => {
  it("disallows all crawling outside production indexing policy", () => {
    const previousSite = process.env.SITE_ENV;
    const previousVercel = process.env.VERCEL_ENV;
    process.env.SITE_ENV = "preview";
    delete process.env.VERCEL_ENV;

    const result = robots();
    expect(result.rules).toMatchObject({
      userAgent: "*",
      disallow: "/",
    });

    if (previousSite === undefined) delete process.env.SITE_ENV;
    else process.env.SITE_ENV = previousSite;
    if (previousVercel === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previousVercel;
  });

  it("allows public routes and blocks studio/api/confirmations in production", () => {
    const previousSite = process.env.SITE_ENV;
    process.env.SITE_ENV = "production";
    process.env.NEXT_PUBLIC_SITE_URL =
      "https://www.promptstacktechnologies.com";

    const result = robots();
    expect(result.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });
    expect(result.rules).toEqual(
      expect.objectContaining({
        disallow: expect.arrayContaining([
          "/studio",
          "/api/",
          "/project-request-received",
          "/academy/application-received",
        ]),
      }),
    );
    expect(result.sitemap).toBe(
      "https://www.promptstacktechnologies.com/sitemap.xml",
    );

    if (previousSite === undefined) delete process.env.SITE_ENV;
    else process.env.SITE_ENV = previousSite;
  });
});
