import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import type { ConverterModule, TrafficSignFieldAdapters, TrafficSignFieldContext } from './types.js'

const COUNTRY_PREFIX_FROM_VALUE = /^([A-Z]{2}):/

export const inferCountryPrefixFromTagValue = (
  tagValue: string | undefined,
): CountryPrefixType | undefined => {
  if (!tagValue || Array.isArray(tagValue)) return undefined
  const match = tagValue.match(COUNTRY_PREFIX_FROM_VALUE)
  return match?.[1] as CountryPrefixType | undefined
}

export const resolveCountryPrefix = async ({
  tagValue,
  entityIDs,
  context,
  adapters,
  converter,
}: {
  tagValue: string | undefined
  entityIDs: string[]
  context: TrafficSignFieldContext
  adapters: TrafficSignFieldAdapters
  converter: ConverterModule
}): Promise<CountryPrefixType | undefined> => {
  const fromValue = inferCountryPrefixFromTagValue(tagValue)
  if (fromValue && converter.countries.includes(fromValue)) {
    return fromValue
  }

  if (entityIDs.length > 0) {
    const extent = adapters.utilTotalExtent(entityIDs, context.graph())
    const code = extent && adapters.countryCoder.iso1A2Code(extent.center())
    const upper = code?.toUpperCase() as CountryPrefixType | undefined
    if (upper && converter.countries.includes(upper)) {
      return upper
    }
  }

  return converter.countries[0]
}
