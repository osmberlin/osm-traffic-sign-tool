/**
 * Isolated render probe: rasterize a single SVG so a *native* resvg panic (uncatchable in JS —
 * e.g. degenerate geometry / a `NaN` coordinate in an un-optimized source SVG) only aborts THIS
 * subprocess. The parent (`generateSprites`) treats a non-zero exit as "unrenderable" and skips it.
 *
 * Usage: `bun scripts/probeSvg.ts <svgFilePath>` → exit 0 = ok, non-zero = failed.
 */
import { sanitizeSvg } from './buildSpriteSheet.ts'

const path = process.argv[2]
if (!path) {
  console.error('probeSvg: missing svg path')
  process.exit(2)
}
const svg = sanitizeSvg(await Bun.file(path).text(), path)
const { Resvg } = await import('@resvg/resvg-js')
new Resvg(svg, { fitTo: { mode: 'height', value: 48 }, background: 'rgba(0,0,0,0)' }).render()
  .pixels
process.exit(0)
