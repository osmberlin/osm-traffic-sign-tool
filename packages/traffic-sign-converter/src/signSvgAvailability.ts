import type { CountryPrefixType } from './data-definitions/countryDefinitions.js'
import {
  SvgLoadersAT,
  SvgLoadersAU,
  SvgLoadersBE,
  SvgLoadersBR,
  SvgLoadersCA,
  SvgLoadersDE,
  SvgLoadersFR,
  SvgLoadersIT,
  SvgLoadersPL,
} from './data-svgs/index.js'
import { isSignImageMissing } from './signImage.js'
import { svgNameOfSign, type SignWithImage } from './utils/svgNameOfSign.js'
import { svgNameOfString } from './utils/svgNameOfString.js'

const svgLoaderMaps = {
  AT: SvgLoadersAT,
  AU: SvgLoadersAU,
  BE: SvgLoadersBE,
  BR: SvgLoadersBR,
  CA: SvgLoadersCA,
  DE: SvgLoadersDE,
  FR: SvgLoadersFR,
  IT: SvgLoadersIT,
  PL: SvgLoadersPL,
} satisfies Record<CountryPrefixType, Record<string, unknown>>

/** Wiki SVG file is known absent (`image: 'missing'` in catalogue). */
export const isSignSvgMissing = (sign: SignWithImage): boolean =>
  'image' in sign && isSignImageMissing(sign.image)

/**
 * A string is resolved like the `svgName` of `trafficSignTagToSigns()`, so `hasBundledSvg('DE',
 * '274.1[20]')` matches `hasBundledSvg('DE', sign)` for the parsed sign. Unrecognized values have
 * no SVG.
 */
export const hasBundledSvg = (
  countryPrefix: CountryPrefixType,
  signOrOsmValuePart: SignWithImage | string,
): boolean => {
  const svgName =
    typeof signOrOsmValuePart === 'string'
      ? svgNameOfString(countryPrefix, signOrOsmValuePart)
      : svgNameOfSign(countryPrefix, signOrOsmValuePart)
  return svgName !== undefined && Object.hasOwn(svgLoaderMaps[countryPrefix], svgName)
}

/** No bundled SVG in the tool (missing loader), regardless of wiki flag. */
export const isSignSvgUnavailable = (
  countryPrefix: CountryPrefixType,
  sign: SignWithImage,
): boolean => isSignSvgMissing(sign) || !hasBundledSvg(countryPrefix, sign)
