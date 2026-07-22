/**
 * Captures live screenshots of the studio's real client sites/demos
 * for the works gallery covers. Run: node scripts/capture-works.mjs
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = join(process.cwd(), "public", "media");

const sites = [
  { id: "work1", url: "https://www.emberlinechimney.com/" },
  { id: "work2", url: "https://apex-ride-final.vercel.app/" },
  { id: "work3", url: "https://chino-electrodomesticos.vercel.app/" },
  { id: "work4", url: "https://landscaping-premium-demo.vercel.app/" },
  { id: "work5", url: "https://tapatias-premium-demo.vercel.app/" },
];

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

for (const site of sites) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  try {
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60000 });
    // let intros/loaders/animations settle
    await new Promise((r) => setTimeout(r, 6000));
    // nudge past any loader, then return to top
    await page.evaluate(() => window.scrollTo(0, 200));
    await new Promise((r) => setTimeout(r, 800));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1200));
    const title = await page.title();
    await page.screenshot({
      path: join(OUT, `${site.id}.webp`),
      type: "webp",
      quality: 88,
    });
    console.log(`${site.id} <- ${site.url} | "${title}"`);
  } catch (err) {
    console.error(`${site.id} FAILED:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("done");
