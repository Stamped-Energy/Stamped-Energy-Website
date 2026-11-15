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
  getIndustryNavItems,
  getIndustryVertical,
  getVerticalPage,
  getLiveVerticals,
  VERTICAL_SLUGS,
  type VerticalSlug,
} from "./industries";
export { icp } from "./icp";
export { landingContent } from "./landing";
export { resourcesContent } from "./resources";
export {
  solutionsContent,
  getSolutionArea,
  type SolutionArea,
  type SolutionAreaSlug,
} from "./solutions";
export {
  productsContent,
  allProducts,
  getProduct,
  getLiveProducts,
  getProductByName,
  isProductSlug,
  PRODUCT_SLUGS,
  type Product,
  type ProductSlug,
  type ProductStatus,
  type ProductNavItem,
  type ProductsContent,
} from "./products";
export { footerLinks, navLinks, siteConfig } from "./site";
export type * from "./types";
export type { CaseStudyCategory, CaseStudyDetail } from "./caseStudies";
