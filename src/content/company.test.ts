import { describe, expect, it } from "vitest";
import {
  aboutDivisions,
  aboutFounder,
  aboutFinalCta,
  contactPathways,
} from "@/content/company";
import {
  getLegalPageRobots,
  shouldIncludeLegalPageInSitemap,
} from "@/lib/legal/legal-indexing";
import {
  getEditorStorageInventory,
  getPublicStorageInventory,
  hasMarketingAnalyticsCookies,
} from "@/lib/legal/storage-inventory";
import { buildOrganizationJsonLd } from "@/lib/seo/organization-json-ld";
import { getAcademyApplyHref } from "@/config/academy";

describe("company content integrity", () => {
  it("exposes exactly four official divisions", () => {
    expect(aboutDivisions.items).toHaveLength(4);
    expect(aboutDivisions.items.map((item) => item.id)).toEqual([
      "software",
      "ai",
      "marketing",
      "academy",
    ]);
  });

  it("uses verified founder identity only", () => {
    expect(aboutFounder.name).toBe("Arrey Johnson");
    expect(aboutFounder.role).toBe("Founder & CEO");
    expect(aboutFounder.imageSrc).toBeNull();
  });

  it("does not invent trust metrics in company copy", () => {
    const blob = JSON.stringify({ aboutDivisions, aboutFounder, aboutFinalCta });
    expect(blob).not.toMatch(/\d+\+|clients served|awards|employees/i);
  });

  it("routes commercial enquiries to Start a Project", () => {
    expect(contactPathways.project.cta.href).toBe("/start-a-project");
  });

  it("routes Academy exploration to /academy and respects apply config", () => {
    expect(contactPathways.academy.cta.href).toBe("/academy");
    expect(getAcademyApplyHref()).toBeNull();
  });
});

describe("legal indexing", () => {
  it("keeps interim legal pages noindex", () => {
    expect(getLegalPageRobots("privacy")).toEqual({
      index: false,
      follow: true,
    });
    expect(getLegalPageRobots("terms")).toEqual({
      index: false,
      follow: true,
    });
    expect(getLegalPageRobots("cookies")).toEqual({
      index: false,
      follow: true,
    });
  });

  it("excludes interim legal pages from sitemap", () => {
    expect(shouldIncludeLegalPageInSitemap("privacy")).toBe(false);
    expect(shouldIncludeLegalPageInSitemap("terms")).toBe(false);
    expect(shouldIncludeLegalPageInSitemap("cookies")).toBe(false);
  });
});

describe("storage inventory", () => {
  it("documents current public storage without inventing analytics", () => {
    expect(hasMarketingAnalyticsCookies()).toBe(false);
    expect(getPublicStorageInventory().some((i) => i.id === "turnstile")).toBe(
      true,
    );
    expect(getEditorStorageInventory().some((i) => i.id === "draft-mode")).toBe(
      true,
    );
  });
});

describe("organization structured data", () => {
  it("omits unverified contact and social fields", () => {
    const ld = buildOrganizationJsonLd({
      organizationLegalName: null,
      organizationShortDescription: null,
      footerDescriptor: null,
      contact: null,
      social: [],
    });
    expect(ld.email).toBeUndefined();
    expect(ld.telephone).toBeUndefined();
    expect(ld.sameAs).toBeUndefined();
    expect(ld.foundingDate).toBeUndefined();
  });

  it("includes verified contact fields only when present", () => {
    const ld = buildOrganizationJsonLd({
      organizationLegalName: "Promptstack Technologies",
      organizationShortDescription: "Verified short description.",
      footerDescriptor: null,
      contact: {
        email: "hello@example.com",
        phone: "+237000000000",
        address: "Douala, Cameroon",
      },
      social: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/example" }],
    });
    expect(ld.email).toBe("hello@example.com");
    expect(ld.telephone).toBe("+237000000000");
    expect(ld.sameAs).toEqual([
      "https://www.linkedin.com/company/example",
    ]);
  });
});
