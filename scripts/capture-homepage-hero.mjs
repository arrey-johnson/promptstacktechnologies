/**
 * Visual QA capture for homepage Hero asset integration.
 * MEASURE_URL=http://127.0.0.1:3000 node scripts/capture-homepage-hero.mjs
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
  "homepage-hero",
);

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

async function capture(width, height, name) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  const resp = await page.goto(`${baseUrl}/`, {
    waitUntil: "networkidle0",
    timeout: 90000,
  });
  console.log(name, "status", resp?.status());
  await page.waitForSelector("[data-section='hero'] img", { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 800));
  const hero = await page.$("[data-section='hero']");
  const file = path.join(outDir, `${name}.png`);
  await hero.screenshot({ path: file });
  const box = await hero.boundingBox();
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  console.log(name, "heroBox", box, "hOverflow", overflow, "->", file);
  await page.close();
}

await capture(1440, 900, "hero-desktop-1440");
await capture(412, 900, "hero-mobile-412");
await browser.close();
