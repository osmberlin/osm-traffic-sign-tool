import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import { countryAlternativeKeyFormats } from '../data-definitions/countryAlternativeKeyFormats.js'

/**
 * @description Returns all alternative keys that redirect to the given sign
 * @param osmValuePart The target sign value (e.g., '"Kfz-Verkehr frei"' or '274-60')
 * @param countryPrefix The country prefix (e.g., 'DE')
 * @returns Array of alternative keys that redirect to this sign
 */
export const getRedirectsForSign = (
  osmValuePart: string,
  countryPrefix: CountryPrefixType | undefined,
): string[] => {
  if (!countryPrefix) return []

  const alternativeFormats = countryAlternativeKeyFormats[countryPrefix]
  const redirects: string[] = []

  // Iterate through the Map to find all keys that map to our target value
  for (const [key, value] of alternativeFormats.entries()) {
    if (value === osmValuePart) {
      redirects.push(key)
    }
  }

  return redirects
}
