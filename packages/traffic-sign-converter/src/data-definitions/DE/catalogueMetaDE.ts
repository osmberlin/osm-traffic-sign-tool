import type { CountryCatalogueMeta } from '../../referenceLinks/types.js'
import { fullQaCapabilities } from '../../referenceLinks/types.js'

export const catalogueMetaDE = {
  countryPrefix: 'DE',
  iconicSignOsmValuePart: '239',
  catalogueName: 'German traffic signs',
  maturity: 'stable',
  osmTrafficSignPrefix: 'DE',
  catalogueLocale: 'de',
  defaultCommentLang: 'de',
  osmWikiOverviewUrl: 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#{hashPrefix}{signId}',
    wikipediaTableUrl:
      'https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#:~:text={textFragment}',
    hashPrefixes: {
      main: 'Zeichen_',
      modifier: 'Zusatzzeichen_',
    },
    wikipediaTextFragmentLabels: {
      main: 'Zeichen',
      modifier: 'Zusatzzeichen',
    },
  },
  qaCapabilities: fullQaCapabilities,
} as const satisfies CountryCatalogueMeta
