import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 650 });
await page.goto("http://localhost:3007/", { waitUntil: "domcontentloaded" });
await page.click('button[aria-label="Open menu"]');
await page.waitForSelector('[role="dialog"]');

await page.evaluate(() => {
  const btn = Array.from(
    document.querySelectorAll('[role="dialog"] button'),
  ).find((b) => b.textContent?.trim() === "Solutions");
  btn?.click();
});
await new Promise((r) => setTimeout(r, 80));

const sol = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const labels = Array.from(dialog?.querySelectorAll("a, button") || [])
    .map((el) => el.textContent?.trim())
    .filter(Boolean);
  const scroll = dialog?.querySelector(".overflow-y-auto");
  return {
    labels,
    scrollHeight: scroll?.scrollHeight,
    clientHeight: scroll?.clientHeight,
    canScroll: scroll ? scroll.scrollHeight > scroll.clientHeight : null,
    solutionsExpanded: Array.from(dialog?.querySelectorAll("button") || [])
      .find((b) => b.textContent?.trim() === "Solutions")
      ?.getAttribute("aria-expanded"),
  };
});

console.log(JSON.stringify(sol, null, 2));
await browser.close();
