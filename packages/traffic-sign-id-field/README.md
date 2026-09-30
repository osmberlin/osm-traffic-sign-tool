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

## Build outputs

- `dist/id-field.js` — IIFE bundle for lazy `<script>` load in iD (`globalThis.OsmTrafficSignIdField`)
- `dist/id-field.esm.js` — ESM entry for tests and bundlers
- `dist/id-field.css` — field styles

## Cursor workspace

Open `traffic-sign-id-field.code-workspace` at the monorepo root to work in both repos side by side.
