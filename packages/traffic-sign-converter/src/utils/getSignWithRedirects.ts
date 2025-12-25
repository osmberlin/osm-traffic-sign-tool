import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { buildRedirectMap } from './buildRedirectMap.js'
import { getSignsMap } from './getSignsMap.js'

/**
 * Finds a sign by its canonical identifier or any redirect identifier.
 * Checks both sign-specific redirects and general redirects.
 * @param osmValuePart The sign identifier to look up (canonical or redirect)
 * @param countryPrefix The country prefix (e.g., 'DE')
 * @returns The sign if found, undefined otherwise
 */
export const getSignWithRedirects = (
  osmValuePart: string,
  countryPrefix: CountryPrefixType | undefined,
) => {
  if (!countryPrefix) return undefined

  const signsMap = getSignsMap(countryPrefix)

  // First, try direct lookup
  let sign = signsMap.get(osmValuePart)
  if (sign) return sign

  // Build redirect map (sign-specific + general)
  const signs = countryDefinitions[countryPrefix]
  const redirectMap = buildRedirectMap(signs)

  // Create lowercase version for case-insensitive lookup
  const lowerCaseRedirectMap = new Map<string, string>()
  for (const [key, value] of redirectMap.entries()) {
    lowerCaseRedirectMap.set(key.toLowerCase(), value)
  }

  // Check redirects
  const redirectedValue = lowerCaseRedirectMap.get(osmValuePart.toLowerCase())
  if (redirectedValue) {
    sign = signsMap.get(redirectedValue)
    if (sign) return sign
  }

  return undefined
}
