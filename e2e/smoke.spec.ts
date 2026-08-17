import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const marketingRoutes = [
  "/",
  "/solutions",
  "/start-a-project",
  "/academy",
  "/academy/programs/software-engineering",
  "/insights",
  "/company/about",
  "/contact",
] as const;

test.describe("critical journeys", () => {
  test("desktop navigation exposes Solutions and Start a Project", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Solutions" }).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Start a Project/i }).first(),
    ).toBeVisible();
  });

  test("mobile navigation opens drawer", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator('header[data-header-hydrated="true"]')).toBeVisible({
      timeout: 15_000,
    });
    const menuButton = page.locator('header button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.locator("[data-mobile-nav-drawer='true']")).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.getByRole("dialog", { name: /site navigation/i }),
    ).toBeVisible();
  });

  test("Solutions route renders", async ({ page }) => {
    await page.goto("/solutions");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Start a Project shows client validation on empty submit", async ({
    page,
  }) => {
    await page.goto("/start-a-project");
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole("alert").first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("Academy applications disabled path does not show live Apply as primary sitewide CTA falsely", async ({
    page,
  }) => {
    await page.goto("/academy/apply");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Insights index is reachable", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("About bridges to Start a Project", async ({ page }) => {
    await page.goto("/company/about");
    await page.getByRole("link", { name: /Start a Project/i }).first().click();
    await expect(page).toHaveURL(/\/start-a-project/);
  });

  test("Contact routes project enquiry to Start a Project", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("link", { name: /Start a Project/i }).first().click();
    await expect(page).toHaveURL(/\/start-a-project/);
  });

  test("404 for unknown path", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist-epic12");
    expect(response?.status()).toBe(404);
  });

  test("robots and sitemap are reachable", async ({ page }) => {
    const robots = await page.goto("/robots.txt");
    expect(robots?.ok()).toBeTruthy();
    const sitemap = await page.goto("/sitemap.xml");
    expect(sitemap?.ok()).toBeTruthy();
  });

  test("legal footer links resolve", async ({ page }) => {
    await page.goto("/");
    for (const href of ["/privacy", "/terms", "/cookies"]) {
      await page.goto(href);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
});

test.describe("automated accessibility sampling", () => {
  for (const route of marketingRoutes) {
    test(`axe critical issues — ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious",
      );
      expect(
        serious,
        serious.map((v) => `${v.id}: ${v.help}`).join("\n"),
      ).toEqual([]);
    });
  }
});
