import puppeteer from "puppeteer-core";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.MEASURE_URL || "http://localhost:3002/";

const widths = [1440, 1280, 1200, 1152, 1100, 1024, 1023, 430, 390, 360];

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();

async function measure(width) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("header", { timeout: 10000 });

  return page.evaluate(() => {
    const header = document.querySelector("header");
    const bar = header?.firstElementChild;
    const primaryNav = document.querySelector('nav[aria-label="Primary"]');
    const menuButton = document.querySelector('button[aria-label="Open menu"], button[aria-label="Close menu"]');
    const cta = Array.from(document.querySelectorAll("header a")).find((a) => {
      const isCta = a.textContent?.trim() === "Start a Project";
      if (!isCta) return false;
      // Ignore drawer links; only count header-bar CTA visibility.
      return !a.closest('[role="dialog"]');
    });

    const overflowX =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;

    const barRect = bar?.getBoundingClientRect();
    const children = bar ? Array.from(bar.children) : [];
    const usedWidth = children.reduce((sum, el) => {
      const style = getComputedStyle(el);
      const margin =
        parseFloat(style.marginLeft || "0") + parseFloat(style.marginRight || "0");
      return sum + el.getBoundingClientRect().width + margin;
    }, 0);

    const gap = bar ? parseFloat(getComputedStyle(bar).columnGap || getComputedStyle(bar).gap || "0") : 0;
    const paddingLeft = bar ? parseFloat(getComputedStyle(bar).paddingLeft || "0") : 0;
    const paddingRight = bar ? parseFloat(getComputedStyle(bar).paddingRight || "0") : 0;

    const desktopNavVisible =
      !!primaryNav && getComputedStyle(primaryNav).display !== "none";
    const menuVisible =
      !!menuButton && getComputedStyle(menuButton).display !== "none" && menuButton.offsetParent !== null;
    const ctaVisible =
      !!cta && getComputedStyle(cta).display !== "none" && cta.offsetParent !== null;

    const navLinks = primaryNav
      ? Array.from(primaryNav.querySelectorAll("a, button")).map((el) => ({
          text: el.textContent?.trim(),
          wraps:
            el.scrollHeight > el.clientHeight + 2 ||
            (el instanceof HTMLElement && el.offsetHeight > 40),
        }))
      : [];

    return {
      desktopNavVisible,
      menuVisible,
      ctaVisible,
      overflowX,
      barWidth: barRect?.width ?? null,
      usedWidth: Math.round(usedWidth + gap * Math.max(children.length - 1, 0)),
      padding: Math.round(paddingLeft + paddingRight),
      freeSpace: barRect
        ? Math.round(
            barRect.width -
              usedWidth -
              gap * Math.max(children.length - 1, 0),
          )
        : null,
      navLabels: navLinks.map((n) => n.text),
      anyNavWrap: navLinks.some((n) => n.wraps),
    };
  });
}

const rows = [];
for (const width of widths) {
  const result = await measure(width);
  rows.push({ width, ...result });
}

await browser.close();
console.log(JSON.stringify(rows, null, 2));
