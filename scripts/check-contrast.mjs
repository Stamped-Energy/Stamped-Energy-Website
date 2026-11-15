#!/usr/bin/env node
/**
 * WCAG AA contrast guard for v4 brand tokens (ADR-051).
 * Fails if any declared text/background pair is below 4.5:1 (normal text)
 * or 3:1 (large text pairs marked large: true).
 */

const pairs = [
  { name: "body on canvas", fg: "#0d0c0b", bg: "#fcfcfb", min: 4.5 },
  { name: "secondary on canvas", fg: "#5e5c57", bg: "#fcfcfb", min: 4.5 },
  { name: "link coral-600 on canvas", fg: "#d33c28", bg: "#fcfcfb", min: 4.5 },
  { name: "ink button text", fg: "#ffffff", bg: "#0d0c0b", min: 4.5 },
  { name: "on-dark primary text", fg: "#f5f5f3", bg: "#0b0b0a", min: 4.5 },
  { name: "coral-500 on ink", fg: "#f75440", bg: "#0b0b0a", min: 4.5 },
  { name: "coral-500 large on canvas", fg: "#f75440", bg: "#fcfcfb", min: 3, large: true },
  { name: "white on coral-600", fg: "#ffffff", bg: "#d33c28", min: 4.5 },
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function channel(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg, bg) {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

let failed = 0;
for (const pair of pairs) {
  const ratio = contrast(pair.fg, pair.bg);
  const ok = ratio >= pair.min;
  const label = `${pair.name}: ${ratio.toFixed(2)}:1 (min ${pair.min}${pair.large ? ", large" : ""})`;
  if (ok) {
    console.log(`PASS  ${label}`);
  } else {
    console.error(`FAIL  ${label}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} contrast pair(s) failed.`);
  process.exit(1);
}
console.log("\nAll contrast pairs passed.");
