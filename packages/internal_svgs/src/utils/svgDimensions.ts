import path from 'node:path'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'

type SvgDimensions = { width: number; height: number }

const roundDimension = (value: number) => Math.round(value * 1000) / 1000

const readPositiveNumber = (value: string | undefined) => {
  const number = Number(value)
  return number > 0 ? number : undefined
}

/** @description Size of the root `<svg>` from its `viewBox`; `optimizeSvg` makes sure every SVG has one. */
export const readSvgDimensions = (svgString: string): SvgDimensions | undefined => {
  const viewBox = /<svg\b[^>]*\sviewBox\s*=\s*"([^"]*)"/.exec(svgString)?.[1]
  if (!viewBox) return undefined

  const [, , width, height] = viewBox.trim().split(/[\s,]+/)
  const viewBoxWidth = readPositiveNumber(width)
  const viewBoxHeight = readPositiveNumber(height)
  if (!viewBoxWidth || !viewBoxHeight) return undefined
  return { width: roundDimension(viewBoxWidth), height: roundDimension(viewBoxHeight) }
}

type DimensionItem = { importName: string; fileName: string }

/** @description Write `data-svgs/<country>/dimensions.ts`, one entry per loader in `loaders.ts`. */
export const writeSvgDimensionsFile = async (
  countryPrefix: CountryPrefixType,
  countryDirectory: string,
  items: DimensionItem[],
) => {
  const sortedItems = [...items].sort((a, b) => a.importName.localeCompare(b.importName))
  const lines: string[] = []

  for (const { importName, fileName } of sortedItems) {
    const filePath = path.join(countryDirectory, 'svgs', fileName)
    const dimensions = readSvgDimensions(await Bun.file(filePath).text())
    if (!dimensions) {
      throw new Error(`SVG has no valid viewBox: ${filePath}`)
    }
    lines.push(`  ${importName}: { width: ${dimensions.width}, height: ${dimensions.height} },`)
  }

  const content = [
    '/** Width and height of each bundled SVG (from its `viewBox`), keyed like `loaders.ts`. */',
    `export const SvgDimensions${countryPrefix}: Record<string, { width: number; height: number }> = {`,
    ...lines,
    '}',
    '',
  ].join('\n')

  await Bun.write(path.join(countryDirectory, 'dimensions.ts'), content)
}
