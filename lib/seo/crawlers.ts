/** Paths that must never be indexed or used for training snapshots. */
export const CRAWLER_DISALLOW = ["/blog/admin", "/api/", "/_next/"] as const;

/**
 * Search engines and AI answer/training crawlers explicitly welcomed.
 * Each gets full public content access; only admin/API/build paths are blocked.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
 */
export const SEARCH_CRAWLERS = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Googlebot-Video",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Applebot",
] as const;

export const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "MistralAI-User",
  "DuckAssistBot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "YouBot",
  "Diffbot",
  "ImagesiftBot",
  "omgili",
  "Webzio-Extended",
  "Ai2Bot",
  "PetalBot",
] as const;

export function crawlerAllowRules(): Array<{
  userAgent: string;
  allow: string;
  disallow: string[];
}> {
  const agents = ["*", ...SEARCH_CRAWLERS, ...AI_CRAWLERS];

  return agents.map((userAgent) => ({
    userAgent,
    allow: "/",
    disallow: [...CRAWLER_DISALLOW],
  }));
}
