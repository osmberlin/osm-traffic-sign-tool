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
          // Some conditional tag values need a specific format
          // We can specify a ``
          const template = conditionalTag.valueTemplate || '$'
          const formattedValue = template.replace('$', String(sign.signValue))
          const value = sign.signValue === undefined ? conditionalTag.value : formattedValue

          mergedConditionalTags.set(conditionalTag.key, {
            key: conditionalTag.key,
            value,
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
      const { conditionalValue, conditionalValueFromValuePrompt } = sign.tagRecommendations

      if (conditionalValue || conditionalValueFromValuePrompt) {
        for (const [_, mergedTag] of mergedConditionalTags) {
          const key = `${mergedTag.key}:conditional`
          const value = `${mergedTag.value} @ ${sign.signValue || sign.tagRecommendations.conditionalValue}`

          // We overwrite the existing key
          mergedConditionalTags.set(mergedTag.key, { key, value })
        }
      }
    })

  return Array.from(mergedConditionalTags.values())
}
