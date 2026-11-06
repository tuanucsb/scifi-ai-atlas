# Sci-Fi AI Futures & Evolution Atlas

**🌐 Live Interactive Atlas:** [https://tuanucsb.github.io/scifi-ai-atlas/](https://tuanucsb.github.io/scifi-ai-atlas/)

An interactive, CORUM-style evolutionary network and encyclopedia tracking **27 Evolutionary Scenario Nodes**, **110+ Sci-Fi Books, Movies & TV Shows**, and **112 Iconic AI Characters** across **7 Chronological Stages** (1920s–Cosmic Horizon).

## Features
- **Interactive Directed Network Graph**: Explore how near-future AI assistants, corporate cyberpunk AIs, and autonomous war machines evolve into sentient androids, planetary matrioshka brains, and cosmic post-biological minds.
- **Satellite Books, Movies & TV Nodes**: Click any scenario node to inspect its orbiting books, films, and series with cover posters, AI character portraits, and Wikipedia author links.
- **112 AI Characters Classified by Moral Alignment**: Filter by *Benevolent / Protective*, *Hostile / Tyrant / Evil*, *Ambivalent / Tragic*, *Amoral / Blue-and-Orange*, or *Autonomous / Liberated*.
- **6 Guided Thematic Pathways**: Trace specific evolutionary lineages (*Asimov's Arc*, *Cyberpunk Lineage*, *Three-Body / Cosmic Deterrence*, *Westworld Awakening*, *Hitchhiker's Absurdist Cosmos*, and *Grand Master Canon*).
- **7-Stage Chronological Timeline & Sortable Encyclopedia Catalog**: Full breakdowns of every stage, work, award winner (Hugo, Nebula, Philip K. Dick, Locus, Academy Awards), and AI archetype.

## Editing the page
`index.html` is the whole site. Styles come from Tailwind, compiled ahead of time and inlined in `<style id="tailwind-build">`. After adding or changing Tailwind classes, run:

```bash
npm run build:css        # recompile and inline Tailwind (needs Node; downloads tailwindcss@3.4.17 via npx)
npm run check:contrast   # WCAG contrast for all four themes
```

Colors, type, layout and component rules are in [DESIGN.md](DESIGN.md).
