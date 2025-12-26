# Changelog

## About

All notable changes to this project will be manually documented in this file.

> [INFO]
> The logic behind this page is part of the `@osm-traffic-signs/converter` package
> [which has it's own changelog](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/packages/traffic-sign-converter/CHANGELOG.md).

## Unreleased

## 2.1.7

_2025-12-26_

- Refactor redirects to be part of sign configs and enhance search to include alternative identifiers.
- Add and update signs.

## 2.1.6

_2025-12-09_

- Add signs, update logic for signs.
- Add links to the OSM wiki sign page (the list) and the Wikipedia sign list in the sidebar under "More…"

## 2.1.5

_2025-12-09_

- Update all dependencies to latest versions

## 2.1.4

_2024-12-29_

- Rework how SVG images are handeled. ([Learn more…](../../packages/traffic-sign-converter/CHANGELOG.md#014))

## 2.1.3

- Fix bug in package to handle two types of modifier signs ([more…](../../packages/traffic-sign-converter/CHANGELOG.md#013))
- Add `/check-sign-combinations` to allow checking primary and secondary sign combinations

## 2.1.2

- Fix and improve search
- Fix and improve `/signs` page with a list of all signs that the tool uses
- Add `/wiki` page to compare parsed wiki data with what the tool has
- Add `/taginfo` page to compare the tool against taginfo traffic sign values
- Update `@osm-traffic-signs/converter`

## 2.1.1

- Custom sign value: Fix form not working for more than one character
- Modifier signs now add `access=*` when traffic sign does not provide access tags to modify.

## 2.1.0

_2024-10-30_

- Full rewrite of the internal logic
- Logic was moved into the [`@osm-traffic-signs/converter`](https://www.npmjs.com/package/@osm-traffic-signs/converter) package
- Data: Improved structure
- Data: New signs
- UI: Allow to drag & drop selected signs
- Logic: Better signs recognition from sign tags
- Logic: Improved parsing of URL params
- Logic: Improved logic to apply access and conditional restrictions
- New page /taginfo to see results for the most used traffic sign values
- Disclaimer: This migration to split the app and package is still WIP
- Fix layout for mobile – however, the UI is not optimized for Mobile in any ways, it is just not broken

## 2.0.13

_2024-09-14_

- Migrate to NextJS
- Update all dependencies
- Add `cmd+k` shortcut to jump into search
- Add `x` icon to delete search input
- Change project font, [see Notes](./app/_components/layout/fonts/README.md)
- Change the version number system to start with `2.0` in the spirit that https://osmtools.de/traffic_signs/ was the `1.0`.

## 2.0.12

_2024-04-01_

Initial verions written in Svelte.

## 2.0.0

_2023-05-01_

Start of the proof of concept. We call it version `2.0.0` in the spirit that https://osmtools.de/traffic_signs/ was the `1.0`.
