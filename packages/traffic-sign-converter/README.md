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

## Licence: GNU AGPLv3

[LICENCE](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/LICENSE)
