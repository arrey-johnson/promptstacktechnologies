import puppeteer from "puppeteer-core";

const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.MEASURE_URL || "http://localhost:3007/";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 900 });
await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

const openBtn = await page.$('button[aria-label="Open menu"]');
const openControls = await page.evaluate(
  (el) => el?.getAttribute("aria-controls"),
  openBtn,
);
await openBtn.click();
await page.waitForSelector('[data-mobile-nav-drawer="true"]');
await new Promise((r) => setTimeout(r, 50));

const afterOpen = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const active = document.activeElement;
  return {
    dialogModal: dialog?.getAttribute("aria-modal"),
    dialogLabel: dialog?.getAttribute("aria-label"),
    bodyOverflow: document.body.style.overflow,
    activeAriaLabel: active?.getAttribute("aria-label"),
    activeTag: active?.tagName,
    drawerParentIsBody:
      document.querySelector('[data-mobile-nav-drawer="true"]')
        ?.parentElement === document.body,
  };
});

// Expand Solutions + Company
await page.evaluate(() => {
  const buttons = Array.from(
    document.querySelectorAll('[role="dialog"] button'),
  );
  buttons.find((b) => b.textContent?.trim() === "Solutions")?.click();
  buttons.find((b) => b.textContent?.trim() === "Company")?.click();
});
await new Promise((r) => setTimeout(r, 50));

const expanded = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const labels = Array.from(dialog?.querySelectorAll("a, button") || []).map(
    (el) => el.textContent?.trim(),
  );
  const solutionsBtn = Array.from(
    dialog?.querySelectorAll("button") || [],
  ).find((b) => b.textContent?.trim() === "Solutions");
  const companyBtn = Array.from(dialog?.querySelectorAll("button") || []).find(
    (b) => b.textContent?.trim() === "Company",
  );
  return {
    labels,
    solutionsExpanded: solutionsBtn?.getAttribute("aria-expanded"),
    companyExpanded: companyBtn?.getAttribute("aria-expanded"),
    solutionsControls: solutionsBtn?.getAttribute("aria-controls"),
    companyControls: companyBtn?.getAttribute("aria-controls"),
  };
});

// Escape closes
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 50));
const afterEscape = await page.evaluate(() => ({
  drawerPresent: !!document.querySelector('[data-mobile-nav-drawer="true"]'),
  bodyOverflow: document.body.style.overflow,
  activeAriaLabel: document.activeElement?.getAttribute("aria-label"),
}));

console.log(
  JSON.stringify(
    { openControls, afterOpen, expanded, afterEscape },
    null,
    2,
  ),
);
await browser.close();
