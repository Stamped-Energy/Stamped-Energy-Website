import { execSync } from "node:child_process";

import { CONTENT_UPDATED } from "@/lib/seo/constants";

/** Source files used to derive git last-modified for static marketing routes. */
const STATIC_PAGE_SOURCES: Record<string, string[]> = {
  "/": ["app/page.tsx", "lib/content/landing.ts"],
  "/platform": ["app/platform/page.tsx", "lib/content/platform.ts"],
  "/solutions": ["app/solutions/page.tsx", "lib/content/solutions.ts"],
  "/solutions/process": ["app/solutions/[slug]/page.tsx", "lib/content/solutions.ts"],
  "/solutions/quality": ["app/solutions/[slug]/page.tsx", "lib/content/solutions.ts"],
  "/solutions/planning": ["app/solutions/[slug]/page.tsx", "lib/content/solutions.ts"],
  "/solutions/maintenance": ["app/solutions/[slug]/page.tsx", "lib/content/solutions.ts"],
  "/about": ["app/about/page.tsx", "lib/content/about.ts"],
  "/case-studies": ["app/case-studies/page.tsx", "lib/content/caseStudies.ts"],
  "/contact": ["app/contact/page.tsx"],
  "/industries": ["app/industries/page.tsx"],
  "/industries/automotive": ["app/industries/automotive/page.tsx", "lib/content/vertical-pages.ts"],
  "/industries/steel": ["app/industries/[slug]/page.tsx", "lib/content/vertical-pages.ts"],
  "/industries/cement": ["app/industries/[slug]/page.tsx", "lib/content/vertical-pages.ts"],
  "/industries/pharma": ["app/industries/[slug]/page.tsx", "lib/content/vertical-pages.ts"],
  "/industries/chemical": ["app/industries/[slug]/page.tsx", "lib/content/vertical-pages.ts"],
};

function gitLastModifiedForPath(filePath: string): Date | null {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    if (!iso) {
      return null;
    }
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

export function getStaticPageLastModified(path: string): Date {
  const sources = STATIC_PAGE_SOURCES[path];
  if (!sources?.length) {
    return new Date(CONTENT_UPDATED);
  }

  let latest: Date | null = null;
  for (const source of sources) {
    const date = gitLastModifiedForPath(source);
    if (date && (!latest || date > latest)) {
      latest = date;
    }
  }

  return latest ?? new Date(CONTENT_UPDATED);
}
