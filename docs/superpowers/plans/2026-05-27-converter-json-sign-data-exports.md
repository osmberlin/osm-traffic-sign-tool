# Converter package: JSON sign data exports — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship plain JSON files alongside the compiled JS in `@osm-traffic-signs/converter` so consumers can load traffic sign definitions without executing TypeScript or bundling the package’s modules.

**Architecture:** Keep the source of truth as today’s TypeScript modules under `src/data-definitions/`. After `tsc` emits `dist/`, run a small Node ESM script that dynamically imports the built `countryDefinitions` (and `generalRedirects` for redirect metadata used at runtime) from `dist/`, then writes UTF-8 JSON under `dist/sign-data/`. Declare stable `package.json` `exports` subpaths for those JSON files so resolution works under Node 16+ and bundlers. Document consumption in the converter README.

**Tech Stack:** Node 22+, `pnpm`, existing `tsc` + `copyfiles` build, `@arethetypeswrong/cli` (`check-exports`), `vitest`.

---

## File map (before tasks)

| Path | Role |
|------|------|
| `packages/traffic-sign-converter/package.json` | Add `build:json` script step, `exports` entries for `./sign-data/*.json`, wire `build` pipeline |
| `packages/traffic-sign-converter/scripts/write-sign-data-json.mjs` | **Create** — post-`tsc` script: import built modules, `mkdir` `dist/sign-data`, write JSON |
| `packages/traffic-sign-converter/README.md` | Document JSON subpaths and example `import` / `readFile` usage |
| `packages/traffic-sign-converter/CHANGELOG.md` | Unreleased bullet for JSON exports |
| `packages/traffic-sign-converter/src/...` | **No change** to sign data TS (single source of truth unchanged) unless you later dedupe helpers |

---

### Task 1: Post-build JSON writer script

**Files:**

- Create: `packages/traffic-sign-converter/scripts/write-sign-data-json.mjs`
- Modify: `packages/traffic-sign-converter/package.json` (`build` / `build:json`)

- [ ] **Step 1: Add `write-sign-data-json.mjs`**

Use `pathToFileURL` so dynamic `import()` works on all platforms.

```javascript
// packages/traffic-sign-converter/scripts/write-sign-data-json.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const outDir = join(dist, 'sign-data')

function toFileUrl(relativePath) {
  return pathToFileURL(join(dist, relativePath)).href
}

const { countryDefinitions } = await import(
  toFileUrl('data-definitions/countryDefinitions.js'),
)
const { generalRedirects } = await import(
  toFileUrl('data-definitions/generalRedirects.js'),
)

mkdirSync(outDir, { recursive: true })

const jsonOpts = { encoding: 'utf8' }

writeFileSync(
  join(outDir, 'general-redirects.json'),
  `${JSON.stringify(generalRedirects, null, 2)}\n`,
  jsonOpts,
)

for (const [countryCode, signs] of Object.entries(countryDefinitions)) {
  writeFileSync(
    join(outDir, `${countryCode}.json`),
    `${JSON.stringify(signs, null, 2)}\n`,
    jsonOpts,
  )
}

const manifest = {
  version: 1,
  countries: Object.keys(countryDefinitions).sort(),
  files: {
    countries: Object.fromEntries(
      Object.keys(countryDefinitions).map((c) => [c, `./${c}.json`]),
    ),
    generalRedirects: './general-redirects.json',
  },
}

writeFileSync(
  join(outDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  jsonOpts,
)
```

- [ ] **Step 2: Wire `package.json` scripts**

After `build:ts` (so `dist/data-definitions/*.js` exists), run the script. Insert into the `build` chain:

```json
"build:json": "node ./scripts/write-sign-data-json.mjs",
```

And extend `build` (order matters: **after** `build:ts`, **before** `build:copy-svgs` is fine):

```
"build": "... && npm run build:ts && npm run build:json && npm run build:copy-types && ..."
```

- [ ] **Step 3: Run build and confirm artifacts**

Commands (from repo root):

```bash
pnpm exec turbo build --filter=@osm-traffic-signs/converter
```

Expected: files exist:

- `packages/traffic-sign-converter/dist/sign-data/DE.json`
- `packages/traffic-sign-converter/dist/sign-data/general-redirects.json`
- `packages/traffic-sign-converter/dist/sign-data/manifest.json`

Quick sanity check:

```bash
node -e "const m=require('./packages/traffic-sign-converter/dist/sign-data/manifest.json'); console.log(m.countries)"
```

Expected stdout includes `DE`.

- [ ] **Step 4: Commit**

```bash
git add packages/traffic-sign-converter/scripts/write-sign-data-json.mjs packages/traffic-sign-converter/package.json
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
"./sign-data/general-redirects.json": "./dist/sign-data/general-redirects.json",
"./sign-data/*.json": "./dist/sign-data/*.json"
```

Place them after the main `"."` export block for readability. Wildcard covers `DE.json` and future country codes without editing `package.json` each time.

- [ ] **Step 2: Validate with attw**

```bash
cd packages/traffic-sign-converter && pnpm run build && pnpm run check-exports
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

- `import manifest from '@osm-traffic-signs/converter/sign-data/manifest.json' assert { type: 'json' }` (or `with { type: 'json' }` depending on target) **or** `readFile` + `JSON.parse` for CJS-style consumers.
- Per-country: `@osm-traffic-signs/converter/sign-data/DE.json`
- `general-redirects.json` and its purpose (cross-cutting redirect map, not part of per-country arrays).

- [ ] **Step 2: Changelog bullet**

Under `## Unreleased`, add a line such as: ship JSON copies of country sign lists, general redirects, and a small manifest under `sign-data/` with stable package export paths.

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
cd packages/traffic-sign-converter && pnpm run check
```

Expected: format, exports, lint, type-check, tests all pass.

- [ ] **Step 2: Root turbo check (optional but recommended pre-push)**

```bash
pnpm turbo check --filter=@osm-traffic-signs/converter
```

- [ ] **Step 3: Commit** (only if prior steps changed anything, e.g. attw ignores)

---

## Optional follow-ups (not required for issue #120)

- **Tests:** Add a `vitest` test that imports `countryDefinitions` from source and asserts `JSON.stringify` equals `JSON.stringify(JSON.parse(fs.readFileSync('dist/sign-data/DE.json')))` — only if you add a test script phase that runs **after** `build` in CI; otherwise skip to avoid order coupling.
- **Minified JSON:** Switch to `JSON.stringify(x)` without pretty-print to shrink tarball; trade-off: worse `git diff` on accidental commits (dist is not usually committed).
- **Single combined file:** If consumers prefer one download, add `all-countries.json` with the same shape as `countryDefinitions` — redundant with per-country files; add only if requested.

---

## Self-review (spec coverage)

| Requirement (from #120 / PR) | Task |
|-------------------------------|------|
| JSON version of traffic sign data in the NPM build | Task 1 (`dist/sign-data/*.json`) |
| Easy to consume without TS modules | Task 2 (package exports) + Task 3 (README) |
| Future countries | Task 1 loop + wildcard export |

**Placeholder scan:** No TBD/TODO in executable steps above.

**Type consistency:** JSON matches runtime arrays exported as `countryDefinitions[code]`; manifest `version: 1` leaves room for schema changes later.

---

## Execution handoff

**Plan complete and saved to** `docs/superpowers/plans/2026-05-27-converter-json-sign-data-exports.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks.

2. **Inline Execution** — Run tasks in one session using executing-plans-style checkpoints.

**Which approach?** (Pick when handing this to an implementer.)
