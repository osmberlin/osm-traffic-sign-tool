import { trafficSignsMap } from '../data/trafficSignsParsed.js'

export const trafficSignToOsm = (trafficSignIds: string) => {
  const signs = trafficSignsMap()

  const sign = signs.get(trafficSignIds)

  return sign
}
