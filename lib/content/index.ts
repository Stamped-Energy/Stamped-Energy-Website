export { aboutContent, plantDecisionMoves } from "./about";
export { contactContent } from "./contact";
export {
  caseStudiesContent,
  getCaseStudyBySlug,
  getFeaturedCaseStudies,
} from "./caseStudies";
export { platformContent, howItWorksContent } from "./platform";
export {
  industriesContent,
  getAutomotiveSegments,
  getIndustryVertical,
  getVerticalSegments,
  getVerticalPage,
  getLiveVerticals,
  getFeaturedVerticals,
  VERTICAL_SLUGS,
  type VerticalSlug,
} from "./industries";
export { icp, icpBillLine } from "./icp";
export { landingContent } from "./landing";
export { resourcesContent } from "./resources";
export {
  getResourceGuide,
  listResourceGuides,
  RESOURCE_GUIDE_SLUGS,
  type ResourceGuideSlug,
} from "./resource-guides";
export {
  solutionsContent,
  getSolutionPillar,
  type SolutionPillarSlug,
} from "./solutions";
export { footerLinks, navLinks, siteConfig } from "./site";
export type * from "./types";
export type { CaseStudyCategory, CaseStudyDetail } from "./caseStudies";
