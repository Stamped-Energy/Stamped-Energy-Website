/** True when the src is an absolute http(s) URL (not a site-relative path). */
export function isRemoteImageSrc(src: string): boolean {
  return /^https?:\/\//i.test(src.trim());
}

/**
 * Normalize image paths for next/image and <img>.
 * Fixes Windows backslashes and missing leading slashes from CMS/admin input
 * (e.g. `industries\chemical_large_blog.jpg` → `/industries/chemical_large_blog.jpg`).
 */
export function normalizeImageSrc(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) {
    return trimmed;
  }

  if (isRemoteImageSrc(trimmed)) {
    return trimmed;
  }

  let path = trimmed.replace(/\\/g, "/").replace(/^\.\//, "");
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return path.replace(/\/{2,}/g, "/");
}

/** Normalize a nullable CMS cover image path; empty becomes null. */
export function normalizeCoverImageSrc(src: string | null | undefined): string | null {
  if (src == null) {
    return null;
  }

  const normalized = normalizeImageSrc(src);
  return normalized || null;
}
