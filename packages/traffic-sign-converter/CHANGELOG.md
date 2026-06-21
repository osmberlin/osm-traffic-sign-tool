# @osm-traffic-signs/converter

## Unreleased

## 0.6.0

_2026-06-15_

- **BREAKING:** Eager SVG namespaces moved from `@osm-traffic-signs/converter/data-svgs` to `@osm-traffic-signs/converter/data-svgs/eager` (`import { SvgsDE } from '.../data-svgs/eager'`). The root `data-svgs` entry now exports loader maps only (`SvgLoadersDE`, etc.); per-country `@osm-traffic-signs/converter/data-svgs/DE/loaders` is unchanged.
- Add `loadTrafficSignSvg()` to load a single bundled SVG by country and sign (lazy, code-split friendly).
- Importing `hasBundledSvg` from the main package entry no longer pulls in eager static SVG imports.

## 0.5.0

_2026-06-06_

- Use `image: 'missing'` on sign configs when the wiki SVG file does not exist (no bundled loader expected); runtime state normalizes legacy `availability: 'missing'` objects to the literal.
- Export `isSignSvgMissing()`, `isSignSvgUnavailable()`, `hasBundledSvg()`, `normalizeSignImage()`, and related sign-image helpers.
- Flag BR `A-49a`, `A-49b`, `A-50a`, `A-50b` as `image: 'missing'` (wiki file absent).
- SVG download pipeline: classify `wiki_file_missing` errors, skip catalogue-missing signs on download, and `apply-missing-svg-flags.ts` to patch source data from `downloadErrors_*.json`.

- Add beta country catalogues: `BE`, `CA`, `PL`, `AT`, `FR`, `AU`, `BR` (OSM Wiki import via `packages/internal_wiki` — `bun run wiki:importCatalogue`).
- Extend `CountryCatalogueMeta` with `catalogueName`, `isBeta`, `osmTrafficSignPrefix`, and `qaCapabilities` (`fullQaCapabilities` / `betaQaCapabilities`).
- Add shared recommendation presets (`sharedRecommendationPresets.ts`) for cross-country semantic equivalents.
- Export catalogue helpers: `getCatalogueDisplayName`, `isBetaCatalogue`, `hasQaCapability`.

- Add sign questions QA helpers (`signHasQuestions`, `filterSignsByQuestionsQa`, `countSignsByQuestionsQa`) for the questions QA page.
- Add structured **questions** on sign configs (`questionId`, `answerId`, i18n keys, explicit `nil` answer, optional `defaultAnswerId`, `affectsHighway`) and shared question builders (`sidepath`, `surfaceColor`, `guidanceMode`, `highwayClass`, `signDirection`).
- Add node **Ausrichtung** (`direction=forward|backward`) for DE hazard signs via `signDirection` / `hazardSignNodeQuestions()` (wiki: DE:Key:direction); omit for way-only Schäden Zusatzzeichen.
- Extend `signsToTags()` with optional answer state to merge question-derived tags; add `signsToOptionalTags()` for recommendation `optionalTags`.
- Migrate DE bike/path infrastructure signs to questions (sidepath, surface colour, guidance) and convert multi-value `highwayValues` arrays to highway-class questions (default: first former array value).
- Add `optionalTags` on geometry recommendations for tags that should appear as optional suggestions (e.g. `colour=white`).
- **BREAKING**: Replace flat `tagRecommendations` with geometry-aware `tagRecommendationsByGeometry` and add `GeometryType` exports (`GEOMETRY_TYPES`).
- Add geometry-aware recommendation helpers: `signsToApplicability`, `signsToTopLevelComments`, and geometry-parameterized `signsToTags` / `signsToComments`.
- Migrate DE sign data to geometry-aware recommendation records and keep explicit-none QA semantics via `tagRecommendationsByGeometry: "none"` + `taggingSuggestionsQa: "none"`.
- Add tagging QA helpers and `tagRecommendations: "none"` marker on sign configs to distinguish intentional empty recommendations from missing work.
- Add `compatibility.confirmedModifiers` on sign configs (modifier `signId` → ISO date `YYYY-MM-DD`) to record combination QA sign-offs — FYI metadata for QA workflows only; does not affect tag conversion output.
- Add many missing DE traffic signs (83 new SVGs); most entries are catalogue-only and do not yet define OSM tagging.
- Replace catalogue `visibility` flags (`search_only`, `highlight`) with per-view `catalogue.focus` records to support thematic sign sets (Standard, bike/foot, parking, highway, Alle-only).
- Export catalogue focus helpers and value-prompt format utilities from the package entry point.
- Render Markdown links in sign descriptions.
- Add country-level catalogue metadata registry: `countryCatalogueMeta` / `getCountryCatalogueMeta` (locale, wiki overview URL, reference-link templates).
- Add reusable reference-link helpers for host apps/editors: `buildSignReferenceLinks`, `buildOsmWikiKeyUrl`, `buildOsmWikiTagUrl`.
- Add DE catalogue metadata module (`catalogueMetaDE`) and tests for metadata + reference-link URL builders.
- Normalize `time_restriction` values in two canonical forms for issue #32/wiki alignment: `traffic_sign` keeps plate-style values (`6-18`, `6:30-18:15`) while generated `*:conditional` uses `HH:MM-HH:MM` (`06:00-18:00`, `06:30-18:15`).
- Move opening-hours validation/parsing helpers from app into converter and export them (`validateConditionalOpeningHours` and related message parsing utilities/types) so all consumers share one implementation.
- Apply opening-hours-based normalization consistently for signs with opening-hours-like value prompts before `traffic_sign` simplification and `*:conditional` output formatting.

