import type { SignType } from '../../TrafficSignDataTypes.js'

export const _indication_e: SignType[] = [
  {
    osmValuePart: 'E36a',
    signId: 'E36a',
    name: 'E36a',
    descriptiveName: 'Entrée d’un département',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:%C3%8Acritchieau_frontchi%C3%A9the_Manche.jpg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E36b',
    signId: 'E36b',
    name: 'E36b',
    descriptiveName: 'Entrée d’une région',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:FR-03-Border2.JPG',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'E31',
    signId: 'E31',
    name: 'E31',
    descriptiveName:
      'Lieu sans panneau spécifique (lieu-dit, forêt, quartier, réserve naturelle, col…)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Mortefontaine_(Aisne)_city_limit_sign_Pouy.JPG',
      licence: 'Public Domain',
    },
  },
]
