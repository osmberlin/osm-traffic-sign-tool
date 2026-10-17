# @osm-traffic-signs/converter

## Unreleased

- Parsed signs have `recognized: true | false`. The misspelled `recodgnizedSign` is still set but deprecated and will be removed in a later release.

## 0.7.1

_2026-10-17_

- **BREAKING:** Fix three `FR` signs whose values were cut off by the CSV import: `FR:B17[70` is now `FR:B17[70 m]`, `FR:B19[Interdit` is now `FR:B19[Interdit aux motocyclistes]` and `FR:B29[Allumez` is now `FR:B29[Allumez vos feux]`, as on the OSM Wiki. Their SVG exports are renamed to `FR_B17__70_m__`, `FR_B19__Interdit_aux_motocyclistes__` and `FR_B29__Allumez_vos_feux__`.
- **BREAKING:** `FR:B17`, `FR:B19` and `FR:B29` get a free-text `valuePrompt` (like `FR:M9z`), so any distance or inscription such as `FR:B19[Baignade interdite]` is recognized and keeps the bundled SVG. The separate bare `B17`, `B19` and `B29` entries (without image) are removed; the bare ids now resolve to the signs with their default value, e.g. `FR:B19` to `FR:B19[Interdit aux motocyclistes]`. Traffic signs (`kind: 'traffic_sign'`) may now have a text `valuePrompt` and a string `signValue`.
- **BREAKING:** `FR:A16` is now `FR:A16[10%]` with a free-text gradient, so `FR:A16[14%]` is recognized and suggests `incline=-14%`; the bare id still resolves to this sign. Its SVG export is renamed to `FR_A16__10___`. Remove two `FR` entries that were table headers, not signs (`Panneau`, `Image`).
- `loadTrafficSignSvg()` and `hasBundledSvg()` now resolve a string like the `svgName` of `trafficSignTagToSigns()`, so `'274.1[20]'`, `'325.1[30]'` or `'1020-30[Anlieger]'` find the same SVG as the parsed sign. Unrecognized values (strings or parsed signs) no longer get an SVG; before, `'274-1'` loaded the `274.1` SVG because both have the import name `DE_274_1`. `loadTrafficSignSvg()` only loads the sign catalogues when it gets a string.
- Add `loadTrafficSignSvgDimensions(countryPrefix, signOrOsmValuePart)`: the `{ width, height }` of a bundled SVG (from its `viewBox`) without loading the SVG, e.g. to lay out signs before they are drawn. It resolves strings like `loadTrafficSignSvg()` and loads one small table per country. For synchronous use, import the map directly: `SvgDimensionsDE` from `@osm-traffic-signs/converter/data-svgs/DE/dimensions` (all countries: `@osm-traffic-signs/converter/data-svgs`). The SVG pipeline writes these tables next to `loaders.ts` (`bun run updateSvgs:dimensions` in `internal_svgs` regenerates them without downloading).
- Add `redirectDashValues` on sign configs: `<signId>-<number>` is redirected to `<signId>[<number>]`. Set on `DE:262`–`266`, so `262-7.5` and any other dash value resolve to the bracket sign (these were unrecognized).
- Restore DE redirects that were lost when redirects moved into the sign configs (0.4.0), following the bracket/dash decision in [#60](https://github.com/osmberlin/osm-traffic-sign-tool/issues/60#issuecomment-2563086843): `274.1[20]` → `274.1-20`, `274.2[20]` → `274.2-20`, `278[N]` → `278-N`, `275[N]` → `275-N`, `279[N]` → `279-N`, `394` → `394-50`. `274.1[40]` stays as is, because `274.1-40` is the double-sided Tempo 30 sign.
- `trafficSignTagToSigns()` caches its lowercased redirect lookup per country instead of rebuilding it on every call.
- Add `FR` signs from the current OSM Wiki: the location signs `E32` to `E60` and the 112 direction sign idiograms `ID01a` to `ID39` (including the regional park idiograms `ID15a1` to `ID15a48`), which suggest `destination:symbol=*`. Several idiograms on one sign join their symbols, e.g. `FR:ID25,FR:ID26a` suggests `destination:symbol=lodging,food`.
- Every bundled SVG now has a `viewBox` and no `width`/`height`: `BE_F111` and `BE_F113` were not optimized (Inkscape `svg:svg` root) and are fixed; the SVG pipeline now fails instead of writing an SVG without a `viewBox`.
- Fix `FR_B55.svg`, which was not valid XML (an HTML comment had leaked into its `<title>`), so browsers did not render it. Remove the unused `FR_M2.svg` (`FR:M2[50]` uses `FR_M2__50__.svg`).

## 0.7.0

_2026-10-05_

- **BREAKING:** `FR:M2` is now `FR:M2[50]` with an integer `valuePrompt` (extent in km) and `FR:M9z` is now `FR:M9z[Rappel]` with a free-text `valuePrompt`; the bare ids still resolve to these signs.
- Add `valuePrompt.format: 'text'` (type `TextValuePromptFormat`) for free-text panels without opening-hours validation.
- `hasBundledSvg()` and `loadTrafficSignSvg()` use the sign's `svgName` when set, so custom bracket values like `FR:M2[7]` keep their bundled SVG.
- Add beta country catalogue `IT` (303 signs from the OSM Wiki page `IT:Road_signs_in_Italy`, ids follow the Figura/Modello column, e.g. `IT:II.5`, `IT:MII.1`).
- **BREAKING:** Opening-hours validation now uses the structured warnings of `opening_hours` 3.14. Removed the string-parsing exports `flattenOpeningHoursMessages`, `parseOpeningHoursFeedbackChunk`, `parseOpeningHoursFeedbackMessage`, `partitionOpeningHoursMessages`, `splitOpeningHoursFeedbackMessage`, `shouldSkipOpeningHoursMessage` and `SKIPPABLE_OPENING_HOURS_MESSAGE_PREFIXES`; use `shouldSkipOpeningHoursWarningType` / `SKIPPABLE_OPENING_HOURS_WARNING_TYPES` instead.
- Fix `validateConditionalOpeningHours()` showing the irrelevant "no PH rule" warning for non-German locales (it was only hidden for `de`).
- Add `DE:600` (Absperrschranke / Barke).
- Add 289 missing `FR` traffic signs (from the PanierAvide CSV), including bracket speed variants like `B14[30]`, `B33[50]`, `B25[30]` with tagging for `maxspeed`, `minspeed` and `recommended_speed`.
- `trafficSignTagToSigns()` now prefers an exact `osmValuePart` match before falling back to the `signId` lookup, so bracket variants like `FR:B14[30]` resolve to their own sign.
- Fix `AT` tagging: remove stray `)` in values and wrong `DE:Tag:*` keys (`53.26a`, `WVO_F.1`, `3a`); move `bicycle=use_sidepath` (cycleway), `horse=no`/`ski=yes` (`FKV_1.9`) and `highway=path`/`tracktype=grade1` (`WVO_F.1`) to `optionalTags` with guidance.
- Add a browser build for the iD traffic sign field: `dist/id-field-browser.js` (self-contained, minified ESM with `trafficSignTagToSigns`, `signsToTags`, `signsToTrafficSignTagValue` and helpers) and one sign catalogue per country in `dist/data/<COUNTRY>.js`. Import them as `@osm-traffic-signs/converter/id-field-browser` and `@osm-traffic-signs/converter/data/<COUNTRY>`.

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
