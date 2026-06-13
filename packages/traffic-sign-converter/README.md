# OpenStreetMap Traffic Sign Converter

> Convert traffic sign IDs to OSM tags
> Suggest a `traffic_sign`-tag based on OSM tags.

- [Project page](https://www.osm-verkehrswende.org/traffic-signs/)
- [Github repo](https://github.com/osmberlin/osm-traffic-sign-tool/tree/main/packages/traffic-sign-converter)
- [Package on NPM](https://www.npmjs.com/package/@osm-traffic-signs/converter)

## Installation

```
npm install @osm-traffic-signs/converter
```

## Main methods

| Function                | Input                         | Output                        |
| ----------------------- | ----------------------------- | ----------------------------- |
| `trafficSignTagToSign`  | `traffic_sign=DE:250,1022-10` | `[{ /* Sign Object */ }]`     |
| `tagsToSign`            | `vehicle=no+bicycle=yes`      | `[{ /* Sign Object */ }]`     |
| `signsToTrafficSignTag` | `[{ /* Sign Object */ }]`     | `traffic_sign=DE:250,1022-10` |
| `signsToTags`           | `[{ /* Sign Object */ }]`     | `vehicle=no+bicycle=yes`      |
| `signsToComments`       | `[{ /* Sign Object */ }]`     | Opt. Array of comments        |

## Main data

Use `countryDefinitions` to access the traffic sign objects per country.

## JSON sign data

Build output includes plain JSON under `sign-data/` for language-agnostic consumption (see [issue #120](https://github.com/osmberlin/osm-traffic-sign-tool/issues/120)).

Start from the manifest, then load per-country files:

```typescript
const manifest = await Bun.file(
  new URL('@osm-traffic-signs/converter/sign-data/manifest.json', import.meta.url),
).json()
const deSigns = await Bun.file(
  new URL('@osm-traffic-signs/converter/sign-data/DE.json', import.meta.url),
).json()
```

| File                                 | Path                                                            |
| ------------------------------------ | --------------------------------------------------------------- |
| Manifest (country list + file map)   | `@osm-traffic-signs/converter/sign-data/manifest.json`          |
| Catalogue metadata (beta/stable, QA) | `@osm-traffic-signs/converter/sign-data/catalogue-meta.json`    |
| Cross-country redirects              | `@osm-traffic-signs/converter/sign-data/general-redirects.json` |
| Per-country sign arrays              | `@osm-traffic-signs/converter/sign-data/{CC}.json`              |

Each `{CC}.json` file is a `SignType[]` matching `TrafficSignDataTypes` (`tagRecommendationsByGeometry`, `questions` with `*I18nKey`, `image` as remote object, local object, or `"missing"`).

**Pictures:** use `image.sourceUrl` when remote. For bundled SVGs, load from `@osm-traffic-signs/converter/data-svgs/{CC}/svgs/` (filename from `signId`, same rules as `createSvgFilename`).

**Conversion logic** (`signsToTags`, question merging) is not in JSON — use this package’s functions or reimplement from the published recommendations.

**Static URLs:** the web app also serves the same files at `/sign-data/` (GitHub Pages / Netlify preview).

iD preset export is not included; track separately if needed.

## Example usage

`TODO`

## Licence: GNU AGPLv3

[LICENCE](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/LICENSE)
