import type { SignType } from '../../TrafficSignDataTypes.js'

export const _idiograms_id: SignType[] = [
  {
    osmValuePart: 'Panneau',
    signId: 'Panneau',
    name: 'Panneau',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'destination', value: 'Auberge du Saut des Cuves' },
          { key: 'destination:symbol', value: 'lodging,food' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:20220711_123231.jpg',
      licence: 'Public Domain',
    },
  },
]
