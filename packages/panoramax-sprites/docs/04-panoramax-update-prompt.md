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
