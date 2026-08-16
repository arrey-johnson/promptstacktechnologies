import puppeteer from "puppeteer-core";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.MEASURE_URL || "http://localhost:3005/";
const widths = [320, 360, 390, 430, 768, 1023, 1024];

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();

async function measure(width) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("header");

  return page.evaluate(async () => {
    const header = document.querySelector("header");
    const logoImg = header?.querySelector('img[alt="Promptstack Technologies"]');
    const menuButton = header?.querySelector(
      'button[aria-label="Open menu"], button[aria-label="Close menu"]',
    );
    const headerCta = Array.from(header?.querySelectorAll("a") || []).find(
      (a) =>
        a.textContent?.trim() === "Start a Project" &&
        !a.closest('[role="dialog"]') &&
        a.offsetParent !== null &&
        getComputedStyle(a).display !== "none",
    );
    const desktopNav = document.querySelector('nav[aria-label="Primary"]');
    const desktopNavVisible =
      !!desktopNav && getComputedStyle(desktopNav).display !== "none";

    const logoRect = logoImg?.getBoundingClientRect();
    const menuRect = menuButton?.getBoundingClientRect();
    const gap =
      logoRect && menuRect
        ? Math.round(menuRect.left - logoRect.right)
        : null;

    // Open drawer if menu exists
    let drawer = null;
    if (menuButton && getComputedStyle(menuButton).display !== "none") {
      menuButton.click();
      await new Promise((r) => setTimeout(r, 50));
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog) {
        const labels = Array.from(
          dialog.querySelectorAll("a, button"),
        ).map((el) => el.textContent?.trim());
        drawer = {
          hasSolutions: labels.includes("Solutions"),
          hasWork: labels.includes("Work"),
          hasHowWeWork: labels.includes("How We Work"),
          hasAcademy: labels.includes("Academy"),
          hasInsights: labels.includes("Insights"),
          hasCompany: labels.includes("Company"),
          hasStartProject: labels.includes("Start a Project"),
          software: !!dialog.querySelector('a[href="/solutions/software"]'),
          ai: !!dialog.querySelector('a[href="/solutions/ai-automation"]'),
          marketing: !!dialog.querySelector(
            'a[href="/solutions/digital-marketing"]',
          ),
          allSolutions: !!dialog.querySelector('a[href="/solutions"]'),
          about: !!dialog.querySelector('a[href="/company/about"]'),
          contact: !!dialog.querySelector('a[href="/contact"]'),
        };
      }
    }

    return {
      desktopNavVisible,
      headerCtaVisible: !!headerCta,
      menuVisible:
        !!menuButton &&
        getComputedStyle(menuButton).display !== "none" &&
        menuButton.offsetParent !== null,
      logoWidth: logoRect ? Math.round(logoRect.width) : null,
      logoHeight: logoRect ? Math.round(logoRect.height) : null,
      headerHeight: header
        ? Math.round(header.getBoundingClientRect().height)
        : null,
      gapLogoMenu: gap,
      overflowX:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      drawer,
    };
  });
}

const rows = [];
for (const width of widths) {
  rows.push({ width, ...(await measure(width)) });
}
await browser.close();
console.log(JSON.stringify(rows, null, 2));
