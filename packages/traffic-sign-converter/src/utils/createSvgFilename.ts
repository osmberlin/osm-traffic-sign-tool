import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { SignType } from '../data-definitions/TrafficSignDataTypes.js'
import { createSvgImportname } from './createSvgImportname.js'

/** @description Optimize name to be used as JS import/export names and filename. */
export const createSvgFilename = (countryPrefix: CountryPrefixType, input: SignType | string) => {
  return `${createSvgImportname(countryPrefix, input)}.svg`
}
