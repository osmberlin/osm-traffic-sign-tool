import type { SignType } from '../../TrafficSignDataTypes.js'

export const _symbols_su: SignType[] = [
  {
    osmValuePart: 'SU1',
    signId: 'SU1',
    name: 'SU1',
    descriptiveName: '50px',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
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
    descriptiveName: '50px',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:symbol', value: 'detour_route' }] },
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
    descriptiveName: '50px',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:ref:to', value: 'A 55' }] },
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
    descriptiveName: '50px',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:symbol', value: 'ring_road' }] },
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
    descriptiveName: '50px',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'destination:symbol', value: 'toll' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_SU5.svg',
      licence: 'Public Domain',
    },
  },
]
