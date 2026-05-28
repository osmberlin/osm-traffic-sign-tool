import type { SignStateType } from '@osm-traffic-signs/converter'
import { fillTemplate } from './fillTemplate'
import type { CountryReferenceLinkConfig } from './types'

type SignWithId = SignStateType & { signId: string }

const isModifierSign = (sign: SignStateType) =>
  sign.kind === 'exception_modifier' || sign.kind === 'condition_modifier'

export type SignReferenceLinks = {
  osmWikiTableUrl: string
  wikipediaTableUrl: string
}

export const buildSignReferenceLinks = (
  sign: SignWithId,
  config: CountryReferenceLinkConfig,
): SignReferenceLinks => {
  const isModifier = isModifierSign(sign)
  const hashPrefix = isModifier ? config.hashPrefixes.modifier : config.hashPrefixes.main
  const textLabel = isModifier
    ? config.wikipediaTextLabels.modifier
    : config.wikipediaTextLabels.main
  const textFragment = encodeURIComponent(`${textLabel} ${sign.signId}`)

  return {
    osmWikiTableUrl: fillTemplate(config.osmWikiTableUrl, { hashPrefix, signId: sign.signId }),
    wikipediaTableUrl: fillTemplate(config.wikipediaTableUrl, { textFragment }),
  }
}
