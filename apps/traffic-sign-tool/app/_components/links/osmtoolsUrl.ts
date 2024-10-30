import { splitIntoSignValueParts } from '@osm-traffic-signs/converter'

export const osmtoolsUrl = (value: string) => {
  const splitTrafficSignValues = splitIntoSignValueParts(value)
  // Param cannot be excaped or its ignored…
  return `http://osmtools.de/traffic_signs/?signs=${splitTrafficSignValues.map((v) => v.replace(`DE:`, '')).join(',')}`
}
