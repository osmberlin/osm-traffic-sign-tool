# @osm-traffic-signs/converter

## 0.2.1

- Rename methods to start with `signs` instead of `sign` when the input is an array of sign objects.
- Add multiple traffic signs
- Fix multiple bugs and add improvements

## 0.1.4

- Rework how SVG files are behing handeled. They are now part of this package. We use [the wiki URLs in the data file](./src/data-definitions/DE/trafficSignDataDE.ts) to download > optimized > rename them and export the in a separate folder. You can use them like `import { SvgsDE } from '@osm-traffic-signs/converter/data-svgs'`. However, we had to disable the package export checks for now, because this setup using SVGs does not validate against [arethetypeswrong](https://github.com/arethetypeswrong/arethetypeswrong.github.io).

## 0.1.3

- Fix handling of modifier signs by splitting them in two categories:
  For `condition_modifier`, the primary condition is removed and only the `*:conditional` tag stays. Eg. `maxspeed:conditional=30 @ (22-06)`
  For `exception_modifier`, the primary condition stays but is resolved conditionally. Eg. `maxweight=5.5 + maxweight:conditional=none @ (destination)`

## 0.1.2

- Improve handling of access restrictions with modifier_sign|s. They are considered additive whenever the existing value is somethign else than "no" (in which case they replace the no).
- Tooling: Switch to pnpm and Turborepo to build the package and app at the same time.

## 0.1.1

- 9018cf1: Modifier signs now add `access=*` when traffic sign does not provide access tags to modify.

## 0.1.0

### Minor Changes

- bb1f0a4: Migrate all logic from the traffic sign tool to this package. The traffic sign tool now relies on the code from here.

## 0.0.2

### Patch Changes

- 65e1b68: Initial release
