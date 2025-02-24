import type { SignType } from '../../TrafficSignDataTypes.js'

export const _notice: SignType[] = [
  {
    osmValuePart: '354',
    signId: '354',
    name: 'Zeichen 354',
    descriptiveName: 'Wasserschutzgebiet',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'hazmat:water', value: 'permissive' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
]
