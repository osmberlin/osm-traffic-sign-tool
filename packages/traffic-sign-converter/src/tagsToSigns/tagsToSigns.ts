import { getSignsMap } from '../data/getSignsMap.js'

// TODO See TODO
export const tagsToSigns = (osmTags: string[]) => {
  const signMap = getSignsMap()
  const inputTags = new Map(
    osmTags.map((t) => {
      const [key, value] = t.split('=')
      return [key, value]
    }),
  )

  const candidates: string[] = []
  for (const [key, sign] of signMap.entries()) {
    if (sign.recodgnizedSign === false) continue
    if (!sign.identifyingTags) continue

    const signMatches = Object.entries(sign.identifyingTags).every(
      ([key, value]) => inputTags.get(key) === value,
    )
    if (signMatches) {
      candidates.push(key)
    }
  }

  return candidates
}
