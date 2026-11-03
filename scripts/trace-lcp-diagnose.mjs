#!/usr/bin/env node
import puppeteer from "puppeteer-core";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const url = process.argv[2] ?? "http://127.0.0.1:3000/";
const outDir = path.resolve(process.argv[3] ?? "/opt/cursor/artifacts/lcp-trace");
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
  defaultViewport: { width: 412, height: 823, deviceScaleFactor: 2.625, isMobile: true },
});

const page = await browser.newPage();
await page.emulateNetworkConditions({
  offline: false,
  download: (1.6 * 1024 * 1024) / 8,
  upload: (750 * 1024) / 8,
  latency: 150,
});
await page.setCacheEnabled(false);

const client = await page.createCDPSession();

const navStart = Date.now();
await page.goto(url, { waitUntil: "load", timeout: 120000 });

await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 300)));

const dump = await page.evaluate(() => {
  const vp = document.querySelector(".value-proposition");
  const getChain = (el) => {
    const chain = [];
    let n = el;
    while (n && chain.length < 10) {
      const s = getComputedStyle(n);
      chain.push({
        tag: n.tagName,
        id: n.id || undefined,
        cls: (n.className?.toString?.() || "").slice(0, 100),
        opacity: s.opacity,
        visibility: s.visibility,
        transform: s.transform,
        cv: s.contentVisibility,
        display: s.display,
      });
      n = n.parentElement;
    }
    return chain;
  };
  const paints = performance.getEntriesByType("paint").map((e) => ({
    name: e.name,
    startTime: Math.round(e.startTime),
  }));
  const lcpEntries = performance.getEntriesByType("largest-contentful-paint").map((e) => ({
    startTime: Math.round(e.startTime),
    size: e.size,
    id: e.element?.id,
    cls: e.element?.className?.toString?.().slice(0, 80),
    tag: e.element?.tagName,
  }));
  const nav = performance.getEntriesByType("navigation")[0];
  return {
    paints,
    lcpEntries,
    domInteractive: nav ? Math.round(nav.domInteractive) : null,
    domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
    loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
    htmlMotionPending: document.documentElement.hasAttribute("data-motion-pending"),
    vp: vp
      ? {
          text: vp.textContent?.slice(0, 60),
          rect: vp.getBoundingClientRect(),
          chain: getChain(vp),
        }
      : null,
  };
});

console.log(
  JSON.stringify(
    {
      navWallMs: Date.now() - navStart,
      dump,
    },
    null,
    2,
  ),
);

await browser.close();
