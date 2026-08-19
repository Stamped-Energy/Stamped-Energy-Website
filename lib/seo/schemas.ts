import { landingContent } from "@/lib/content/landing";
import { icp } from "@/lib/content/icp";
import { getVerticalPage, type VerticalSlug } from "@/lib/content/vertical-pages";
import type { IndustryFaqItem } from "@/lib/content/types";
import { DEFAULT_OG_IMAGE, ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo/constants";
import type { FaqItem } from "@/lib/seo/extract-faq";

export const organizationPublisher = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Stamped Energy",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/LogoOrange.png`,
    width: 512,
    height: 512,
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Stamped Energy",
  url: SITE_URL,
  logo: organizationPublisher.logo,
  description: icp.seo.entityDefinition,
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
    "Prescriptive energy intelligence",
    "Maximum demand reduction",
    "DISCOM billing",
    "SCADA integration",
    "Industrial plant energy cost reduction",
    "Cement plant energy management",
    "Steel plant energy efficiency",
    "Pharmaceutical HVAC energy optimization",
    "Chemical batch energy optimization",
    "Automotive plant energy management",
    "IPMVP measurement and verification",
    "Operational sustainability",
    "Scope 2 emissions reduction",
    "Specific energy consumption (SEC)",
    "Perform Achieve Trade (PAT)",
    "Energy intensity tracking",
    "Industry 4.0 manufacturing",
  ],
  sameAs: [
    "https://www.linkedin.com/in/vinayak-rz/",
    "https://www.linkedin.com/in/utso/",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Stamped Energy",
  url: SITE_URL,
  description: `${icp.seo.categoryLabelAlt} for energy-intensive plants in India - rupee outcomes verified with evidence.`,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const homepageFaqSchema = {
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

export const homepageSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Stamped Energy - AI-Powered Energy Intelligence for Plants in India",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".hero-headline", ".value-proposition", ".key-numbers"],
  },
  url: SITE_URL,
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Stamped Energy Runs the Connect to Improve Loop",
  description:
    "Connect existing plant meters and SCADA, generate rupee-scored prescriptions, assign actions to your team, verify with evidence, and improve based on decisions taken.",
  totalTime: "P28D",
  tool: [
    { "@type": "HowToTool", name: "Incomer energy meter" },
    { "@type": "HowToTool", name: "SCADA or PLC system" },
    { "@type": "HowToTool", name: "DISCOM electricity bill" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Connect",
      text: "Bring live plant signals, bills, tariffs, and operating context into one read-only layer. No hardware retrofit required.",
      url: `${SITE_URL}/platform#connect`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Observe",
      text: "Track demand, energy use, equipment behaviour, and production state against the plant baseline.",
      url: `${SITE_URL}/platform#observe`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Decide",
      text: "Rupee-rank feasible moves by economic impact, effort, and operating risk.",
      url: `${SITE_URL}/platform#decide`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Execute",
      text: "Assign the accepted action to the person who can carry it out.",
      url: `${SITE_URL}/platform#execute`,
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify",
      text: "Compare expected vs observed outcomes in an ops-cleared ledger. DISCOM bill confirmation can follow.",
      url: `${SITE_URL}/platform#verify`,
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Improve",
      text: "Calibrate baselines and ranking from decisions taken and outcomes verified. Human-gated.",
      url: `${SITE_URL}/platform#improve`,
    },
  ],
};

export const vinayakPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#vinayak-raizada`,
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
    "Energy management systems",
    "Prescriptive energy intelligence",
    "SCADA integration",
    "Manufacturing energy optimization",
  ],
};

export const utsoPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#utso-sarkar`,
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

export function buildArticleSchema(post: ArticleSchemaInput) {
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
      "@id": `${SITE_URL}/about#vinayak-raizada`,
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
      name: "Energy management for energy-intensive plants in India",
    },
  };
}

export function buildBlogSpeakableSchema(slug: string, title: string) {
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

export function buildFaqSchema(faqs: FaqItem[]) {
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

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Stamped Energy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  url: SITE_URL,
  description: icp.seo.entityDefinition,
  provider: {
    "@id": ORGANIZATION_ID,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Discovery call and pilot - pricing based on verified savings potential",
  },
  featureList: [
    "AI-powered prescriptive energy intelligence",
    "Read-only meter and SCADA integration",
    "Rupee-denominated energy prescriptions",
    "WhatsApp action assignment to plant floor",
    "DISCOM bill savings verification",
  ],
};

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Book a Discovery Call | Stamped Energy",
  url: `${SITE_URL}/contact`,
  description:
    "Book a discovery call with Stamped Energy. We review your last three DISCOM bills, plant meter setup, and outline a pilot.",
  mainEntity: {
    "@id": ORGANIZATION_ID,
  },
};

export function buildCollectionPageSchema(options: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    inLanguage: "en-IN",
    publisher: organizationPublisher,
  };
}

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

export function buildCaseStudySchema(study: CaseStudySchemaInput) {
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
      "@id": `${SITE_URL}/about#vinayak-raizada`,
      name: study.authorName ?? "Vinayak Raizada",
      url: study.authorUrl ?? "https://www.linkedin.com/in/vinayak-rz/",
    },
    publisher: organizationPublisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/case-studies/${study.slug}`,
    },
    articleSection: "Case Study",
    keywords: [study.industry, study.category, "energy savings", "manufacturing India"].join(", "),
    inLanguage: "en-IN",
    about: {
      "@type": "Thing",
      name: `${study.industry} energy cost reduction for plants in India`,
    },
  };
}

export const automotiveFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much can auto component manufacturers reduce their electricity bill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Comparable auto component plants using assigned, rupee-scored actions typically see an indicative 12-20% monthly bill movement, with die casting and forging often recovering a large share on MD from shift-start sequencing. Your pilot replaces those bands with plant figures.",
      },
    },
    {
      "@type": "Question",
      name: "What is maximum demand and how does it affect my electricity bill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Maximum demand (MD) is the highest average kVA your plant draws in a billing window. Indian DISCOMs charge a fixed rate per kVA of recorded MD each month. Overlapping furnace pre-heat, compressor startup, and press cycles at shift start are the most common MD drivers in auto component plants.",
      },
    },
    {
      "@type": "Question",
      name: "How does Stamped Energy work for die casting plants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stamped connects read-only to your incomer meter and SCADA, builds production-aware baselines per cell and shift, then sends rupee-scored prescriptions: stagger furnace pre-heat, stage compressors, cut holding load. Owners get the action on WhatsApp.",
      },
    },
  ],
};

function faqItemsToSchema(items: IndustryFaqItem[]) {
  return items.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.answer,
    },
  }));
}

export function verticalFaqSchema(slug: VerticalSlug) {
  const page = getVerticalPage(slug);
  if (!page) {
    return automotiveFaqSchema;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItemsToSchema(page.faq),
  };
}
