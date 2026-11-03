#!/usr/bin/env node
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:3000/";

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
  defaultViewport: { width: 412, height: 823, deviceScaleFactor: 2.625, isMobile: true },
});

const page = await browser.newPage();
const client = await page.createCDPSession();
await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.emulateNetworkConditions({
  offline: false,
  download: (1.6 * 1024 * 1024) / 8,
  upload: (750 * 1024) / 8,
  latency: 150,
});
await page.setCacheEnabled(false);

await page.evaluateOnNewDocument(() => {
  window.__lcpLog = [];
  window.__paintLog = [];
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        window.__lcpLog.push({
          t: Math.round(e.startTime),
          size: e.size,
          tag: e.element?.tagName,
          cls: e.element?.className?.toString?.().slice(0, 60),
        });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    /* ignore */
  }
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        window.__paintLog.push({ name: e.name, t: Math.round(e.startTime) });
      }
    }).observe({ type: "paint", buffered: true });
  } catch {
    /* ignore */
  }
});

await page.goto(url, { waitUntil: "load", timeout: 120000 });
await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

const report = await page.evaluate(() => {
  const vp = document.querySelector(".value-proposition");
  const r = vp?.getBoundingClientRect();
  return {
    lcpLog: window.__lcpLog,
    paintLog: window.__paintLog,
    pending: document.documentElement.hasAttribute("data-motion-pending"),
    vpVisible: vp
      ? {
          opacity: getComputedStyle(vp).opacity,
          visibility: getComputedStyle(vp).visibility,
          top: r?.top,
          height: r?.height,
        }
      : null,
    nav: performance.getEntriesByType("navigation")[0]
      ? {
          dcl: Math.round(performance.getEntriesByType("navigation")[0].domContentLoadedEventEnd),
          load: Math.round(performance.getEntriesByType("navigation")[0].loadEventEnd),
        }
      : null,
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
