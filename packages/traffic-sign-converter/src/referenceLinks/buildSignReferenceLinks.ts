import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'
import { fillTemplate } from './fillTemplate.js'
import type { CountryReferenceLinkConfig } from './types.js'

type SignWithId = SignStateType & { signId: string }

const isModifierSign = (sign: SignStateType) =>
  sign.kind === 'exception_modifier' || sign.kind === 'condition_modifier'

export type SignReferenceLinks = {
  osmWikiTableUrl: string
  wikipediaTableUrl?: string
}

export const buildSignReferenceLinks = (sign: SignWithId, config: CountryReferenceLinkConfig) => {
  const isModifier = isModifierSign(sign)
  const hashPrefix = isModifier ? config.hashPrefixes.modifier : config.hashPrefixes.main
  const textLabel = isModifier
    ? config.wikipediaTextFragmentLabels.modifier
    : config.wikipediaTextFragmentLabels.main
  const textFragment = encodeURIComponent(`${textLabel} ${sign.signId}`)

  return {
    osmWikiTableUrl: fillTemplate(config.osmWikiTableUrl, { hashPrefix, signId: sign.signId }),
    wikipediaTableUrl: config.wikipediaTableUrl
      ? fillTemplate(config.wikipediaTableUrl, { textFragment })
      : undefined,
  }
}
