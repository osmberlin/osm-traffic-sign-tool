# @osm-traffic-signs/id-field

## Unreleased

## 0.1.1

_2026-10-08_

- A long sign id with a value (e.g. the time restriction `1040-31[Mo-Fr 07:00-18:00;Sa 09:00-16:00]`) no longer runs out of its row: the value input wraps below the id, and the id is cut with an ellipsis.

## 0.1.0

_2026-10-05_

- First release on npm.
- The field for one `traffic_sign` key in iD's inspector: a list of the signs with their images, drag to reorder, remove, and an "Add sign…" combobox that searches the country's catalogue by name and sign id. Signs with a value (e.g. `DE:274[30]`) ask for it. The country comes from the location of the selected feature.
- `traffic_sign=none` shows as "No sign", not as an unknown sign.
- Tag suggestions: when the sign changes, the field lists the tags the new sign implies, with one button to apply them (`suggestTags`, on by default). Editors that suggest tags themselves turn it off.
- Styles for iD's inspector: the sign list and "Add sign…" form one field box below the field label.
- Needs `@osm-traffic-signs/converter` 0.7.0 or newer (its browser build and SVGs are loaded at runtime).
