import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import type { SignStateType, SignType } from '../data-definitions/TrafficSignDataTypes.js'
import { normalizeSignImage } from '../signImage.js'
import { createSvgImportname } from './createSvgImportname.js'

export const transformToSignState = (countryPrefix: CountryPrefixType, sign: SignType) => {
  const { image, ...rest } = sign

  return {
    ...rest,
    image: normalizeSignImage(image),
    recodgnizedSign: true,
    svgName: createSvgImportname(countryPrefix, sign.osmValuePart),
  } satisfies SignStateType
}
