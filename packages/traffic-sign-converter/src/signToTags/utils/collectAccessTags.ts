import type { SignStateType } from '../../data/TrafficSignDataTypes.js'

export const collectAccessTags = (signs: SignStateType[]) => {
  const mergedAccessTags: Map<string, { key: string; value: string }> = new Map()

  // Handle `traffic_sign`
  signs
    .filter((sign) => sign.recodgnizedSign === true)
    .filter((sign) => sign.kind === 'traffic_sign')
    .map((sign) => sign.tagRecommendations)
    .forEach((tags) => {
      if (tags.accessTags) {
        for (const tag of tags.accessTags) {
          mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
        }
      }
    })

  // Handle `modifier_sign`
  signs
    .filter((sign) => sign.recodgnizedSign === true)
    .filter((sign) => sign.kind === 'modifier_sign')
    .map((sign) => sign.tagRecommendations)
    .forEach((tags) => {
      // Signs can have a `modifierValue` or `accessTags`
      // `modifierValue` updates or add to the value of all existing access tags
      //   BUT we have to make sure we only apply them, when the `traffic_sign` actually had an `accessTags`
      // `accessTags` are just added to the pile (and maybe updated by the next sign

      const hasAccessTagProp = signs
        .filter((sign) => sign.recodgnizedSign === true)
        .some((sign) => 'accessTags' in sign.tagRecommendations)

      if (hasAccessTagProp && tags.modifierValue) {
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

      // Now we have do handle the case, when our `traffic_sign` did not give any
      // value to merge access restriction on. In this case, we set a general access
      // tag with tags.modifierValue
      // BUT we don't so this, when `condtionalTags` are present in which case the modifierValue
      // should only change the `conditionalTags`.

      const hasConditionalTagProp = signs
        .filter((sign) => sign.recodgnizedSign === true)
        .some((sign) => 'conditionalTags' in sign.tagRecommendations)

      if (!hasConditionalTagProp && mergedAccessTags.size === 0 && tags.modifierValue) {
        mergedAccessTags.set('access', { key: 'access', value: tags.modifierValue })
      }
    })

  return Array.from(mergedAccessTags.values())
}
