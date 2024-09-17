import { trafficSignsMap } from '../data/trafficSignsParsed.js'

export const osmToTrafficSign = (osmTags: string[]) => {
  const signs = trafficSignsMap()
  const inputTags = new Map(
    osmTags.map((t) => {
      const [key, value] = t.split('=')
      return [key, value]
    }),
  )

  const candidates = Array.from(signs)
    .map(([key, sign]) => {
      const signMatches = Object.entries(sign.identifyingTags).every(
        ([key, value]) => inputTags.get(key) === value,
      )
      return signMatches ? key : undefined
    })
    .filter(Boolean)

  return candidates
}
