# @osm-traffic-signs/panoramax-sprites

> MapLibre sprite sheets for [Panoramax](https://panoramax.openstreetmap.fr/) AI traffic-sign
> detections, generated from the [OSM Traffic Sign](https://www.osm-verkehrswende.org/traffic-signs/)
> catalogue.

Panoramax detects traffic signs in street-level imagery and tags each picture with an OSM value like
`osm|traffic_sign=FR:C113`. Its web viewer renders these from a **hardcoded, France-only** sprite, so
signs in other countries don't render. This package generates the missing **per-country sprite
sheets** (PNG + JSON, incl. `@2x`) from this tool's own SVGs, keyed exactly the way the viewer looks
them up.

Full background: [`docs/01-problem.md`](./docs/01-problem.md) ·
[`docs/02-panoramax-integration.md`](./docs/02-panoramax-integration.md) ·
[`docs/03-sprite-generator-comparison.md`](./docs/03-sprite-generator-comparison.md) ·
[`docs/04-panoramax-update-prompt.md`](./docs/04-panoramax-update-prompt.md).

## What's generated (checked into git)

| Path                                                     | What                                                                               |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/registry/panoramax-classes.yaml`                    | **Source of truth** (hand-editable): every detection class → per-country sign code |
| `src/data/registry.json`, `registry_<CC>.json`           | Resolved translation registry per country                                          |
| `src/data/REGISTRY.md`                                   | Human-readable coverage report — **where the gaps are**                            |
| `src/data/sprites/trafficsigns_<cc>(.json\|.png\|@2x.*)` | Per-country MapLibre sprite sheets                                                 |
| `src/data/sprites/manifest.json`                         | Which sheets exist (+ any unsupported icons)                                       |

Sprite keys are the **bare** sign code (e.g. `C113`, `274-30`) — i.e. `osm|traffic_sign` minus the
`CC:` prefix, matching what Panoramax's `icon-image` expression looks up — plus the `0_many` /
`0_unknown` sentinels.

## Coverage (v1)

Built from the ~232 Panoramax detection classes:

| Country | Catalogue in tool | Icons in sheet | Notes                                                                |
| ------- | ----------------- | -------------: | -------------------------------------------------------------------- |
| FR      | yes               |             93 |                                                                      |
| BE      | yes               |            114 | 3 source SVGs unrenderable (see `manifest.json` → `unsupportedKeys`) |
| DE      | yes               |             68 |                                                                      |
| NL      | **no**            |              — | stored as prepared data (`country-not-in-tool`)                      |
| CH      | **no**            |              — | stored as prepared data (`country-not-in-tool`)                      |

Counts include the 2 sentinel icons. NL and CH are kept in the registry so that adding their
catalogues upstream later lights them up with no re-mapping. See `src/data/REGISTRY.md` for the exact
per-class gaps.

## Runtime API

```ts
import {
  osmValueToSpriteKey,
  getRegistryEntry,
  spriteManifest,
} from '@osm-traffic-signs/panoramax-sprites'

osmValueToSpriteKey('FR:B21-1') // → 'B21-1'  (sprite key, or null if not in a sheet)
getRegistryEntry('DE:274-30') // → { yolo, country, osmValue, spriteKey, signId, svgName, status }
spriteManifest.sheets // → [{ country, spriteBaseName, keyCount, unsupportedKeys }, …]
```

The sprite `.png` / `.json` files are also exported for hosting:
`@osm-traffic-signs/panoramax-sprites/sprites/trafficsigns_fr.json`, etc.

## Regenerating

Requires nothing beyond `bun install` (the sprite generator is in-process — no external binary; see
[`docs/03`](./docs/03-sprite-generator-comparison.md)).

```bash
bun run generate           # registry + sprites (the checked-in outputs)
bun run registry:generate  # just the registry JSON/MD
bun run sprites:generate   # just the sprite sheets + manifest
bun run seed:yaml          # re-seed the YAML from scripts/panoramax-classes.source.csv (rarely needed)
```

Editing workflow: change `src/registry/panoramax-classes.yaml`, run `bun run generate`, commit the
regenerated `src/data/**`.

## Known limitations

- **NL, CH**: no catalogue/SVGs in this tool yet → no sheet (registry marks them
  `country-not-in-tool`).
- **Partial catalogue**: even DE/FR/BE are curated, not exhaustive, so some Panoramax classes resolve
  to `signId-not-in-tool` / `svg-missing`. Closing those means adding signs/SVGs upstream.
- **Value-parameterised signs** (`B14[30]`, `2.30[30]`): keyed by the full bare code (matching the
  viewer), but the icon is the base sign — the value isn't baked into the image.
- A few corrupt source SVGs can't be rasterised and are skipped (recorded in `manifest.json`).

## Licence

[GNU AGPLv3](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/LICENSE)
