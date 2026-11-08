# RoadPilot-Website

Source of the official RoadPilot website: a static site built with React, TypeScript and Vite. No backend, no cookies, no analytics and no third-party requests.

> **Status: migrated, content update pending.** The source was imported as a clean snapshot from the former private website repository. The texts, links, roadmap and changelog still describe an earlier state of the project and are being updated in separate, dedicated steps (GitHub links, changelog removal, roadmap, German version). Nothing is deployed from this repository yet.

## Quick start

Requires Node.js 20 or newer.

```powershell
npm ci
npm run dev          # http://localhost:5173
npm run typecheck    # TypeScript only
npm run lint         # ESLint
npm run build        # type check + production build into dist/
npm run preview      # serve dist/ locally
npm run test:legal   # tests of the legal configuration
```

## Legal details (local only)

The imprint and the privacy policy need the operator's name, postal address and contact email. **These are personal data and are never committed.** They are read at build time from an ignored local file:

1. Copy `config/legal.example.json` to `config/legal.local.json` (ignored by Git through `*.local.json`).
2. Replace the placeholders with the real details: `name`, `addressLines` (3 to 6 lines: street and number, postal code and city, country) and `email`.
3. Alternatively set the environment variable `ROADPILOT_LEGAL_CONFIG` to the path of your file.

Behaviour:

- `npm run build` **fails with a clear error** if the file is missing, is not valid JSON, contains unknown settings, misses a field, or still contains placeholders (`<...>`, `[[...]]`, `example.invalid`, ...). Placeholder legal information is never published.
- `npm run dev` does not fail; it shows visibly marked `[[placeholders]]` and prints a warning.
- The committed example file is rejected by the validator on purpose.

Because `npm run build` is part of the pre-commit checks, the file must exist on every machine that commits to this repository.

## Project structure

```text
index.html, imprint/index.html, privacy/index.html   page entries with SEO metadata
config/legalConfig.mjs                               legal configuration loader and validator
config/legal.example.json                            template for the local legal details
public/                                              favicon, robots.txt, sitemap.xml
src/
  config/site.ts, config/legal.ts                    site URLs and the injected legal details
  data/                                              features, roadmap, games, releases
  i18n/en.ts                                         all visible text (English)
  components/, sections/, pages/, entries/           UI building blocks and page entries
  styles/global.css                                  design tokens and all styles
tests/legalConfig.test.mjs                           tests of the legal configuration
```

The imprint and the privacy policy are real HTML pages (`/imprint/`, `/privacy/`) built by Vite's multi-page mode, so a static file server needs no SPA rewrite rules.

## Not part of this repository

- Deployment scripts and server details. Deployment is configured outside the repository.
- The former browser demo and dashboard screenshots; they showed an outdated application generation.

## Planned steps

Each of these gets its own change:

- Update GitHub links to the RoadPilotHQ organization.
- Remove the changelog for now.
- Rebuild the roadmap from the actual project status.
- Add a complete German version under `/de/` (English stays the default language).

## License

Licensing is currently undecided. No license has been selected for this repository, and the website content must not be described as open source until one is chosen.

---

Euro Truck Simulator 2 and American Truck Simulator are trademarks of SCS Software. RoadPilot is not an official SCS Software product.
