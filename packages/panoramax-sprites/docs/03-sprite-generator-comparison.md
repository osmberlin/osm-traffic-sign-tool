# 03 — Choosing a sprite generator

The [MapLibre sprite spec](https://maplibre.org/maplibre-style-spec/sprite/) lists two tools for
turning SVGs into a sprite sheet (PNG + JSON index, incl. `@2x`): **spreet** and
**@elastic/spritezero**. We evaluated both, plus the npm-native building blocks, for a Bun + TS
monorepo that generates a **checked-in** sheet at release time.

## Comparison

|                    | **spreet**                  | **@elastic/spritezero**          | **@resvg/resvg-js + @mapbox/shelf-pack** (chosen) |
| ------------------ | --------------------------- | -------------------------------- | ------------------------------------------------- |
| Type               | Rust CLI binary             | Node library                     | npm libraries (in-process)                        |
| SVG renderer       | resvg (Rust)                | **mapnik** (native)              | resvg (Rust, via N-API)                           |
| External toolchain | yes — install a binary      | native `mapnik` build            | **none** — `bun install` only                     |
| Prebuilt install   | brew/cargo/release tarballs | npm (mapnik prebuilds, fragile)  | npm N-API prebuilds (12 platforms)                |
| Output             | PNG + JSON, `@2x`, SDF      | PNG + JSON, `@2x`, SDF           | whatever we write (PNG + JSON, `@2x`)             |
| Maintenance (2026) | active (v0.13.1, Dec 2025)  | **archived Feb 2024**, read-only | resvg-js active; shelf-pack stable                |
| License            | MIT                         | ISC                              | MPL-2.0 / ISC                                     |

Sources: [flother/spreet](https://github.com/flother/spreet),
[elastic/spritezero](https://github.com/elastic/spritezero) (archived; README now points to spreet),
[@resvg/resvg-js](https://github.com/thx/resvg-js), [@mapbox/shelf-pack](https://github.com/mapbox/shelf-pack).

## Notes per option

**spreet** is the obvious "just works" CLI: one command emits the PNG + JSON incl. `@2x`, ids come
from filenames, and it uses the same pure-Rust `resvg` renderer under the hood. Its only cost is
that it's an **external binary** — CI must install and pin it (brew / cargo / release tarball). For a
team that's fine with a toolchain step, spreet is an excellent choice and remains our documented
fallback.

**@elastic/spritezero** is the only npm-_library_ MapLibre links, but it's the worst option today:
the repo was **archived (read-only) in February 2024**, its own README recommends spreet, and it
depends on a native **mapnik** module whose prebuilt binaries are a well-known source of CI install
failures. Not recommended.

**@resvg/resvg-js + @mapbox/shelf-pack** keeps everything in-process with **no external CLI**:
`@resvg/resvg-js` is the Rust `resvg` renderer shipped as prebuilt N-API binaries via npm
`optionalDependencies` (no compile, no system libs), and `@mapbox/shelf-pack` is the pure-JS
bin-packer that `spritezero` itself uses. A ~120-line generator (`scripts/buildSpriteSheet.ts` +
`scripts/pngWrite.ts`) rasterizes each icon, packs it, composites onto one RGBA canvas, and PNG-
encodes via `node:zlib`.

`@basemaps/sprites` (LINZ) is a ready-made npm library that does the same job, but it pulls the
heavier `sharp`/libvips native dependency and is CLI-shaped — less control over the exact JSON. Noted
but not chosen.

## Decision: in-process resvg-js + shelf-pack

For this repo the deciding factors were **zero external toolchain** (CI is just `bun install`) and
**full control of the output** — we need per-country sheets, bare-sign-code keys, `@2x`, sentinel
icons, and an isolated render probe (below). All of that is trivial when we own the ~120 lines and
awkward to bend a CLI into.

### One implementation detail worth knowing

A few source SVGs in the catalogue are un-optimised and contain a literal `NaN` coordinate
(`BE_F111`, `BE_F113`, `BE_F45b`). resvg **panics natively** on these — an abort that JavaScript
`try/catch` cannot intercept and that would kill the whole build. So the generator first
**render-probes each icon in an isolated subprocess** (`scripts/probeSvg.ts`); any icon whose probe
aborts is skipped and recorded in `sprites/manifest.json` under `unsupportedKeys`, and the build
continues. This is a general safety net, not a one-off `NaN` hack — any future corrupt SVG is
contained and reported rather than fatal.
