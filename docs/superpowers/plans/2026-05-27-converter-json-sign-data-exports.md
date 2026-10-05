# Converter package: JSON sign data exports — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship plain JSON files alongside the compiled JS in `@osm-traffic-signs/converter` so non-JS consumers (JOSM, StreetComplete, Vespucci, mobile map apps, etc.) can load traffic sign catalogue data — OSM tag mappings, names, descriptions, and image references — without executing TypeScript or bundling the package’s modules. Closes the first milestone of [issue #120](https://github.com/osmberlin/osm-traffic-sign-tool/issues/120).

**Architecture:** Keep the source of truth as today’s TypeScript modules under `src/data-definitions/` (incremental step; unlike [id-tagging-schema](https://github.com/openstreetmap/id-tagging-schema), JSON is a **derived build artifact**, not the edit source — see **Issue #120 alignment** below). After `tsc` emits `dist/`, run a **Bun TypeScript script** (`scripts/write-sign-data-json.ts`, same pattern as `transfer-svgs.ts`) that dynamically imports the built `countryDefinitions`, `countryCatalogueMeta`, and `generalRedirects` from `dist/`, then writes UTF-8 JSON under `dist/sign-data/` using `Bun.write()`. Declare stable `package.json` `exports` subpaths for those JSON files. Copy the same JSON tree into the TanStack app’s static output (`public/sign-data/` → Vite `dist/sign-data/`) so Netlify deploy previews and GitHub Pages can serve them over HTTPS for manual smoke tests. Document consumption for non-JS integrators in the converter README; surface the package and JSON URLs in the app footer.

**Tech Stack:** Bun 1.3+ (package manager, script runner, native file APIs), `tsc -p tsconfig.build.json`, Vite, TanStack Router, Paraglide i18n, `@arethetypeswrong/cli` (`check-exports`), `vitest`, `bun run release-cli.ts` for manual npm releases, Netlify deploy previews (`netlify.toml` → `bun run build`).

---

## Monorepo tooling (current — no turbo / no pnpm)

The repo uses **Bun workspaces** only. Turbo and pnpm are gone.

| What | Command / location |
|------|-------------------|
| Install | `bun install` |
| Build everything (Netlify, GH Pages) | `bun run build` at repo root |
| Build packages (ordered) | `bun run build:packages` — converter **first**, then `@internal/taginfo`, `@internal/svgs`, `@internal/wiki` |
| Build app | `bun run --cwd apps/traffic-sign-tool build` (after packages) |
| Lint / format / test all | `bun run check`, `bun run test`, `bun run format` |
| Pre-push hook | `bun run check` + `bun run check:clean-build` (`.husky/pre-push`) |
| Clean-build smoke test | `bun run check:clean-build` — wipes all `dist/`, runs full `bun run build` (`script-check-clean-build.ts`) |

**Build order matters:** root `package.json` runs `build:packages` before the app. The converter JSON step belongs in **converter `build`** (Task 1); the app copy step belongs in **app `build`** before Vite (Task 5). No turbo `dependsOn` — ordering is explicit in root scripts.

---

## Where should the JSON writer live?

**Decision: `packages/traffic-sign-converter/scripts/write-sign-data-json.ts`** (not a separate `@internal/*` package).

| Option | Verdict |
|--------|---------|
| **`converter/scripts/`** (recommended) | JSON is a **published npm artifact** (`dist/sign-data/` + `exports`). Matches existing `scripts/transfer-svgs.ts` — build glue co-located with the package it produces. |
| **New `@internal/build` package** | Overkill for one ~60-line script; adds workspace wiring and an extra build step with no reuse today. |
| **`@internal/svgs` or similar** | Wrong boundary — internal packages own **data pipelines** (wiki download, SVG optimize) that are private and not shipped in `@osm-traffic-signs/converter`. JSON export is part of the public converter release. |

The app’s **`scripts/copy-sign-data-json.ts`** stays in the app (copies from converter `dist/` into `public/` — app-specific static hosting concern).

Use **`.ts`** files run with `bun ./scripts/….ts` (not `.mjs`). Prefer **`Bun.write()`**, **`Bun.file().json()`**, **`import.meta.dir`**, and `node:fs/promises` `cp`/`rm` where appropriate (see `.cursor/rules/bun-helpers.mdc` and `transfer-svgs.ts`).

---

## Issue #120 alignment

[Issue #120 — Separate data from code](https://github.com/osmberlin/osm-traffic-sign-tool/issues/120) asks for sign data (OSM tags ↔ picture/description) in JSON, consumable by editors and apps that are not web/JS-based, and wonders whether an **iD preset** export would make sense.

| #120 goal | This plan | Notes |
|-----------|-----------|-------|
| Data separated from code | **Yes (Task 1–2)** | Per-country JSON arrays mirror `SignType` configs; no TS runtime needed to *read* catalogue data. |
| Language-agnostic consumption | **Yes (Task 3)** | Plain JSON over npm paths or HTTPS static URLs; document schema fields. |
| OSM tags ↔ sign identity | **Yes** | Each entry has `signId`, `osmValuePart`, `tagRecommendationsByGeometry`, `identifyingTags`, redirects. |
| Picture / description | **Partial** | `descriptiveName`, `description`, `comments` are in JSON. **Pictures:** `image.sourceUrl` (remote wiki) or `image: "missing"`; bundled SVGs stay in `@osm-traffic-signs/converter/data-svgs/{CC}/svgs/` — pair by `signId` (see Task 3). JSON does not embed SVG bytes. |
| JSON as edit source (like id-tagging-schema) | **Out of scope** | TS modules remain authoritative; follow-up could invert the pipeline later. |
| iD preset export | **Out of scope** | Different schema (presets, fields, geometry filters). Worth a **separate issue/spike**: map `tagRecommendationsByGeometry` + `questions` → preset fragments; partial overlap only. Listed under optional follow-ups. |
| Tag conversion logic in non-JS apps | **Out of scope** | `signsToTags`, conditional merging, question resolution stay in the npm package for now. JSON supplies catalogue + recommendations; reimplementing conversion is a later step for native apps. |
| Question UI strings | **Partial** | `questions` use `*I18nKey` fields (Paraglide keys), not plain text — non-JS apps need their own translations or a future i18n JSON export. |

**Plan changes vs earlier draft (post-rebase on `main`):**

- Export **`catalogue-meta.json`** alongside country files (beta/stable, QA capabilities, wiki links).
- Expect **8 countries** in manifest: `AT`, `AU`, `BE`, `BR`, `CA`, `DE`, `FR`, `PL` (not DE-only).
- JSON schema reflects **`tagRecommendationsByGeometry`** and **`image: "missing"`** (0.5.0 model).
- Build/release commands use **`bun`** only (no turbo/pnpm); scripts are **`.ts`** with `Bun.write()` / `import.meta.dir`.
- JSON writer lives in **`packages/traffic-sign-converter/scripts/`** (not a separate internal package).
- Next release is **`0.6.0`** (package is already at `0.5.0`).

---

## File map (before tasks)

| Path | Role |
|------|------|
| `packages/traffic-sign-converter/package.json` | Add `build:json` script step, `exports` entries for `./sign-data/*.json`, wire `build` pipeline |
| `packages/traffic-sign-converter/scripts/write-sign-data-json.ts` | **Create** — post-`tsc` Bun script: import built modules, write `dist/sign-data/*.json` |
| `packages/traffic-sign-converter/README.md` | Document JSON subpaths and Bun/`Bun.file` consumption examples |
| `packages/traffic-sign-converter/CHANGELOG.md` | Unreleased bullet for JSON exports |
| `packages/traffic-sign-converter/src/...` | **No change** to sign data TS (single source of truth unchanged) unless you later dedupe helpers |
| `apps/traffic-sign-tool/scripts/copy-sign-data-json.ts` | **Create** — copy converter `dist/sign-data/` → `public/sign-data/` before Vite |
| `apps/traffic-sign-tool/package.json` | Add `build:copy-sign-data` before `build:vite`; relies on root `build:packages` order |
| `apps/traffic-sign-tool/public/.gitignore` | Ignore generated `public/sign-data/*.json` |
| `apps/traffic-sign-tool/app/_components/layout/Footer.tsx` | Footer links: npm package + JSON sign data |
| `apps/traffic-sign-tool/messages/en.json`, `messages/de.json` | New Paraglide strings for footer labels |
| `netlify.toml` | Only if SPA fallback blocks JSON (see Task 5); otherwise unchanged |

---

### Task 1: Post-build JSON writer script

**Files:**

- Create: `packages/traffic-sign-converter/scripts/write-sign-data-json.ts`
- Modify: `packages/traffic-sign-converter/package.json` (`build` / `build:json`)

- [ ] **Step 1: Add `write-sign-data-json.ts`**

Use `pathToFileURL` for dynamic `import()` of compiled JS; `Bun.write()` for output (see `scripts/transfer-svgs.ts` for repo conventions).

```typescript
// packages/traffic-sign-converter/scripts/write-sign-data-json.ts
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const packageRoot = path.resolve(import.meta.dir, '..')
const dist = path.join(packageRoot, 'dist')
const outDir = path.join(dist, 'sign-data')

const toFileUrl = (relativePath: string) =>
  pathToFileURL(path.join(dist, relativePath)).href

const writeJson = async (filename: string, data: unknown) => {
  await Bun.write(path.join(outDir, filename), `${JSON.stringify(data, null, 2)}\n`)
}

const { countryDefinitions } = await import(
  toFileUrl('data-definitions/countryDefinitions.js'),
)
const { countryCatalogueMeta } = await import(
  toFileUrl('data-definitions/countryCatalogueMeta.js'),
)
const { generalRedirects } = await import(
  toFileUrl('data-definitions/generalRedirects.js'),
)

await mkdir(outDir, { recursive: true })

await writeJson('general-redirects.json', generalRedirects)
await writeJson('catalogue-meta.json', countryCatalogueMeta)

for (const [countryCode, signs] of Object.entries(countryDefinitions)) {
  await writeJson(`${countryCode}.json`, signs)
}

const manifest = {
  version: 1,
  schemaNote:
    'Each {CC}.json is SignType[]; fields match TrafficSignDataTypes (tagRecommendationsByGeometry, image, questions, …).',
  countries: Object.keys(countryDefinitions).sort(),
  files: {
    countries: Object.fromEntries(
      Object.keys(countryDefinitions).map((c) => [c, `./${c}.json`]),
    ),
    catalogueMeta: './catalogue-meta.json',
    generalRedirects: './general-redirects.json',
  },
  relatedAssets: {
    bundledSvgs: '@osm-traffic-signs/converter/data-svgs/{CC}/svgs/{signId}.svg',
  },
}

await writeJson('manifest.json', manifest)
```

- [ ] **Step 2: Wire `package.json` scripts**

After `build:ts` (so `dist/data-definitions/*.js` exists), run the script. Insert into the `build` chain:

```json
"build:json": "bun ./scripts/write-sign-data-json.ts",
```

And extend `build` (order matters: **after** `build:ts`, **before** `build:copy-svgs` is fine):

```
"build": "bun run build:clean && bun run build:clean-svgs && bun run build:transfer-svgs && bun run build:ts && bun run build:json && bun run build:copy-types && bun run build:copy-svgs"
```

- [ ] **Step 3: Run build and confirm artifacts**

Commands (from repo root):

```bash
bun run --cwd packages/traffic-sign-converter build
```

Expected: files exist:

- `packages/traffic-sign-converter/dist/sign-data/DE.json` (and `AT.json`, `FR.json`, …)
- `packages/traffic-sign-converter/dist/sign-data/catalogue-meta.json`
- `packages/traffic-sign-converter/dist/sign-data/general-redirects.json`
- `packages/traffic-sign-converter/dist/sign-data/manifest.json`

Quick sanity check:

```bash
bun -e "const m=await Bun.file('packages/traffic-sign-converter/dist/sign-data/manifest.json').json(); console.log(m.countries.join(','))"
```

Expected stdout includes all eight prefixes: `AT,AU,BE,BR,CA,DE,FR,PL` (order may differ).

- [ ] **Step 4: Commit**

```bash
git add packages/traffic-sign-converter/scripts/write-sign-data-json.ts packages/traffic-sign-converter/package.json
git commit -m "build(converter): emit sign data JSON after TypeScript compile"
```

---

### Task 2: `package.json` exports for JSON

**Files:**

- Modify: `packages/traffic-sign-converter/package.json` (`exports`)

- [ ] **Step 1: Add export map entries**

Add subpaths (adjust if you drop `manifest.json` in Task 1):

```json
"./sign-data/manifest.json": "./dist/sign-data/manifest.json",
"./sign-data/catalogue-meta.json": "./dist/sign-data/catalogue-meta.json",
"./sign-data/general-redirects.json": "./dist/sign-data/general-redirects.json",
"./sign-data/*.json": "./dist/sign-data/*.json"
```

Place them after the main `"."` export block for readability. Wildcard covers `DE.json` and future country codes without editing `package.json` each time.

- [ ] **Step 2: Validate with attw**

```bash
bun run --cwd packages/traffic-sign-converter build && bun run --cwd packages/traffic-sign-converter check-exports
```

Expected: `check-exports` exits 0. If `attw` flags JSON resolution, add the minimal `--ignore-rules` entry **only** after confirming it is a false positive (prefer fixing export conditions first).

- [ ] **Step 3: Commit**

```bash
git add packages/traffic-sign-converter/package.json
git commit -m "feat(converter): export sign-data JSON paths in package exports"
```

---

### Task 3: Documentation and changelog

**Files:**

- Modify: `packages/traffic-sign-converter/README.md`
- Modify: `packages/traffic-sign-converter/CHANGELOG.md` (`## Unreleased`)

- [ ] **Step 1: README section**

Add a **JSON sign data** section after **Main data**, documenting:

- Start from `manifest.json` → per-country files; read `catalogue-meta.json` for beta/stable and QA capability flags.
- Per-country: `@osm-traffic-signs/converter/sign-data/DE.json` (array of sign objects).
- `general-redirects.json` — cross-cutting redirect map used at lookup time.
- **Non-JS integrators (issue #120):**
  - Schema matches `TrafficSignDataTypes` / exported TS types (`tagRecommendationsByGeometry`, `questions` with `*I18nKey`, `image` as remote object, local object, or `"missing"`).
  - **Pictures:** use `image.sourceUrl` when remote; for bundled assets import/copy from `@osm-traffic-signs/converter/data-svgs/{CC}/svgs/` (filename derived from `signId`, same rules as `createSvgFilename`).
  - **Conversion logic** (`signsToTags`, question merging) is not in JSON — use the npm package or reimplement from published recommendations.
  - Link to [issue #120](https://github.com/osmberlin/osm-traffic-sign-tool/issues/120) as tracking issue; note iD preset export is not included (future work).

- [ ] **Step 2: Changelog bullet**

Under `## Unreleased`, add a line such as: ship JSON copies of country sign lists, catalogue metadata, general redirects, and a manifest under `sign-data/` with stable package export paths (addresses #120 data separation).

- [ ] **Step 3: Commit**

```bash
git add packages/traffic-sign-converter/README.md packages/traffic-sign-converter/CHANGELOG.md
git commit -m "docs(converter): document JSON sign data exports"
```

---

### Task 4: Monorepo verification

**Files:** none (commands only)

- [ ] **Step 1: Full package check**

```bash
bun run --cwd packages/traffic-sign-converter check
```

Expected: exports, lint, type-check, tests all pass.

- [ ] **Step 2: Root clean-build smoke test (recommended pre-push)**

```bash
bun run check:clean-build
```

Simulates GitHub Pages / Netlify: wipes all `dist/`, runs full `bun run build`. Catches ordering bugs (converter must build before app copy step).

- [ ] **Step 3: Commit** (only if prior steps changed anything, e.g. attw ignores)

---

### Task 5: Static JSON on Netlify deploy preview (smoke-test URLs)

**Context:** Netlify builds PR previews from the monorepo root (`bun run build`, publish `apps/traffic-sign-tool/dist`). Root `build` runs `build:packages` (converter first) then the app build. The `@netlify` bot comment on each PR includes a **Deploy Preview** base URL, e.g. for PR #131:

`https://deploy-preview-131--osm-traffic-sign-preview.netlify.app`

Use that base URL (replace `131` with the current PR number) to verify JSON is served before merging.

**Files:**

- Modify: `apps/traffic-sign-tool/package.json` (`build` script chain)
- Create: `apps/traffic-sign-tool/scripts/copy-sign-data-json.ts`
- Modify: `apps/traffic-sign-tool/public/.gitignore` (ignore `public/sign-data/*.json`)

- [ ] **Step 1: Copy converter JSON into the app static tree before Vite**

Root `bun run build` runs `build:packages` first, so `packages/traffic-sign-converter/dist/sign-data/` exists before the app build.

Add a Bun script (same `cp` pattern as `transfer-svgs.ts`):

```typescript
// apps/traffic-sign-tool/scripts/copy-sign-data-json.ts
import { cp, rm } from 'node:fs/promises'
import path from 'node:path'

const appRoot = path.resolve(import.meta.dir, '..')
const src = path.resolve(appRoot, '../../packages/traffic-sign-converter/dist/sign-data')
const dest = path.join(appRoot, 'public/sign-data')

await rm(dest, { recursive: true, force: true })
await cp(src, dest, { recursive: true })
```

Wire into app `build` **before** `build:vite`:

```json
"build:copy-sign-data": "bun ./scripts/copy-sign-data-json.ts",
"build": "bun run build:paraglide && bun run build:copy-sign-data && bun run build:vite"
```

Add to `public/.gitignore` (create if missing):

```
sign-data/*.json
```

- [ ] **Step 2: Confirm local static URLs**

```bash
bun run build
bun run --cwd apps/traffic-sign-tool preview
```

In another terminal (default preview port 4173):

```bash
curl -sS http://localhost:4173/sign-data/manifest.json | head
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:4173/sign-data/DE.json
```

Expected: HTTP `200`, manifest JSON whose `countries` array lists all configured prefixes (e.g. includes `"DE"` and `"FR"`).

- [ ] **Step 3: Document test links using the Netlify preview URL**

After pushing the implementation PR, read the **Deploy Preview** link from the `@netlify` bot comment (or Netlify deploy log). Substitute it for `{PREVIEW}` below and paste into the PR description / manual QA checklist:

| Resource | URL |
|----------|-----|
| Manifest | `{PREVIEW}/sign-data/manifest.json` |
| Catalogue metadata | `{PREVIEW}/sign-data/catalogue-meta.json` |
| Germany signs | `{PREVIEW}/sign-data/DE.json` |
| France signs (beta) | `{PREVIEW}/sign-data/FR.json` |
| General redirects | `{PREVIEW}/sign-data/general-redirects.json` |

**Example (PR #131 plan branch — replace when implementing feature PR):**

- https://deploy-preview-131--osm-traffic-sign-preview.netlify.app/sign-data/manifest.json
- https://deploy-preview-131--osm-traffic-sign-preview.netlify.app/sign-data/DE.json
- https://deploy-preview-131--osm-traffic-sign-preview.netlify.app/sign-data/general-redirects.json

Quick checks in browser or terminal:

```bash
PREVIEW='https://deploy-preview-<PR>--osm-traffic-sign-preview.netlify.app'
curl -sS "$PREVIEW/sign-data/manifest.json" | bun -e "const d=await Bun.stdin.text(); console.log(JSON.parse(d).countries)"
curl -sS -o /dev/null -w '%{http_code}\n' "$PREVIEW/sign-data/DE.json"
```

Expected: prints full country list (8 prefixes) and `200`.

**SPA fallback note:** `netlify.toml` rewrites unknown paths to `index.html`. Static files under `dist/sign-data/` are served as files first; if JSON URLs return HTML instead, add an explicit rule *above* the catch-all:

```toml
[[redirects]]
  from = "/sign-data/*"
  to = "/sign-data/:splat"
  status = 200
```

- [ ] **Step 4: Commit**

```bash
git add apps/traffic-sign-tool/package.json apps/traffic-sign-tool/scripts/copy-sign-data-json.ts apps/traffic-sign-tool/public/.gitignore
git commit -m "feat(app): copy converter sign-data JSON into static build output"
```

---

### Task 6: Prepare npm package for manual release

**Scope:** Implementation PR prepares changelog and version policy; a maintainer runs publish manually (do not automate `npm publish` in CI).

**Files:**

- Modify: `packages/traffic-sign-converter/CHANGELOG.md`
- Modify: `packages/traffic-sign-converter/package.json` (`version` — only bumped during release, not in feature PR unless team prefers)
- Reference: `release-cli.ts`, `packages/traffic-sign-converter/CONTRIBUTING.md`

- [ ] **Step 1: Finalize `## Unreleased` before release**

Ensure bullets cover at least:

- JSON sign data under `sign-data/` with package export paths (`@osm-traffic-signs/converter/sign-data/DE.json`, manifest, general redirects).
- README section for npm vs static URL consumption.

Leave `## Unreleased` in the feature PR; do **not** add a version section until release day.

- [ ] **Step 2: Choose semver bump**

Additive, non-breaking API → **minor** bump (current package version `0.5.0` → `0.6.0`), consistent with prior converter releases.

- [ ] **Step 3: Manual release checklist (maintainer)**

Run from repo root after the feature is merged to `main`:

```bash
bun run release-cli.ts --package --minor
```

The CLI will:

1. Confirm `CHANGELOG.md` `## Unreleased` is complete.
2. Run `npm version minor` in `packages/traffic-sign-converter` (updates `package.json` only).
3. Prompt to move `## Unreleased` content into `## 0.6.0` with date `_YYYY-MM-DD_`.
4. `bun run --filter '@osm-traffic-signs/converter' build` and `bun run check` in the package.
5. `npm publish` (requires `npm login`).
6. Git commit `Package: release v0.6.0` and optional push.

**Pre-release verification on the tarball:**

```bash
bun run --cwd packages/traffic-sign-converter build
(cd packages/traffic-sign-converter && npm pack --dry-run)
```

Confirm `package/sign-data/DE.json`, `catalogue-meta.json`, `manifest.json`, and `general-redirects.json` appear in the packed file list.

- [ ] **Step 4: Post-release (optional follow-up PR)**

Bump `apps/traffic-sign-tool` workspace dependency after publish (`bun install` updates `bun.lock`); document in app `CHANGELOG.md` if user-facing.

---

### Task 7: TanStack app — footer links (package + JSON)

**Files:**

- Modify: `apps/traffic-sign-tool/app/_components/layout/Footer.tsx`
- Modify: `apps/traffic-sign-tool/messages/en.json`
- Modify: `apps/traffic-sign-tool/messages/de.json`
- Run: `bun run --cwd apps/traffic-sign-tool build:paraglide` (or full `bun run build`)

- [ ] **Step 1: Add Paraglide message keys**

`messages/en.json`:

```json
"footer_converter_package": "NPM package (@osm-traffic-signs/converter)",
"footer_sign_data_json": "Sign data (JSON)"
```

`messages/de.json`:

```json
"footer_converter_package": "NPM-Paket (@osm-traffic-signs/converter)",
"footer_sign_data_json": "Zeichendaten (JSON)"
```

- [ ] **Step 2: Extend `Footer.tsx` navigation**

Add two entries to the **external** `navigation` array (same row as Github / Changelog), reusing existing `footerLinkClassName` and `ExternalLink`:

```tsx
{
  name: m.footer_converter_package(),
  href: 'https://www.npmjs.com/package/@osm-traffic-signs/converter',
},
{
  name: m.footer_sign_data_json(),
  href: '/sign-data/manifest.json',
},
```

Use a plain `<a href="/sign-data/manifest.json">` or `ExternalLink` with **no** `blank` for the JSON link so it stays same-origin on Netlify preview and production. The manifest points consumers at per-country files.

Optional one-line mention in the footer intro paragraph (`footer_project_part` block): short note that tagging logic lives in the npm package — only if it does not clutter; the two links are the minimum.

- [ ] **Step 3: Verify in dev and preview**

```bash
bun run --cwd apps/traffic-sign-tool dev
```

Open footer → NPM opens npmjs.com; JSON opens manifest in browser.

After Netlify deploy, confirm JSON link resolves on `{PREVIEW}/sign-data/manifest.json` (Task 5).

- [ ] **Step 4: Commit**

```bash
git add apps/traffic-sign-tool/app/_components/layout/Footer.tsx apps/traffic-sign-tool/messages/en.json apps/traffic-sign-tool/messages/de.json
git commit -m "feat(app): footer links for converter npm package and JSON sign data"
```

---

## Optional follow-ups (beyond issue #120 milestone 1)

- **iD preset export (#120 question):** Spike mapping `SignType` → [id-tagging-schema](https://github.com/openstreetmap/id-tagging-schema) preset JSON; likely needs custom fields for modifiers, geometry-specific recommendations, and question flows. Track as separate issue.
- **JSON as source of truth:** Invert pipeline (edit JSON → generate TS) like id-tagging-schema; large migration.
- **i18n bundle for questions:** Export Paraglide message keys used in `questions` as `{locale}.json` for native apps.
- **Picture index JSON:** Flat `{countryPrefix}/{signId} → {url|svgPath}` lookup file for map renderers.
- **Tests:** Add a `vitest` test that imports `countryDefinitions` from source and asserts `JSON.stringify` equals `JSON.stringify(JSON.parse(fs.readFileSync('dist/sign-data/DE.json')))` — only if you add a test script phase that runs **after** `build` in CI; otherwise skip to avoid order coupling.
- **Minified JSON:** Switch to `JSON.stringify(x)` without pretty-print to shrink tarball; trade-off: worse `git diff` on accidental commits (dist is not usually committed).
- **Single combined file:** If consumers prefer one download, add `all-countries.json` with the same shape as `countryDefinitions` — redundant with per-country files; add only if requested.

---

## Self-review (spec coverage)

| Requirement (from #120 / PR / review) | Task |
|----------------------------------------|------|
| Separate catalogue data from TS/code (#120) | Task 1–2 |
| Non-JS consumption (tags, names, descriptions) | Task 2–3 (exports + integrator README) |
| Image references (not embedded SVG) | Task 1 + Task 3 (`relatedAssets` in manifest, data-svgs docs) |
| Multi-country catalogues (AT…BR) | Task 1 loop + `catalogue-meta.json` |
| iD preset export (#120 question) | Optional follow-up (out of scope) |
| Test links via Netlify deploy preview | Task 5 |
| Prepare npm package for manual release | Task 6 (`0.6.0`) |
| App footer: package + JSON feature | Task 7 |

**Placeholder scan:** No TBD/TODO in executable steps above.

**Type consistency:** JSON matches runtime arrays exported as `countryDefinitions[code]`; manifest `version: 1` leaves room for schema changes later.

---

## Execution handoff

**Plan complete and saved to** `docs/superpowers/plans/2026-05-27-converter-json-sign-data-exports.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks.

2. **Inline Execution** — Run tasks in one session using executing-plans-style checkpoints.

**Which approach?** (Pick when handing this to an implementer.)
