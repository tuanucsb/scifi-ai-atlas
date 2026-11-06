---
name: Sci-Fi AI Atlas
mode: operate-read
colors:
  obsidian:
    background: "#0b0f19"
    card: "#111827"
    surface: "#1e293b"
    foreground: "#f8fafc"
    muted: "#cbd5e1"
    border: "#334155"
    accent: "#3fb8a9"
    accent-fg: "#6edccd"
    accent-contrast: "#03201c"
  daylight:
    background: "#f4f6f9"
    card: "#ffffff"
    surface: "#f1f5f9"
    foreground: "#0f172a"
    muted: "#334155"
    border: "#cbd5e1"
    accent: "#0f766e"
    accent-fg: "#0f766e"
    accent-contrast: "#ffffff"
  alignment:
    benevolent: "#10b981"
    hostile: "#ef4444"
    ambivalent: "#a855f7"
    amoral: "#3b82f6"
    liberated: "#f59e0b"
typography:
  sans: "IBM Plex Sans"
  serif: "IBM Plex Serif"
  mono: "IBM Plex Mono"
  scale: { xs: 12.5px, sm: 15px, base: 15px, lg: 18px, xl: 21.6px, 2xl: 26px, 3xl: 31px }
  min: 12.5px
spacing: { base: 4px, steps: [4, 8, 12, 16, 24, 32] }
rounded: { control: 6px, panel: 10px, sheet: 16px }
targets: { touch-min: 44px, bottom-tab: 48px }
---

# Sci-Fi AI Atlas design system

## Who it's for, and the light it's read in

A sci-fi reader exploring at a desk in the evening, or someone opening a shared link on a phone. Dark (Obsidian) is the default because the page is read at night. Daylight is the light theme. HAL 9000 and Nostromo are themed variants that use the same tokens.

## Layout

- **Sticky bar** (one row, about 52px): product name, six view tabs, search, theme. Nothing else sticks.
- **Filter row** (scrolls away): Saga dropdown, Alignment and Media segmented controls, Award winners toggle. On phones it becomes a bottom sheet with a Done button.
- **Workspace**: the graph (7 of 12 columns) and the inspector `<aside>` (5 of 12), which fills the row height and scrolls inside. Below 1024px the inspector stacks under the graph. Below 768px the graph is a 240px mini-map with a full-screen mode, and the views move to a bottom tab bar.
- **Footer**: credits and the "Host your own copy" link. Deploy instructions never go in the reader nav.

## Color

- Every theme defines `--background`, `--card`, `--surface`, `--foreground`, `--muted-foreground`, `--border`, `--accent`, `--accent-rgb`, `--accent-fg-rgb` and `--accent-contrast`. Tailwind's `accent` and `accent-fg` colors read these variables, so `bg-accent/15` or `text-accent-fg` recolor with the theme.
- Never use a Tailwind palette color (`indigo-*`, `teal-*`) for brand color. Alignment and category colors are data colors and stay fixed across themes.
- Text on an accent fill uses `--accent-contrast`, never `#fff` by default.
- `npm run check:contrast` must pass: 4.5:1 for text and 3:1 for accent UI, in every theme.

## Type

- Plex Sans for UI and body, Plex Serif (h2, h3) for scenario and character titles, Plex Mono (`.num`) only for years and counts. Tabular numerals everywhere.
- 15px body, ratio 1.2, nothing under 12.5px. Labels in sentence case: no mono caps, no letter-spaced uppercase.
- No emoji in tabs, filters, headings or buttons. Alignment is shown with a colored dot (`.adot`).

## Components

| Class | Use |
|---|---|
| `.tab-btn` + `aria-selected` | View tabs; the active tab gets an accent underline |
| `.seg` / `.seg-btn` + `aria-pressed` | Segmented filters and toggles; the pressed button is filled with the accent |
| `.tool-btn` | Graph toolbar buttons |
| `.accent-btn`, `.accent-pill` | Primary action, accent tag |
| `.align-*`, `.cat-badge-*` | Alignment and category badges, dark and light variants |

Cards are only for things you click (characters, works). The inspector uses sections with dividers, not nested cards.

## Graph

- The camera fits every hub plus the poster ring on load, on resize and on "Fit".
- Labels are placed in priority order (selected, hovered, linked, saga) and dropped when they would collide. Other hubs get labels from 1.3× zoom.
- A plain scroll moves the page. Ctrl/⌘ + scroll or pinch zooms. Clicking a stage on the ruler selects that stage.
- Keyboard: ←/→ change stage, ↑/↓ move within a stage, Enter opens the details, Esc fits or leaves full screen. Each selection is announced in a live region.

## States

Every list and the graph have an empty state. It names the search that matched nothing, suggests real names (HAL, Solaris, Lem, Murderbot) and offers one "Clear search and filters" action. Posters fall back to a generated SVG cover, so a failed image never shows a broken icon.

## Motion

Edge-flow particles are the one ambient animation. They turn off under `prefers-reduced-motion`, which also removes transitions.

## Build

Tailwind is compiled ahead of time and inlined (`npm run build:css`). Run it again after adding Tailwind classes, because the page has no runtime CSS compiler.
