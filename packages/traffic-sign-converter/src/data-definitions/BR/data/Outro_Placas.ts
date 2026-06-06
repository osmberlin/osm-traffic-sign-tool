import type { SignType } from '../../TrafficSignDataTypes.js'

export const _Outro_Placas: SignType[] = [
  {
    osmValuePart: 'Green5',
    signId: 'Green5',
    name: 'Green5',
    descriptiveName: 'Sinal de Indicação de Direção',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    comments: [],
    taggingSuggestionsQa: 'none',
    catalogue: {
      signCategory: 'signpost',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Green5.gif',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '3marcoquilometriconovo',
    signId: '3marcoquilometriconovo',
    name: '3marcoquilometriconovo',
    descriptiveName: 'Marcos Quilométricos',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: [] }],
    comments: [],
    catalogue: {
      signCategory: 'signpost',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:3marcoquilometriconovo.png',
      licence: 'Public Domain',
    },
  },
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
