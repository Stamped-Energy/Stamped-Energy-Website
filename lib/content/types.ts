export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  megaMenu?: "industries" | "solutions";
};

export type HeroFeatureItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: "shield" | "factory" | "prescription" | "rupee";
};

export type LoopStepItem = WorkflowStep & {
  icon: "connect" | "observe" | "decide" | "execute" | "verify";
};

export type CtaLink = {
  label: string;
  href: string;
};

export type StatItem = {
  id: string;
  value: string;
  label: string;
  detail?: string;
};

export type ResourceCard = {
  id: string;
  type: "case-study" | "blog";
  title: string;
  description: string;
  href: string;
  tag?: string;
  imageSrc: string;
  imageAlt: string;
  readMoreLabel?: string;
};

export type IndustrySegment = {
  id: string;
  slug: string;
  name: string;
  focus: string;
  description: string;
  /** v1: hash on automotive page; future: `/industries/automotive/[slug]` */
  href: string;
  imageSrc: string;
  imageAlt: string;
  challenges: string[];
  stampProvides: string[];
  metrics: StatItem[];
  relatedArticle?: {
    href: string;
    label: string;
  };
};

export type VerticalStatus = "live" | "coming-soon";

export type IndustryVertical = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  heroImageSrc: string;
  heroImageAlt: string;
  segments: IndustrySegment[];
  featured?: boolean;
  priority?: number;
  status: VerticalStatus;
};

export type IndustryIntegrationItem = {
  id: string;
  title: string;
  description: string;
};

export type IndustryPrescriptionExample = {
  id: string;
  title: string;
  description: string;
  impactRange: string;
  assignee?: string;
};

export type IndustryFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type VerticalPageHero = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  seoHeadings?: string[];
};

export type VerticalPageContent = {
  slug: string;
  hero: VerticalPageHero;
  economics: {
    eyebrow: string;
    title: string;
    description: string;
    stats: StatItem[];
  };
  wasteTable: {
    eyebrow: string;
    title: string;
    description: string;
    areas: IndustryValueArea[];
  };
  prescriptionExamples: {
    eyebrow: string;
    title: string;
    description: string;
    footnote: string;
    items: IndustryPrescriptionExample[];
    attribution?: { text: string; source: string };
  };
  integration: {
    eyebrow: string;
    title: string;
    items: IndustryIntegrationItem[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    disclaimer?: string;
    items: { id: string; title: string; description: string }[];
  };
  segments?: {
    eyebrow: string;
    title: string;
    description: string;
  };
  faq: IndustryFaqItem[];
  mediaSlot?: {
    eyebrow: string;
    title: string;
    description: string;
    placeholderTitle: string;
    placeholderDescription: string;
    mediaSrc: string | null;
    mediaAlt: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: CtaLink;
  };
};

export type IndustryValueArea = {
  id: string;
  step: string;
  title: string;
  description: string;
  potentialLabel: string;
  potentialValue: string;
};

export type ProblemItem = {
  id: string;
  title: string;
  description: string;
  solutionHeading?: string;
  solutionPoints?: string[];
};

export type PayAsYouSaveApproach = {
  label: string;
  description: string;
  variant: "traditional" | "stamped";
};

export type PayAsYouSaveBenefit = {
  id: string;
  title: string;
  description: string;
};

export type WorkflowStep = {
  id: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

/** Homepage how-it-works step (CVector-style 4-step narrative). */
export type HomeHiwStep = {
  id: string;
  step: number;
  /** Short sidebar label, e.g. Data / Analysis */
  label: string;
  title: string;
  description: string;
  bullets: string[];
};

export type HomeProblemPoint = {
  id: string;
  title: string;
  description: string;
};

export type IndustryItem = {
  id: string;
  name: string;
  /** Short pain-point line shown on landing cards for quick context */
  focus: string;
  description: string;
  /** Operational sustainability one-liner shown under the description */
  sustainability?: string;
  featured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export type IconBulletItem = {
  id: string;
  title: string;
  description: string;
};

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type WhyStampedItem = {
  id: string;
  title: string;
  description: string;
};

export type PrescriptionField = {
  label: string;
  value: string;
};

export type PrescriptionEmbedConfig = {
  /** Interactive demo URL (simulated or live dashboard) */
  iframeSrc: string | null;
  /** Fallback: recorded dashboard walkthrough (.webm / .mp4) */
  videoSrc: string | null;
  placeholderTitle: string;
  placeholderDescription: string;
  iframeTitle: string;
};

export type HiwJourneyStep = {
  id: string;
  step: number;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  diagram: "connect" | "observe" | "decide" | "execute" | "verify" | "improve";
};

export type HiwStackLayer = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
};

export type HiwIntegrationSource = {
  id: string;
  label: string;
  detail: string;
};

export type HiwDeploymentPhase = {
  id: string;
  week: string;
  title: string;
  description: string;
};

export type HiwMediaSlot = {
  id: string;
  title: string;
  description: string;
  reason: string;
};

export type HiwSldNode = {
  id: string;
  label: string;
  tooltip: string;
  /** 0-100 position within the diagram frame */
  x: number;
  y: number;
  kind: "source" | "hub" | "load";
};

export type HiwCapability = {
  id: string;
  title: string;
  description: string;
  /** Optional WebM/GIF/PNG - falls back to built-in SVG animation */
  mediaSrc?: string | null;
  mediaAlt?: string;
};
