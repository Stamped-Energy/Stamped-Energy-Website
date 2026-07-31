import { revalidatePath } from "next/cache";

export function revalidateBlogPages(slug?: string) {
  revalidatePath("/case-studies");
  revalidatePath("/blog");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export function revalidateCaseStudyPages(slug?: string) {
  revalidatePath("/case-studies");
  if (slug) {
    revalidatePath(`/case-studies/${slug}`);
  }
}

export function revalidateContentSitemap() {
  revalidatePath("/sitemap.xml");
}

export function revalidateHomepageSpotlight() {
  revalidatePath("/");
  revalidatePath("/platform");
  revalidatePath("/industries");
}
