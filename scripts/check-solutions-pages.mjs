import puppeteer from "puppeteer-core";

const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.env.MEASURE_URL || "http://localhost:3010";

const routes = [
  "/solutions",
  "/solutions/software",
  "/solutions/ai-automation",
  "/solutions/digital-marketing",
];

const widths = [390, 768, 1024, 1280, 1440];

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
const results = [];

for (const route of routes) {
  for (const width of widths) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${base}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    await new Promise((r) => setTimeout(r, 100));

    const data = await page.evaluate(() => {
      const h1s = document.querySelectorAll("h1");
      const todoVisible = Array.from(document.querySelectorAll("body *")).some(
        (el) =>
          Array.from(el.childNodes).some(
            (n) =>
              n.nodeType === Node.TEXT_NODE &&
              (n.textContent || "").includes("TODO_CONTENT"),
          ),
      );
      const placeholders = document.querySelectorAll(
        '[data-placeholder="true"]',
      ).length;
      const overflow =
        document.documentElement.scrollWidth > window.innerWidth + 1;
      const faqButtons = document.querySelectorAll(
        '[data-section="faq"] button[aria-expanded]',
      ).length;
      const cta = document.querySelector(
        '[data-section="commercial-cta"] a',
      )?.textContent?.trim();
      const deadHashOnly = Array.from(
        document.querySelectorAll('a[href="#"]'),
      ).length;

      return {
        h1Count: h1s.length,
        h1Text: h1s[0]?.textContent?.trim() ?? null,
        todoVisible,
        placeholders,
        overflow,
        faqButtons,
        cta,
        deadHashOnly,
      };
    });

    results.push({ route, width, ...data });
  }
}

// FAQ interaction smoke on software page at 390
await page.setViewport({ width: 390, height: 844 });
await page.goto(`${base}/solutions/software`, {
  waitUntil: "domcontentloaded",
});
await page.waitForSelector('[data-section="faq"] button[aria-expanded]');
const before = await page.$eval(
  '[data-section="faq"] button[aria-expanded]',
  (el) => el.getAttribute("aria-expanded"),
);
await page.click('[data-section="faq"] button[aria-expanded]');
await new Promise((r) => setTimeout(r, 50));
const after = await page.$eval(
  '[data-section="faq"] button[aria-expanded]',
  (el) => el.getAttribute("aria-expanded"),
);

await browser.close();
console.log(
  JSON.stringify(
    {
      summary: results,
      faqToggle: { before, after },
    },
    null,
    2,
  ),
);
