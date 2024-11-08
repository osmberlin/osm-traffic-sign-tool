# @osm-traffic-signs/converter

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
