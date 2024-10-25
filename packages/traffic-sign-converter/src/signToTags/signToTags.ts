import type { CountryPrefixType } from '../data/countryPrefixes.js'
import type { SignStateType } from '../data/TrafficSignDataTypes.js'
import { signToTrafficSignTagValue } from '../signToTrafficSignTag/signToTrafficSignTagValue.js'
import { collectAccessTags } from './utils/collectAccessTags.js'
import { collectConditionalTag } from './utils/collectConditionalTag.js'
import { collectHighwayValues } from './utils/collectHighwayValues.js'
import { splitIntoSignGroups } from './utils/splitIntoSignGroups.js'
import { uniqueArray } from './utils/uniqueArray.js'

export const signToTags = (
  signs: SignStateType[],
  countryPrefix: CountryPrefixType | undefined,
) => {
  const signGroups = splitIntoSignGroups(signs)

  const tagMap: Map<string, string | string[]> = new Map()

  if (!countryPrefix) return tagMap

  for (const signGroup of signGroups) {
    // Handle Unique Tags
    signGroup.forEach((sign) => {
      if (sign.recodgnizedSign === false) return

      sign.tagRecommendations.uniqueTags?.forEach((tag) => {
        tagMap.set(tag.key, tag.value)
      })
    })

    // Handle Highway Tag
    const highwayValues = collectHighwayValues(signGroup)
    const currentHighwayValues = tagMap.get('highway')
    const guardedHighwayValues = currentHighwayValues
      ? Array.isArray(currentHighwayValues)
        ? currentHighwayValues
        : [] // this is where we 'delete' possible `uniqueTags` of `highway`
      : []
    tagMap.set('highway', uniqueArray([...guardedHighwayValues, ...highwayValues]))

    // Handle Access Tag
    const mergedAccessTags = collectAccessTags(signGroup)
    mergedAccessTags.forEach((tag) => {
      tagMap.set(tag.key, tag.value)
    })

    // Handle Conditional Tags
    const conditionalTag = collectConditionalTag(signGroup)
    if (conditionalTag) {
      tagMap.set(conditionalTag.key, conditionalTag.value)
    }
  }

  tagMap.set('traffic_sign', signToTrafficSignTagValue(signs, countryPrefix))

  return tagMap
}
