export type ResourceGuideFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ResourceGuideSection = {
  id: string;
  title: string;
  body: string[];
};

export type ResourceGuideContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  sections: ResourceGuideSection[];
  faq: ResourceGuideFaqItem[];
};
