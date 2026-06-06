import type { CountryCatalogueMeta } from '../../referenceLinks/types.js'
import { createBetaCatalogueMeta } from '../catalogueMetaHelpers.js'

export const catalogueMetaBR = createBetaCatalogueMeta({
  countryPrefix: 'BR' as CountryCatalogueMeta['countryPrefix'],
  catalogueName: 'Brazilian traffic signs',
  catalogueLocale: 'pt',
  defaultCommentLang: 'pt',
  osmWikiOverviewUrl:
    'https://wiki.openstreetmap.org/wiki/Pt:Placas_de_sinaliza%C3%A7%C3%A3o_no_Brasil',
  referenceLinks: {
    osmWikiTableUrl:
      'https://wiki.openstreetmap.org/wiki/Pt:Placas_de_sinaliza%C3%A7%C3%A3o_no_Brasil#{signId}',
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
