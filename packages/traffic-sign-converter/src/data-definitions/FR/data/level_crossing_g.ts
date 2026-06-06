import type { SignType } from '../../TrafficSignDataTypes.js'

export const _level_crossing_g: SignType[] = [
  {
    osmValuePart: 'G1',
    signId: 'G1',
    name: 'G1',
    descriptiveName:
      'Passage à niveau sans barrière ni demi-barrière Panneau de type G (croix de Saint-André) : G1, G1a, G1b, G1c. Présignalé par un panneau A8.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'railway', value: 'crossing' },
          { key: 'crossing:barrier', value: 'no' },
          { key: 'crossing:saltire', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_G1.svg',
      licence: 'Public Domain',
    },
  },
]
