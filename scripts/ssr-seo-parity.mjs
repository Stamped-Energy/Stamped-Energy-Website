#!/usr/bin/env node
/**
 * Compare SSR HTML text + JSON-LD between two local ports (before/after).
 * Usage: node scripts/ssr-seo-parity.mjs <beforePort> <afterPort>
 */
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const beforePort = process.argv[2] ?? "3000";
const afterPort = process.argv[3] ?? "3001";

const paths = [
  "/",
  "/platform",
  "/solutions",
  "/solutions/process",
  "/solutions/quality",
  "/solutions/planning",
  "/solutions/maintenance",
  "/about",
  "/case-studies",
  "/contact",
  "/industries",
  "/industries/automotive",
  "/industries/steel",
  "/industries/cement",
  "/industries/pharma",
  "/industries/chemical",
];

function fetchHtml(port, urlPath) {
  return execFileSync("curl", ["-sL", `http://127.0.0.1:${port}${urlPath}`], { encoding: "utf8" });
}

function extractText(html) {
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const text = withoutScripts
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    blocks.push(match[1].trim());
  }
  return blocks.join("\n---\n");
}

const report = [];

for (const urlPath of paths) {
  const beforeHtml = fetchHtml(beforePort, urlPath);
  const afterHtml = fetchHtml(afterPort, urlPath);
  const beforeText = extractText(beforeHtml);
  const afterText = extractText(afterHtml);
  const beforeLd = extractJsonLd(beforeHtml);
  const afterLd = extractJsonLd(afterHtml);

  const textMatch = beforeText === afterText;
  const ldMatch = beforeLd === afterLd;

  report.push({
    path: urlPath,
    textMatch,
    jsonLdMatch: ldMatch,
    textLenBefore: beforeText.length,
    textLenAfter: afterText.length,
  });

  if (!textMatch || !ldMatch) {
    console.error("MISMATCH", urlPath, { textMatch, ldMatch });
  }
}

const outDir = "/opt/cursor/artifacts/seo-parity";
await writeFile(path.join(outDir, "report.json"), JSON.stringify({ beforePort, afterPort, report }, null, 2));

const failed = report.filter((r) => !r.textMatch || !r.jsonLdMatch);
console.log(JSON.stringify({ ok: failed.length === 0, failed: failed.length, total: report.length }, null, 2));
process.exit(failed.length === 0 ? 0 : 1);
