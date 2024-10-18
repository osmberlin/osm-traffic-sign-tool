# OSM Traffic Sign Tools

## App: Traffic Sign Tool

> Website to compile traffic signs and recieve OpenStreetMap tagging recommendations.

[README – Learn more…](./apps/traffic-sign-tool/README.md)

## Package: Traffic Sign Converter

> Convert traffic sign IDs to OSM tags; suggest a traffic_sign-tag based on OSM tags.

[README – Learn more…](./packages/traffic-sign-converter/README.md)

## Helper: Data

## Licence: GNU AGPLv3

[LICENCE](./LICENSE) – [Learn more on choosealicense.com](https://choosealicense.com/licenses/agpl-3.0/)

## Glossar

Traffic Sign Tag Examples:

- [`traffic_sign=DE:274[60],1040-30[16-18]`](https://trafficsigns.osm-verkehrswende.org/?signs=DE:274[60],DE:1040-30[16-18])
- `traffic_sign=DE:244.1,1022-10`
- `traffic_sign=DE:1022-10`
- [`traffic_sign=DE:250,1024-17;DE:262[5.5]`](https://trafficsigns.osm-verkehrswende.org/?signs=DE:250,DE:1024-17,DE:262[5.5]) – "No entry except for tractor; But also max weight of 5.5t"

Glossar:

- `traffic_sign` – **OSM Key** – [Wiki](https://wiki.openstreetmap.org/wiki/Key:traffic_sign)
- `DE` – **Country prefix** – Each main sign has a country code. Modifier signs get one when they stand alone.
- `274`, `244.1`, `1022-10` – **Sign ID** – The official sign number/identifier.
- `274[60]`, `1040-30[16-18]`, `244.1`, `1022-10` – **OSM Sign Value Part** – The Sign ID together with encoded values.
- `60` (km/h), `16-18` (h) – **OSM Sign Value** – The encoded value of the sign
