import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

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
  executablePath:
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

async function scrollNearSubmit(page, offset = 200) {
  return page.evaluate((pad) => {
    const btn = document.querySelector(
      '[data-analytics="cta_project_form_submit"]',
    );
    if (!btn) return { ok: false };
    const absoluteTop =
      btn.getBoundingClientRect().top +
      (window.scrollY || document.documentElement.scrollTop || 0);
    const target = Math.max(0, absoluteTop - pad);
    document.documentElement.scrollTop = target;
    document.body.scrollTop = target;
    window.scrollTo({ top: target, left: 0, behavior: "instant" });
    return {
      ok: true,
      target,
      y: window.scrollY || document.documentElement.scrollTop,
      btnTop: btn.getBoundingClientRect().top,
      docH: document.documentElement.scrollHeight,
      btnText: btn.textContent?.trim() ?? "",
    };
  }, offset);
}

try {
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
  await desktop.goto(`${baseUrl}/start-a-project`, {
    waitUntil: "domcontentloaded",
  });
  await new Promise((r) => setTimeout(r, 1500));

  const options = await desktop.evaluate(() => {
    const sel = document.querySelector('select[name="helpArea"]');
    return sel
      ? Array.from(sel.options).map((o) => o.textContent?.trim() ?? "")
      : [];
  });
  await writeFile(
    path.join(outDir, "help-area-options.json"),
    JSON.stringify(options, null, 2),
  );
  console.log("help options", options);

  await desktop.evaluate(() => {
    const sel = document.querySelector('select[name="helpArea"]');
    if (!sel) return;
    sel.scrollIntoView({ block: "center" });
    sel.size = Math.min(sel.options.length, 6);
  });
  await new Promise((r) => setTimeout(r, 250));
  await desktop.screenshot({
    path: path.join(outDir, "02d-desktop-help-area-options.png"),
  });
  await desktop.evaluate(() => {
    const sel = document.querySelector('select[name="helpArea"]');
    if (sel) sel.size = 1;
  });

  const desktopScroll = await scrollNearSubmit(desktop, 180);
  console.log("desktop scroll", desktopScroll);
  await new Promise((r) => setTimeout(r, 400));
  await desktop.screenshot({
    path: path.join(outDir, "02c-desktop-privacy-turnstile-submit.png"),
  });
  // Also full-page form for complete visual review of length
  await desktop.screenshot({
    path: path.join(outDir, "02e-desktop-start-fullpage.png"),
    fullPage: true,
  });
  console.log("desktop bottom ok");
  await desktop.close();

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 412, height: 915, deviceScaleFactor: 2 });
  await mobile.goto(`${baseUrl}/start-a-project`, {
    waitUntil: "domcontentloaded",
  });
  await new Promise((r) => setTimeout(r, 1500));
  const mobileScroll = await scrollNearSubmit(mobile, 420);
  console.log("mobile scroll", mobileScroll);
  await new Promise((r) => setTimeout(r, 400));
  await mobile.screenshot({
    path: path.join(outDir, "07-mobile-form-bottom-submit.png"),
  });
  await mobile.screenshot({
    path: path.join(outDir, "07b-mobile-start-fullpage.png"),
    fullPage: true,
  });
  console.log("mobile bottom ok");
  await mobile.close();
} finally {
  await browser.close();
}
