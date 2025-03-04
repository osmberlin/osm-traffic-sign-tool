import { countryAlternativeKeyFormats } from '../data-definitions/countryAlternativeKeyFormats.js'
import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import { namedTrafficSignValues } from '../data-definitions/namedTrafficSignValues.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { combineSignIdSignValue } from '../utils/combineSignIdSignValue.js'
import { createSvgImportname } from '../utils/createSvgImportname.js'
import { getSignBySignIdAndCheckValue } from '../utils/getSignBySignIdAndCheckValue.js'
import { getSignsMap } from '../utils/getSignsMap.js'
import { removeCountryPrefix } from './utils/removeCountryPrefix.js'
import { removeKeys } from './utils/removeKeys.js'
import { splitIntoSignValueParts } from './utils/splitIntoSignValueParts.js'
import { splitSignIdSignValue } from './utils/splitSignIdSignValue.js'

export const trafficSignTagToSigns = (
  input: string,
  countryPrefix: CountryPrefixType | undefined,
) => {
  if (!countryPrefix) return []

  const signsMap = getSignsMap(countryPrefix)

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
      const alternativeValuePart = countryAlternativeKeyFormats[countryPrefix].get(osmValuePart)
      if (alternativeValuePart) {
        // Lookup the sign (two ways)
        // Plan A: Direct lookup (most precise)
        let data = signsMap.get(alternativeValuePart)
        // Plan B: Lookup by signId
        if (!data) {
          const { signId, signValue } = splitSignIdSignValue(alternativeValuePart)
          data = getSignBySignIdAndCheckValue(signsMap, signId, signValue)
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

    const signInMap = getSignBySignIdAndCheckValue(signsMap, signId, signValue)
    if (signInMap) {
      signInMap.svgName = createSvgImportname(countryPrefix, signInMap.osmValuePart) // Needs to happen before we modify the signs
      signInMap.osmValuePart = combineSignIdSignValue(signId, signValue)
      signInMap.signValue = signValue
    }
  })

  // PART 4: Return the signs
  // - Preserve order of signs from URL
  // - Replace unrecognized signs
  const signs: SignStateType[] = workingValueParts.map((osmValuePart) => {
    // The lookup has to happen just based on `signId` so custom values don't prevent the match
    const { signId, signValue } = splitSignIdSignValue(osmValuePart)
    const sign = getSignBySignIdAndCheckValue(signsMap, signId, signValue)
    if (sign) {
      return {
        // @ts-expect-error we use the re-assign to either add missing `svgName`s or they get overwritten by more precise once from above
        svgName: createSvgImportname(countryPrefix, osmValuePart),
        ...sign,
        recodgnizedSign: true,
      }
    }

    const unkownSign: SignStateType = {
      recodgnizedSign: false,
      osmValuePart: osmValuePart,
      signValue: osmValuePart,
      signId: null,
      descriptiveName: osmValuePart,
      // When the initial string (`cleaned`) includes our unkown values when split by the `traffic_sign` separator (`;`) then it is this, all else is a modifier sign (we pick a `exception_modifier`); which would include `traffic_sign=foobar` as modifier.
      kind: cleaned.split(';').includes(osmValuePart) ? 'traffic_sign' : 'exception_modifier',
      svgName: null,
    }
    return unkownSign
  })

  return signs satisfies SignStateType[]
}
