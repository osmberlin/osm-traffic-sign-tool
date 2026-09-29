/**
 * In-house MapLibre sprite packer (no external binary):
 *   - rasterize each icon SVG in isolation with @resvg/resvg-js (raw RGBA — no SVG-id collisions)
 *   - bin-pack with @mapbox/shelf-pack
 *   - composite onto one RGBA canvas and PNG-encode
 *
 * Isolated rasterization is why we don't concatenate SVGs: traffic-sign SVGs can reuse element
 * ids (`title`, gradients) which would collide in one document.
 */
import ShelfPack from '@mapbox/shelf-pack'
import { Resvg } from '@resvg/resvg-js'
import { encodePng } from './pngWrite.ts'

/** MapLibre sprite index entry. */
export type SpriteIndexEntry = {
  x: number
  y: number
  width: number
  height: number
  pixelRatio: number
}
export type SpriteIndex = Record<string, SpriteIndexEntry>

export type SpriteIcon = { key: string; svg: string }

type ShelfBin = { x: number; y: number; w: number; h: number }
type ShelfPackInstance = {
  w: number
  h: number
  packOne: (w: number, h: number, id: string | number) => ShelfBin | null
}

const PADDING = 1 // transparent gutter between icons to avoid sampling bleed

/**
 * Strip `<title>` and XML comments before rendering. Titles/comments don't affect the raster, and
 * the source catalogue contains at least one SVG with a corrupt *unterminated* comment inside its
 * title (FR_B55) that a strict SVG parser rejects. Removing the whole title element also removes
 * that broken comment. We then assert no stray `<!--` survives, so a *new* malformed file fails
 * loudly instead of being silently mangled.
 */
export function sanitizeSvg(svg: string, keyForError: string): string {
  const cleaned = svg.replace(/<title\b[\s\S]*?<\/title>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
  if (cleaned.includes('<!--')) {
    throw new Error(`Unhandled unterminated XML comment in SVG for "${keyForError}"`)
  }
  return cleaned
}

/**
 * @param baseHeightPx layout height (at pixelRatio 1). Icons render to `baseHeightPx * pixelRatio`
 *        tall; width follows the SVG aspect ratio.
 */
export function buildSpriteSheet(
  icons: SpriteIcon[],
  options: { pixelRatio: number; baseHeightPx: number },
): { png: Uint8Array; index: SpriteIndex } {
  const { pixelRatio, baseHeightPx } = options
  const targetHeight = Math.round(baseHeightPx * pixelRatio)

  // 1. Rasterize each icon to RGBA at the target height (deterministic order = input order).
  const rendered = icons.map((icon) => {
    try {
      const resvg = new Resvg(sanitizeSvg(icon.svg, icon.key), {
        fitTo: { mode: 'height', value: targetHeight },
        background: 'rgba(0, 0, 0, 0)',
      })
      const image = resvg.render()
      return { key: icon.key, pixels: image.pixels, width: image.width, height: image.height }
    } catch (cause) {
      throw new Error(`Failed to rasterize icon "${icon.key}"`, { cause })
    }
  })

  // 2. Bin-pack.
  const packer = new ShelfPack(1, 1, { autoResize: true }) as unknown as ShelfPackInstance
  const placed = rendered.map((r) => {
    const bin = packer.packOne(r.width + PADDING, r.height + PADDING, r.key)
    if (!bin) throw new Error(`shelf-pack could not place icon "${r.key}"`)
    return { ...r, x: bin.x, y: bin.y }
  })

  // 3. Composite onto one RGBA canvas.
  const sheetW = packer.w
  const sheetH = packer.h
  const canvas = new Uint8Array(sheetW * sheetH * 4)
  const index: SpriteIndex = {}
  for (const p of placed) {
    for (let row = 0; row < p.height; row++) {
      const srcStart = row * p.width * 4
      const dstStart = ((p.y + row) * sheetW + p.x) * 4
      canvas.set(p.pixels.subarray(srcStart, srcStart + p.width * 4), dstStart)
    }
    index[p.key] = { x: p.x, y: p.y, width: p.width, height: p.height, pixelRatio }
  }

  return { png: encodePng(sheetW, sheetH, canvas), index }
}
