import { execSync } from "node:child_process";

/** ISO date fallback when git file history is unavailable at build (e.g. shallow Vercel clone). */
export const STATIC_PAGE_LAST_MODIFIED_FALLBACK: Record<string, string> = {
  "/": "2026-11-15",
  "/platform": "2026-11-15",
  "/products": "2026-11-15",
  "/products/process-quality": "2026-11-15",
  "/products/ask": "2026-11-15",
  "/about": "2026-11-15",
  "/case-studies": "2026-10-08",
  "/contact": "2026-11-15",
  "/industries": "2026-11-15",
  "/industries/automotive": "2026-11-04",
  "/industries/steel": "2026-10-03",
  "/industries/cement": "2026-10-03",
  "/industries/pharma": "2026-10-03",
  "/industries/chemical": "2026-10-03",
};

const PAGE_SEO_SOURCE = "lib/seo/pages.ts";
const PRODUCTS_CONTENT = "lib/content/products.ts";

/** Source files used to derive git last-modified for static marketing routes. */
const STATIC_PAGE_SOURCES: Record<string, string[]> = {
  "/": ["app/(home)/page.tsx", "lib/content/landing.ts", PRODUCTS_CONTENT, PAGE_SEO_SOURCE],
  "/platform": ["app/platform/page.tsx", "lib/content/platform.ts", PAGE_SEO_SOURCE],
  "/products": ["app/products/page.tsx", PRODUCTS_CONTENT, PAGE_SEO_SOURCE],
  "/products/process-quality": ["app/products/[slug]/page.tsx", PRODUCTS_CONTENT, PAGE_SEO_SOURCE],
  "/products/ask": ["app/products/[slug]/page.tsx", PRODUCTS_CONTENT, PAGE_SEO_SOURCE],
  "/about": ["app/about/page.tsx", "lib/content/about.ts"],
  "/case-studies": ["app/case-studies/page.tsx", "lib/content/caseStudies.ts"],
  "/contact": ["app/contact/page.tsx"],
  "/industries": ["app/industries/page.tsx"],
  "/industries/automotive": [
    "app/industries/automotive/page.tsx",
    "lib/content/vertical-pages/automotive.ts",
    PAGE_SEO_SOURCE,
  ],
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

function lastModifiedFromGit(path: string): Date | null {
  const sources = STATIC_PAGE_SOURCES[path];
  if (!sources?.length) {
    return null;
  }

  let latest: Date | null = null;
  for (const source of sources) {
    const date = gitLastModifiedForPath(source);
    if (date && (!latest || date > latest)) {
      latest = date;
    }
  }

  return latest;
}

/** Truthful lastmod for static sitemap entries: git history at build, else maintained fallback map. */
export function getStaticPageLastModified(path: string): Date | undefined {
  const fromGit = lastModifiedFromGit(path);
  if (fromGit) {
    return fromGit;
  }

  const fallback = STATIC_PAGE_LAST_MODIFIED_FALLBACK[path];
  if (!fallback) {
    return undefined;
  }

  return new Date(`${fallback}T00:00:00.000Z`);
}
