# @osm-traffic-signs/id-field

D3-based iD inspector field for `traffic_sign`, `traffic_sign:forward`, and `traffic_sign:backward` tags.

## Local development with iD

This package is developed in the `osm-traffic-sign-tools` monorepo and consumed by an isolated iD git worktree.

1. Ensure the iD worktree exists at `../../iD-traffic-sign-field` (branch `traffic-sign-field-integration` from `develop`).
2. Build the converter package (includes browser bundles for iD):

   ```bash
   bun run --cwd packages/traffic-sign-converter build
   ```

3. Build or watch this package:

   ```bash
   bun run dev:id-field
   ```

   From the monorepo root, or `bun run dev` inside this package. Rebuilds sync `dist/` into the iD worktree at `dist/traffic-sign-field/`.

4. In the iD worktree, install deps and start iD:

   ```bash
   npm install
   npm run dist:traffic-sign-field
   npm run dist:traffic-sign-converter
   npm run start
   ```

Override the iD worktree path:

```bash
ID_WORKTREE=/path/to/iD-traffic-sign-field bun run sync:id-worktree
```

## Tag suggestions

When the mapper changes the sign, the field lists the tags the new sign implies below the sign list, with one button to apply them (`signTagPlan.ts`):

- add or change the tags from the converter's `signsToTags` (`highway` only on separate paths; a road ignores signs meant for another kind of way),
- normalize the sign value (`DE:241` → `DE:241-30`),
- remove tags that only the previous sign implied, or restore their downloaded value.

Road side keys (`cycleway:right:traffic_sign`) get side keys for `bicycle`, `foot` and `segregated`. Unchanged signs show nothing, so existing ways are left alone.

The field compares with the sign before the change in this session, else with the downloaded version from `context.history().base()`. Pass `suggestTags: false` in the adapters when the host editor suggests tags itself. Strings use the `traffic_sign_field.suggestions.*` keys with English fallbacks.

Try it in the standalone preview (`bun run preview`): pick "Cycleway, DE:237" and replace the sign with `240`.

## Build outputs

- `dist/id-field.js` — IIFE bundle for lazy `<script>` load in iD (`globalThis.OsmTrafficSignIdField`)
- `dist/id-field.esm.js` — ESM entry for tests and bundlers
- `dist/id-field.css` — field styles

## Cursor workspace

Open `traffic-sign-id-field.code-workspace` at the monorepo root to work in both repos side by side.
