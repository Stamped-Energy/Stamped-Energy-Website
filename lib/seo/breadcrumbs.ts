import type { BreadcrumbList, WithContext } from "schema-dts";

import { SITE_URL } from "@/lib/seo/constants";

export type BreadcrumbSegment = {
  name: string;
  url: string;
};

export function generateBreadcrumbSchema(segments: BreadcrumbSegment[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: segment.name,
      item: segment.url.startsWith("http") ? segment.url : `${SITE_URL}${segment.url}`,
    })),
  };
}

export function breadcrumbHome(): BreadcrumbSegment {
  return { name: "Home", url: SITE_URL };
}
