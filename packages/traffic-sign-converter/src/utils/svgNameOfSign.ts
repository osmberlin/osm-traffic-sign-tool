import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { SignStateType, SignType } from '../data-definitions/TrafficSignDataTypes.js'
import { createSvgImportname } from './createSvgImportname.js'

export type SignWithImage = SignType | SignStateType

/** Parsed signs bring their `svgName` (`null` when unrecognized), catalogue signs use their `osmValuePart`. */
export const svgNameOfSign = (countryPrefix: CountryPrefixType, sign: SignWithImage) =>
  'svgName' in sign
    ? (sign.svgName ?? undefined)
    : createSvgImportname(countryPrefix, sign.osmValuePart)

/**
 * For async callers: only a string needs the parser (and with it the sign catalogues), so it is
 * imported on demand to keep `loadTrafficSignSvg()` light.
 */
export const svgNameOfSignOrStringLazy = async (
  countryPrefix: CountryPrefixType,
  signOrOsmValuePart: SignWithImage | string,
) => {
  if (typeof signOrOsmValuePart !== 'string')
    return svgNameOfSign(countryPrefix, signOrOsmValuePart)
  const { svgNameOfString } = await import('./svgNameOfString.js')
  return svgNameOfString(countryPrefix, signOrOsmValuePart)
}
