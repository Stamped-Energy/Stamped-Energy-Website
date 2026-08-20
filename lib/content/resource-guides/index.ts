import { discomBillGuide } from "./discom-bill-guide";
import { maximumDemandIndiaGuide } from "./maximum-demand-india";
import { stampedVsEmsGuide } from "./stamped-vs-ems";
import type { ResourceGuideContent } from "./types";

export type ResourceGuideSlug =
  | "stamped-vs-ems"
  | "maximum-demand-india"
  | "discom-bill-guide";

export const RESOURCE_GUIDE_SLUGS: ResourceGuideSlug[] = [
  "stamped-vs-ems",
  "maximum-demand-india",
  "discom-bill-guide",
];

const GUIDES: Record<ResourceGuideSlug, ResourceGuideContent> = {
  "stamped-vs-ems": stampedVsEmsGuide,
  "maximum-demand-india": maximumDemandIndiaGuide,
  "discom-bill-guide": discomBillGuide,
};

export function getResourceGuide(slug: ResourceGuideSlug): ResourceGuideContent {
  return GUIDES[slug];
}

export function listResourceGuides(): ResourceGuideContent[] {
  return RESOURCE_GUIDE_SLUGS.map((slug) => GUIDES[slug]);
}

export type { ResourceGuideContent, ResourceGuideFaqItem, ResourceGuideSection } from "./types";
