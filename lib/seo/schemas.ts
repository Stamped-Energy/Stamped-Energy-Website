import { landingContent } from "@/lib/content/landing";
import { ENGAGEMENT_STEPS, ENGAGEMENT_SUMMARY } from "@/lib/content/engagement";
import { icp } from "@/lib/content/icp";
import { getVerticalPage, type VerticalSlug } from "@/lib/content/vertical-pages";
import type { IndustryFaqItem } from "@/lib/content/types";
import { siteConfig } from "@/lib/content/site";
import {
  COMPANY_LINKEDIN_URL,
  CONTENT_UPDATED,
  DEFAULT_OG_IMAGE,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/seo/constants";
import type { FaqItem } from "@/lib/seo/extract-faq";
import type { PageSeoConfig } from "@/lib/seo/pages";
import type {
  Article,
  ImageObject,
  SearchAction,
  FAQPage,
  HowTo,
  Organization,
  Person,
  Question,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

const organizationLogo: ImageObject = {
  "@type": "ImageObject",
  url: `${SITE_URL}/LogoOrange.png`,
  width: "249",
  height: "248",
};

const VINAYAK_ID = `${SITE_URL}/about#vinayak-raizada`;
const UTSO_ID = `${SITE_URL}/about#utso-sarkar`;

export const organizationPublisher: Organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Stamped",
  logo: organizationLogo,
};

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Stamped",
  alternateName: ["Stamped Energy", "stamped.work"],
  url: SITE_URL,
  logo: organizationLogo,
  slogan: siteConfig.tagline,
  description: icp.seo.entityDefinition,
  founder: [{ "@id": VINAYAK_ID }, { "@id": UTSO_ID }],
  email: "stamped.energy@gmail.com",
  foundingDate: "2025",
  foundingLocation: {
    "@type": "Place",
    name: "IIT Roorkee, Uttarakhand, India",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "stamped.energy@gmail.com",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  knowsAbout: [
    icp.seo.categoryLabel,
    "Process modelling and machine learning for manufacturing",
    "Manufacturing operational efficiency",
    "Process optimisation",
    "Predictive quality",
    "Rejection reduction",
    "Production planning",
    "Predictive maintenance",
    "Plant energy use",
    "Forging",
    "Heat treatment",
    "Precision machining",
    "Die casting",
    "Rubber moulding",
    "Auto component manufacturing",
    "Steel manufacturing",
    "Cement manufacturing",
    "Pharmaceutical manufacturing",
    "Chemical manufacturing",
  ],
  sameAs: COMPANY_LINKEDIN_URL ? [COMPANY_LINKEDIN_URL] : [],
};

/** Google still reads `query-input` for sitelinks search; schema.org types omit it. */
const searchAction: SearchAction & { "query-input": string } = {
  "@type": "SearchAction",
  target: {
    "@type": "EntryPoint",
    urlTemplate: `${SITE_URL}/case-studies?search={search_term_string}`,
  },
  "query-input": "required name=search_term_string",
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Stamped",
  url: SITE_URL,
  description: icp.seo.metaDescription,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  potentialAction: searchAction,
};

export const homepageFaqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/** Ties a page into the site graph: WebPage → WebSite, about → Organization, with a freshness date. */
export function buildWebPageSchema(
  page: PageSeoConfig,
  extra: Partial<WebPage> = {},
): WithContext<WebPage> {
  const url = page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.absoluteTitle,
    description: page.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-IN",
    dateModified: CONTENT_UPDATED,
    ...extra,
  } as WithContext<WebPage>;
}

export const homepageSpeakable: Partial<WebPage> = {
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".hero-headline", ".value-proposition", ".key-numbers"],
  },
};

export const howToSchema: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Stamped turns plant data into operator actions",
  description:
    "Stamped connects to the systems a plant already runs, learns how it actually runs, finds where efficiency is lost, sends ranked actions to the person who can act, and checks the result with the plant team.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Plant data",
      text: "Connect to the systems you already run: machines and control systems, meters, ERP and quality registers.",
      url: `${SITE_URL}/platform`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Models",
      text: "Models trained on your plant's own history find where efficiency is lost across process, quality, planning and maintenance.",
      url: `${SITE_URL}/platform`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Actions",
      text: "Each finding becomes a ranked action that says who should act, by when, and why.",
      url: `${SITE_URL}/platform`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Results",
      text: "We check the result with your team, and their feedback goes back into the models.",
      url: `${SITE_URL}/platform`,
    },
  ],
};

