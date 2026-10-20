/** Bing / search consoles often flag descriptions under ~120 characters. */

export const META_DESCRIPTION_MIN = 120;
export const META_DESCRIPTION_MAX = 160;

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace >= META_DESCRIPTION_MIN ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

/**
 * Clamp to 120–160 characters. When short, append `supplements` (facts already used on-site).
 * When long, trim at a word boundary without going below the minimum when possible.
 */
export function normalizeMetaDescription(primary: string, supplements: string[] = []): string {
  const chunks: string[] = [];
  const seen = new Set<string>();

  const push = (value: string) => {
    const collapsed = collapseWhitespace(value);
    if (!collapsed || seen.has(collapsed)) {
      return;
    }
    seen.add(collapsed);
    chunks.push(collapsed);
  };

  push(primary);
  for (const supplement of supplements) {
    if (chunks.join(" ").length >= META_DESCRIPTION_MIN) {
      break;
    }
    push(supplement);
  }

  let text = chunks.join(" ");
  if (text.length > META_DESCRIPTION_MAX) {
    text = truncateAtWord(text, META_DESCRIPTION_MAX);
  }

  return text;
}
