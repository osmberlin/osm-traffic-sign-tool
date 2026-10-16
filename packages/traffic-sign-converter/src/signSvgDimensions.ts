import type { CountryPrefixType } from './data-definitions/countryDefinitions.js'
import { svgNameOfSignOrStringLazy, type SignWithImage } from './utils/svgNameOfSign.js'

/** Size of a bundled SVG in its own units (the `viewBox`); the SVGs have no `width`/`height`. */
export type TrafficSignSvgDimensions = { width: number; height: number }

type CountrySvgDimensions = Record<string, TrafficSignSvgDimensions>

const countrySvgDimensionImports: Record<CountryPrefixType, () => Promise<CountrySvgDimensions>> = {
  DE: () =>
    import('@osm-traffic-signs/converter/data-svgs/DE/dimensions').then(
      (module) => module.SvgDimensionsDE,
    ),
  BE: () =>
    import('@osm-traffic-signs/converter/data-svgs/BE/dimensions').then(
      (module) => module.SvgDimensionsBE,
    ),
  AT: () =>
    import('@osm-traffic-signs/converter/data-svgs/AT/dimensions').then(
      (module) => module.SvgDimensionsAT,
    ),
  CA: () =>
    import('@osm-traffic-signs/converter/data-svgs/CA/dimensions').then(
      (module) => module.SvgDimensionsCA,
    ),
  PL: () =>
    import('@osm-traffic-signs/converter/data-svgs/PL/dimensions').then(
      (module) => module.SvgDimensionsPL,
    ),
  FR: () =>
    import('@osm-traffic-signs/converter/data-svgs/FR/dimensions').then(
      (module) => module.SvgDimensionsFR,
    ),
  AU: () =>
    import('@osm-traffic-signs/converter/data-svgs/AU/dimensions').then(
      (module) => module.SvgDimensionsAU,
    ),
  BR: () =>
    import('@osm-traffic-signs/converter/data-svgs/BR/dimensions').then(
      (module) => module.SvgDimensionsBR,
    ),
  IT: () =>
    import('@osm-traffic-signs/converter/data-svgs/IT/dimensions').then(
      (module) => module.SvgDimensionsIT,
    ),
}

const countrySvgDimensionCache = new Map<CountryPrefixType, Promise<CountrySvgDimensions>>()

const loadCountrySvgDimensions = (countryPrefix: CountryPrefixType) => {
  let loadPromise = countrySvgDimensionCache.get(countryPrefix)
  if (!loadPromise) {
    loadPromise = countrySvgDimensionImports[countryPrefix]()
    countrySvgDimensionCache.set(countryPrefix, loadPromise)
  }
  return loadPromise
}

/**
 * Width and height of the SVG that `loadTrafficSignSvg()` loads for the same arguments, without
 * loading the SVG itself. Use `width / height` to lay out signs before they are drawn. Loads one
 * small table per country. `undefined` when there is no bundled SVG.
 */
export const loadTrafficSignSvgDimensions = async (
  countryPrefix: CountryPrefixType,
  signOrOsmValuePart: SignWithImage | string,
): Promise<TrafficSignSvgDimensions | undefined> => {
  const svgName = await svgNameOfSignOrStringLazy(countryPrefix, signOrOsmValuePart)
  if (!svgName) return undefined
  const dimensions = await loadCountrySvgDimensions(countryPrefix)
  return Object.hasOwn(dimensions, svgName) ? dimensions[svgName] : undefined
}
