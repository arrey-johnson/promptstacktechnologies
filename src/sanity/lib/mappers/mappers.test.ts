import { describe, expect, it } from "vitest";
import { mapSanityCaseStudy } from "@/sanity/lib/mappers/caseStudy";
import {
  mapSanityInsightArticle,
  mapSanityInsightPreview,
} from "@/sanity/lib/mappers/insight";
import { mapSanityAcademyProgram } from "@/sanity/lib/mappers/academyProgram";
import { mapSanitySiteSettings } from "@/sanity/lib/mappers/siteSettings";
import {
  getAcademyContentSource,
  isSanityConfigured,
} from "@/sanity/env";
import { areAcademyApplicationsEnabled } from "@/config/academy";

describe("Sanity configuration helpers", () => {
  it("treats missing project id as not configured", () => {
    expect(isSanityConfigured({})).toBe(false);
    expect(
      isSanityConfigured({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
      }),
    ).toBe(true);
  });

  it("defaults Academy content source to local", () => {
    expect(getAcademyContentSource({})).toBe("local");
  });

  it("does not enable Sanity Academy source without credentials", () => {
    expect(
      getAcademyContentSource({ ACADEMY_CONTENT_SOURCE: "sanity" }),
    ).toBe("local");
  });
});

describe("case study mapper", () => {
  it("maps a real Sanity document to a non-placeholder CaseStudy", () => {
    const mapped = mapSanityCaseStudy({
      _id: "case-1",
      title: "Operations platform",
      slug: "operations-platform",
      contentType: "client-case-study",
      clientName: null,
      category: "software",
      summary: "A practical summary that is long enough for validation rules.",
      businessProblem: "Manual coordination slowed delivery.",
      solution: "A shared operations system for the team.",
      outcome: "Clearer handoffs across teams.",
      featured: true,
      outcomeMetrics: [{ label: "Verified metric", value: "Owner-approved figure" }],
    });

    expect(mapped).not.toBeNull();
    expect(mapped!.isPlaceholder).toBe(false);
    expect(mapped!.slug).toBe("operations-platform");
    expect(mapped!.outcomeMetrics).toHaveLength(1);
  });

  it("rejects incomplete documents", () => {
    expect(
      mapSanityCaseStudy({
        _id: "x",
        title: "Incomplete",
        slug: "incomplete",
      }),
    ).toBeNull();
  });
});

describe("insight mapper", () => {
  it("maps real insights without inventing content", () => {
    const mapped = mapSanityInsightPreview({
      _id: "insight-1",
      title: "When automation helps operations",
      slug: "automation-operations",
      excerpt:
        "A practical look at choosing automation work that reduces operational friction.",
      category: "business-operations",
    });
    expect(mapped?.isPlaceholder).toBe(false);
    expect(mapped?.href).toBe("/insights/automation-operations");
  });

  it("maps full articles with missing author and image safely", () => {
    const mapped = mapSanityInsightArticle({
      _id: "insight-2",
      title: "When automation helps operations",
      slug: "automation-operations",
      excerpt:
        "A practical look at choosing automation work that reduces operational friction.",
      category: "business-operations",
      body: [{ _type: "block", children: [] }],
      publishedAt: "2026-02-01T12:00:00.000Z",
      relatedSlugs: ["other"],
      author: null,
    });
    expect(mapped?.author).toBeNull();
    expect(mapped?.imageSrc).toBeNull();
    expect(mapped?.relatedSlugs).toEqual(["other"]);
    expect(mapped?.seo.noIndex).toBe(false);
  });

  it("returns null for incomplete insights", () => {
    expect(mapSanityInsightPreview({ _id: "x", title: "Nope" })).toBeNull();
  });
});

describe("academy program mapper", () => {
  it("maps approved program slugs and leaves operational nulls empty", () => {
    const mapped = mapSanityAcademyProgram({
      title: "Software Engineering",
      slug: "software-engineering",
      status: "active",
      heroHeading: "Learn to design, build, test and ship real software.",
      shortPromise: "Practical software capability through projects.",
      overview: "Overview text for the program.",
      audience: "Committed beginners and career changers.",
      teachingMethod: "Learn · Build · Ship",
      visual: "software",
      feeText: null,
      cohortText: null,
      learningRoadmap: [
        {
          id: "foundations",
          title: "Foundations",
          summary: "Start here",
          items: ["Logic", "Practice"],
        },
      ],
      projects: [],
      professionalWorkflows: [],
      faq: [],
    });

    expect(mapped).not.toBeNull();
    expect(mapped!.feeText).toBeNull();
    expect(mapped!.cohortText).toBeNull();
    expect(mapped!.applicationOpen).toBeNull();
  });

  it("rejects arbitrary program slugs", () => {
    expect(
      mapSanityAcademyProgram({
        title: "Blockchain",
        slug: "blockchain",
        status: "active",
        heroHeading: "x",
        shortPromise: "x",
        overview: "x",
        audience: "x",
        teachingMethod: "x",
        visual: "software",
      }),
    ).toBeNull();
  });
});

describe("site settings mapper", () => {
  it("omits empty contact and social fields", () => {
    const mapped = mapSanitySiteSettings({
      businessEmail: "  ",
      phone: null,
      socialLinks: [{ label: "X", href: "" }],
    });
    expect(mapped.contact).toBeNull();
    expect(mapped.social).toEqual([]);
  });

  it("maps verified contact when present", () => {
    const mapped = mapSanitySiteSettings({
      businessEmail: "hello@example.com",
      socialLinks: [{ label: "LinkedIn", href: "https://linkedin.com/company/example" }],
    });
    expect(mapped.contact?.email).toBe("hello@example.com");
    expect(mapped.social).toHaveLength(1);
  });
});

describe("admissions remain config-controlled", () => {
  it("does not open applications from CMS-related env alone", () => {
    expect(
      areAcademyApplicationsEnabled({
        ACADEMY_APPLICATIONS_ENABLED: "false",
        ACADEMY_CONTENT_SOURCE: "sanity",
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc",
        NEXT_PUBLIC_SANITY_DATASET: "production",
      }),
    ).toBe(false);
  });
});
