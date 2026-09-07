# yuchan - Backend x AI

Personal portfolio of Yu-Cheng Chien / yuchan. NKUST Computer Science and Information Engineering, Year 4.

[English website](https://yuchan27.github.io/?lang=en) | [Traditional Chinese website](https://yuchan27.github.io/zh/?lang=zh) | [Email](mailto:wuwu6249@gmail.com)

## Contact and language update (2.1)

This update preserves the restored v2 design: black background, warm accents, animated knot, project illustrations and native expandable notes. `assets/site.css` is unchanged from commit `beffba34ec596366804025e12882e96e224b47c8`.

- Textual EN / Traditional Chinese navigation at the top. Both pages contain fully rendered HTML and work without a translation service. Initial root content is English; optional local storage remembers explicit language choices. `?lang=en` and `?lang=zh` links override preferences.
- `wuwu6249@gmail.com` is visible in the hero and contact section, with mailto links and a copy-email control.
- Emoji and glyph-based UI icons have been replaced with local, single-color SVGs or plain text. No icon font, flag emoji or external icon library is required.
- `assets/enhancements.css` adds only icon, contact and language-control styles, plus wrapping adjustments for translated text.

The headings, project titles and decorative English captions remain part of the shared visual identity. The Chinese page retains the original English project titles with Chinese descriptions; the English page translates navigation, biography, skills, project descriptions and engineering notes.

## Edit and publish

- `index.html`: English page.
- `zh/index.html`: Traditional Chinese page.
- `assets/site.css`: original v2 styling; keep unchanged unless a redesign is requested.
- `assets/enhancements.css`: small additions.
- `assets/site.js`: original interactions and artwork, with localized messages and email copy.
- `assets/language.js`: optional preference handling and language-link anchors.

```sh
npm test
python -m http.server 8080
```

No dependency installation or build step is required. GitHub Pages publishes **main / (root)**; `.nojekyll` is retained. The custom GitHub workflow validates the files, while GitHub's native Pages workflow publishes them.

## Validation

`npm test` checks both language pages, local links and anchors, six project entries, email links, script syntax and absence of emoji glyphs. The exact submitted English page, Chinese page and main JavaScript were hash-matched to the locally tested files.

The pages were rendered in Chromium from in-memory HTML/CSS/JS at 320, 390, 560, 640, 768, 1024, 1440 and 1920px, in both languages. Those 16 layouts passed horizontal-overflow checks, project filtering, native details, mobile menu checks where applicable, and clipboard-unavailable fallback messages. Both static pages also retained their content with JavaScript disabled. Actual network navigation and successful system clipboard writes were not verified in that restricted browser environment.

## UI references

The additions follow the use of explicit text labels and decorative SVGs documented in GitHub Primer, and visible language links documented by W3C Internationalization. These are interaction references, not a claim of copying a portfolio or winning an award.

- https://primer.style/accessibility/patterns/primer-components/icons/
- https://www.w3.org/International/questions/qa-navigation-select

No tracking scripts, model calls, microphone access, private project source, credentials or customer data are included. Project artwork is conceptual rather than live service telemetry.
