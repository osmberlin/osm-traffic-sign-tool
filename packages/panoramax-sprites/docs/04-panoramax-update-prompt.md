# 04 — Implementation prompt: config-driven, lazy-loaded multi-country sprites in Panoramax

> This document is written to be pasted (in whole or part) as a task for the Panoramax
> `web-viewer` maintainers or a coding agent. It turns the hardcoded FR-only sprite into a
> **config-driven, multi-country, lazy-loaded** setup that consumes the sheets published by
> `@osm-traffic-signs/panoramax-sprites`.

## Goal

Make the `tfsigns` overlay render detected traffic signs for **any supported country** (FR, DE, BE
today; NL, CH and more later) instead of only France — without fetching every country's sprite sheet
for every user.

## Background (verified facts)

- Detections are stored as `osm|traffic_sign = <CC>:<CODE>` (e.g. `FR:C113`, `DE:274-30`), joined
  with `;` for multiple signs. See `01-problem.md`.
- Today (`src/utils/semantics.js`, `src/utils/services.js`) the sprite is hardcoded to
  `trafficsigns_fr` under the MapLibre sprite namespace `pnx-tfsigns-fr`, and the `icon-image`
  expression only handles the `FR:` prefix; other countries fall to `0_unknown`. See
  `02-panoramax-integration.md`.
- Sprite sheets are published per country as `trafficsigns_<cc>` (PNG + JSON, incl. `@2x`), keyed by
  the **bare** sign code (`slice(osm|traffic_sign, 3)`), with `0_many` / `0_unknown` sentinels. A
  machine-readable list of available sheets ships as `manifest.json`:

  ```json
  {
    "sheets": [
      {
        "country": "BE",
        "spriteBaseName": "trafficsigns_be",
        "keyCount": 114,
        "unsupportedKeys": ["F111", "F113", "F45b"]
      },
      {
        "country": "DE",
        "spriteBaseName": "trafficsigns_de",
        "keyCount": 68,
        "unsupportedKeys": []
      },
      {
        "country": "FR",
        "spriteBaseName": "trafficsigns_fr",
        "keyCount": 93,
        "unsupportedKeys": []
      }
    ]
  }
  ```

## Step 1 — Config instead of a hardcoded name

Replace the single hardcoded sprite with a country→URL config (seedable from `manifest.json`):

```js
// src/utils/services.js
export function PanoramaxPresetsURL() {
  return 'https://presets.panoramax.fr'
}

// country code (lowercase) → sprite base URL (no extension; MapLibre adds .json/.png/@2x)
export const TRAFFIC_SIGN_SPRITES = {
  fr: `${PanoramaxPresetsURL()}/sprites/trafficsigns_fr`,
  de: `${PanoramaxPresetsURL()}/sprites/trafficsigns_de`,
  be: `${PanoramaxPresetsURL()}/sprites/trafficsigns_be`,
  // nl, ch … added when their sheets are published
}
export const spriteNamespace = (cc) => `pnx-tfsigns-${cc}`
```

## Step 2 — Generalize the `icon-image` expression

Derive the namespace and key from the value itself (`slice(0,2)` = country, `slice(3)` = code):

```js
// src/utils/semantics.js — layout["icon-image"]
;[
  'case',
  ['in', ';', ['get', 'osm|traffic_sign']],
  ['concat', 'pnx-tfsigns-', ['downcase', ['slice', ['get', 'osm|traffic_sign'], 0, 2]], ':0_many'],
  ['==', ['get', 'osm|traffic_sign'], 'yes'],
  'pnx-tfsigns-fr:0_unknown',
  ['has', 'osm|traffic_sign'],
  [
    'concat',
    'pnx-tfsigns-',
    ['downcase', ['slice', ['get', 'osm|traffic_sign'], 0, 2]],
    ':',
    ['slice', ['get', 'osm|traffic_sign'], 3],
  ],
  '',
]
```

