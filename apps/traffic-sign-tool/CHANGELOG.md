# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- …

## [2.1.0] - 2024-10-30

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

## [2.0.13] - 2024-09-14

- Migrate to NextJS
- Update all dependencies
- Add `cmd+k` shortcut to jump into search
- Add `x` icon to delete search input
- Change project font, [see Notes](./app/_components/layout/fonts/README.md)
- Change the version number system to start with `2.0` in the spirit that https://osmtools.de/traffic_signs/ was the `1.0`.

## [2.0.12] - 2024-04-01

Initial verions written in Svelte.

## [2.0.0] - 2023-05-01

Start of the proof of concept.
We call it version `2.0.0` in the spirit that https://osmtools.de/traffic_signs/ was the `1.0`.
