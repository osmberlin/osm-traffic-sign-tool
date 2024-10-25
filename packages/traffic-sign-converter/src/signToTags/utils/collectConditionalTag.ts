import type { SignStateType } from '../../data/TrafficSignDataTypes.js'

export const collectConditionalTag = (signs: SignStateType[]) => {
  let conditionalTag: { key: string; value: string } | undefined = undefined

  for (const sign of signs) {
    if (sign.recodgnizedSign === false) return

    if (sign.kind === 'traffic_sign' && sign.tagRecommendations.conditionalTag) {
      conditionalTag = {
        key: sign.tagRecommendations.conditionalTag.key,
        value:
          sign.signValue === undefined
            ? sign.tagRecommendations.conditionalTag.value
            : String(sign.signValue),
      }
    }
    if (sign.kind === 'modifier_sign') {
      if (conditionalTag === undefined) {
        return
      }
      conditionalTag = {
        key: `${conditionalTag.key}:conditional`,
        value: `${conditionalTag.value} @ ${sign.signValue || sign.tagRecommendations.conditionalValue}`,
      }
    }
  }

  return conditionalTag
}