If a namespace isn't registered, MapLibre simply draws no icon for that feature (no error) — which is
what makes lazy registration (Step 3B) safe.

## Step 3 — Register sprites: static vs lazy

### 3A. Static (simplest)

Pass every configured sheet as the 4th argument of `addSemanticOverlay`:

```js
// src/components/ui/MapMore.js — where the tfsigns overlay is added
const sprites = Object.fromEntries(
  Object.entries(TRAFFIC_SIGN_SPRITES).map(([cc, url]) => [spriteNamespace(cc), url]),
)
this.addSemanticOverlay('tfsigns', TFSIGNS_FILTER, tfsignsLayerStyle, sprites)
```

Downside: MapLibre fetches **all** declared sprite sheets (PNG + JSON + `@2x`) when the overlay
loads — wasteful for a user only ever looking at France.

### 3B. Lazy (recommended) — load a country's sheet on first use

Register **only FR** up front, then add other countries' sheets on demand with
`map.addSprite(namespace, url)` (MapLibre GL ≥ 3) the first time that country is needed. Trigger it
from whatever signal is cheapest for the viewer — the current map country/bbox, or the countries
present in the freshly fetched `sem://` tiles:

```js
const loadedCountries = new Set(['fr']) // FR registered statically at overlay creation

async function ensureSpriteForCountry(map, cc) {
  cc = cc.toLowerCase()
  if (loadedCountries.has(cc)) return
  const url = TRAFFIC_SIGN_SPRITES[cc]
  if (!url) return // no sheet published for this country (yet)
  loadedCountries.add(cc) // set before await to avoid duplicate loads
  try {
    await map.addSprite(spriteNamespace(cc), url) // fetches .json/.png (+@2x) once
  } catch (e) {
    loadedCountries.delete(cc)
    console.warn(`traffic-sign sprite for ${cc} failed to load`, e)
  }
}
```

Hook it where detections are already parsed — `SemanticsMapProtocol.js` flattens
`osm|traffic_sign` values per tile, so the set of country prefixes in view is known there:

```js
// after building the tile's features, for each distinct osm|traffic_sign value:
const cc = value.slice(0, 2)
if (/^[A-Z]{2}$/.test(cc)) ensureSpriteForCountry(map, cc)
```

Net effect: a user browsing France downloads only the FR sheet; panning into Germany fetches the DE
sheet exactly once, on demand.

## Step 3C — Consume this package as an npm dependency (bundled, no presets host)

Instead of a `presets.panoramax.fr` (or `<host>`) URL, add the package as a dependency and serve the
sheets from the app itself:

```bash
npm install @osm-traffic-signs/panoramax-sprites
```

The package ships the sheets as subpath exports — `@osm-traffic-signs/panoramax-sprites/sprites/trafficsigns_<cc>.json`
/ `.png` / `@2x.*` — plus a `spriteManifest` of which countries exist.

The one constraint to design around: MapLibre builds sprite requests from a **base URL** — for a base
`X` it fetches `X.json`, `X.png`, and (on HiDPI) `X@2x.json`, `X@2x.png`. So you can't hand it a single
bundler-hashed asset; you give it a base and make those four requests resolve. Two ways:

### Option 1 — copy into the app's static dir at build (simplest)

Copy `node_modules/@osm-traffic-signs/panoramax-sprites/dist/data/sprites/*` into the app's
`public/sprites/` (a one-line build step / Vite `publicDir` or `vite-plugin-static-copy`). Then the
base URLs are same-origin and the **Step 3B lazy loader works unchanged**, just with local URLs:

```js
export const TRAFFIC_SIGN_SPRITES = {
  fr: '/sprites/trafficsigns_fr',
  de: '/sprites/trafficsigns_de',
  be: '/sprites/trafficsigns_be',
}
```

Source of truth is the npm package; nothing is fetched from an external host.

