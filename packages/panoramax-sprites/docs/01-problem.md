# 01 — The problem

## What Panoramax does today

[Panoramax](https://panoramax.openstreetmap.fr/) runs AI models over street-level imagery to
detect traffic signs. Each detection is written back onto the picture as OpenStreetMap-style
**semantic tags**. For a French speed/► sign the API returns, per detection, three related keys:

```
osm|traffic_sign                                 = FR:C113
detection_confidence[osm|traffic_sign=FR:C113]   = 1.00
detection_model[osm|traffic_sign=FR:C113]        = classify_fr_road_signs
```

- `osm|traffic_sign` is the **classification** — the OSM `traffic_sign=*` value, shaped
  `<COUNTRY>:<CODE>` (e.g. `FR:C113`, `FR:A15b`). It can also be the generic value `yes`, and when
  a picture has several detected signs the values are joined with `;`.
- `detection_confidence[…]` / `detection_model[…]` carry the model score and model id; the bracketed
  part names exactly which `osm|traffic_sign=<value>` they annotate.

You can see the raw shape from the search API, e.g.
`GET https://panoramax.openstreetmap.fr/api/search?bbox=…&filter="semantics.osm|traffic_sign" IS NOT NULL`
returns features whose `properties.semantics[]` hold those keys.

The web viewer's **`tfsigns` overlay** renders these as a MapLibre symbol layer, choosing an icon per
feature from a sprite sheet.

## Where it falls short

The sprite the viewer uses is **hardcoded to France**:
`https://presets.panoramax.fr/sprites/trafficsigns_fr`. The `icon-image` expression only special-
cases the `FR:` prefix (it strips `FR:` and looks up the bare code, e.g. `FR:C113` → sprite key
`C113`). Any **non-FR** value (`DE:…`, `NL:…`, `CH:…`, `BE:…`) falls through to a generic
`0_unknown` placeholder — so detections in Germany, the Netherlands, Switzerland and Belgium do not
render as their real sign.

The presets server only hosts the FR sheet; `trafficsigns_de`, `_nl`, `_ch`, `_be` all 404.

See [`02-panoramax-integration.md`](./02-panoramax-integration.md) for the exact code paths.

## What this package does about it

This tool already maintains a large, curated catalogue of traffic-sign **SVGs** per country
(`@internal/svgs`) plus structured sign data (`@osm-traffic-signs/converter`). This package:

1. Takes a **registry** (`src/registry/panoramax-classes.yaml`) mapping each Panoramax detection
   class to this tool's per-country sign ids — seeded from the CSV Panoramax provided.
2. Resolves every class against the catalogue and records exactly **where the gaps are**
   (see [`../src/data/REGISTRY.md`](../src/data/REGISTRY.md)).
3. Generates **per-country MapLibre sprite sheets** (`trafficsigns_de/_fr/_be`, PNG + JSON, incl.
   `@2x`) keyed the same way Panoramax already expects (bare sign code), so they are drop-in for a
   multi-country viewer.

The countries the CSV references are DE, FR, NL, CH, BE. This tool currently has catalogues for
**DE, FR, BE** (NL and CH are stored in the registry as prepared data, ready to light up when their
catalogues are added). See [`03-sprite-generator-comparison.md`](./03-sprite-generator-comparison.md)
for how the sheets are built and [`04-panoramax-update-prompt.md`](./04-panoramax-update-prompt.md)
for how Panoramax would consume them.
