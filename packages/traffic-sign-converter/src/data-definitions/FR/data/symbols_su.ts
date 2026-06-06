import type { SignType } from '../../TrafficSignDataTypes.js'

export const _symbols_su: SignType[] = [
  {
    osmValuePart: 'SU1',
    signId: 'SU1',
    name: 'SU1',
    descriptiveName: 'À déterminer',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SU1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'SU2',
    signId: 'SU2',
    name: 'SU2',
    descriptiveName: 'Permet de caractériser un itinéraire « Bis ».',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'destination:symbol', value: 'detour_route[2]' }],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SU2.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'SU3',
    signId: 'SU3',
    name: 'SU3',
    descriptiveName: 'Permet d’identifier un itinéraire autoroutier.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:ref:to', value: 'A' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SU3.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'SU4',
    signId: 'SU4',
    name: 'SU4',
    descriptiveName: 'Permet de caractériser une rocade.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:symbol', value: 'ring_road[3]' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SU4.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'SU5',
    signId: 'SU5',
    name: 'SU5',
    descriptiveName:
      'Permet d’identifier le caractère payant de certaines autoroutes ou de certains ouvrages.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:symbol', value: 'toll[4]' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SU5.svg',
      licence: 'Public Domain',
    },
  },
]
