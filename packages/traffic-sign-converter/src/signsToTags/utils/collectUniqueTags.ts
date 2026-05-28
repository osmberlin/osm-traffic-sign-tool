import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import { type SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { getRecommendations } from './getRecommendations.js'

export const collectUniqueTags = (signs: SignStateType[], geometry: GeometryType) => {
  const mergedUniqueTags: Map<string, { key: string; value: string }> = new Map()

  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue

    const recs = getRecommendations(sign, geometry)
    if (recs?.uniqueTags) {
      for (const uniqueTag of recs.uniqueTags) {
        const template =
          'valueTemplate' in uniqueTag && uniqueTag.valueTemplate ? uniqueTag.valueTemplate : '$'
        const value =
          'value' in uniqueTag
            ? uniqueTag.value
            : template.replace('$', String(sign.signValue) || sign.valuePrompt?.defaultValue || '')

        if (!value) {
          console.warn('ERROR', Boolean(value), 'should never be empty')
        }

        mergedUniqueTags.set(uniqueTag.key, { key: uniqueTag.key, value })
      }
    }
  }

  return Array.from(mergedUniqueTags.values())
}
