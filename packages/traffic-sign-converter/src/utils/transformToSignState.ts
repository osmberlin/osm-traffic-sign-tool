import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { SignStateType, SignType } from '../data-definitions/TrafficSignDataTypes.js'
import { createSvgImportname } from './createSvgImportname.js'

export const transformToSignState = (countryPrefix: CountryPrefixType, sign: SignType) => {
  return {
    ...sign,
    recodgnizedSign: true,
    svgName: createSvgImportname(countryPrefix, sign.osmValuePart),
  } satisfies SignStateType
}
