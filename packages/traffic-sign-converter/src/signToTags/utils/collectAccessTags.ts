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
      // Signs can have a `accessValue` or `accessTags`
      // `accessValue` updates the value of all existing access tags
      // `accessTags` are just added to the pile (and maybe updated by the next sign

      if (tags.accessValue) {
        for (const [_, tag] of mergedAccessTags) {
          mergedAccessTags.set(tag.key, { key: tag.key, value: tags.accessValue })
        }
      }

      if (tags.accessTags) {
        for (const tag of tags.accessTags) {
          mergedAccessTags.set(tag.key, { key: tag.key, value: tag.value })
        }
      }
    })

  return Array.from(mergedAccessTags.values())
}
