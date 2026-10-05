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

| Function                     | Input                                        | Output                        |
| ---------------------------- | -------------------------------------------- | ----------------------------- |
| `trafficSignTagToSigns`      | `'DE:250,1022-10'`, country                  | `[{ /* Sign Object */ }]`     |
| `tagsToSigns`                | country, `['vehicle=no', 'bicycle=yes']`     | `[{ /* Sign Object */ }]`     |
| `signsToTrafficSignTagValue` | `[{ /* Sign Object */ }]`, country           | `'DE:250,1022-10'`            |
| `signsToTags`                | `[{ /* Sign Object */ }]`, country, geometry | `Map` of recommended OSM tags |
| `signsToComments`            | `[{ /* Sign Object */ }]`, geometry          | `Map` of comments per tag     |

Geometry is one of `GEOMETRY_TYPES` (`'node'`, `'way'`, `'way_centerline'`, `'area'`, `'relation'`): a sign can recommend different tags depending on the object it is mapped on.

## Main data

Use `countryDefinitions` to access the traffic sign objects per country and `countries` for the list of country prefixes. `DE` is the main catalogue; `AT`, `AU`, `BE`, `BR`, `CA`, `FR`, `IT` and `PL` are beta catalogues imported from the OSM Wiki (see `getCountryCatalogueMeta()`).

## Example usage

```ts
import {
  signsToTags,
  signsToTrafficSignTagValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'

const signs = trafficSignTagToSigns('DE:240', 'DE')

signsToTrafficSignTagValue(signs, 'DE')
// 'DE:240'

Object.fromEntries(signsToTags(signs, 'DE', 'way'))
// {
//   highway: ['path'], // allowed values
//   foot: 'designated',
//   bicycle: 'designated',
//   segregated: 'no',
//   traffic_sign: 'DE:240',
// }
```

## Browser build (iD traffic sign field)

For editors that load the converter at runtime without a bundler, the package ships a self-contained, minified ESM build. It has no bare imports (`opening_hours` is bundled).

| Import                                          | File                       | Content                                                                                             |
| ----------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `@osm-traffic-signs/converter/id-field-browser` | `dist/id-field-browser.js` | `trafficSignTagToSigns`, `signsToTags`, `signsToTrafficSignTagValue`, `countries` and a few helpers |
| `@osm-traffic-signs/converter/data/DE`          | `dist/data/<COUNTRY>.js`   | `trafficSignData`: the sign catalogue of one country, to load only the countries you need           |

The files share chunks in `dist/`, so copy or serve the whole set (`id-field-browser.js`, `data/` and the chunk files next to them) rather than single files. They are used by [`@osm-traffic-signs/id-field`](https://github.com/osmberlin/osm-traffic-sign-tool/tree/main/packages/traffic-sign-id-field).

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
