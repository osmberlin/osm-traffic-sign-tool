import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaBE = createBetaCatalogueMeta({
  countryPrefix: 'BE',
  iconicSignOsmValuePart: 'D11',
  catalogueName: 'Belgian traffic signs',
  catalogueLocale: 'en',
  defaultCommentLang: 'en',
  osmWikiOverviewUrl: 'https://wiki.openstreetmap.org/wiki/Road_signs_in_Belgium',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/Road_signs_in_Belgium/{hashPrefix}#{signId}',
    hashPrefixes: {
      main: 'A_Warning_signs',
      modifier: 'M_Extra_signs',
    },
    wikipediaTextFragmentLabels: {
      main: 'Sign',
      modifier: 'M',
    },
  },
})
