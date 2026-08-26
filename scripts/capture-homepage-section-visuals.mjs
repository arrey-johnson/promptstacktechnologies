/**
 * Capture homepage section visuals for art-direction review.
 * MEASURE_URL=http://127.0.0.1:3000 node scripts/capture-homepage-section-visuals.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = (process.env.MEASURE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const outDir = path.join(
  process.cwd(),
  ".data",
  "review-screenshots",
  "homepage-section-visuals",
);

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

async function shot(page, name, fullPage = false) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage });
  console.log("Wrote", file);
}

const desktop = await browser.newPage();
await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await desktop.goto(`${baseUrl}/`, { waitUntil: "networkidle0", timeout: 90000 });
await new Promise((r) => setTimeout(r, 1000));

for (const id of ["software", "automation", "marketing"]) {
  await desktop.evaluate((vid) => {
    document
      .querySelector(`[data-home-visual="${vid}"]`)
      ?.scrollIntoView({ block: "center" });
  }, id);
  await new Promise((r) => setTimeout(r, 400));
  const el = await desktop.$(`[data-home-visual="${id}"]`);
  if (el) {
    const file = path.join(outDir, `desktop-${id}.png`);
    await el.screenshot({ path: file });
    console.log("Wrote", file);
  }
}

await desktop.evaluate(() => {
  document
    .querySelector("[data-section='academy']")
    ?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 400));
const academy = await desktop.$("[data-section='academy']");
if (academy) {
  const file = path.join(outDir, "desktop-academy.png");
  await academy.screenshot({ path: file });
  console.log("Wrote", file);
}

await shot(desktop, "desktop-full-page", true);
await desktop.close();

const mobile = await browser.newPage();
await mobile.setViewport({ width: 412, height: 900, deviceScaleFactor: 1 });
await mobile.goto(`${baseUrl}/`, { waitUntil: "networkidle0", timeout: 90000 });
await new Promise((r) => setTimeout(r, 800));

await mobile.evaluate(() => {
  document
    .querySelector('[data-home-visual="software"]')
    ?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 400));
await shot(mobile, "mobile-software-and-next");

await mobile.evaluate(() => {
  document
    .querySelector('[data-home-visual="automation"]')
    ?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 400));
await shot(mobile, "mobile-automation");

await browser.close();
