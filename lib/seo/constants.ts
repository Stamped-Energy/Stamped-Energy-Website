import { icp } from "@/lib/content/icp";
import { SITE_ORIGIN } from "@/lib/config/admin-host";

export const SITE_URL = SITE_ORIGIN.replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";

/** Bump when replacing public/og-default.png so social crawlers refetch the asset. */
export const DEFAULT_OG_IMAGE_VERSION = "20261004-turn-data";

export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}?v=${DEFAULT_OG_IMAGE_VERSION}`;

export const DEFAULT_OG_IMAGE_ALT = "Stamped · AI for industrial plants. Turn plant data into action.";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Last substantive edit to the static marketing pages. Bump with copy changes; feeds sitemap lastmod and WebPage dateModified. */
export const CONTENT_UPDATED = "2026-10-04";

export const GEO_METADATA = {
  "geo.region": "IN",
  "geo.placename": "India",
  "content-language": "en-IN",
} as const;

/**
 * Target keywords for the metadata `keywords` field (website update plan, section 5).
 * Hypotheses with no volume data yet; check in Search Console after launch.
 */
export const SEO_KEYWORDS = [
  "stamped",
  "AI for plant operations",
  "manufacturing operational efficiency India",
  "AI for manufacturing India",
  "reduce rejection in forging",
  "rejection reduction auto component",
  "predictive quality manufacturing",
  "heat treatment quench delay",
  "CQI-9 heat treatment records",
  "process optimisation manufacturing",
  "induction billet heater temperature control",
  "reduce downtime CNC machining",
  "8D root cause data",
] as const;

/** LinkedIn Company Page URL for Organization sameAs / GEO (per the website update plan, section 5). */
export const COMPANY_LINKEDIN_URL = "https://www.linkedin.com/company/stampedwork";

/** Re-export for llms.txt generation and docs - single positioning source */
export const SEO_ENTITY_DEFINITION = icp.seo.entityDefinition;
export const SEO_CATEGORY_LABEL = icp.seo.categoryLabel;
