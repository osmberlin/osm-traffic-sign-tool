import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { GeometryType } from '../data-definitions/geometryTypes.js'
import type {
  OptionalTagsBySignEntry,
  SignStateType,
} from '../data-definitions/TrafficSignDataTypes.js'
import { collectOptionalTags } from './utils/collectOptionalTags.js'
import { getRecommendations } from './utils/getRecommendations.js'
import { normalizeOptionalTags } from './utils/normalizeOptionalTags.js'
import { sortTags } from './utils/sortTags.js'
import { splitIntoSignGroups } from './utils/splitIntoSignGroups.js'
import { uniqueArray } from './utils/uniqueArray.js'

export const signsToOptionalTags = (
  signs: SignStateType[],
  countryPrefix: CountryPrefixType | undefined,
  geometry: GeometryType,
) => {
  const tagMap: Map<string, string | string[]> = new Map()

  if (!countryPrefix) return tagMap

  const signGroups = splitIntoSignGroups(signs)

  for (const signGroup of signGroups) {
    const optionalTags = collectOptionalTags(signGroup, geometry)
    optionalTags.forEach((tag) => {
      tagMap.set(tag.key, tag.value)
    })
  }

  return sortTags(tagMap)
}

export const signsToOptionalTagsBySign = (signs: SignStateType[], geometry: GeometryType) => {
  const signOptionalTagsMap = new Map<string, OptionalTagsBySignEntry>()

  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue

    const recs = getRecommendations(sign, geometry)
    const { tags, guidance } = normalizeOptionalTags(recs?.optionalTags)
    if (!tags.length) continue

    signOptionalTagsMap.set(sign.osmValuePart, {
      tags: optionalTagsToMap(tags),
      guidance,
    })
  }

  return signOptionalTagsMap
}

export const optionalTagsToMap = (tags: { key: string; value: string }[]) => {
  const tagMap = new Map<string, string | string[]>()
  tags.forEach((tag) => tagMap.set(tag.key, tag.value))
  return sortTags(tagMap)
}

export const mergeTagMaps = (
  ...maps: Map<string, string | string[]>[]
): Map<string, string | string[]> => {
  const merged = new Map<string, string | string[]>()

  for (const map of maps) {
    for (const [key, value] of map) {
      const current = merged.get(key)
      if (current === undefined) {
        merged.set(key, value)
        continue
      }

      const currentValues = Array.isArray(current) ? current : [current]
      const nextValues = Array.isArray(value) ? value : [value]
      merged.set(key, uniqueArray([...currentValues, ...nextValues]))
    }
  }

  return sortTags(merged)
}
