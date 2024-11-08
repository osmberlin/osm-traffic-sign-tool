import type { SignStateType } from '../../data/TrafficSignDataTypes.js'

export const collectConditionalTags = (signs: SignStateType[]) => {
  const mergedConditionalTags: Map<string, { key: string; value: string }> = new Map()

  // Handle `traffic_sign`
  // A conditional tag on a stand alone `traffic_sign` is treated like a regular tag.
  // Only once there is a `modifier_sign`, the conditional syntax is applied.
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

  // Handle `modifier_sign`
  // If a `modifier_sign` has `conditionalTags`, we update the previously
  // applied `traffic_sign` conditional tags to apply the conditional syntax to key and value.
  // Data:
  // - `conditionalValue` is used when a fixed (but possibly modifable) conditional value is present
  // - `conditionalValueFromValuePrompt` is used when no fixed value is present
  //    so we always look at the`signValue` (set by the value prompt)
  signs
    .filter((sign) => sign.recodgnizedSign === true)
    .filter((sign) => sign.kind === 'modifier_sign')
    .forEach((sign) => {
      const { modifierValue, modifierValueFromValuePrompt } = sign.tagRecommendations

      if (modifierValue || modifierValueFromValuePrompt) {
        for (const [_, mergedTag] of mergedConditionalTags) {
          const key = `${mergedTag.key}:conditional`
          const value = `${mergedTag.value} @ ${sign.signValue || sign.tagRecommendations.modifierValue}`

          // We overwrite the existing key
          mergedConditionalTags.set(mergedTag.key, { key, value })
        }
      }
    })

  return Array.from(mergedConditionalTags.values())
}
