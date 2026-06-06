import { trafficSignDataAT } from './AT/trafficSignDataAT.js'
import { trafficSignDataAU } from './AU/trafficSignDataAU.js'
import { trafficSignDataBE } from './BE/trafficSignDataBE.js'
import { trafficSignDataBR } from './BR/trafficSignDataBR.js'
import { trafficSignDataCA } from './CA/trafficSignDataCA.js'
import { trafficSignDataDE } from './DE/trafficSignDataDE.js'
import { trafficSignDataFR } from './FR/trafficSignDataFR.js'
import { trafficSignDataPL } from './PL/trafficSignDataPL.js'
import type { SignType } from './TrafficSignDataTypes.js'

// Data Definitions per Country
export const countryDefinitions = {
  DE: trafficSignDataDE,
  BE: trafficSignDataBE,
  AT: trafficSignDataAT,
  CA: trafficSignDataCA,
  PL: trafficSignDataPL,
  FR: trafficSignDataFR,
  AU: trafficSignDataAU,
  BR: trafficSignDataBR,
} as const

export type CountryPrefixType = keyof typeof countryDefinitions

export const countries = Object.keys(countryDefinitions) as CountryPrefixType[]

export const countryDefinitionMap = new Map<CountryPrefixType, SignType[]>(
  Object.entries(countryDefinitions) as [CountryPrefixType, SignType[]][],
)
