/** Metadata-only `<title>` overrides for blog posts (visible H1 unchanged). */

const MAX_BLOG_META_TITLE = 60;

export const BLOG_POST_SEO_ABSOLUTE_TITLE: Record<string, string> = {
  "faridabad-precision-plant-floor-lessons":
    "Energy efficiency on a precision plant floor | Stamped",
  "weekend-furnace-holding-heat-treatment-cost":
    "Weekend furnace holding cost in heat treatment | Stamped",
  "metering-to-prescriptions-intelligence-gap":
    "Metering to prescriptions: the intelligence gap | Stamped",
  "2025-energy-reality-check-indian-manufacturers":
    "2025 energy reality for Indian manufacturers | Stamped",
};

export function buildBlogPostAbsoluteTitle(slug: string, postTitle: string): string {
  const override = BLOG_POST_SEO_ABSOLUTE_TITLE[slug];
  if (override) {
    return override;
  }
  const fallback = `${postTitle} | Stamped`;
  if (fallback.length <= MAX_BLOG_META_TITLE) {
    return fallback;
  }
  const suffix = " | Stamped";
  const maxTitleLen = MAX_BLOG_META_TITLE - suffix.length;
  const trimmed = postTitle.slice(0, maxTitleLen).replace(/\s+\S*$/, "").trim();
  return `${trimmed}${suffix}`;
}
