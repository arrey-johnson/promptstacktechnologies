import puppeteer from "puppeteer-core";

const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.env.MEASURE_URL || "http://localhost:3011";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
const widths = [390, 768, 1024, 1280, 1440];
const results = [];

for (const route of ["/how-we-work", "/work"]) {
  for (const width of widths) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 80));

    const data = await page.evaluate(() => {
      const h1 = document.querySelectorAll("h1");
      const todo = Array.from(document.querySelectorAll("body *")).some((el) =>
        Array.from(el.childNodes).some(
          (n) =>
            n.nodeType === Node.TEXT_NODE &&
            (n.textContent || "").includes("TODO_CONTENT"),
        ),
      );
      const placeholders = document.querySelectorAll(
        '[data-placeholder="true"]',
      ).length;
      const empty = (document.body.textContent || "").includes(
        "Detailed case studies are being prepared",
      );
      const overflow =
        document.documentElement.scrollWidth > window.innerWidth + 1;
      const stages = Array.from(
        document.querySelectorAll('[data-section="delivery-model"] h3'),
      ).map((el) => el.textContent?.trim());
      return {
        h1Count: h1.length,
        h1Text: h1[0]?.textContent?.trim() ?? null,
        todo,
        placeholders,
        empty,
        overflow,
        stages,
        startProject: !!document.querySelector('a[href="/start-a-project"]'),
        crossLinkHow:
          !!document.querySelector('a[href="/how-we-work"]') ||
          location.pathname.includes("how-we-work"),
        crossLinkWork:
          !!document.querySelector('a[href="/work"]') ||
          location.pathname.includes("/work"),
      };
    });

    results.push({ route, width, ...data });
  }
}

// Placeholder slug must 404 in production
const detail = await page.goto(`${base}/work/business-operations-system`, {
  waitUntil: "domcontentloaded",
});
const detailStatus = detail?.status();
const detailIs404 = await page.evaluate(() =>
  (document.body.textContent || "").toLowerCase().includes("not found") ||
  document.title.toLowerCase().includes("not found") ||
  !!document.querySelector("h1"),
);

await browser.close();
console.log(
  JSON.stringify({ results, detailStatus, detailIs404 }, null, 2),
);
