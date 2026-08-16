import puppeteer from "puppeteer-core";

const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.MEASURE_URL || "http://localhost:3006/";

const cases = [
  { width: 320, height: 720 },
  { width: 360, height: 780 },
  { width: 390, height: 844 },
  { width: 390, height: 650 },
  { width: 430, height: 900 },
  { width: 768, height: 900 },
  { width: 1023, height: 800 },
];

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();

const rows = [];
for (const viewport of cases) {
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.click('button[aria-label="Open menu"]');
  await page.waitForSelector('[data-mobile-nav-drawer="true"]');
  await new Promise((r) => setTimeout(r, 50));

  const result = await page.evaluate((vh) => {
    const drawerRoot = document.querySelector(
      '[data-mobile-nav-drawer="true"]',
    );
    const dialog = document.querySelector('[role="dialog"]');
    const headerEl = document.querySelector("header");
    const labels = Array.from(
      dialog?.querySelectorAll("a, button") || [],
    ).map((el) => el.textContent?.trim());

    const drawerRect = drawerRoot?.getBoundingClientRect();
    const dialogRect = dialog?.getBoundingClientRect();
    const headerRect = headerEl?.getBoundingClientRect();

    const visiblePrimaries = [
      "Solutions",
      "Work",
      "How We Work",
      "Academy",
      "Insights",
      "Company",
    ].every((label) => {
      const el = Array.from(dialog?.querySelectorAll("a, button") || []).find(
        (node) => node.textContent?.trim() === label,
      );
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.height > 0 && r.width > 0 && r.bottom > 0 && r.top < vh;
    });

    return {
      drawerHeight: drawerRect ? Math.round(drawerRect.height) : null,
      dialogHeight: dialogRect ? Math.round(dialogRect.height) : null,
      headerHeight: headerRect ? Math.round(headerRect.height) : null,
      drawerCoversViewport: drawerRect
        ? Math.abs(drawerRect.height - vh) <= 2 && drawerRect.top <= 1
        : false,
      dialogCoversViewport: dialogRect
        ? Math.abs(dialogRect.height - vh) <= 2 && dialogRect.top <= 1
        : false,
      drawerParentIsBody: drawerRoot?.parentElement === document.body,
      visiblePrimaries,
      hasStartProject: labels.includes("Start a Project"),
      labelsPresent: {
        Solutions: labels.includes("Solutions"),
        Work: labels.includes("Work"),
        "How We Work": labels.includes("How We Work"),
        Academy: labels.includes("Academy"),
        Insights: labels.includes("Insights"),
        Company: labels.includes("Company"),
      },
    };
  }, viewport.height);

  rows.push({ ...viewport, ...result });
}

await browser.close();
console.log(JSON.stringify(rows, null, 2));
