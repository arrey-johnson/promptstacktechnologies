/**
 * Capture Epic 6 conversion UX screenshots for visual review.
 * Usage: MEASURE_URL=http://localhost:3006 node scripts/capture-start-a-project-review.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = (process.env.MEASURE_URL || "http://localhost:3006").replace(
  /\/$/,
  "",
);
const outDir = path.join(
  process.cwd(),
  ".data",
  "review-screenshots",
  "epic-6-conversion",
);

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

async function shot(page, name) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`Wrote ${file}`);
}

async function open(page, route) {
  const url = `${baseUrl}${route}`;
  console.log("Opening", url);
  const resp = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  console.log("Status", resp?.status());
  await new Promise((r) => setTimeout(r, 1500));
  return resp;
}

try {
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
  await open(desktop, "/start-a-project");

  const desktopReady = await desktop.evaluate(() => ({
    hasForm: !!document.querySelector(
      'form[data-analytics="project_inquiry_form"]',
    ),
    h1: document.querySelector("h1")?.textContent?.trim() ?? null,
  }));
  console.log("Desktop ready", desktopReady);
  if (!desktopReady.hasForm) {
    throw new Error("Start a Project form not found on desktop viewport");
  }

  await desktop.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));
  await shot(desktop, "01-desktop-start-top");

  await desktop.evaluate(() => {
    const sets = document.querySelectorAll("fieldset");
    if (sets[1]) sets[1].scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 300));
  await shot(desktop, "02b-desktop-start-project-questions");

  await desktop.evaluate(() => {
    const btn = document.querySelector(
      '[data-analytics="cta_project_form_submit"]',
    );
    if (btn) {
      btn.scrollIntoView({ block: "end" });
      window.scrollBy(0, -220);
    }
  });
  await new Promise((r) => setTimeout(r, 300));
  await shot(desktop, "02-desktop-start-form-bottom");

  // Validation state
  await desktop.evaluate(() => {
    const form = document.querySelector(
      'form[data-analytics="project_inquiry_form"]',
    );
    if (!(form instanceof HTMLFormElement)) return;
    for (const name of [
      "fullName",
      "workEmail",
      "phone",
      "company",
      "businessProblem",
      "projectDescription",
    ]) {
      const el = form.querySelector(`[name="${name}"]`);
      if (el && "value" in el) el.value = "";
    }
    const help = form.querySelector('[name="helpArea"]');
    if (help && "value" in help) help.value = "";
    const timeline = form.querySelector('[name="timeline"]');
    if (timeline && "value" in timeline) timeline.value = "";
    const privacy = form.querySelector('[name="privacyAcknowledged"]');
    if (privacy && "checked" in privacy) privacy.checked = false;
    form.requestSubmit();
  });
  await new Promise((r) => setTimeout(r, 1500));
  await desktop.evaluate(() => {
    const alert = document.querySelector('[role="alert"]');
    if (alert) alert.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 250));
  await shot(desktop, "03-desktop-validation-errors");

  await desktop.evaluate(() => {
    const err = document.querySelector(".text-red-700, [role='alert']");
    if (err) err.scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 250));
  await shot(desktop, "03b-desktop-validation-errors-fields");

  await open(desktop, "/project-request-received");
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await shot(desktop, "04-desktop-confirmation");
  await desktop.screenshot({
    path: path.join(outDir, "04b-desktop-confirmation-full.png"),
    fullPage: true,
  });
  console.log("Wrote full confirmation desktop");
  await desktop.close();

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 412, height: 915, deviceScaleFactor: 2 });
  await open(mobile, "/start-a-project");
  const mobileReady = await mobile.evaluate(
    () =>
      !!document.querySelector('form[data-analytics="project_inquiry_form"]'),
  );
  if (!mobileReady) throw new Error("Form missing on mobile");

  await mobile.evaluate(() => window.scrollTo(0, 0));
  await shot(mobile, "05-mobile-start-top");

  await mobile.evaluate(() => {
    const el = document.querySelector('[name="fullName"]');
    if (el) el.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 250));
  await shot(mobile, "06-mobile-form-fields");

  await mobile.evaluate(() => {
    const btn = document.querySelector(
      '[data-analytics="cta_project_form_submit"]',
    );
    if (btn) {
      btn.scrollIntoView({ block: "end" });
      window.scrollBy(0, -80);
    }
  });
  await new Promise((r) => setTimeout(r, 250));
  await shot(mobile, "07-mobile-form-bottom-submit");

  await open(mobile, "/project-request-received");
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await shot(mobile, "08-mobile-confirmation");
  await mobile.screenshot({
    path: path.join(outDir, "08b-mobile-confirmation-full.png"),
    fullPage: true,
  });
  console.log("Wrote full confirmation mobile");
  await mobile.close();

  console.log("DONE", outDir);
} finally {
  await browser.close();
}
