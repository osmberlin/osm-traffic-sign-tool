# Changelog

## About

All notable changes to this project will be manually documented in this file.

> [INFO]
> The logic behind this page is part of the `@osm-traffic-signs/converter` package
> [which has it's own changelog](https://github.com/osmberlin/osm-traffic-sign-tool/blob/main/packages/traffic-sign-converter/CHANGELOG.md).

## Unreleased

- Add **Tagging QA** page at `/$lang/signs-qa` to review sign tagging suggestions with focus and QA filters, record per-sign tasks, and open pre-filled GitHub issues (label `tagging-qa`).
- Rework **Sign combinations QA** at `/$lang/check-sign-combinations` to review one primary sign at a time (primary picker, combination filters, per-row feedback) and export tasks via pre-filled GitHub issues (label `combination-qa`).
- Add GitHub issue templates and Cursor catalogue workflows for both QA pages: submitting an issue runs a GitHub Actions workflow that posts an `@cursor` comment; the Cursor GitHub app reads the issue body, follows `.cursor/skills/add-traffic-sign` or `.cursor/skills/fix-sign-combination`, and opens a PR updating DE sign config in `@osm-traffic-signs/converter` (see `.github/TAGGING_QA_AUTOMATION.md` and `.github/COMBINATION_QA_AUTOMATION.md`).
- Fix filter URL updates on QA pages to stay on the current route without scroll jumps.
- Enable TanStack Router route code splitting.
- Rename all-signs table column to “Raw sign config data”.
- Migrate from Next.js to TanStack Router SPA (Vite), including route migration, TanStack search-param handling with Zod validation, and static-hosting compatibility for GitHub Pages.
- Fix layout, width, and responsive behaviour after the TanStack migration (content pages, footer and header links, `/$lang/` route).
- Add Focus filter row to browse signs by thematic catalogue views (Standard, Fuß und Rad, Parkraum, Straßenraum, Alle).
- Add live syntax validation for `opening_hours` and `time_restriction` value prompts using `opening_hours.js`, with localized fatal errors and soft warnings.
- Preserve sign description open/closed state in local storage.
- Make the custom value prompt overlay narrower for long input strings.
- Fix search validation when `q` is a bare number in the URL.
- Refresh bundled DE sign data and SVGs from converter updates (many new signs and catalogue focus rework).

## 2.1.9

_2026-05-20_

- Update app SVG loading flow to support runtime lazy loading from `@osm-traffic-signs/converter`.
- Update bundled converter package release to `0.3.1` (dual API support for legacy namespace and new loaders).

## 2.1.8

_2026-01-28_

- Update signs.

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
