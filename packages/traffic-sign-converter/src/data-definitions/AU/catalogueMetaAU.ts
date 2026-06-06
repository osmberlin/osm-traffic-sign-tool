import type { CountryCatalogueMeta } from '../../referenceLinks/types.js'
import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaAU = createBetaCatalogueMeta({
  countryPrefix: 'AU' as CountryCatalogueMeta['countryPrefix'],
  iconicSignOsmValuePart: 'W6-1',
  catalogueName: 'Australian traffic signs',
  catalogueLocale: 'en',
  defaultCommentLang: 'en',
  osmWikiOverviewUrl:
    'https://wiki.openstreetmap.org/wiki/Australian_Tagging_Guidelines/Road_Signage',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/Australian_Tagging_Guidelines/Road_Signage#{signId}',
    hashPrefixes: {
      main: '',
      modifier: '',
    },
    wikipediaTextFragmentLabels: {
      main: '',
      modifier: '',
    },
  },
}) as CountryCatalogueMeta
