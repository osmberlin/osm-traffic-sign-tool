import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaIT = createBetaCatalogueMeta({
  countryPrefix: 'IT',
  iconicSignOsmValuePart: 'II.13',
  catalogueName: 'Italian traffic signs',
  catalogueLocale: 'it',
  defaultCommentLang: 'it',
  osmWikiOverviewUrl: 'https://wiki.openstreetmap.org/wiki/IT:Road_signs_in_Italy',
  referenceLinks: {
    osmWikiTableUrl: 'https://wiki.openstreetmap.org/wiki/IT:Road_signs_in_Italy#{signId}',
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
