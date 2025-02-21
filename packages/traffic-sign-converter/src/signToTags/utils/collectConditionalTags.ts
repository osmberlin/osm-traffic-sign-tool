import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'

export const collectConditionalTags = (signs: SignStateType[]) => {
  const mergedConditionalTags: Map<string, { key: string; value: string }> = new Map()

  // Handle `traffic_sign`
  // A conditional tag on a stand alone `traffic_sign` is treated like a regular tag.
  // Only once there is a modifier sign (`exception_modifier` or `condition_modifier`), the conditional syntax is applied.
  signs
    .filter((sign) => sign.recodgnizedSign === true)
    .filter((sign) => sign.kind === 'traffic_sign')
    .forEach((sign) => {
      const { conditionalTags } = sign.tagRecommendations

      if (conditionalTags) {
        for (const conditionalTag of conditionalTags) {
          mergedConditionalTags.set(conditionalTag.key, {
            key: conditionalTag.key,
            value: sign.signValue === undefined ? conditionalTag.value : String(sign.signValue),
          })
        }
      }
    })

  // Handle modifier signs (`exception_modifier` and `condition_modifier`)
  signs
    .filter((sign) => sign.recodgnizedSign === true)
    .filter((sign) => sign.kind !== 'traffic_sign')
    .forEach((sign) => {
      // If a sign has `conditionalTags`, we update the previously
      // applied `traffic_sign` conditional tags to apply the conditional syntax to key and value.
      // Data:
      // - `conditionalValue` is used when a fixed (but possibly modifable) conditional value is present
      // - `conditionalValueFromValuePrompt` is used when no fixed value is present
      //    so we always look at the`signValue` (set by the value prompt)
      const applyModfier =
        sign.tagRecommendations.modifierValue ||
        sign.tagRecommendations.modifierValueFromValuePrompt === true
      if (applyModfier) {
        // For `condition_modifier`, the primary condition is removed and only the `*:conditional` stays.
        // Eg. `maxspeed:conditional=30 @ (22-06)`
        if (sign.kind === 'condition_modifier') {
          for (const [mergedKey, mergedTag] of mergedConditionalTags) {
            const key = `${mergedTag.key}:conditional`
            const value = `${mergedTag.value} @ ${sign.signValue || sign.tagRecommendations.modifierValue}`
            // We overwrite the existing key
            mergedConditionalTags.set(mergedKey, { key, value })
          }
        }

        // For `exception_modifier`, the primary condition stays but is resolved conditionally.
        // Eg. `maxweight=5.5 + maxweight:conditional=none @ (destination)`
        if (sign.kind === 'exception_modifier') {
          const additionalTags = new Map<string, { key: string; value: string }>()

          for (const [_, mergedTag] of mergedConditionalTags) {
            const key = `${mergedTag.key}:conditional`
            const value = `none @ (${sign.signValue || sign.tagRecommendations.modifierValue})`
            // We need to add the additional conditional tags indirectly to the `mergedConditionalTags`
            // Otherwise we end up with an invinite loop because the for of loop first adds and then iterates over the just added tag.
            additionalTags.set(key, { key, value })
          }

          for (const [key, value] of additionalTags) {
            mergedConditionalTags.set(key, value)
          }
        }
      }
    })

  return Array.from(mergedConditionalTags.values())
}
