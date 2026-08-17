import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  academyProgramTag,
  caseStudyTag,
  insightTag,
  resolveRevalidateTags,
  siteSettingsTag,
} from "./tags";

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

describe("CMS cache tags", () => {
  it("builds Work tags with shared + slug scope", () => {
    expect(caseStudyTag()).toEqual(["case-study", "sitemap"]);
    expect(caseStudyTag("ops-platform")).toEqual([
      "case-study",
      "sitemap",
      "case-study:ops-platform",
    ]);
  });

  it("builds Academy tags with shared + slug scope", () => {
    expect(academyProgramTag("software-engineering")).toEqual([
      "academy-program",
      "sitemap",
      "academy-program:software-engineering",
    ]);
  });

  it("builds Site Settings tags", () => {
    expect(siteSettingsTag()).toEqual(["site-settings"]);
  });

  it("builds Insight tags with shared + slug + sitemap scope", () => {
    expect(insightTag("example")).toEqual([
      "insight",
      "sitemap",
      "insight:example",
    ]);
  });
});

describe("resolveRevalidateTags", () => {
  it("invalidates Work shared + slug tags", () => {
    expect(
      resolveRevalidateTags({
        _type: "caseStudy",
        slug: { current: "ops-platform" },
      }),
    ).toEqual(["case-study", "sitemap", "case-study:ops-platform"]);
  });

  it("invalidates Insight shared + slug + sitemap tags", () => {
    expect(
      resolveRevalidateTags({
        _type: "insight",
        slug: { current: "ops-article" },
      }),
    ).toEqual(["insight", "sitemap", "insight:ops-article"]);
  });

  it("invalidates Academy shared + slug tags", () => {
    expect(
      resolveRevalidateTags({
        _type: "academyProgram",
        slug: "cybersecurity",
      }),
    ).toEqual([
      "academy-program",
      "sitemap",
      "academy-program:cybersecurity",
    ]);
  });

  it("invalidates Site Settings tags", () => {
    expect(resolveRevalidateTags({ _type: "siteSettings" })).toEqual([
      "site-settings",
    ]);
  });

  it("returns empty for unknown types", () => {
    expect(resolveRevalidateTags({ _type: "teamMember" })).toEqual([]);
  });
});

describe("applySanityPublicationRevalidation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls revalidateTag for each resolved Work tag", async () => {
    const { revalidateTag } = await import("next/cache");
    const { applySanityPublicationRevalidation } = await import("./revalidate");

    const result = applySanityPublicationRevalidation({
      _type: "caseStudy",
      slug: { current: "ops-platform" },
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.tags).toContain("case-study");
    expect(result.tags).toContain("case-study:ops-platform");
    expect(revalidateTag).toHaveBeenCalledWith("case-study", "max");
    expect(revalidateTag).toHaveBeenCalledWith(
      "case-study:ops-platform",
      "max",
    );
  });
});
