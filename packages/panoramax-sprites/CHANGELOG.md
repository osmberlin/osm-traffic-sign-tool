# Changelog

## Unreleased

### Added

- Initial `@osm-traffic-signs/panoramax-sprites` package.
- YAML source of truth (`src/registry/panoramax-classes.yaml`) mapping Panoramax traffic-sign
  detection classes to per-country sign codes (DE, FR, NL, CH, BE), seeded from the Panoramax CSV.
- Translation registry generator: per-country + combined JSON and a `REGISTRY.md` coverage report
  classifying every class as `ok` / `svg-missing` / `signId-not-in-tool` / `country-not-in-tool`.
- In-process MapLibre sprite generator (`@resvg/resvg-js` + `@mapbox/shelf-pack`, no external
  binary) producing per-country sheets `trafficsigns_{de,fr,be}` (PNG + JSON, incl. `@2x`) plus a
  `manifest.json`, with an isolated render-probe that skips and records unrenderable source SVGs.
- Runtime API: `osmValueToSpriteKey`, `getRegistryEntry`, `spriteRegistry`, `spriteManifest`.
- Docs: problem statement, Panoramax integration analysis, sprite-generator comparison, and a
  config-driven + lazy-loading implementation prompt for the Panoramax web viewer.
