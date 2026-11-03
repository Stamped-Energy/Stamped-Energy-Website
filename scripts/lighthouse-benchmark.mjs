#!/usr/bin/env node
/**
 * Run Lighthouse mobile 3x per URL; print medians. Usage:
 *   node scripts/lighthouse-benchmark.mjs <label> <port> <outDir>
 */
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const label = process.argv[2] ?? "run";
const port = process.argv[3] ?? "3000";
const outDir = path.resolve(process.argv[4] ?? `/opt/cursor/artifacts/lighthouse-${label}`);
const base = `http://127.0.0.1:${port}`;

const urls = [
  { key: "home", path: "/" },
  { key: "solutions-planning", path: "/solutions/planning" },
];

const runs = 3;

await mkdir(outDir, { recursive: true });

function median(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function extract(json) {
  const c = json.categories;
  const a = json.audits;
  return {
    perf: Math.round(c.performance.score * 100),
    a11y: Math.round(c.accessibility.score * 100),
    bp: Math.round(c["best-practices"].score * 100),
    seo: Math.round(c.seo.score * 100),
    lcpMs: a["largest-contentful-paint"].numericValue,
    tbtMs: a["total-blocking-time"].numericValue,
    cls: a["cumulative-layout-shift"].numericValue,
  };
}

function failingA11y(json) {
  return Object.values(json.audits)
    .filter((audit) => audit.score !== null && audit.score < 1 && json.categories.accessibility.score < 1)
    .filter((audit) => {
      const ref = audit.id;
      return json.categories.accessibility.auditRefs?.some((r) => r.id === ref && r.weight > 0);
    })
    .map((audit) => ({ id: audit.id, title: audit.title, score: audit.score, description: audit.description?.slice(0, 120) }));
}

const summary = {};

for (const { key, path: urlPath } of urls) {
  const metrics = [];
  let lastJson = null;
  for (let i = 0; i < runs; i += 1) {
    const outPath = path.join(outDir, `${key}-run-${i + 1}.json`);
    execFileSync(
      "npx",
      [
        "--yes",
        "lighthouse@12.6.1",
        `${base}${urlPath}`,
        "--only-categories=performance,accessibility,best-practices,seo",
        "--form-factor=mobile",
        "--screenEmulation.mobile=true",
        "--throttling-method=simulate",
        "--output=json",
        `--output-path=${outPath}`,
        "--quiet",
        "--chrome-flags=--headless --no-sandbox --disable-gpu",
      ],
      { stdio: "inherit" },
    );
    lastJson = JSON.parse(await import("node:fs").then((fs) => fs.readFileSync(outPath, "utf8")));
    metrics.push(extract(lastJson));
  }

  summary[key] = {
    perf: median(metrics.map((m) => m.perf)),
    a11y: median(metrics.map((m) => m.a11y)),
    bp: median(metrics.map((m) => m.bp)),
    seo: median(metrics.map((m) => m.seo)),
    lcpMs: median(metrics.map((m) => m.lcpMs)),
    tbtMs: median(metrics.map((m) => m.tbtMs)),
    cls: median(metrics.map((m) => m.cls)),
    a11yFailures: lastJson ? failingA11y(lastJson) : [],
    runs: metrics,
  };
}

await writeFile(path.join(outDir, "summary.json"), JSON.stringify({ label, port, summary }, null, 2));
console.log(JSON.stringify(summary, null, 2));
