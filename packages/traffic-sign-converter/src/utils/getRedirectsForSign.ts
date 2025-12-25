import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import { getSignsMap } from './getSignsMap.js'

/**
 * @description Returns all alternative keys that redirect to the given sign
 * @param osmValuePart The target sign value (e.g., '"Kfz-Verkehr frei"' or '274-60')
 * @param countryPrefix The country prefix (e.g., 'DE')
 * @returns Array of alternative keys that redirect to this sign
 */
export const getRedirectsForSign = (
  osmValuePart: string,
  countryPrefix: CountryPrefixType | undefined,
) => {
  if (!countryPrefix) return []

  const signsMap = getSignsMap(countryPrefix)
  const sign = signsMap.get(osmValuePart)

  if (!sign || !sign.redirects) return []

  return sign.redirects.map((redirect) => redirect.from)
}
