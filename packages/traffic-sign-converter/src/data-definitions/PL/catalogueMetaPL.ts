import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaPL = createBetaCatalogueMeta({
  countryPrefix: 'PL',
  catalogueName: 'Polish traffic signs',
  catalogueLocale: 'pl',
  defaultCommentLang: 'pl',
  osmWikiOverviewUrl: 'https://wiki.openstreetmap.org/wiki/Pl:Znaki_drogowe_w_Polsce',
  referenceLinks: {
    osmWikiTableUrl: 'https://wiki.openstreetmap.org/wiki/Pl:Znaki_drogowe_w_Polsce#{signId}',
    hashPrefixes: {
      main: '',
      modifier: 'T',
    },
    wikipediaTextFragmentLabels: {
      main: '',
      modifier: '',
    },
  },
})
