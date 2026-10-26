import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getStaticPageLastModified } from "../lib/seo/sitemap-lastmod";
import { HOME_CANONICAL_URL, absoluteUrl } from "../lib/seo/metadata";
import { organizationSchema } from "../lib/seo/schemas";

const root = join(import.meta.dirname, "..");

function readBuiltHtml(route: string): string {
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  return readFileSync(join(root, ".next/server/app", file), "utf-8");
}

function extractMeta(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match?.[1] ?? null;
}

const failures: string[] = [];

if (HOME_CANONICAL_URL !== "https://stamped.work/") {
  failures.push(`HOME_CANONICAL_URL expected https://stamped.work/, got ${HOME_CANONICAL_URL}`);
}

const homeHtml = readBuiltHtml("/");
const homeCanonical = extractMeta(homeHtml, /<link rel="canonical" href="([^"]+)"/);
const homeOgUrl = extractMeta(homeHtml, /property="og:url" content="([^"]+)"/);
if (homeCanonical !== "https://stamped.work/") {
  failures.push(`Home canonical expected https://stamped.work/, got ${homeCanonical}`);
}
if (homeOgUrl !== "https://stamped.work/") {
  failures.push(`Home og:url expected https://stamped.work/, got ${homeOgUrl}`);
}

const aboutCanonical = extractMeta(readBuiltHtml("/about"), /<link rel="canonical" href="([^"]+)"/);
if (aboutCanonical !== "https://stamped.work/about") {
  failures.push(`About canonical expected https://stamped.work/about, got ${aboutCanonical}`);
}

const lastmods = ["/", "/about", "/solutions/process"].map((path) => ({
  path,
  date: getStaticPageLastModified(path).toISOString(),
}));
const uniqueLastmods = new Set(lastmods.map((entry) => entry.date));
if (uniqueLastmods.size < 2) {
  failures.push(`Expected varied sitemap lastmod; got ${JSON.stringify(lastmods)}`);
}

const llms = readFileSync(join(root, "public/llms.txt"), "utf-8");
if (!llms.includes("## About the name")) {
  failures.push("public/llms.txt missing ## About the name section");
}

const orgJson = JSON.stringify(organizationSchema);
if (!orgJson.includes("disambiguatingDescription")) {
  failures.push("Organization schema missing disambiguatingDescription");
}
if (orgJson.includes('"@type":"Product"') || orgJson.includes('"@type": "Product"')) {
  failures.push("Organization schema should not contain Product items");
}

function assertNoProductJsonLd(route: string, html: string): void {
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch {
      failures.push(`Invalid JSON-LD on ${route}`);
      continue;
    }
    if (/"@type"\s*:\s*"Product"/.test(block[1])) {
      failures.push(`JSON-LD on ${route} contains @type Product`);
    }
  }
}

for (const route of ["/", "/about", "/solutions/process"]) {
  const html =
    route === "/solutions/process"
      ? readFileSync(join(root, ".next/server/app/solutions/process.html"), "utf-8")
      : readBuiltHtml(route);
  assertNoProductJsonLd(route, html);
}

if (absoluteUrl("/solutions/process") !== "https://stamped.work/solutions/process") {
  failures.push("Non-root absoluteUrl should not add trailing slash");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("seo:metadata-verify ok");
console.log(`  home canonical + og:url: ${HOME_CANONICAL_URL}`);
console.log(`  sample lastmods: ${lastmods.map((e) => `${e.path}=${e.date}`).join(", ")}`);
