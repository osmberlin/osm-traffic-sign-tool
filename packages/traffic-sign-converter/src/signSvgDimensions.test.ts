import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { countries } from './data-definitions/countryDefinitions.js'
import {
  SvgDimensionsAT,
  SvgDimensionsAU,
  SvgDimensionsBE,
  SvgDimensionsBR,
  SvgDimensionsCA,
  SvgDimensionsDE,
  SvgDimensionsFR,
  SvgDimensionsIT,
  SvgDimensionsPL,
  SvgLoadersAT,
  SvgLoadersAU,
  SvgLoadersBE,
  SvgLoadersBR,
  SvgLoadersCA,
  SvgLoadersDE,
  SvgLoadersFR,
  SvgLoadersIT,
  SvgLoadersPL,
} from './data-svgs/index.js'
import { loadTrafficSignSvgDimensions } from './signSvgDimensions.js'
import { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'

const dataSvgsDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data-svgs')

const readViewBoxRatio = (svg: string) => {
  const viewBox = /<svg\b[^>]*\sviewBox="([^"]+)"/.exec(svg)?.[1]
  if (!viewBox) return undefined
  const [, , width, height] = viewBox
    .trim()
    .split(/[\s,]+/)
    .map(Number)
  return width! / height!
}

const svgMaps = {
  AT: [SvgLoadersAT, SvgDimensionsAT],
  AU: [SvgLoadersAU, SvgDimensionsAU],
  BE: [SvgLoadersBE, SvgDimensionsBE],
  BR: [SvgLoadersBR, SvgDimensionsBR],
  CA: [SvgLoadersCA, SvgDimensionsCA],
  DE: [SvgLoadersDE, SvgDimensionsDE],
  FR: [SvgLoadersFR, SvgDimensionsFR],
  IT: [SvgLoadersIT, SvgDimensionsIT],
  PL: [SvgLoadersPL, SvgDimensionsPL],
} as const

describe('SvgDimensions maps', () => {
  test.each(countries)('%s has dimensions for exactly the bundled SVGs', (countryPrefix) => {
    const [loaders, dimensions] = svgMaps[countryPrefix]
    expect(Object.keys(dimensions).sort()).toEqual(Object.keys(loaders).sort())

    for (const [svgName, { width, height }] of Object.entries(dimensions)) {
      expect(width, svgName).toBeGreaterThan(0)
      expect(height, svgName).toBeGreaterThan(0)

      // Catches a stale dimensions.ts after SVGs changed: regenerate with `updateSvgs:dimensions`
      const svg = readFileSync(
        path.join(dataSvgsDirectory, countryPrefix, 'svgs', `${svgName}.svg`),
      )
      const viewBoxRatio = readViewBoxRatio(svg.toString())
      expect(viewBoxRatio, `${svgName} has no viewBox`).toBeDefined()
      expect(width / height, svgName).toBeCloseTo(viewBoxRatio!, 3)
    }
  })
})

describe('loadTrafficSignSvgDimensions', () => {
  test('returns the viewBox size of a bundled SVG', async () => {
    expect(await loadTrafficSignSvgDimensions('DE', '101')).toEqual({
      width: 847.159,
      height: 743.623,
    })
    expect(await loadTrafficSignSvgDimensions('DE', '1001-30[800]')).toEqual({
      width: 600,
      height: 330,
    })
  })

  test('resolves strings and parsed signs to the same SVG', async () => {
    const [sign] = trafficSignTagToSigns('274.1[40]', 'DE')
    expect(await loadTrafficSignSvgDimensions('DE', '274.1[40]')).toBeDefined()
    expect(await loadTrafficSignSvgDimensions('DE', '274.1[40]')).toEqual(
      await loadTrafficSignSvgDimensions('DE', sign!),
    )
  })

  test('returns undefined without a bundled SVG', async () => {
    expect(await loadTrafficSignSvgDimensions('BR', 'A-49a')).toBeUndefined()
    expect(await loadTrafficSignSvgDimensions('DE', 'unknown-sign')).toBeUndefined()
  })
})
