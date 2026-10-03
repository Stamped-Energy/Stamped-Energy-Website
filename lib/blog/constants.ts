export const BLOG_CATEGORIES = [
  { id: "ai-manufacturing", label: "Machine learning and AI in plants" },
  { id: "cost-optimization", label: "Cost and margins" },
  { id: "energy-strategy", label: "Energy" },
  { id: "industrial-transformation", label: "Running the plant" },
  { id: "performance-governance", label: "Measuring results" },
  { id: "plant-intelligence", label: "Plant data" },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export const BLOG_CATEGORY_IDS = BLOG_CATEGORIES.map((category) => category.id);

export function getCategoryLabel(categoryId: string): string {
  return BLOG_CATEGORIES.find((category) => category.id === categoryId)?.label ?? categoryId;
}

export const SESSION_COOKIE = "stamped_blog_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
