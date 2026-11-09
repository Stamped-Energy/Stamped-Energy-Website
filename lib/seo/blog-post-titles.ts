import { excerptToMetaDescription } from "@/lib/seo/meta-description";

/** Metadata-only `<title>` overrides for blog posts (visible H1 unchanged). */

const MAX_BLOG_META_TITLE = 60;

export const BLOG_POST_SEO_ABSOLUTE_TITLE: Record<string, string> = {
  "shift-start-die-casting-margins": "Shift-start maximum demand charges in die casting | Stamped",
  "why-shift-start-kills-die-casting-margins": "Shift-start maximum demand charges in die casting | Stamped",
  "faridabad-precision-plant-floor-lessons":
    "Energy efficiency on a precision plant floor | Stamped",
  "weekend-furnace-holding-heat-treatment-cost":
    "Weekend furnace holding cost in heat treatment | Stamped",
  "weekend-furnace-holding-silent-cost":
    "Weekend furnace holding cost in heat treatment | Stamped",
  "metering-to-prescriptions-intelligence-gap":
    "Metering to prescriptions: the intelligence gap | Stamped",
  "from-metering-to-prescriptions-intelligence-gap":
    "Metering to prescriptions: the intelligence gap | Stamped",
  "2025-energy-reality-check-indian-manufacturers":
    "2025 energy reality for Indian manufacturers | Stamped",
};

/** Metadata-only meta descriptions (visible excerpt / card copy unchanged). */
export const BLOG_POST_SEO_META_DESCRIPTION: Record<string, string> = {
  "shift-start-die-casting-margins":
    "Billed maximum demand (MD) charges from shift-start overlap: furnace pre-heat, holding loads and the incomer spike before the first pour, in rupees.",
  "why-shift-start-kills-die-casting-margins":
    "Billed maximum demand (MD) charges from shift-start overlap: furnace pre-heat, holding loads and the incomer spike before the first pour, in rupees.",
  "weekend-furnace-holding-heat-treatment-cost":
    "Batch furnaces held temperature over empty weekends, 15-25% of furnace energy with no parts scheduled.",
  "weekend-furnace-holding-silent-cost":
    "Batch furnaces held temperature over empty weekends, 15-25% of furnace energy with no parts scheduled.",
  "2025-energy-reality-check-indian-manufacturers":
    "Tariffs, demand charges, and SEC pressure are reshaping unit economics. What plant heads should plan for in 2026.",
  "metering-to-prescriptions-intelligence-gap":
    "Most plants have meters. Few have intelligence that tells a shift supervisor what to do tomorrow morning.",
  "from-metering-to-prescriptions-intelligence-gap":
    "Most plants have meters. Few have intelligence that tells a shift supervisor what to do tomorrow morning.",
};

export function buildBlogPostMetaDescription(slug: string, excerpt: string): string {
  const override = BLOG_POST_SEO_META_DESCRIPTION[slug];
  if (override) {
    return override;
  }
  return excerptToMetaDescription(excerpt);
}

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
