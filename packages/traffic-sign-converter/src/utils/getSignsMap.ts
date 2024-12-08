import {
  countryDefinitions,
  type CountryPrefixType,
} from '../data-definitions/countryDefinitions.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { transformToSignState } from './transformToSignState.js'

export const getSignsMap = (countryPrefix: CountryPrefixType) => {
  const signsMap = new Map<string, SignStateType>()

  for (const sign of countryDefinitions[countryPrefix]) {
    signsMap.set(sign.osmValuePart, transformToSignState(sign))
  }

  return signsMap
}
