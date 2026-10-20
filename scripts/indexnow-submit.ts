/**
 * Submit sitemap URLs to IndexNow (Bing, Yandex, and partners).
 * Manual use only — not wired into CI.
 *
 * Usage:
 *   NEXT_PUBLIC_SITE_URL=https://stamped.work npx tsx scripts/indexnow-submit.ts
 *   npx tsx scripts/indexnow-submit.ts https://stamped.work
 */

import { INDEXNOW_KEY } from "../lib/seo/indexnow";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function siteOriginFromArgs(): string {
  const arg = process.argv[2]?.trim();
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const origin = arg ?? fromEnv;
  if (!origin) {
    console.error("Set NEXT_PUBLIC_SITE_URL or pass the site origin as the first argument.");
    process.exit(1);
  }
  return origin.replace(/\/$/, "");
}

async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap (${response.status}): ${sitemapUrl}`);
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (urls.length === 0) {
    throw new Error(`No <loc> entries found in ${sitemapUrl}`);
  }
  return urls;
}

async function main(): Promise<void> {
  const origin = siteOriginFromArgs();
  const host = new URL(origin).host;
  const sitemapUrl = `${origin}/sitemap.xml`;
  const urlList = await fetchSitemapUrls(sitemapUrl);

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    console.error(`IndexNow submit failed (${response.status}):`, text || "(empty body)");
    process.exit(1);
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s) from ${sitemapUrl} (${response.status}).`);
  if (text) {
    console.log(text);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