export const engagementHowToSchema: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to start with Stamped",
  description: ENGAGEMENT_SUMMARY,
  step: ENGAGEMENT_STEPS.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: `${step.label}: ${step.title}`,
    text: step.description,
    url: `${SITE_URL}/contact`,
  })),
};

export const vinayakPersonSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": VINAYAK_ID,
  name: "Vinayak Raizada",
  jobTitle: "Co-Founder",
  worksFor: {
    "@id": ORGANIZATION_ID,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Roorkee",
    sameAs: "https://www.iitr.ac.in",
  },
  url: `${SITE_URL}/about`,
  sameAs: "https://www.linkedin.com/in/vinayak-rz/",
  knowsAbout: [
    "Electrical engineering",
    "Process modelling and machine learning for manufacturing",
    "Manufacturing operational efficiency",
    "Plant energy use",
  ],
};

export const utsoPersonSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": UTSO_ID,
  name: "Utso Sarkar",
  jobTitle: "Co-Founder",
  worksFor: {
    "@id": ORGANIZATION_ID,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Roorkee",
    sameAs: "https://www.iitr.ac.in",
  },
  url: `${SITE_URL}/about`,
  sameAs: "https://www.linkedin.com/in/utso/",
};

type ArticleSchemaInput = {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  publishedDate: string;
  modifiedDate?: string;
  tags: string[];
  category: string;
  authorName?: string;
  authorUrl?: string;
};

export function buildArticleSchema(post: ArticleSchemaInput): WithContext<Article> {
  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SITE_URL}${post.image}`
    : DEFAULT_OG_IMAGE;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate ?? post.publishedDate,
    author: {
      "@type": "Person",
      "@id": VINAYAK_ID,
      name: post.authorName ?? "Vinayak Raizada",
      url: post.authorUrl ?? "https://www.linkedin.com/in/vinayak-rz/",
    },
    publisher: organizationPublisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
    about: {
      "@type": "Thing",
      name: "Plant operations in Indian manufacturing",
    },
  };
}

export function buildBlogSpeakableSchema(slug: string, title: string): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".blog-article-prose h1", ".blog-article-prose p"],
    },
    url: `${SITE_URL}/blog/${slug}`,
  };
}

export function buildFaqSchema(faqs: FaqItem[]): WithContext<FAQPage> | null {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const softwareApplicationSchema: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Stamped",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  url: SITE_URL,
  description: icp.seo.entityDefinition,
  provider: {
    "@id": ORGANIZATION_ID,
  },
  offers: {
    "@type": "Offer",
    description: ENGAGEMENT_SUMMARY,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  },
  featureList: [
    "Models trained on each plant's own history",
    "Real-time quality alerts and prescriptive maintenance",
    "Connects to machines, control systems, meters, ERP and quality registers",
    "Ranked actions that say who should act, by when, and why",
    "Actions sent on WhatsApp or on screen",
    "Results checked with the plant team",
  ],
};

type CaseStudySchemaInput = {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  publishedDate: string;
  modifiedDate?: string;
  industry: string;
  category: string;
  authorName?: string;
  authorUrl?: string;
};

export function buildCaseStudySchema(study: CaseStudySchemaInput): WithContext<Article> {
  const imageUrl = study.image
    ? study.image.startsWith("http")
      ? study.image
      : `${SITE_URL}${study.image}`
    : DEFAULT_OG_IMAGE;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: imageUrl,
    datePublished: study.publishedDate,
    dateModified: study.modifiedDate ?? study.publishedDate,
    author: {
      "@type": "Person",
      "@id": VINAYAK_ID,
      name: study.authorName ?? "Vinayak Raizada",
      url: study.authorUrl ?? "https://www.linkedin.com/in/vinayak-rz/",
    },
    publisher: organizationPublisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/case-studies/${study.slug}`,
    },
    articleSection: "Case Study",
    keywords: [study.industry, study.category, "plant operations", "manufacturing India"].join(", "),
    inLanguage: "en-IN",
    about: {
      "@type": "Thing",
      name: `${study.industry} plant operations in India`,
    },
  };
}

function faqItemsToSchema(items: IndustryFaqItem[]): Question[] {
  return items.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.answer,
    },
  }));
}

export function verticalFaqSchema(slug: VerticalSlug): WithContext<FAQPage> | null {
  const page = getVerticalPage(slug);
  if (!page) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItemsToSchema(page.faq),
  };
}
