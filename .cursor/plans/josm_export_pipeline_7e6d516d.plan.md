---
name: JOSM export pipeline
overview: Add a generator package that builds RoadSigns plugin presets and MapCSS map styles from the traffic-sign catalogue, writes them to a tracked `josm-exports/` folder (updated on each main-branch CI build), and documents raw GitHub download URLs in the root README.
todos:
  - id: pkg-internal-josm
    content: Create packages/internal_josm with generateRoadSignsPreset, generateMapCss, and josm:generate CLI writing to josm-exports/ (icons referenced, not copied)
    status: pending
  - id: wire-build
    content: Add internal_josm to root build:packages, script-check-clean-build.ts, and josm:generate root script
    status: pending
  - id: tests
    content: Add snapshot/unit tests for DE sign XML and MapCSS output
    status: pending
  - id: ci-deploy
    content: 'Extend app-traffic-sign-tool-deploy.yml: generate exports, auto-commit josm-exports with [skip ci], add contents:write'
    status: pending
  - id: ci-pr-check
    content: Add PR check that josm-exports is up-to-date after josm:generate
    status: pending
  - id: docs
    content: Add josm-exports/README.md and JOSM exports section in root README with raw GitHub URLs
    status: pending
isProject: false
---

# JOSM MapCSS + RoadSigns export pipeline

> Addresses [osm-traffic-sign-tool#69](https://github.com/osmberlin/osm-traffic-sign-tool/issues/69): export JOSM `traffic_sign=*` MapCSS styles generated from catalogue data, plus RoadSigns plugin presets ([JOSM RoadSigns format](https://wiki.openstreetmap.org/wiki/JOSM/Plugins/RoadSigns), [MapCSS implementation](https://josm.openstreetmap.de/wiki/Help/Styles/MapCSSImplementation)).

**Goal:** On every production build, regenerate per-country JOSM files from `@osm-traffic-signs/converter` and keep them in a repo folder users can download via raw GitHub URLs.

**Architecture:** New private workspace package `packages/internal_josm` runs after `traffic-sign-converter` + `internal_svgs` build. It reuses existing converter APIs (`countryDefinitions`, `signsToTrafficSignTagValue`, `signsToTags`, `createSvgImportname`, `hasBundledSvg`) instead of reimplementing tag/value logic. Output lands in [`josm-exports/`](josm-exports/) at repo root (committed by CI).

**Tech stack:** Bun/TypeScript (same as [`packages/internal_taginfo`](packages/internal_taginfo/package.json)), Vitest snapshots for generator output.

---

## Output layout (committed folder)

**No icon duplication.** SVGs already live in [`packages/internal_svgs/src/data-svgs/{CC}/svgs/`](packages/internal_svgs/src/data-svgs/) (285+ files for DE, tracked in git). Generated files reference that path via relative URLs from `josm-exports/{CC}/`.

```
josm-exports/
  README.md                 # install steps for JOSM RoadSigns + MapCSS
  DE/
    roadsignpresetDE.xml    # RoadSigns plugin format
    traffic-signs-DE.mapcss # JOSM MapCSS style (icon paths → internal_svgs)
  BE/
    ...
  (one folder per country in countryDefinitions)

packages/internal_svgs/src/data-svgs/   # existing icon source of truth (unchanged)
  DE/svgs/DE_274-30.svg
  ...
```

Raw download URLs (documented in root README):

- Preset: `https://raw.githubusercontent.com/osmberlin/osm-traffic-sign-tools/main/josm-exports/DE/roadsignpresetDE.xml`
- MapCSS: `https://raw.githubusercontent.com/osmberlin/osm-traffic-sign-tools/main/josm-exports/DE/traffic-signs-DE.mapcss`

**Install requirement:** clone the repo (or keep the same folder layout). Downloading only the raw XML/MapCSS to an arbitrary folder will break icon paths — README will state this clearly.

**Icon path constant** (used in generator + docs):

```
../../packages/internal_svgs/src/data-svgs/{CC}/svgs/{filename}.svg
```

(relative from `josm-exports/{CC}/`)

---

## Generator package: `packages/internal_josm`

Follow the [`internal_taginfo`](packages/internal_taginfo/) pattern: private package, depends on `@osm-traffic-signs/converter` workspace, CLI script via `bun run`.

### Key source files to add

| File                                                                                                                       | Responsibility                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`packages/internal_josm/package.json`](packages/internal_josm/package.json)                                               | `josm:generate`, `check`, `test` scripts                                                        |
| [`packages/internal_josm/src/generateJosmExports.ts`](packages/internal_josm/src/generateJosmExports.ts)                   | CLI entry: iterate countries, orchestrate writers, write to `../../josm-exports/`               |
| [`packages/internal_josm/src/generateRoadSignsPreset.ts`](packages/internal_josm/src/generateRoadSignsPreset.ts)           | Build `roadsignpreset{CC}.xml`                                                                  |
| [`packages/internal_josm/src/generateMapCss.ts`](packages/internal_josm/src/generateMapCss.ts)                             | Build `traffic-signs-{CC}.mapcss` with relative paths to `internal_svgs`                        |
| [`packages/internal_josm/src/iconPath.ts`](packages/internal_josm/src/iconPath.ts)                                         | Shared helper: relative SVG path from `josm-exports/{CC}/` → `packages/internal_svgs/...`       |
| [`packages/internal_josm/src/utils/`](packages/internal_josm/src/utils/)                                                   | `escapeXml.ts`, `escapeMapCssString.ts`, `signToRoadSignsTags.ts`, `geometryToRoadSignsTags.ts` |
| [`packages/internal_josm/src/generateRoadSignsPreset.test.ts`](packages/internal_josm/src/generateRoadSignsPreset.test.ts) | Snapshot tests for DE sample signs                                                              |

