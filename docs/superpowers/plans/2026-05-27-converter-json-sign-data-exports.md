# Converter package: JSON sign data exports — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship plain JSON files alongside the compiled JS in `@osm-traffic-signs/converter` so consumers can load traffic sign definitions without executing TypeScript or bundling the package’s modules.

**Architecture:** Keep the source of truth as today’s TypeScript modules under `src/data-definitions/`. After `tsc` emits `dist/`, run a small Node ESM script that dynamically imports the built `countryDefinitions` (and `generalRedirects` for redirect metadata used at runtime) from `dist/`, then writes UTF-8 JSON under `dist/sign-data/`. Declare stable `package.json` `exports` subpaths for those JSON files so resolution works under Node 16+ and bundlers. Copy the same JSON tree into the TanStack app’s static output (`public/sign-data/` → Vite `dist/sign-data/`) so Netlify deploy previews and GitHub Pages can serve them over HTTPS for manual smoke tests. Document consumption in the converter README; surface the package and JSON URLs in the app footer.

**Tech Stack:** Node 22+, `pnpm`, `turbo`, existing `tsc` + `copyfiles` build, Vite, TanStack Router, Paraglide i18n, `@arethetypeswrong/cli` (`check-exports`), `vitest`, `bun run release-cli.ts` for manual npm releases, Netlify deploy previews (`netlify.toml`).

---

## File map (before tasks)

| Path | Role |
|------|------|
| `packages/traffic-sign-converter/package.json` | Add `build:json` script step, `exports` entries for `./sign-data/*.json`, wire `build` pipeline |
| `packages/traffic-sign-converter/scripts/write-sign-data-json.mjs` | **Create** — post-`tsc` script: import built modules, `mkdir` `dist/sign-data`, write JSON |
| `packages/traffic-sign-converter/README.md` | Document JSON subpaths and example `import` / `readFile` usage |
| `packages/traffic-sign-converter/CHANGELOG.md` | Unreleased bullet for JSON exports |
| `packages/traffic-sign-converter/src/...` | **No change** to sign data TS (single source of truth unchanged) unless you later dedupe helpers |
| `apps/traffic-sign-tool/package.json` | Add `build:copy-sign-data` (or similar) before Vite; depends on converter `^build` via turbo |
| `apps/traffic-sign-tool/public/sign-data/.gitkeep` or `.gitignore` | Generated JSON not committed; ensure folder exists or is created at build |
| `apps/traffic-sign-tool/app/_components/layout/Footer.tsx` | Footer links: npm package + JSON sign data |
| `apps/traffic-sign-tool/messages/en.json`, `messages/de.json` | New Paraglide strings for footer labels |
| `netlify.toml` | Only if SPA fallback blocks JSON (see Task 5); otherwise unchanged |

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

### Task 5: Static JSON on Netlify deploy preview (smoke-test URLs)

**Context:** Netlify builds PR previews from the monorepo root (`pnpm run build`, publish `apps/traffic-sign-tool/dist`). The `@netlify` bot comment on each PR includes a **Deploy Preview** base URL, e.g. for PR #131:

`https://deploy-preview-131--osm-traffic-sign-preview.netlify.app`

Use that base URL (replace `131` with the current PR number) to verify JSON is served before merging.

**Files:**

- Modify: `apps/traffic-sign-tool/package.json` (`build` script chain)
- Create (optional): `apps/traffic-sign-tool/scripts/copy-sign-data-json.mjs` — or inline `cp` in `package.json`
- Modify: `apps/traffic-sign-tool/public/.gitignore` (ignore `public/sign-data/*.json` if generated into `public/`)

- [ ] **Step 1: Copy converter JSON into the app static tree before Vite**

Turbo already runs `^build` first, so `packages/traffic-sign-converter/dist/sign-data/` exists when the app builds.

Add a script (example using Node for cross-platform paths):

```javascript
// apps/traffic-sign-tool/scripts/copy-sign-data-json.mjs
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, '../../packages/traffic-sign-converter/dist/sign-data')
const dest = join(root, 'public/sign-data')

rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })
```

Wire into app `build` **before** `build:vite`:

```json
"build:copy-sign-data": "node ./scripts/copy-sign-data-json.mjs",
"build": "pnpm run build:paraglide && pnpm run build:copy-sign-data && pnpm run build:vite"
```

Add to `public/.gitignore` (create if missing):

```
sign-data/*.json
```

- [ ] **Step 2: Confirm local static URLs**

```bash
pnpm exec turbo build --filter=osm-traffic-sign-tool
pnpm --dir apps/traffic-sign-tool preview
```

In another terminal (default preview port 4173):

```bash
curl -sS http://localhost:4173/sign-data/manifest.json | head
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:4173/sign-data/DE.json
```

Expected: HTTP `200`, manifest JSON with `"countries": ["DE"]`.

- [ ] **Step 3: Document test links using the Netlify preview URL**

After pushing the implementation PR, read the **Deploy Preview** link from the `@netlify` bot comment (or Netlify deploy log). Substitute it for `{PREVIEW}` below and paste into the PR description / manual QA checklist:

| Resource | URL |
|----------|-----|
| Manifest | `{PREVIEW}/sign-data/manifest.json` |
| Germany signs | `{PREVIEW}/sign-data/DE.json` |
| General redirects | `{PREVIEW}/sign-data/general-redirects.json` |

