import { describe, expect, it } from "vitest";
import {
  companyNavLinks,
  footerNav,
  getFooterAcademyLinks,
  isNavLink,
  mobileSolutionsLinks,
  primaryCta,
  primaryNavLinks,
  solutionsMegaMenu,
} from "./navigation";

describe("navigation config", () => {
  it("keeps Start a Project as the primary CTA route", () => {
    expect(primaryCta).toEqual({
      label: "Start a Project",
      href: "/start-a-project",
    });
  });

  it("exposes only implemented Company routes in V1", () => {
    expect(companyNavLinks.map((item) => item.href)).toEqual([
      "/company/about",
      "/contact",
    ]);
  });

  it("links Solutions pillars to approved launch routes only", () => {
    const linked = solutionsMegaMenu.columns.flatMap((column) =>
      column.items.filter(isNavLink).map((item) => item.href),
    );

    expect(linked).toEqual([
      "/solutions/software",
      "/solutions/ai-automation",
      "/solutions/digital-marketing",
    ]);
    expect(
      solutionsMegaMenu.problemExploration.items.every(
        (item) => !isNavLink(item),
      ),
    ).toBe(true);
  });

  it("includes core primary destinations", () => {
    expect(primaryNavLinks.map((item) => item.href)).toEqual([
      "/work",
      "/how-we-work",
      "/academy",
      "/insights",
    ]);
  });

  it("does not invent footer social or contact facts", () => {
    expect(footerNav.social).toEqual([]);
    expect(footerNav.contact).toBeNull();
  });

  it("exposes only live V1 Solutions destinations in the mobile accordion", () => {
    expect(mobileSolutionsLinks.map((item) => item.href)).toEqual([
      "/solutions/software",
      "/solutions/ai-automation",
      "/solutions/digital-marketing",
      "/solutions",
    ]);
  });

  it("hides Academy Apply in the footer until applications are enabled", () => {
    expect(getFooterAcademyLinks().map((item) => item.href)).toEqual([
      "/academy",
      "/academy/programs",
      "/academy/how-we-teach",
    ]);
    expect(
      getFooterAcademyLinks().some((item) => item.href === "/academy/apply"),
    ).toBe(false);
  });
});

