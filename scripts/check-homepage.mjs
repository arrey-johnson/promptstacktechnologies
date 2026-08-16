import puppeteer from "puppeteer-core";

const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.MEASURE_URL || "http://localhost:3008/";

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1280, height: 900 },
  { width: 1440, height: 900 },
];

const expectedSections = [
  "hero",
  "capability-strip",
  "business-problems",
  "solutions",
  "business-outcomes",
  "selected-work",
  "how-we-work",
  "why-promptstack",
  "academy",
  "insights",
  "final-cta",
];

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
const results = [];

for (const viewport of viewports) {
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 200));

  const data = await page.evaluate((sections) => {
    const overflow =
      document.documentElement.scrollWidth > window.innerWidth + 1;
    const h1 = document.querySelectorAll("h1");
    const found = sections.map((id) => ({
      id,
      present: !!document.querySelector(`[data-section="${id}"]`),
    }));
    const heroH1 = document.querySelector("#homepage-hero-heading");
    const heroCtas = Array.from(
      document.querySelectorAll('[data-section="hero"] a'),
    ).map((a) => a.textContent?.trim());
    const placeholders = document.querySelectorAll(
      '[data-placeholder="true"]',
    ).length;

    return {
      overflow,
      h1Count: h1.length,
      h1Text: heroH1?.textContent?.trim() ?? null,
      sections: found,
      heroCtas,
      placeholders,
      bodyClientWidth: document.body.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    };
  }, expectedSections);

  results.push({ ...viewport, ...data });
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
