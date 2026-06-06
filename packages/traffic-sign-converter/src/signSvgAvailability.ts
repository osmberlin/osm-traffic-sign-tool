import type { CountryPrefixType } from './data-definitions/countryDefinitions.js'
import type { SignStateType, SignType } from './data-definitions/TrafficSignDataTypes.js'
import {
  SvgLoadersAT,
  SvgLoadersAU,
  SvgLoadersBE,
  SvgLoadersBR,
  SvgLoadersCA,
  SvgLoadersDE,
  SvgLoadersFR,
  SvgLoadersPL,
} from './data-svgs/index.js'
import { isSignImageMissing } from './signImage.js'
import { createSvgImportname } from './utils/createSvgImportname.js'

type SignWithImage = SignType | SignStateType

const svgLoaderMaps = {
  AT: SvgLoadersAT,
  AU: SvgLoadersAU,
  BE: SvgLoadersBE,
  BR: SvgLoadersBR,
  CA: SvgLoadersCA,
  DE: SvgLoadersDE,
  FR: SvgLoadersFR,
  PL: SvgLoadersPL,
} satisfies Record<CountryPrefixType, Record<string, unknown>>

/** Wiki SVG file is known absent (`image: 'missing'` in catalogue). */
export const isSignSvgMissing = (sign: SignWithImage): boolean =>
  'image' in sign && isSignImageMissing(sign.image)

export const hasBundledSvg = (
  countryPrefix: CountryPrefixType,
  signOrOsmValuePart: SignWithImage | string,
): boolean => {
  const svgName = createSvgImportname(countryPrefix, signOrOsmValuePart)
  return svgName in svgLoaderMaps[countryPrefix]
}

/** No bundled SVG in the tool (missing loader), regardless of wiki flag. */
export const isSignSvgUnavailable = (
  countryPrefix: CountryPrefixType,
  sign: SignWithImage,
): boolean => isSignSvgMissing(sign) || !hasBundledSvg(countryPrefix, sign)
