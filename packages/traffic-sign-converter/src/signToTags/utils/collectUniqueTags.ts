import type { SignStateType } from '../../data/TrafficSignDataTypes.js'

export const collectUniqueTags = (signs: SignStateType[]) => {
  const mergedUniqueTags: Map<string, { key: string; value: string }> = new Map()

  signs
    .filter((sign) => sign.recodgnizedSign === true)
    .forEach((sign) => {
      const { uniqueTags } = sign.tagRecommendations

      if (uniqueTags) {
        for (const uniqueTag of uniqueTags) {
          const template =
            'valueTemplate' in uniqueTag && uniqueTag.valueTemplate ? uniqueTag.valueTemplate : '$'
          const value =
            'value' in uniqueTag
              ? uniqueTag.value
              : template.replace(
                  '$',
                  String(sign.signValue) || sign.valuePrompt?.defaultValue || '',
                )

          if (!value) {
            console.warn('ERROR', Boolean(value), 'should never be empty')
          }

          mergedUniqueTags.set(uniqueTag.key, { key: uniqueTag.key, value })
        }
      }
    })

  return Array.from(mergedUniqueTags.values())
}
