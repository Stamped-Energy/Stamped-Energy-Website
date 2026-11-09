/** Bing / search consoles often flag descriptions under ~120 characters. */

export const META_DESCRIPTION_MIN = 120;
export const META_DESCRIPTION_MAX = 160;

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Prefer a full sentence ending; never append an ellipsis. */
function truncateToFit(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }

  const slice = text.slice(0, max);
  let bestEnd = -1;

  for (let i = 0; i < slice.length; i += 1) {
    const ch = slice[i];
    if (ch === "." || ch === "!" || ch === "?") {
      const next = slice[i + 1];
      if (next === undefined || next === " " || i === slice.length - 1) {
        if (i + 1 >= META_DESCRIPTION_MIN) {
          bestEnd = i;
        }
      }
    }
  }

  if (bestEnd >= 0) {
    return slice.slice(0, bestEnd + 1).trim();
  }

  const cut = slice.trimEnd();
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace >= META_DESCRIPTION_MIN ? cut.slice(0, lastSpace) : cut;
  const trimmed = base.trimEnd();

  if (trimmed.endsWith(".") || trimmed.endsWith("!") || trimmed.endsWith("?")) {
    return trimmed;
  }

  return `${trimmed}.`;
}

/**
 * Clamp to 120–160 characters. When short, append `supplements` (facts already used on-site).
 * When long, end on a complete sentence when possible (never with …).
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
    text = truncateToFit(text, META_DESCRIPTION_MAX);
  }

  return text;
}

/** Take the longest prefix of `excerpt` that ends on a complete sentence and fits the max. */
export function excerptToMetaDescription(excerpt: string): string {
  const collapsed = collapseWhitespace(excerpt);
  if (!collapsed) {
    return collapsed;
  }
  if (collapsed.length <= META_DESCRIPTION_MAX) {
    return collapsed.length >= META_DESCRIPTION_MIN
      ? collapsed
      : normalizeMetaDescription(collapsed);
  }
  return truncateToFit(collapsed, META_DESCRIPTION_MAX);
}
