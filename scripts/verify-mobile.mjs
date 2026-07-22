/**
 * Mobile parity verification — drives the full experience at 375x812 in
 * headless Chrome (rAF runs there) and screenshots every stage.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:/Users/alexr/AppData/Local/Temp/claude/D--Programacion-Claude-Proyecto-pro-leyva-web-studio-v2/a6a7b382-2cbf-4531-a70f-efd030d0e420/scratchpad/shots";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--autoplay-policy=no-user-gesture-required",
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
page.on("console", (m) => {
  if (m.type() === "error") console.log("PAGE-ERROR:", m.text().slice(0, 200));
});
await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4500)); // loader + hero reveal

const vh = 812;
const scrollTo = async (px) => {
  await page.evaluate((y) => {
    const L = window._stLenis;
    if (L) L.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  }, Math.round(px));
  await new Promise((r) => setTimeout(r, 1800)); // let the lerp converge
};

const shot = async (name) => {
  await page.screenshot({ path: join(OUT, `${name}.png`) });
  console.log("shot:", name);
};

// element-anchored offsets
const anchors = await page.evaluate(() => {
  const top = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  };
  return {
    stm: top(".st-stm"),
    ring: top("#servicios") ?? top(".st-ring-wrap") ?? top("[class*='st-ring']"),
    wk: top(".st-wk-track"),
    packs: top("#paquetes"),
    contact: top("#contacto"),
    footer: top(".st-footer"),
    docH: document.body.scrollHeight,
  };
});
console.log("anchors:", JSON.stringify(anchors));

const dark = 4.5 * vh;
await shot("01-hero");
await scrollTo(dark * 0.12); await shot("02-reveal");
await scrollTo(dark * 0.3);  await shot("03-waves");
await scrollTo(dark * 0.52); await shot("04-marquee-tumble");
await scrollTo(dark * 0.7);  await shot("05-spin");
await scrollTo(dark * 0.95); await shot("06-zoom-newtext");
if (anchors.stm) { await scrollTo(anchors.stm + vh * 0.6); await shot("07-stm"); }
if (anchors.ring) { await scrollTo(anchors.ring + vh * 0.4); await shot("08-ring"); }
if (anchors.wk) {
  await scrollTo(anchors.wk - vh * 0.2); await shot("09-wk-header");
  await scrollTo(anchors.wk + vh * 0.65); await shot("10-wk-expanding");
  await scrollTo(anchors.wk + vh * 1.35); await shot("11-wk-full");
  await scrollTo(anchors.wk + vh * 2.4); await shot("12-wk-wipe");
}
if (anchors.packs) { await scrollTo(anchors.packs); await shot("13-packages"); }
if (anchors.contact) { await scrollTo(anchors.contact); await shot("14-contact"); }
await scrollTo(anchors.docH); await shot("15-footer");

// hard checks
const checks = await page.evaluate(() => {
  const out = {};
  out.overflowX = document.documentElement.scrollWidth - window.innerWidth;
  const mask = document.querySelector(".st-dark-mask");
  out.maskClip = mask ? mask.style.clipPath : null;
  const frame = document.querySelector(".st-wk-frame");
  out.frameW = frame ? frame.style.width : null;
  return out;
});
console.log("checks:", JSON.stringify(checks));

await browser.close();
console.log("DONE");
