import { sharedPriorityRecommendation } from '../../sharedRecommendationPresets.js'
import type { SignType } from '../../TrafficSignDataTypes.js'

export const _regulatory__Ra_series_right_of_way: SignType[] = [
  {
    osmValuePart: 'Ra-1',
    signId: 'Ra-1',
    name: 'Ra-1',
    descriptiveName: 'Stop',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: sharedPriorityRecommendation('stop'),
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Canada_Stop_sign.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Ra-2',
    signId: 'Ra-2',
    name: 'Ra-2',
    descriptiveName: 'Yield',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: sharedPriorityRecommendation('give_way'),
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:CA-MUTCDC_RA-002.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Ra-3',
    signId: 'Ra-3',
    name: 'Ra-3',
    descriptiveName: 'School crossing',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'highway', value: 'crossing' }] },
    ],
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:CA-MUTCDC_RA-003-R.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Ra-4',
    signId: 'Ra-4',
    name: 'Ra-4',
    descriptiveName: 'Pedestrian crosswalk',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'highway', value: 'crossing' }] },
    ],
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:CA-MUTCDC_RA-004-R.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Ra-5',
    signId: 'Ra-5',
    name: 'Ra-5',
    descriptiveName: 'Pedestrian crosswalk (overhead)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'highway', value: 'crossing' }] },
    ],
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:CA-MUTCDC_RA-005-R.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Ra-6',
    signId: 'Ra-6',
    name: 'Ra-6',
    descriptiveName: 'Yield to school children',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: [] }],
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:CA-MUTCDC_RA-008-EN.svg',
      licence: 'Public Domain',
    },
  },
]
