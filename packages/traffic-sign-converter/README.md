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

## Example usage

`TODO`

## SVG assets / Vite lazy loading

Bundled traffic-sign SVGs ship as separate subpath exports. For runtime loading in Vite (or similar bundlers), prefer lazy APIs so only the SVGs you actually render are fetched.

| Use case                                   | Import                                                                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Recommended** — load one sign at runtime | `loadTrafficSignSvg('DE', sign)` from the main entry, or `import { SvgLoadersDE } from '@osm-traffic-signs/converter/data-svgs/DE/loaders'`               |
| Check whether a bundled SVG exists         | `hasBundledSvg` from the main entry                                                                                                                       |
| Eager namespace (legacy)                   | `import { SvgsDE } from '@osm-traffic-signs/converter/data-svgs/eager'`                                                                                   |
| Single static SVG                          | `import x from '@osm-traffic-signs/converter/data-svgs/DE/svgs/DE_274_30.svg'` or `import { DE_274_30 } from '@osm-traffic-signs/converter/data-svgs/DE'` |

```ts
import { hasBundledSvg, loadTrafficSignSvg } from '@osm-traffic-signs/converter'

if (hasBundledSvg('DE', sign)) {
  const svgUrl = await loadTrafficSignSvg('DE', sign)
}
```

**Vite pitfall:** Do not import eager SVG namespaces from `@osm-traffic-signs/converter/data-svgs/eager` (or the old combined root barrel) unless you intend to bundle every SVG for that country. The root `@osm-traffic-signs/converter/data-svgs` entry exports loader maps only.

Per-country loaders are the documented default for direct map access:

```ts
import { SvgLoadersDE } from '@osm-traffic-signs/converter/data-svgs/DE/loaders'

const loader = SvgLoadersDE['DE_274__30__']
const { default: svgUrl } = loader ? await loader() : { default: undefined }
```

## Licence: GNU AGPLv3

[LICENCE](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/LICENSE)
