# yuchan — Backend × AI

Personal portfolio of **Yu-Cheng Chien / yuchan**, a fourth-year Computer Science and Information Engineering student at National Kaohsiung University of Science and Technology.

**Website:** https://yuchan27.github.io/

## Publishing

This is a dependency-free static website. GitHub Pages publishes **main / (root)** using the repository's existing branch source. The root `index.html` is the homepage; `.nojekyll` prevents Jekyll from substituting the README or processing assets.

No Next.js build, npm installation, deployment token, or environment secret is required. The custom workflow now validates files; GitHub's built-in **pages build and deployment** workflow handles publication. Keep **Settings → Pages → Source → Deploy from a branch → main → / (root)**.

The earlier Next.js version remains in Git history. Version 2 removes the failed dependency-cache/build pipeline and publishes the finished page directly.

## Edit / preview

- `index.html`: profile, projects, skills and contact links.
- `assets/site.css`: responsive editorial layout, black / copper / olive palette.
- `assets/site.js`: filters, mobile navigation, optional motion, generative canvas and copy-link interaction.
- `assets/favicon.svg`, `404.html`, `robots.txt`, `sitemap.xml`: site metadata.

```sh
# Validation (Node.js 22 or later; no dependencies to install)
npm test

# Local preview with Python 3
python -m http.server 8080
```

Open http://localhost:8080 in your browser. Updating the files on `main` triggers GitHub Pages publication.

## Content and design

The profile and learning focus come from the owner's self-description. Technical summaries use project documentation and the owner's stated experience. Public project links include FoodLens AI, PyroDetector, Cat Future Lab, Wasteland Recycler and Smart Diet Ledger. Private work is described only at a technical-summary level: no private source, credentials, datasets, customer information or internal URLs are included. RAG integration documentation describes keyword + vector retrieval, reranking and fallback; it does not establish live production performance.

The visual direction references the editorial typography and restrained interaction in Awwwards portfolio work, including the portfolio collection and the Emilian creative-developer nominee (August 8, 2026). The design, CSS concept posters and animated mathematical knot are original implementations, not copied assets or an award claim.

- https://www.awwwards.com/websites/portfolio/
- https://www.awwwards.com/sites/emilian-creative-developer

Project visuals are conceptual illustrations, not screenshots, benchmarks or live service telemetry. No microphone access, model API calls, tracking scripts or external fonts are used.

## Accessibility and checks

Semantic HTML, native expandable notes, keyboard focus, navigation landmarks, a skip link, live filter counts, mobile-menu Escape handling, reduced-motion support and an animation pause control are provided. Core content and project links remain readable without JavaScript. Motion stops offscreen and when the tab is hidden.

`npm test` checks JavaScript syntax, unique anchors, project count, local asset references, external-link attributes, metadata, the static entry point and Pages support files. Browser interaction testing was performed in Chromium using the exact HTML/CSS/JS loaded in memory, covering 320, 375, 390, 768, 1024, 1440 and 1920px widths, project filters, expandable notes, mobile navigation, no-JavaScript content and reduced motion.
