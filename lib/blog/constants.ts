export const BLOG_CATEGORIES = [
  { id: "ai-manufacturing", label: "Machine learning and AI in manufacturing" },
  { id: "cost-optimization", label: "Cost Optimization" },
  { id: "energy-strategy", label: "Energy Strategy" },
  { id: "industrial-transformation", label: "Industrial Transformation" },
  { id: "performance-governance", label: "Performance Governance" },
  { id: "plant-intelligence", label: "Plant Intelligence" },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export const BLOG_CATEGORY_IDS = BLOG_CATEGORIES.map((category) => category.id);

export function getCategoryLabel(categoryId: string): string {
  return BLOG_CATEGORIES.find((category) => category.id === categoryId)?.label ?? categoryId;
}

export const SESSION_COOKIE = "stamped_blog_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
