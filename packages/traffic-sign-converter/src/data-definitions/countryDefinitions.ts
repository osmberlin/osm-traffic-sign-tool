import { z } from 'zod'
import { trafficSignDataDE } from './DE/trafficSignDataDE.js'
import type { SignType } from './TrafficSignDataTypes.js'

// Data Definitions per Country
export const countryDefinitions = {
  DE: trafficSignDataDE,
} as const

export type CountryPrefixType = keyof typeof countryDefinitions

export const countries = Object.keys(countryDefinitions) as [CountryPrefixType]

export const CountryPrefixSchema = z.enum(countries)

export const countryDefinitionMap = new Map<CountryPrefixType, SignType[]>(
  Object.entries(countryDefinitions) as [CountryPrefixType, SignType[]][],
)