## 0.4.0

_2026-05-20_

- Make `image` source metadata explicit via discriminated unions: all sign images now declare `kind: 'remote'` or `kind: 'local'`.
- Add support for local SVG sources in the internal download pipeline and use local DE assets for missing minspeed signs (`275-40`, `275-80`, `279-40`, `279-80`).
- Extend DE catalog coverage with redirects (`241` -> `241-30`, `242` -> `242.1`, `325` -> `325.1`) and additional signs (`274.1-20`, `350.1`, `350.2`) plus parser/redirect tests.
- Harden Wikimedia SVG downloads with compliant bot `User-Agent`, serialized throttled requests, and retry/backoff handling for `429/503` responses.
- Make full SVG refresh non-destructive by default (`updateSvgs:full`) and add explicit wipe mode via `updateSvgs:force-refresh`.

## 0.3.1

_2026-05-20_

- Add dual SVG APIs for compatibility and tree-shaking:
  - legacy namespace API remains supported: `import { SvgsDE } from '@osm-traffic-signs/converter/data-svgs'`
  - new lazy loader API for runtime `svgName`: `SvgLoadersDE`
  - new country subpath entrypoints for static imports: `@osm-traffic-signs/converter/data-svgs/DE`
- Re-enable package export validation in `check` and improve SVG module typings for both string and image-object consumers.
- Versioning strategy: non-breaking feature release (minor bump), reserving a future major only for explicit legacy API removal.

## 0.2.9

_2025-12-26_

- Refactor redirects to be part of sign configs
- Add and update signs

## 0.2.8

_2025-12-25_

- Add signs, update logic for signs.

## 0.2.7

_2025-12-09_

- Update all dependencies to latest versions

## 0.2.6

- Fix syntax for time restriction signs

## 0.2.1

- Rename methods to start with `signs` instead of `sign` when the input is an array of sign objects.
- Add multiple traffic signs
- Fix multiple bugs and add improvements

## 0.1.4

- Rework how SVG files are behing handeled. They are now part of this package. We use [the wiki URLs in the data file](./src/data-definitions/DE/trafficSignDataDE.ts) to download > optimized > rename them and export the in a separate folder. You can use them like `import { SvgsDE } from '@osm-traffic-signs/converter/data-svgs'`. However, we had to disable the package export checks for now, because this setup using SVGs does not validate against [arethetypeswrong](https://github.com/arethetypeswrong/arethetypeswrong.github.io).

## 0.1.3

- Fix handling of modifier signs by splitting them in two categories:
  For `condition_modifier`, the primary condition is removed and only the `*:conditional` tag stays. Eg. `maxspeed:conditional=30 @ (22-06)`
  For `exception_modifier`, the primary condition stays but is resolved conditionally. Eg. `maxweight=5.5 + maxweight:conditional=none @ (destination)`

## 0.1.2

- Improve handling of access restrictions with modifier_sign|s. They are considered additive whenever the existing value is somethign else than "no" (in which case they replace the no).
- Tooling: Switch to pnpm and Turborepo to build the package and app at the same time.

## 0.1.1

- 9018cf1: Modifier signs now add `access=*` when traffic sign does not provide access tags to modify.

## 0.1.0

### Minor Changes

- bb1f0a4: Migrate all logic from the traffic sign tool to this package. The traffic sign tool now relies on the code from here.

## 0.0.2

### Patch Changes

- 65e1b68: Initial release
