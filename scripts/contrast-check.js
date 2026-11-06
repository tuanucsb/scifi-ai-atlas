#!/usr/bin/env node
// Checks WCAG contrast for every theme defined in index.html.
// Usage: node scripts/contrast-check.js   (exits 1 if any pair fails)
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

// Theme blocks look like: html[data-robot-theme="hal9000"] { --background: #120c0e; ... }
const themes = {};
for (const m of html.matchAll(/html\[data-robot-theme="([a-z0-9_]+)"\]\s*\{([^}]*)\}/g)) {
  const vars = {};
  for (const v of m[2].matchAll(/--([a-z-]+):\s*([^;]+);/g)) vars[v[1]] = v[2].trim();
  themes[m[1]] = vars;
}

function toRgb(value) {
  if (!value) return null;
  if (/^\d+\s+\d+\s+\d+$/.test(value)) return value.split(/\s+/).map(Number);
  const hex = value.replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  return null; // rgba() values are translucent badges; not checked here
}

function luminance([r, g, b]) {
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground var, background var, minimum ratio, what it is]
const PAIRS = [
  ["foreground", "background", 4.5, "body text"],
  ["foreground", "card", 4.5, "text on panels"],
  ["foreground", "surface", 4.5, "text on toolbars"],
  ["muted-foreground", "background", 4.5, "secondary text"],
  ["muted-foreground", "card", 4.5, "secondary text on panels"],
  ["muted-foreground", "surface", 4.5, "secondary text on toolbars"],
  ["accent-contrast", "accent", 4.5, "text on accent buttons"],
  ["accent-fg-rgb", "background", 4.5, "accent links"],
  ["accent-fg-rgb", "card", 4.5, "accent links on panels"],
  ["accent", "card", 3, "accent UI (focus ring, active tab bar)"],
];

let failures = 0;
for (const [name, vars] of Object.entries(themes)) {
  console.log(`\n${name}`);
  for (const [fg, bg, min, label] of PAIRS) {
    const a = toRgb(vars[fg]), b = toRgb(vars[bg]);
    if (!a || !b) { console.log(`  skip  ${label} (${fg} on ${bg}: not a solid color)`); continue; }
    const r = ratio(a, b);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(5)} ≥ ${min}  ${label} (${fg} on ${bg})`);
  }
}
console.log(failures ? `\n${failures} contrast failure(s)` : "\nAll themes pass");
process.exit(failures ? 1 : 0);
