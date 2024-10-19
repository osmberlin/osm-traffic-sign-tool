import type { SignType } from '../../data/TrafficSignDataTypes.js'

export const collectAccessTags = (signs: SignType[]) => {
  const mergedAccessTags: Map<string, { key: string; value: string }> = new Map()

  // Handle `traffic_sign`
  signs
    .filter((sign) => sign.kind === 'traffic_sign')
    .map((sign) => sign.tagRecommendations)
    .forEach((tags) => {
      tags.accessTags?.forEach((tag) => {
        mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
      })
    })

  // Handle `modifier_sign`
  signs
    .filter((sign) => sign.kind === 'modifier_sign')
    .map((sign) => sign.tagRecommendations)
    .forEach((tags) => {
      // `modifier_sign`s can change the values of all existing access tags
      if (tags.accessValue) {
        mergedAccessTags.forEach((tag) => {
          // @ts-expect-error `accessValue` is guarded above
          mergedAccessTags.set(tag.key, { key: tag.key, value: tags.accessValue })
        })
      }

      tags.accessTags?.forEach((tag) => {
        if (mergedAccessTags.get(tag.key)) {
          // `modifier_sign`s can change the value of an existing tag
          mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
          return
        }
        // `modifier_sign`s can add new access tags
        mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
      })
    })

  return Array.from(mergedAccessTags.values()).flat()
}
