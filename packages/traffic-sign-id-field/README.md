# OpenStreetMap Traffic Sign Field for iD

> Inspector field for `traffic_sign` tags in the [iD editor](https://github.com/openstreetmap/iD): pick signs from the catalogue, see their images, get the tags they imply.

- [Project page](https://www.osm-verkehrswende.org/traffic-signs/)
- [Github repo](https://github.com/osmberlin/osm-traffic-sign-tool/tree/main/packages/traffic-sign-id-field)
- [Package on NPM](https://www.npmjs.com/package/@osm-traffic-signs/id-field)

## What it does

The field edits one traffic sign key, e.g. `traffic_sign`, `traffic_sign:forward` or `cycleway:right:traffic_sign`:

- a list of the signs in the tag value, each with its image, name and sign id;
- drag a sign to reorder, remove it, or enter its value (`DE:274[30]`);
- "Add sign…" searches the catalogue of the country by name and sign id; the country comes from the location of the selected feature;
- `traffic_sign=none` shows as "No sign";
- a link opens the value in the [Traffic Sign Tool](https://trafficsigns.osm-verkehrswende.org/);
- when the sign changes, the field lists the tags the new sign implies, with one button to apply them (see [Tag suggestions](#tag-suggestions)).

The signs and the tagging rules come from [`@osm-traffic-signs/converter`](https://www.npmjs.com/package/@osm-traffic-signs/converter).

## Try it

The field is part of the iD fork in [tordans/iD#10](https://github.com/tordans/iD/pull/10). Test it in the [deploy preview of that PR](https://deploy-preview-10--tordans-id-experiments.netlify.app/#disable_features=boundaries&map=19.78/52.47994/13.41803&background=Brandenburg-DOP20c&locale=en&id=w905940429&photo_overlay=mapillary&photo=mapillary/1145175383182727): select a way and open the traffic sign field.

## Installation

```
npm install @osm-traffic-signs/id-field @osm-traffic-signs/converter
```

The field needs `@osm-traffic-signs/converter` 0.7.0 or newer. It does not import the converter: your editor loads the converter's browser build, the country catalogues and the SVGs at runtime (see `loadConverter` below), so the editor's own bundle stays small.

## Usage in iD

iD is not built with the field inside. It copies the files to its `dist/` and loads them when the first traffic sign field is shown.

1. Copy the files to iD's assets, e.g. in `package.json`:

   ```json
   {
     "dist:traffic-sign-field": "shx mkdir -p dist/traffic-sign-field && shx cp -R node_modules/@osm-traffic-signs/id-field/dist/* dist/traffic-sign-field/",
     "dist:traffic-sign-converter": "shx mkdir -p dist/traffic-sign-converter && shx cp -R node_modules/@osm-traffic-signs/converter/dist/* dist/traffic-sign-converter/"
   }
   ```

2. Register a field type (`modules/ui/fields/`) that loads the stylesheet and the module, then creates the field with iD's own building blocks as adapters:

   ```js
   const { createTrafficSignField } = await import(
     context.asset('traffic-sign-field/id-field.esm.js')
   )
   // also add <link rel="stylesheet" href={context.asset('traffic-sign-field/id-field.css')}>

   const field = createTrafficSignField(fieldDefinition, context, {
     uiCombobox,
     utilRebind,
     utilGetSetValue,
     utilNoAuto,
     utilTotalExtent,
     uiTooltip,
     svgIcon,
     t,
     countryCoder, // @rapideditor/country-coder
     loadConverter: () => import(context.asset('traffic-sign-converter/id-field-browser.js')),
     loadCountryCatalogue: (country) =>
       import(context.asset(`traffic-sign-converter/data/${country}.js`)),
     getSvgAssetUrl: (country, svgName) =>
       context.asset(`traffic-sign-converter/data-svgs/${country}/svgs/${svgName}.svg`),
     suggestTags: true,
   })

   field.on('change', (tags) => dispatch.call('change', this, tags))
   // like every iD field: selection.call(field), field.tags(tags), field.entityIDs(ids), field.focus()
   ```

   `fieldDefinition` is the iD field (`key`, `type`, …). The types are exported: `TrafficSignFieldAdapters`, `TrafficSignFieldContext`, `TrafficSignFieldDefinition`, `TrafficSignFieldInstance`.

3. Use the field type for the `traffic_sign` fields of the presets.

A complete integration is in the iD fork: [`modules/ui/fields/traffic_sign.ts`](https://github.com/tordans/iD/blob/radnetz-berlin/modules/ui/fields/traffic_sign.ts).

### Exports

| Export                                     | Content                                                   |
| ------------------------------------------ | --------------------------------------------------------- |
| `createTrafficSignField`                   | creates the field (see above)                             |
| `parseTagToSigns`, `serializeSignsToTag`   | tag value ⇄ list of signs, with a loaded converter module |
| `buildToolUrl`                             | link to the Traffic Sign Tool for a tag value             |
| `@osm-traffic-signs/id-field/id-field.css` | the field styles                                          |

### Texts

The field calls `t()` with keys below `traffic_sign_field.*` (`add_sign`, `drag`, `empty`, `no_sign`, `no_sign_description`, `open_tool`, `order_hint`, `unknown_sign`, `suggestions.*`) and falls back to English when a key is missing. Add them to your locale files to translate the field.

### Styles

`id-field.css` uses iD's CSS variables (`--bg-color`, `--border-color`, `--text-color`, …). Inside iD's inspector (`.ideditor .form-field`) the sign list and "Add sign…" form one field box below the field label, like iD's other fields.

## Tag suggestions

When the mapper changes the sign, the field lists the tags the new sign implies below the sign list, with one button to apply them (`signTagPlan.ts`):

- add or change the tags from the converter's `signsToTags` (`highway` only on separate paths; a road ignores signs meant for another kind of way),
- normalize the sign value (`DE:241` → `DE:241-30`),
- remove tags that only the previous sign implied, or restore their downloaded value.

Road side keys (`cycleway:right:traffic_sign`) get side keys for `bicycle`, `foot` and `segregated`. Unchanged signs show nothing, so existing ways are left alone.

The field compares with the sign before the change in this session, else with the downloaded version from `context.history().base()`. Pass `suggestTags: false` in the adapters when the host editor suggests tags itself. Strings use the `traffic_sign_field.suggestions.*` keys with English fallbacks.

## Build outputs

- `dist/id-field.esm.js` — ESM build, self-contained (d3 is bundled)
- `dist/id-field.js` — IIFE build for a `<script>` tag (`globalThis.OsmTrafficSignIdField`)
- `dist/id-field.css` — field styles

## Development

The package lives in the `osm-traffic-sign-tool` monorepo.

```bash
bun run --cwd packages/traffic-sign-converter build   # the converter's browser build
bun run --cwd packages/traffic-sign-id-field preview  # standalone preview of the field
bun run --cwd packages/traffic-sign-id-field check    # lint, types, tests
```

Try the tag suggestions in the preview: pick "Cycleway, DE:237" and replace the sign with `240`.

To test a build in a local iD checkout before a release, `bun run dev:id-field` (monorepo root) watches the package and copies `dist/` to `dist/traffic-sign-field/` of the iD checkout in `ID_WORKTREE`:

```bash
ID_WORKTREE=/path/to/iD bun run dev:id-field
```

Releases: `bun run release --id-field --minor` (monorepo root), see [`scripts/release-cli.ts`](../../scripts/release-cli.ts).
