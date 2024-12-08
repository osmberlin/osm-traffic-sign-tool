import {
  countryDefinitions,
  type CountryPrefixType,
} from '../data-definitions/countryDefinitions.js'
import type { SignType } from '../data-definitions/TrafficSignDataTypes.js'

export const tagsToSigns = (countryPrefix: CountryPrefixType, osmTags: string[]) => {
  const signCandidates: SignType[] = []

  for (const sign of countryDefinitions[countryPrefix]) {
    const identifyingTags: string[] =
      sign.identifyingTags?.map((tag) => `${tag.key}=${tag.value}`) || []

    if (osmTags.every((tag) => identifyingTags.includes(tag))) {
      signCandidates.push(sign)
    }
  }

  return signCandidates
}
