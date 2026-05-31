import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { GeometryType } from '../data-definitions/geometryTypes.js'
import type {
  QuestionAnswersBySign,
  SignStateType,
} from '../data-definitions/TrafficSignDataTypes.js'
import { signsToTrafficSignTagValue } from '../signsToTrafficSignTag/signsToTrafficSignTagValue.js'
import { collectAccessTags } from './utils/collectAccessTags.js'
import { collectConditionalTags } from './utils/collectConditionalTags.js'
import { collectHighwayValues } from './utils/collectHighwayValues.js'
import {
  applyQuestionTagRemovals,
  collectQuestionHighwayValues,
  collectQuestionTagRemovals,
  collectQuestionTags,
} from './utils/collectQuestionTags.js'
import { collectUniqueTags } from './utils/collectUniqueTags.js'
import { sortTags } from './utils/sortTags.js'
import { splitIntoSignGroups } from './utils/splitIntoSignGroups.js'
import { uniqueArray } from './utils/uniqueArray.js'

export const signsToTags = (
  signs: SignStateType[],
  countryPrefix: CountryPrefixType | undefined,
  geometry: GeometryType,
  answers?: QuestionAnswersBySign,
) => {
  const signGroups = splitIntoSignGroups(signs)

  const tagMap: Map<string, string | string[]> = new Map()

  if (!countryPrefix) return tagMap

  for (const signGroup of signGroups) {
    // Handle Unique Tags
    const uniqueTags = collectUniqueTags(signGroup, geometry)
    uniqueTags.forEach((tag) => {
      tagMap.set(tag.key, tag.value)
    })

    // Handle question-derived tags
    const questionTags = collectQuestionTags(signGroup, geometry, answers)
    questionTags.forEach((tag) => {
      tagMap.set(tag.key, tag.value)
    })

    // Handle Highway Tag
    const highwayValues = [
      ...collectHighwayValues(signGroup, geometry),
      ...collectQuestionHighwayValues(signGroup, geometry, answers),
    ]
    const currentHighwayValues = tagMap.get('highway')
    const guardedHighwayValues = currentHighwayValues
      ? Array.isArray(currentHighwayValues)
        ? currentHighwayValues
        : [] // this is where we 'delete' possible `uniqueTags` of `highway`
      : []
    tagMap.set('highway', uniqueArray([...guardedHighwayValues, ...highwayValues]))

    // Handle Access Tag
    const mergedAccessTags = collectAccessTags(signGroup, geometry)
    mergedAccessTags.forEach((tag) => {
      tagMap.set(tag.key, tag.value)
    })

    // Handle Conditional Tags
    const conditionalTag = collectConditionalTags(signGroup, geometry)
    conditionalTag.forEach((tag) => {
      tagMap.set(tag.key, tag.value)
    })

    applyQuestionTagRemovals(tagMap, collectQuestionTagRemovals(signGroup, geometry, answers))
  }

  // Cleanup `highway=[]`
  if (tagMap.get('highway')?.length === 0) {
    tagMap.delete('highway')
  }

  const hasOtherTags = tagMap.size > 0
  if (hasOtherTags || geometry === 'node') {
    tagMap.set('traffic_sign', signsToTrafficSignTagValue(signs, countryPrefix))
  }

  // Sort and return
  return sortTags(tagMap)
}
