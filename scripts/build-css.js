#!/usr/bin/env node
// Compiles Tailwind for index.html and inlines it in <style id="tailwind-build">.
// The site stays a single static file; rerun after adding new Tailwind classes:
//   npm run build:css
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "index.html");
const TAILWIND = "tailwindcss@3.4.17";
const OPEN = '<style id="tailwind-build">';

let html = fs.readFileSync(htmlPath, "utf8");

// First run: swap the in-browser Tailwind compiler (and its inline config) for an empty build block
const runtime = /\s*<script src="https:\/\/www\.gstatic\.com\/antigravity\/web\/dev\/tailwindcss\.min\.js"><\/script>\s*<script>\s*tailwind\.config = \{[\s\S]*?\};\s*<\/script>/;
if (!html.includes(OPEN)) {
  if (!runtime.test(html)) throw new Error("Neither the Tailwind runtime script nor a tailwind-build block was found");
  html = html.replace(runtime, `\n  ${OPEN}</style>`);
}

// Scan a copy without the previous build, so old CSS can't keep stale classes alive
const blockRe = new RegExp(`${OPEN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?</style>`);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-tw-"));
const scanPath = path.join(tmp, "index.html");
const inPath = path.join(tmp, "in.css");
const outPath = path.join(tmp, "out.css");
fs.writeFileSync(scanPath, html.replace(blockRe, `${OPEN}</style>`));
fs.writeFileSync(inPath, "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");

execFileSync("npx", ["--yes", TAILWIND, "-c", path.join(root, "tailwind.config.js"), "-i", inPath, "-o", outPath, "--minify"], {
  cwd: root,
  stdio: ["ignore", "inherit", "inherit"],
  env: { ...process.env, TW_CONTENT: scanPath }
});

const css = fs.readFileSync(outPath, "utf8").trim();
// Last thing in <head>, like the runtime compiler was, so utilities (md:hidden…) win over the page's own component CSS
html = html.replace(new RegExp(`\\s*${blockRe.source}`), "");
html = html.replace("</head>", `  ${OPEN}${css}</style>\n</head>`);
fs.writeFileSync(htmlPath, html);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Inlined ${(css.length / 1024).toFixed(1)} KB of Tailwind CSS into index.html`);
