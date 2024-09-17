import { parseTrafficSigns } from './parseTrafficSigns.js'
import rawTrafficSigns from './trafficSigns.json'

export const trafficSignsParsed = () => {
  return parseTrafficSigns(rawTrafficSigns)
}

export const trafficSignsMap = () => {
  const signs = trafficSignsParsed()

  const signsMap = new Map<string, (typeof signs)[0]>()

  signs.forEach((sign) => {
    signsMap.set(sign.key, sign)
  })

  return signsMap
}
