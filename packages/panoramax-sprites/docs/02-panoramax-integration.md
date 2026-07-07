# 02 — How Panoramax selects a sprite, and how to extend it

All code references are from the Panoramax web viewer repo
[`gitlab.com/panoramax/clients/web-viewer`](https://gitlab.com/panoramax/clients/web-viewer),
default branch **`develop`** (raw files at `…/-/raw/develop/<path>`). Line numbers are approximate
and may drift; treat the quoted code as the anchor.

## 1. The overlay

The traffic-sign overlay is declared in `src/utils/semantics.js` as the `tfsigns` entry of
`SEMANTICS_OVERLAYS` (a tuple `[overlayId, apiFilter, maplibreStyle, sprites]`). It is registered
on the map by `MapMore.addSemanticOverlay(id, apiFilter, layerStyle, sprites)` in
`src/components/ui/MapMore.js`, which builds a MapLibre style with a vector source
`sem-tfsigns` (tiles served client-side from a `sem://` protocol handler,
`src/utils/SemanticsMapProtocol.js`), one symbol layer, and the sprite list:

```js
// src/components/ui/MapMore.js (addSemanticOverlay)
const srcId = 'sem-' + id // "sem-tfsigns"
const myLayerStyle = {
  sources: {
    [srcId]: {
      type: 'vector',
      tiles: [`sem:///${apiFilter}/{z}/{x}/{y}`],
      minzoom: 15,
      maxzoom: 19,
    },
  },
  layers: [{ id, source: srcId, 'source-layer': 'layer', ...layerStyle }],
  sprite: Object.entries(sprites || {}).map(([k, v]) => ({ id: k, url: v })),
}
```

## 2. The hardcoded FR sprite

```js
// src/utils/semantics.js  (4th tuple element of the tfsigns overlay)
{ "pnx-tfsigns-fr": `${PanoramaxPresetsURL()}/sprites/trafficsigns_fr` }

// src/utils/services.js
export function PanoramaxPresetsURL() { return "https://presets.panoramax.fr"; }
```

MapLibre appends `.json` / `.png` (and `@2x` on HiDPI) itself. The sprite is registered under the
namespace id **`pnx-tfsigns-fr`**. There is no DE/NL/CH/BE variant anywhere.

## 3. The `icon-image` expression (FR-only)

```js
// src/utils/semantics.js — symbol layer layout["icon-image"]
;[
  'case',
  ['in', ';', ['get', 'osm|traffic_sign']],
  'pnx-tfsigns-fr:0_many',
  ['==', ['slice', ['get', 'osm|traffic_sign'], 0, 2], 'FR'],
  ['concat', 'pnx-tfsigns-fr:', ['slice', ['get', 'osm|traffic_sign'], 3]],
  ['==', ['get', 'osm|traffic_sign'], 'yes'],
  'pnx-tfsigns-fr:0_unknown',
  ['has', 'osm|traffic_sign'],
  'pnx-tfsigns-fr:0_unknown',
  '',
]
```

Reading it top to bottom:

1. value contains `;` (several signs on one picture) → icon `pnx-tfsigns-fr:0_many`.
2. first two chars are `FR` → **strip `FR:`** with `slice(value, 3)` and prefix the namespace →
   `FR:C113` becomes MapLibre image id **`pnx-tfsigns-fr:C113`**, resolved to sprite JSON key `C113`.
3. value is exactly `yes` → `0_unknown`.
4. any other present value (incl. `DE:…`, `CH:…`, …) → `0_unknown`.

So only `FR:`-prefixed values render as their real sign; everything else is a placeholder. Sprite
JSON keys are **bare panel codes with no country prefix** (`C113`, `KD22a`, `M1`) plus the two
sentinels `0_many` and `0_unknown`.

## 4. How to extend it to more countries

There is **no config hook today** and no open issue proposing one (checked the repo's tracker). Two
routes:

### A. Downstream, no fork — `addSemanticOverlay`

`addSemanticOverlay` is public. A downstream integrator can register their own `tfsigns` overlay
after map load, passing (a) a generalized `icon-image` expression and (b) their own sprite URLs:

```js
viewer.onceMapReady().then(() => {
  viewer.map.addSemanticOverlay(
    'tfsigns',
    '"semantics.osm|traffic_sign" IS NOT NULL',
    { metadata: { name: 'Traffic signs' }, type: 'symbol', layout: { 'icon-image': genericExpr } },
    {
      'pnx-tfsigns-fr': 'https://presets.panoramax.fr/sprites/trafficsigns_fr',
      'pnx-tfsigns-de': 'https://<host>/sprites/trafficsigns_de',
      'pnx-tfsigns-be': 'https://<host>/sprites/trafficsigns_be',
    },
  )
})
```

### B. Upstream — generalize `semantics.js`

Replace the FR-only branch with one that derives the namespace from the country prefix. The two
strings the viewer needs are already in the value: `slice(0, 2)` (country) and `slice(3)` (code):

```js
// generalized icon-image (per-country namespaces registered as sprites)
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

The sprite sheets this package generates are **built for exactly this**: one sheet per country named
`trafficsigns_<cc>`, registered under namespace `pnx-tfsigns-<cc>`, with keys equal to the bare code
(`slice(value, 3)`), plus `0_many` / `0_unknown` sentinels so the multi-sign / unknown branches
still resolve.

A ready-to-use, config-driven + lazy-loading version of this is written up as an implementation
prompt in [`04-panoramax-update-prompt.md`](./04-panoramax-update-prompt.md).

## Open questions

- MapLibre resolves a missing `icon-image` id to no icon; whether the viewer wants a per-country
  `0_unknown` fallback vs a single shared one is a product choice (the generalized expr above keeps a
  shared FR sentinel for `yes`).
- Value-parameterised detections (e.g. `FR:B14[30]`): the viewer's `slice(value, 3)` keeps the
  `[30]`, so the sprite key would be `B14[30]`. This package keys those entries the same way (see
  the limitations in the [README](../README.md)).
