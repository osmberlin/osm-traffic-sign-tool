import {
  namedTrafficSignValues,
  splitIntoSignValueParts,
  splitSignIdSignValue,
  type CountryPrefixType,
} from '@osm-traffic-signs/converter'

export type TrafficSignWikiLinkPart = {
  key: string
  osmValue: string
}

export const getTrafficSignWikiLinkParts = (
  value: string,
  countryPrefix: CountryPrefixType,
): TrafficSignWikiLinkPart[] => {
  return splitIntoSignValueParts(value).map((part) => {
    const signId = splitSignIdSignValue(part).signId
    const prefix = namedTrafficSignValues.includes(signId) ? '' : `${countryPrefix}:`
    const osmValue = signId.startsWith(countryPrefix) ? signId : `${prefix}${signId}`

    return { key: signId, osmValue }
  })
}
