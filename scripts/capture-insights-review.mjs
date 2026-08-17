/**
 * Epic 10 Insights editorial UX review capture.
 * Do not change UI. Capture only.
 *
 * MEASURE_URL=http://localhost:3000 node scripts/capture-insights-review.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = (process.env.MEASURE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const outDir = path.join(
  process.cwd(),
  ".data",
  "review-screenshots",
  "epic-10-insights",
);

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

async function shot(page, name, { fullPage = false } = {}) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage });
  console.log(`Wrote ${file}`);
}

async function open(page, route) {
  const url = `${baseUrl}${route}`;
  console.log("Opening", url);
  const resp = await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  const status = resp?.status() ?? null;
  console.log("Status", status);
  await new Promise((r) => setTimeout(r, 700));
  return status;
}

async function scrollToSelector(page, selector, block = "start") {
  await page.evaluate(
    (sel, blk) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ block: blk, inline: "nearest" });
    },
    selector,
    block,
  );
  await new Promise((r) => setTimeout(r, 350));
}

try {
  // ---- Desktop 1440 × 1100 ----
  const desktop = await browser.newPage();
  await desktop.setViewport({
    width: 1440,
    height: 1100,
    deviceScaleFactor: 1,
  });

  await open(desktop, "/insights");
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  await shot(desktop, "01-desktop-insights-top");

  await scrollToSelector(desktop, '[data-section="insights-categories"]');
  await shot(desktop, "02-desktop-insights-lower");

  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));
  await shot(desktop, "03-desktop-insights-fullpage", { fullPage: true });

  await open(desktop, "/insights?category=software");
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  await shot(desktop, "04-desktop-category-software");

  await open(desktop, "/insights/development-preview-featured-operations");
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  await shot(desktop, "05-desktop-article-hero");

  await scrollToSelector(desktop, ".insight-portable-text");
  await shot(desktop, "06-desktop-article-body");

  await scrollToSelector(
    desktop,
    '[data-section="related-insights"], [data-section="insight-commercial-bridge"]',
  );
  await shot(desktop, "07-desktop-article-bottom");

  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));
  await shot(desktop, "08-desktop-article-fullpage", { fullPage: true });

  await open(desktop, "/insights/development-preview-technology-strategy");
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  await shot(desktop, "09-desktop-no-image-long-title");

  const notFoundStatus = await open(
    desktop,
    "/insights/this-article-does-not-exist",
  );
  console.log("UNKNOWN_SLUG_STATUS", notFoundStatus);

  const sitemapResp = await desktop.goto(`${baseUrl}/sitemap.xml`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  const sitemapStatus = sitemapResp?.status() ?? null;
  const sitemapText = await desktop.evaluate(() => document.body?.innerText || "");
  const hasInsightsIndex = sitemapText.includes(`${baseUrl}/insights`) || sitemapText.includes("/insights");
  const hasFixtureSlug = /development-preview-/i.test(sitemapText);
  console.log("SITEMAP_STATUS", sitemapStatus);
  console.log("SITEMAP_HAS_INSIGHTS_INDEX", hasInsightsIndex);
  console.log("SITEMAP_HAS_FIXTURE_SLUG", hasFixtureSlug);
  // Print matching lines for report evidence without dumping whole sitemap if huge
  const insightLines = sitemapText
    .split(/\s+/)
    .filter((t) => t.includes("/insights"));
  console.log("SITEMAP_INSIGHT_URLS", JSON.stringify(insightLines));

  await desktop.close();

  // ---- Mobile 412 × 915 ----
  const mobile = await browser.newPage();
  await mobile.setViewport({
    width: 412,
    height: 915,
    deviceScaleFactor: 2,
  });

  await open(mobile, "/insights");
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  await shot(mobile, "10-mobile-insights-top");

  await scrollToSelector(mobile, '[data-section="insights-categories"]', "center");
  await shot(mobile, "11-mobile-insights-categories");

  await scrollToSelector(mobile, '[data-section="insights-listing"]');
  await shot(mobile, "11b-mobile-insights-listing");

  await scrollToSelector(mobile, '[data-section="insight-commercial-bridge"]');
  await shot(mobile, "11c-mobile-insights-bridge");

  await open(mobile, "/insights/development-preview-featured-operations");
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  await shot(mobile, "12-mobile-article-hero");

  await scrollToSelector(mobile, ".insight-portable-text");
  await shot(mobile, "13-mobile-article-body");

  await scrollToSelector(
    mobile,
    '[data-section="related-insights"], [data-section="insight-commercial-bridge"]',
  );
  await shot(mobile, "13b-mobile-article-bottom");

  await mobile.close();
} finally {
  await browser.close();
}

console.log("Done. Output:", outDir);
