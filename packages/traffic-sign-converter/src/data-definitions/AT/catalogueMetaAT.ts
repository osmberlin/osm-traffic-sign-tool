import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaAT = createBetaCatalogueMeta({
  countryPrefix: 'AT',
  iconicSignOsmValuePart: '52.17',
  catalogueName: 'Austrian traffic signs',
  catalogueLocale: 'de',
  defaultCommentLang: 'de',
  osmWikiOverviewUrl: 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_%C3%96sterreich',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_%C3%96sterreich#{signId}',
    hashPrefixes: {
      main: '',
      modifier: '',
    },
    wikipediaTextFragmentLabels: {
      main: '',
      modifier: '',
    },
  },
})