### Option 2 — fully bundled + lazy via `transformRequest` (no copy step)

Import each country's four asset files through the app's bundler (so they get hashed URLs and code-
split), map a **virtual base** to them, and let a `transformRequest` redirect MapLibre's sprite
requests to the bundled URLs. Only the country you actually need is `import()`-ed, so its assets land
in their own lazily-loaded chunk.

```js
// sprites/de.ts — one module per country; `?url` gives the bundled asset URL (Vite; webpack: asset/resource)
import json from '@osm-traffic-signs/panoramax-sprites/sprites/trafficsigns_de.json?url'
import png from '@osm-traffic-signs/panoramax-sprites/sprites/trafficsigns_de.png?url'
import json2x from '@osm-traffic-signs/panoramax-sprites/sprites/trafficsigns_de@2x.json?url'
import png2x from '@osm-traffic-signs/panoramax-sprites/sprites/trafficsigns_de@2x.png?url'
export default { json, png, json2x, png2x }

// spriteAssets.ts — registry filled lazily
const loaders = {
  de: () => import('./sprites/de.ts'),
  be: () => import('./sprites/be.ts'),
  fr: () => import('./sprites/fr.ts'),
}
const assets = {} // cc -> { json, png, json2x, png2x }

// Register ONE transformRequest on the map (at construction). It rewrites the virtual base
// `pkg-sprite://<cc>` requests to the bundled asset URLs. ResourceType is SpriteJSON / SpriteImage.
export function spriteTransformRequest(url, resourceType) {
  const m = url.match(/^pkg-sprite:\/\/([a-z]{2})(@2x)?\.(json|png)$/)
  if (!m) return undefined // let MapLibre handle everything else
  const [, cc, retina, ext] = m
  const a = assets[cc]
  if (!a) return { url } // not loaded yet — shouldn't happen if you await the loader first
  const key = ext === 'json' ? (retina ? 'json2x' : 'json') : retina ? 'png2x' : 'png'
  return { url: a[key] }
}

// Lazy loader: dynamic-import the country chunk, then register its sprite by the virtual base.
const loaded = new Set()
export async function ensureSpriteForCountry(map, cc) {
  cc = cc.toLowerCase()
  if (loaded.has(cc) || !loaders[cc]) return
  loaded.add(cc)
  assets[cc] = (await loaders[cc]()).default // fetch the country's chunk (json + png + @2x)
  await map.addSprite(`pnx-tfsigns-${cc}`, `pkg-sprite://${cc}`) // transformRequest resolves the 4 URLs
}
```

Wire `spriteTransformRequest` into the map's existing `transformRequest` (compose if one already
exists), and call `ensureSpriteForCountry(map, cc)` from the same detection-parsing hook as Step 3B.

Trade-off vs Option 1: fully self-contained and versioned with the app (no copy step, no separate
deploy of sprites), at the cost of a small `transformRequest` shim. Both keep the "load only the
country you're looking at" laziness.

> `map.addSprite` / `removeSprite` require MapLibre GL JS ≥ 3. `transformRequest` receives
> `ResourceType.SpriteJSON` for the `.json` and `ResourceType.SpriteImage` for the `.png`.

## Step 4 — Source the config from the manifest (optional)

Rather than hand-maintaining `TRAFFIC_SIGN_SPRITES`, the viewer can fetch this package's
`manifest.json` at startup and build the config from `sheets[].country` /
`sheets[].spriteBaseName`. That keeps the country list in sync with what's actually published and
surfaces `unsupportedKeys` for diagnostics.

## Acceptance checks

- A `DE:274-30` detection renders the German 30 km/h sign (not `0_unknown`).
- A picture with `FR:AB4;FR:B14[30]` renders the `0_many` icon.
- Only the FR sheet is fetched on a France-only session (verify in the network panel); the DE sheet
  is fetched on first pan into Germany.
- Unknown/unpublished country prefixes render nothing (no console errors).
