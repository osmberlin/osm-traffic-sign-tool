import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { SignType } from '../data-definitions/TrafficSignDataTypes.js'
import { transformToSignState } from './transformToSignState.js'

/** @description Looks at the start of the `descriptiveName` property */
export const signsByDescriptiveName = (signDefinition: SignType[], names: string[]) => {
  const signs = names
    .map((name) => {
      const exactMatch = signDefinition.find((s) => s.descriptiveName == name)
      const startsWithMatch = signDefinition.find((s) => s.descriptiveName.startsWith(name))
      return exactMatch || startsWithMatch
    })
    .filter(Boolean)

  if (signs.length !== names.length) {
    console.info('ERROR', {
      nameCount: names.length,
      signCount: signs.length,
      missing: names.filter((n) => !signs.some((s) => s.descriptiveName === n)),
    })
  }

  return signs
}

export const signsStateByDescriptiveName = (
  countryPrefix: CountryPrefixType,
  signDefinition: SignType[],
  names: string[],
) => {
  const signs = signsByDescriptiveName(signDefinition, names)
  return signs.map((sign) => transformToSignState(countryPrefix, sign))
}
