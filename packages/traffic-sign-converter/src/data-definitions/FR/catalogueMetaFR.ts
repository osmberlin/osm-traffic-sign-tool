import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaFR = createBetaCatalogueMeta({
  countryPrefix: 'FR',
  iconicSignOsmValuePart: 'B22b',
  catalogueName: 'French traffic signs',
  catalogueLocale: 'fr',
  defaultCommentLang: 'fr',
  osmWikiOverviewUrl:
    'https://wiki.openstreetmap.org/wiki/FR:Signalisation_routi%C3%A8re_en_France',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/FR:Signalisation_routi%C3%A8re_en_France#{signId}',
    hashPrefixes: {
      main: '',
      modifier: 'M',
    },
    wikipediaTextFragmentLabels: {
      main: '',
      modifier: '',
    },
  },
})