### Data → RoadSigns XML mapping

Per [`SignType`](packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts) in `countryDefinitions[CC]`:

| Catalogue field                           | RoadSigns XML                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `signId`                                  | `ref` attribute                                                                                                     |
| `name` / `descriptiveName`                | `name`, `long_name`                                                                                                 |
| `signsToTrafficSignTagValue([sign], CC)`  | `traffic_sign_tag` when it differs from bare `ref`                                                                  |
| `createSvgImportname(CC, sign)` + `.svg`  | `icon` filename only (only if `hasBundledSvg`; icons resolved via separate `icon-path`, see below)                  |
| `catalogue.focus.default === 'highlight'` | `useful="true"`                                                                                                     |
| `signsToTags([sign], CC, 'node')`         | child `<tag key="..." value="..."/>` elements                                                                       |
| `valuePrompt` (numeric)                   | `<parameter ident="..." input="textfield" default="..." suffix="..."/>` + bracket placeholder in `traffic_sign_tag` |
| `compatibility.confirmedModifiers`        | `<supplementary id="..."/>` (v1: only QA-confirmed combos; avoids exploding XML size)                               |

Root element per [RoadSigns plugin docs](https://wiki.openstreetmap.org/wiki/JOSM/Plugins/RoadSigns):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<roadsignpreset country="DE" name="German traffic signs (osm-traffic-sign-tools)">
  <sign ref="274-30" name="Zeichen 274-30" icon="DE_274-30.svg" useful="true"
        traffic_sign_tag="DE:274-30">
    <tag key="traffic_sign" value="DE:274-30"/>
    <tag key="maxspeed" value="30"/>
    <tag key="source:maxspeed" value="sign"/>
  </sign>
  <!-- valuePrompt example -->
  <sign ref="274" name="Zeichen 274" icon="DE_274__47__.svg"
        traffic_sign_tag="DE:274[$speed]">
    <parameter ident="speed" input="textfield" default="47" suffix=" km/h"/>
    <tag key="traffic_sign" value="DE:274[$speed]"/>
    ...
  </sign>
</roadsignpreset>
```

Skip signs without bundled SVG for `icon` (still emit tag-only entries if useful for tagging, but prefer skipping icon-less entries in v1 to match RoadSigns UX).

### Data → MapCSS mapping

Per [JOSM elemstyles patterns](https://josm.openstreetmap.de/browser/trunk/resources/styles/standard/elemstyles.mapcss) and [MapCSS 0.2](https://wiki.openstreetmap.org/wiki/MapCSS/0.2):

```mapcss
/* Generated by osm-traffic-sign-tools — AGPL-3.0 */
node|z17-[traffic_sign="DE:274-30"] {
  icon-image: "../../packages/internal_svgs/src/data-svgs/DE/svgs/DE_274-30.svg";
  icon-width: 24;
}
```

Rules:

- One exact-match rule per catalogue `osmValuePart` (with country prefix via `signsToTrafficSignTagValue`)
- Additional rules for each `redirects[].from` alias
- Only emit `icon-image` when `hasBundledSvg(CC, sign)`; skip icon-less signs (JOSM standard style already has generic fallbacks for some `traffic_sign` access combos)
- Quote/escape values containing `"`, `,`, `;`, or brackets per MapCSS string rules
- Icons referenced via `iconPath.ts` relative to the `.mapcss` file (no copy step)

---

## Build integration

### Monorepo scripts

Update [`package.json`](package.json) `build:packages`:

```text
converter → internal_taginfo → internal_svgs → internal_wiki → internal_josm
```

Add root script: `"josm:generate": "bun run --cwd packages/internal_josm josm:generate"`

Update [`script-check-clean-build.ts`](script-check-clean-build.ts) to include `internal_josm` in dist wipe list and run `josm:generate` after build (or verify exports match).

### CI: extend deploy workflow

Modify [`.github/workflows/app-traffic-sign-tool-deploy.yml`](.github/workflows/app-traffic-sign-tool-deploy.yml):

```mermaid
flowchart LR
  checkout[Checkout] --> install[bun install]
  install --> buildPkgs[Build packages incl internal_josm]
  buildPkgs --> genJosm[josm:generate]
  genJosm --> commitExports[Commit josm-exports if changed]
  commitExports --> buildApp[Build Vite app]
  buildApp --> pages[Deploy GitHub Pages]
```

After `internal_josm` build + `bun run josm:generate`:

1. `git config user.name/email` (github-actions bot)
2. `git add josm-exports/`
3. `git diff --staged --quiet || git commit -m "chore: regenerate JOSM exports [skip ci]"`
4. `git push` (needs `contents: write` permission on workflow)

`[skip ci]` prevents infinite workflow loops from the bot commit.

### PR / local verification

Add to [`package-traffic-sign-converter-ci.yml`](.github/workflows/package-traffic-sign-converter-ci.yml) or a small new workflow:

- Build packages + run `josm:generate`
- Fail if `git diff josm-exports/` is non-empty (“run `bun run josm:generate` and commit”)

This keeps PRs honest without auto-committing on branches.

---

## Documentation

### [`josm-exports/README.md`](josm-exports/README.md) (new)

- What is generated and link to issue #69
- **RoadSigns plugin** install ([wiki](https://wiki.openstreetmap.org/wiki/JOSM/Plugins/RoadSigns)):
  - Clone the repo (required for icon paths)
  - Advanced pref `plugin.roadsigns.presets` → add entry, e.g. for DE:
    - `preset-path`: `{repo}/josm-exports/DE/roadsignpresetDE.xml`
    - `icon-path`: `{repo}/packages/internal_svgs/src/data-svgs/DE/svgs/`
- **MapCSS** load: JOSM → Map Styles → add `{repo}/josm-exports/DE/traffic-signs-DE.mapcss` (must stay at that path so relative icon URLs resolve)
- Maturity caveat: alpha/beta catalogues (non-`stable` in [`countryCatalogueMeta`](packages/traffic-sign-converter/src/data-definitions/countryCatalogueMeta.ts)) may be incomplete

### Root [`README.md`](README.md)

Add **“JOSM exports”** section under Workflows:

- One-liner purpose + link to `josm-exports/README.md`
- Table: Country | Preset XML raw URL | MapCSS raw URL
- Note: files auto-regenerated on each `main` deploy

---

## Testing strategy

- **Unit/snapshot:** Given a fixed DE sign fixture (`274-30`, `274[47]` with valuePrompt, one modifier), assert stable XML + MapCSS fragments
- **Integration:** `josm:generate` run in CI produces deterministic output (sort signs by `signId` before emit)
- **Manual smoke test** (document in `josm-exports/README.md`): load DE preset in RoadSigns, verify icon + tags; load MapCSS, verify `DE:274-30` node shows icon at z17+

---

## Out of scope (v1)

- Standard JOSM tagging-preset-1.0 XML (user chose RoadSigns format)
- Zip archives / GitHub Actions artifacts as primary distribution (user prefers repo folder + raw URLs)
- Full automatic `<supplementary>` graph for all compatible modifier pairs (start with `confirmedModifiers` only)
- Publishing to JOSM’s [PresetsSource](https://josm.openstreetmap.de/wiki/Presets) list (can be a follow-up once DE quality is validated)

---

## Risk notes

| Risk                                                            | Mitigation                                                                                     |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Large `josm-exports/` diffs on every catalogue change           | Expected; sorted output + snapshot tests keep diffs reviewable                                 |
| RoadSigns/MapCSS need repo layout, not standalone raw downloads | README: clone repo; raw URLs for XML/MapCSS inspection only; icons always from `internal_svgs` |
| Bot commit permission                                           | Add `contents: write` to deploy workflow `permissions`                                         |
| XML size for DE (~hundreds of signs)                            | Acceptable; monitor; supplementary limited to confirmed combos in v1                           |
