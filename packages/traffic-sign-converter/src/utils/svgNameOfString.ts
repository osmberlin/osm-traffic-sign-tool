import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import { trafficSignTagToSigns } from '../trafficSignTagToSigns/trafficSignTagToSigns.js'

const cacheLimit = 1000
const svgNameCache = new Map<string, string | undefined>()

/**
 * The `svgName` of the sign `trafficSignTagToSigns()` parses the string to (`274.1[20]` →
 * `DE_274_1_20`, `274[50]` → `DE_274_50`). `undefined` when the value is unrecognized or holds
 * several signs.
 */
export const svgNameOfString = (countryPrefix: CountryPrefixType, osmValuePart: string) => {
  const cacheKey = `${countryPrefix}:${osmValuePart}`
  if (svgNameCache.has(cacheKey)) return svgNameCache.get(cacheKey)

  const signs = trafficSignTagToSigns(osmValuePart, countryPrefix)
  const svgName = signs.length === 1 ? (signs[0]?.svgName ?? undefined) : undefined

  if (svgNameCache.size >= cacheLimit) svgNameCache.clear()
  svgNameCache.set(cacheKey, svgName)
  return svgName
}
