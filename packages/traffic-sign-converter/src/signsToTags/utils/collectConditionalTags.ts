import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import { type SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'
import { isOpeningHoursValuePromptFormat } from '../../data-definitions/valuePromptFormats.js'
import { normalizeConditionalTimeRestriction } from '../../utils/normalizeTimeRestriction.js'
import { getRecommendations } from './getRecommendations.js'

export const collectConditionalTags = (signs: SignStateType[], geometry: GeometryType) => {
  const mergedConditionalTags: Map<string, { key: string; value: string }> = new Map()

  // Handle `traffic_sign`
  // A conditional tag on a stand alone `traffic_sign` is treated like a regular tag.
  // Only once there is a modifier sign (`exception_modifier` or `condition_modifier`), the conditional syntax is applied.
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    if (sign.kind !== 'traffic_sign') continue

    const recs = getRecommendations(sign, geometry)

    if (recs?.conditionalTags) {
      for (const conditionalTag of recs.conditionalTags) {
        mergedConditionalTags.set(conditionalTag.key, {
          key: conditionalTag.key,
          value: sign.signValue === undefined ? conditionalTag.value : String(sign.signValue),
        })
      }
    } else {
      const groupHasConditionModifierSign = signs.some((otherSign) => {
        if (!otherSign.recodgnizedSign) return false
        return otherSign.kind === 'condition_modifier'
      })

      if (groupHasConditionModifierSign && recs?.accessTags) {
        for (const conditionalTag of recs.accessTags) {
          mergedConditionalTags.set(conditionalTag.key, {
            key: conditionalTag.key,
            value: sign.signValue === undefined ? conditionalTag.value : String(sign.signValue),
          })
        }
      }
    }
  }

  // Handle modifier signs (`exception_modifier` and `condition_modifier`)
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    if (sign.kind === 'traffic_sign') continue

    const recs = getRecommendations(sign, geometry)
    if (!recs) continue

    const applyModfier = !!recs.modifierValue || recs.modifierValueFromValuePrompt === true

    if (applyModfier) {
      if (sign.kind === 'condition_modifier') {
        const modifierRawValue = String(sign.signValue ?? recs.modifierValue)
        const modifierValue = isOpeningHoursValuePromptFormat(sign.valuePrompt?.format ?? '')
          ? normalizeConditionalTimeRestriction(modifierRawValue)
          : modifierRawValue

        for (const [mergedKey, mergedTag] of mergedConditionalTags) {
          const key = `${mergedTag.key}:conditional`
          const value = `${mergedTag.value} @ (${modifierValue})`
          mergedConditionalTags.set(mergedKey, { key, value })
        }
      }

      if (sign.kind === 'exception_modifier') {
        const additionalTags = new Map<string, { key: string; value: string }>()

        for (const [_, mergedTag] of mergedConditionalTags) {
          const key = `${mergedTag.key}:conditional`
          const value = `none @ (${sign.signValue || recs.modifierValue})`
          additionalTags.set(key, { key, value })
        }

        for (const [key, value] of additionalTags) {
          mergedConditionalTags.set(key, value)
        }
      }
    }
  }

  return Array.from(mergedConditionalTags.values())
}
