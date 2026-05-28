import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { getRecommendations } from './getRecommendations.js'

export const collectAccessTags = (signs: SignStateType[], geometry: GeometryType) => {
  const mergedAccessTags: Map<string, { key: string; value: string }> = new Map()

  // Handle `traffic_sign`
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    if (sign.kind !== 'traffic_sign') continue

    const recs = getRecommendations(sign, geometry)
    if (recs?.accessTags) {
      for (const tag of recs.accessTags) {
        mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
      }
    }
  }

  // Handle modifier signs `exception_modifier`
  // Ignore `condition_modifier`, they are handled by `collectConditionalTags.ts`
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    if (sign.kind === 'traffic_sign') continue
    if (sign.kind === 'condition_modifier') continue

    const tags = getRecommendations(sign, geometry)
    if (!tags) continue

    const groupHasSignWithAccessTagProp = signs.some((otherSign) => {
      if (!otherSign.recodgnizedSign) return false
      if (otherSign.kind !== 'traffic_sign') return false
      const recs = getRecommendations(otherSign, geometry)
      return recs?.accessTags !== undefined
    })

    if (groupHasSignWithAccessTagProp && !!tags.modifierValue) {
      for (const [_, tag] of mergedAccessTags) {
        if (tag.value === 'no') {
          mergedAccessTags.set(tag.key, { key: tag.key, value: tags.modifierValue })
        } else {
          mergedAccessTags.set(tag.key, {
            key: tag.key,
            value: [tag.value, tags.modifierValue].join(';'),
          })
        }
      }
    }

    if (tags.accessTags) {
      for (const tag of tags.accessTags) {
        mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
      }
    }

    const hasConditionalTagProp = signs.some((otherSign) => {
      if (!otherSign.recodgnizedSign) return false
      if (otherSign.kind !== 'traffic_sign') return false
      const recs = getRecommendations(otherSign, geometry)
      return recs?.conditionalTags !== undefined
    })

    if (!hasConditionalTagProp && mergedAccessTags.size === 0 && tags.modifierValue) {
      mergedAccessTags.set('access', { key: 'access', value: tags.modifierValue })
    }
  }

  return Array.from(mergedAccessTags.values())
}
