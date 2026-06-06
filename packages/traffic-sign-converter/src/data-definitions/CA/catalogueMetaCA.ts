import type { CountryCatalogueMeta } from '../../referenceLinks/types.js'
import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaCA = createBetaCatalogueMeta({
  countryPrefix: 'CA' as CountryCatalogueMeta['countryPrefix'],
  catalogueName: 'Canadian traffic signs',
  catalogueLocale: 'en',
  defaultCommentLang: 'en',
  osmWikiOverviewUrl: 'https://wiki.openstreetmap.org/wiki/Canada/Road_signs',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/Canada/Road_signs/Regulatory#{hashPrefix}{signId}',
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
