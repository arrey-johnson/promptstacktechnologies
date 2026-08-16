import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 360, height: 800 });
await page.goto("http://localhost:3005/", { waitUntil: "domcontentloaded" });
await page.click('button[aria-label="Open menu"]');
await page.waitForSelector('[role="dialog"]');

await page.evaluate(() => {
  const btn = Array.from(
    document.querySelectorAll('[role="dialog"] button'),
  ).find((b) => b.textContent?.includes("Solutions"));
  btn?.click();
});
await new Promise((r) => setTimeout(r, 100));

const hrefs = await page.$$eval('[role="dialog"] a', (as) =>
  as.map((a) => ({ href: a.getAttribute("href"), text: a.textContent?.trim() })),
);
console.log(JSON.stringify(hrefs, null, 2));
await browser.close();
