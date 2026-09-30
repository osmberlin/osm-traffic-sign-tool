import type { CountryPrefixType, SignStateType } from '@osm-traffic-signs/converter'
import type { ConverterModule } from './types.js'

export const parseTagToSigns = (
  converter: ConverterModule,
  tagValue: string | undefined,
  countryPrefix: CountryPrefixType | undefined,
): SignStateType[] => {
  if (!tagValue || Array.isArray(tagValue) || !countryPrefix) {
    return []
  }

  return converter.trafficSignTagToSigns(tagValue, countryPrefix)
}

export const serializeSignsToTag = (
  converter: ConverterModule,
  signs: SignStateType[],
  countryPrefix: CountryPrefixType | undefined,
): string | undefined => {
  if (!countryPrefix || signs.length === 0) {
    return undefined
  }

  const serialized = converter.signsToTrafficSignTagValue(signs, countryPrefix)
  return serialized || undefined
}
