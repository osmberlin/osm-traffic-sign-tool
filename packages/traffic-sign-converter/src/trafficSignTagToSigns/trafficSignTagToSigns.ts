import { alternativeKeyFormats } from '../data/alternativeKeyFormats.js'
import type { CountryPrefixType } from '../data/countryPrefixes.js'
import { getSignBySignId } from '../data/getSignBySignId.js'
import { getSignsMap } from '../data/getSignsMap.js'
import { namedTrafficSignValues } from '../data/namedTrafficSignValues.js'
import type { SignStateType } from '../data/TrafficSignDataTypes.js'
import { combineSignIdSignValue } from '../signIdSignValueUtils/combineSignIdSignValue.js'
import { removeCountryPrefix } from './utils/removeCountryPrefix.js'
import { removeKeys } from './utils/removeKeys.js'
import { splitIntoSignValueParts } from './utils/splitIntoSignValueParts.js'
import { splitSignIdSignValue } from './utils/splitSignIdSignValue.js'

export const trafficSignTagToSigns = (
  input: string,
  countryPrefix: CountryPrefixType | undefined,
) => {
  if (!countryPrefix) return []

  const signsMap = getSignsMap()

  // PART 1: Cleanup
  let cleaned = input
  cleaned = removeKeys(cleaned)
  cleaned = removeCountryPrefix(cleaned, countryPrefix)

  let workingValueParts = splitIntoSignValueParts(cleaned)

  // PART 2: Normalize values
  // We rename our osmValueParts based on `alternativeKeyFormats`
  // We also store the fact that we renamed something in our data, so we can show it in the UI
  workingValueParts = workingValueParts
    .map((osmValuePart) => {
      const alternativeValuePart = alternativeKeyFormats[countryPrefix].get(osmValuePart)

      if (alternativeValuePart) {
        // Lookup the sign (two ways)
        // Plan A: Direct lookup (most precise)
        let data = signsMap.get(alternativeValuePart)
        // Plan B: Lookup by signId
        if (!data) {
          const { signId } = splitSignIdSignValue(alternativeValuePart)
          data = getSignBySignId(signsMap, signId)
        }

        // Update the sign values
        if (data) {
          data.matchdByAlternativeKey = osmValuePart
          signsMap.set(alternativeValuePart, data)
          return alternativeValuePart
        }

        // Special case:
        // If `alternativeValuePart` is a `namedTrafficSignValues`, then overwrite
        if (namedTrafficSignValues.includes(alternativeValuePart)) {
          return alternativeValuePart
        }
      }
      return osmValuePart
    })
    .filter(Boolean)

  // Part 3: Update the store values
  // Custom values need to applied to the store initially
  workingValueParts.forEach((osmValuePart) => {
    const { signId, signValue } = splitSignIdSignValue(osmValuePart)
    if (!signValue) return

    const signInMap = getSignBySignId(signsMap, signId)
    if (signInMap) {
      signInMap.osmValuePart = combineSignIdSignValue(signId, signValue)
      signInMap.signValue = signValue
    }
  })

  // PART 4: Return the signs
  // - Preserve order of signs from URL
  // - Replace unrecognized signs
  const signs: SignStateType[] = workingValueParts.map((osmValuePart) => {
    // The lookup has to happen just based on `signId` so custom values don't prevent the match
    const { signId } = splitSignIdSignValue(osmValuePart)
    const sign = getSignBySignId(signsMap, signId)
    if (sign) {
      return { ...sign, recodgnizedSign: true }
    }

    const unkownSign: SignStateType = {
      recodgnizedSign: false,
      osmValuePart: osmValuePart,
      signValue: osmValuePart,
      signId: null,
      descriptiveName: osmValuePart,
      // When the initial string (`cleaned`) includes our unkown values when split by the `traffic_sign` separator (`;`) then it is this, all else is a `modifier_sign`; which would include `traffic_sign=foobar` as modifier.
      kind: cleaned.split(';').includes(osmValuePart) ? 'traffic_sign' : 'modifier_sign',
    }
    return unkownSign
  })

  return signs satisfies SignStateType[]
}
