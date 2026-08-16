import puppeteer from "puppeteer-core";

const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.MEASURE_URL || "http://localhost:3009/";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();

const viewports = [390, 768, 1024, 1280, 1440];
const results = [];

for (const width of viewports) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 150));

  const data = await page.evaluate(() => {
    const finalHeading = document.querySelector("#homepage-final-cta-heading");
    const finalSection = document.querySelector('[data-section="final-cta"]');
    const footer = document.querySelector("footer");
    const footerLogoBadge = footer?.querySelector(".bg-white.px-3");
    const todoVisible = Array.from(document.querySelectorAll("body *")).some(
      (el) =>
        el.childNodes.length &&
        Array.from(el.childNodes).some(
          (n) =>
            n.nodeType === Node.TEXT_NODE &&
            (n.textContent || "").includes("TODO_CONTENT"),
        ),
    );
    const workPlaceholders = document.querySelectorAll(
      '[data-section="selected-work"] [data-placeholder="true"]',
    ).length;
    const insightPlaceholders = document.querySelectorAll(
      '[data-section="insights"] [data-placeholder="true"]',
    ).length;
    const workEmpty = (
      document.querySelector('[data-section="selected-work"]')?.textContent ||
      ""
    ).includes("approved case studies");
    const insightsEmpty = (
      document.querySelector('[data-section="insights"]')?.textContent || ""
    ).includes("once articles are published");
    const processDesktop = document.querySelector(
      '[data-section="how-we-work"] ol.md\\:grid',
    );
    const processCols = processDesktop
      ? getComputedStyle(processDesktop).gridTemplateColumns.split(" ").length
      : null;
    const headingColor = finalHeading
      ? getComputedStyle(finalHeading).color
      : null;
    const sectionBg = finalSection
      ? getComputedStyle(finalSection).backgroundColor
      : null;
    const footerBg = footer ? getComputedStyle(footer).backgroundColor : null;
    const overflow =
      document.documentElement.scrollWidth > window.innerWidth + 1;
    const previewLabels = Array.from(document.querySelectorAll("p")).filter(
      (p) => p.textContent?.includes("Development preview"),
    ).length;

    return {
      headingColor,
      sectionBg,
      footerBg,
      footerLogoBadge: Boolean(footerLogoBadge),
      todoVisible,
      workPlaceholders,
      insightPlaceholders,
      workEmpty,
      insightsEmpty,
      processCols,
      overflow,
      previewLabels,
    };
  });

  results.push({ width, ...data });
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
