import { icp } from "@/lib/content/icp";
import { SITE_ORIGIN } from "@/lib/config/admin-host";

export const SITE_URL = SITE_ORIGIN.replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";

/** Bump when replacing public/og-default.png so social crawlers refetch the asset. */
export const DEFAULT_OG_IMAGE_VERSION = "20260630-product";

export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}?v=${DEFAULT_OG_IMAGE_VERSION}`;

export const DEFAULT_OG_IMAGE_ALT =
  "Stamped Energy - AI-powered industrial energy optimization for plants in India";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const WEBSITE_ID = `${SITE_URL}/#website`;

export const GEO_METADATA = {
  "geo.region": "IN",
  "geo.placename": "India",
  "content-language": "en-IN",
} as const;

/**
 * Primary and secondary target keywords for metadata `keywords` field.
 * Brand first; category second; vertical and problem-intent long-tail follow.
 */
export const SEO_KEYWORDS = [
  "stamped energy",
  "AI-powered energy intelligence India",
  "prescriptive energy intelligence India",
  "energy management software for plants India",
  "reduce electricity bill industrial plant India",
  "maximum demand reduction India",
  "DISCOM bill savings India",
  "SEC reduction industrial plant India",
  "cement plant energy management India",
  "steel plant energy efficiency India",
  "pharmaceutical plant HVAC energy savings",
  "chemical plant batch energy optimization",
  "automotive plant energy cost reduction India",
] as const;

/**
 * LinkedIn Company Page URL for Organization sameAs / GEO.
 * Leave empty until the real Stamped Energy company page URL is confirmed, then paste it here.
 */
export const COMPANY_LINKEDIN_URL = "https://www.linkedin.com/company/stamped-energy";

/** Re-export for llms.txt generation and docs - single positioning source */
export const SEO_ENTITY_DEFINITION = icp.seo.entityDefinition;
export const SEO_CATEGORY_LABEL = icp.seo.categoryLabel;
