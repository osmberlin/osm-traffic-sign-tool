import { trafficSignData } from './trafficSignData.js'
import type { TrafficSignState } from './types.js'

export const getSignsMap = () => {
  const signsMap = new Map<string, TrafficSignState>()

  trafficSignData.forEach((sign) => {
    // TODO: Improve TS and remove `as`. Maybe add the required default values and rename function to getSignStateMap?
    signsMap.set(sign.osmValuePart, sign as TrafficSignState)
  })

  return signsMap
}
