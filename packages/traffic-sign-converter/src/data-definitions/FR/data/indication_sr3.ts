import type { SignType } from '../../TrafficSignDataTypes.js'

export const _indication_sr3: SignType[] = [
  {
    osmValuePart: 'SR3b',
    signId: 'SR3b',
    name: 'SR3b',
    descriptiveName: 'Remarques :',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'highway', value: 'speed_camera' },
          { key: 'type', value: 'restriction' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SR3a.svg',
      licence: 'Public Domain',
    },
  },
]
