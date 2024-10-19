import { trafficSignData } from './trafficSignData.js'
import type { SignStateType } from './TrafficSignDataTypes.js'
import { transformToSignState } from './utils/transformToSignState.js'

export const getSignsMap = () => {
  const signsMap = new Map<string, SignStateType>()

  for (const sign of trafficSignData) {
    signsMap.set(sign.osmValuePart, transformToSignState(sign))
  }

  return signsMap
}
