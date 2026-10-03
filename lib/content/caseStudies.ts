export type CaseStudyCategory =
  | "all"
  | "unit-economics"
  | "asset-efficiency"
  | "demand-management"
  | "process-optimization";

export type CaseStudyCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  clientContext: string;
  category: Exclude<CaseStudyCategory, "all">;
  categoryLabel: string;
  featured?: boolean;
  tag?: string;
  imageSrc: string;
  imageAlt: string;
  metrics: { label: string; value: string }[];
};

export type CaseStudyDetail = CaseStudyCard & {
  industry: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  disclaimer?: string;
};

const CASE_IMAGES = {
  forging: "/industries/forging.jpg",
} as const;

/**
 * /case-studies hub chrome ("Notes from the plant floor", copy v3).
 * Published articles and case studies come from the CMS. The static reference studies that carried
 * unbacked % and rupee figures were removed (ADR-033); add entries here only with pilot-backed numbers.
 */
export const caseStudiesContent = {
  hero: {
    eyebrow: "Resources",
    title: "Notes from the plant floor",
    description:
      "Field notes, write-ups and case studies from Indian plant floors, on process, quality, planning, maintenance and energy.",
    primaryCta: { label: "Book a site survey", href: "/contact" },
    secondaryCta: { label: "See how it works", href: "/platform" },
    heroImageSrc: CASE_IMAGES.forging,
    heroImageAlt: "Auto component forging plant floor",
  },

  studies: [] as CaseStudyDetail[],
};

export function getCaseStudyBySlug(slug: string): CaseStudyDetail | undefined {
  return caseStudiesContent.studies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudyDetail[] {
  return caseStudiesContent.studies.filter((study) => study.featured);
}
