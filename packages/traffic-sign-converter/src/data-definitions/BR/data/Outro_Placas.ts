import type { SignType } from '../../TrafficSignDataTypes.js'

export const _Outro_Placas: SignType[] = [
  {
    osmValuePart: 'Correios',
    signId: 'Correios',
    name: 'Correios',
    descriptiveName: 'Agência de correios',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: [],
        uniqueTags: [{ key: 'amenity', value: 'post_office' }],
      },
    ],
    comments: [],
    catalogue: {
      signCategory: 'signpost',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Correios.JPG',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Correio_transito',
    signId: 'Correio_transito',
    name: 'Correio_transito',
    descriptiveName: 'Agência de correios',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: [],
        uniqueTags: [{ key: 'amenity', value: 'post_office' }],
      },
    ],
    comments: [],
    catalogue: {
      signCategory: 'signpost',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Correio_trânsito.JPG',
      licence: 'Public Domain',
    },
  },
]