**Example (PR #131 plan branch — replace when implementing feature PR):**

- https://deploy-preview-131--osm-traffic-sign-preview.netlify.app/sign-data/manifest.json
- https://deploy-preview-131--osm-traffic-sign-preview.netlify.app/sign-data/DE.json
- https://deploy-preview-131--osm-traffic-sign-preview.netlify.app/sign-data/general-redirects.json

Quick checks in browser or terminal:

```bash
PREVIEW='https://deploy-preview-<PR>--osm-traffic-sign-preview.netlify.app'
curl -sS "$PREVIEW/sign-data/manifest.json" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).countries))"
curl -sS -o /dev/null -w '%{http_code}\n' "$PREVIEW/sign-data/DE.json"
```

Expected: prints `DE` (or current country list) and `200`.

**SPA fallback note:** `netlify.toml` rewrites unknown paths to `index.html`. Static files under `dist/sign-data/` are served as files first; if JSON URLs return HTML instead, add an explicit rule *above* the catch-all:

```toml
[[redirects]]
  from = "/sign-data/*"
  to = "/sign-data/:splat"
  status = 200
```

- [ ] **Step 4: Commit**

```bash
git add apps/traffic-sign-tool/package.json apps/traffic-sign-tool/scripts/copy-sign-data-json.mjs apps/traffic-sign-tool/public/.gitignore
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

Additive, non-breaking API → **minor** bump (current package version `0.4.0` → `0.5.0`), consistent with prior converter releases.

- [ ] **Step 3: Manual release checklist (maintainer)**

Run from repo root after the feature is merged to `main`:

```bash
bun run release-cli.ts --package --minor
```

The CLI will:

1. Confirm `CHANGELOG.md` `## Unreleased` is complete.
2. Run `npm version minor` in `packages/traffic-sign-converter` (updates `package.json` only).
3. Prompt to move `## Unreleased` content into `## 0.5.0` with date `_YYYY-MM-DD_`.
4. `turbo build --force` and `pnpm run check` in the package.
5. `npm publish` (requires `npm login`).
6. Git commit `Package: release v0.5.0` and optional push.

**Pre-release verification on the tarball:**

```bash
cd packages/traffic-sign-converter && pnpm run build && npm pack --dry-run
```

Confirm `package/sign-data/DE.json`, `manifest.json`, and `general-redirects.json` appear in the packed file list.

- [ ] **Step 4: Post-release (optional follow-up PR)**

Bump `apps/traffic-sign-tool` dependency to the published version (`pnpm install` / lockfile) when the app should pin the release; document in app `CHANGELOG.md` if user-facing.

---

### Task 7: TanStack app — footer links (package + JSON)

**Files:**

- Modify: `apps/traffic-sign-tool/app/_components/layout/Footer.tsx`
- Modify: `apps/traffic-sign-tool/messages/en.json`
- Modify: `apps/traffic-sign-tool/messages/de.json`
- Run: `pnpm run build:paraglide` in the app (or full app build)

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
pnpm --dir apps/traffic-sign-tool dev
```

Open footer → NPM opens npmjs.com; JSON opens manifest in browser.

After Netlify deploy, confirm JSON link resolves on `{PREVIEW}/sign-data/manifest.json` (Task 5).

- [ ] **Step 4: Commit**

```bash
git add apps/traffic-sign-tool/app/_components/layout/Footer.tsx apps/traffic-sign-tool/messages/en.json apps/traffic-sign-tool/messages/de.json
git commit -m "feat(app): footer links for converter npm package and JSON sign data"
```

---

## Optional follow-ups (not required for issue #120)

- **Tests:** Add a `vitest` test that imports `countryDefinitions` from source and asserts `JSON.stringify` equals `JSON.stringify(JSON.parse(fs.readFileSync('dist/sign-data/DE.json')))` — only if you add a test script phase that runs **after** `build` in CI; otherwise skip to avoid order coupling.
- **Minified JSON:** Switch to `JSON.stringify(x)` without pretty-print to shrink tarball; trade-off: worse `git diff` on accidental commits (dist is not usually committed).
- **Single combined file:** If consumers prefer one download, add `all-countries.json` with the same shape as `countryDefinitions` — redundant with per-country files; add only if requested.

---

## Self-review (spec coverage)

| Requirement (from #120 / PR / review) | Task |
|----------------------------------------|------|
| JSON version of traffic sign data in the NPM build | Task 1 (`dist/sign-data/*.json`) |
| Easy to consume without TS modules | Task 2 (package exports) + Task 3 (README) |
| Future countries | Task 1 loop + wildcard export |
| Test links via Netlify deploy preview | Task 5 (static copy + URL table from bot comment) |
| Prepare npm package for manual release | Task 6 (changelog, semver, `release-cli.ts` checklist) |
| App footer: package + JSON feature | Task 7 (`Footer.tsx` + i18n) |

**Placeholder scan:** No TBD/TODO in executable steps above.

**Type consistency:** JSON matches runtime arrays exported as `countryDefinitions[code]`; manifest `version: 1` leaves room for schema changes later.

---

## Execution handoff

**Plan complete and saved to** `docs/superpowers/plans/2026-05-27-converter-json-sign-data-exports.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks.

2. **Inline Execution** — Run tasks in one session using executing-plans-style checkpoints.

**Which approach?** (Pick when handing this to an implementer.)
