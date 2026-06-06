import { trafficSignDataDE } from './DE/trafficSignDataDE.js'
import { trafficSignDataBE } from './BE/trafficSignDataBE.js'
import { trafficSignDataAT } from './AT/trafficSignDataAT.js'
import { trafficSignDataCA } from './CA/trafficSignDataCA.js'
import { trafficSignDataPL } from './PL/trafficSignDataPL.js'
import type { SignType } from './TrafficSignDataTypes.js'

// Data Definitions per Country
export const countryDefinitions = {
  DE: trafficSignDataDE,
  BE: trafficSignDataBE,
  AT: trafficSignDataAT,
  CA: trafficSignDataCA,
  PL: trafficSignDataPL,
} as const

export type CountryPrefixType = keyof typeof countryDefinitions

export const countries = Object.keys(countryDefinitions) as CountryPrefixType[]

export const countryDefinitionMap = new Map<CountryPrefixType, SignType[]>(
  Object.entries(countryDefinitions) as [CountryPrefixType, SignType[]][],
)
