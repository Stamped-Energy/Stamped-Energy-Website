/**
 * Pages with a dark hero under the fixed navbar use light/white link text.
 * Pages with a light surface hero use grey link text (default).
 */
const DARK_HERO_EXACT = new Set(["/case-studies", "/about", "/contact"]);

const DARK_HERO_PREFIXES = ["/industries"];

/** Article pages under /blog default to a light hero unless overridden. */
const LIGHT_HERO_PREFIXES = ["/blog/"];

/** Set on document.body when a page renders a dark hero dynamically (e.g. blog cover). */
export const DARK_HERO_BODY_ATTR = "data-dark-hero";

export function usesLightNavText(pathname: string): boolean {
  if (LIGHT_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }

  if (DARK_HERO_EXACT.has(pathname)) {
    return true;
  }

  return DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function hasDarkHeroBodyOverride(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  return document.body.hasAttribute(DARK_HERO_BODY_ATTR);
}
