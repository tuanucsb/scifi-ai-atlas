// Tailwind v3 config for the precompiled CSS inlined in index.html (run: npm run build:css).
// Colors bind to the per-theme CSS variables, so every theme recolors the same classes.
module.exports = {
  // build-css.js points this at a copy of index.html with the old compiled CSS removed
  content: [process.env.TW_CONTENT || "./index.html"],
  darkMode: "class",
  // Built at runtime by setGraphLayout()
  safelist: ["lg:col-span-3", "lg:col-span-5", "lg:col-span-7", "lg:col-span-9"],
  theme: {
    // 1.2 ratio on a 15px base; 12.5px is the floor for any text
    fontSize: {
      xs: ["12.5px", "1.5"], sm: ["15px", "1.55"], base: ["15px", "1.55"],
      lg: ["18px", "1.35"], xl: ["21.6px", "1.25"], "2xl": ["26px", "1.2"], "3xl": ["31px", "1.15"]
    },
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"IBM Plex Serif"', "ui-serif", "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"]
      },
      colors: {
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-fg": "rgb(var(--accent-fg-rgb) / <alpha-value>)"
      }
    }
  }
};
