import type { SignType } from '../../TrafficSignDataTypes.js'

export const _warning: SignType[] = [
  {
    osmValuePart: 'A1a',
    signId: 'A1a',
    name: 'Sign A1a',
    descriptiveName: 'Dangerous left curve (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'curve' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A1a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A1b',
    signId: 'A1b',
    name: 'Sign A1b',
    descriptiveName: 'Dangerous right curve (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'curve' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A1b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A1c',
    signId: 'A1c',
    name: 'Sign A1c',
    descriptiveName:
      'Series of curves, first one to the left (about 150m after the sign) It is possible to have multiple curves to the left and none to the right',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'curves' },
          { key: 'curves', value: 'serpentine' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A1c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A1d',
    signId: 'A1d',
    name: 'Sign A1d',
    descriptiveName:
      'Series of curves, first one to the left (about 150m after the sign) It is possible to have multiple curves to the right and none to the left',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'curves' },
          { key: 'curves', value: 'serpentine' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A1d.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A3',
    signId: 'A3',
    name: 'Sign A3',
    descriptiveName: 'Steep descent (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'incline', value: '-10%' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A3.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A5',
    signId: 'A5',
    name: 'Sign A5',
    descriptiveName: 'Steep ascent (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'incline', value: '10%' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A5.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A7a',
    signId: 'A7a',
    name: 'Sign A7a',
    descriptiveName: 'Road narrows (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'traffic_calming', value: 'chicane' },
          { key: 'traffic_calming', value: 'choker' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A7a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A7b',
    signId: 'A7b',
    name: 'Sign A7b',
    descriptiveName: 'Steep ascent (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'traffic_calming', value: 'chicane' },
          { key: 'traffic_calming', value: 'choker' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A7b_(2).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A7c',
    signId: 'A7c',
    name: 'Sign A7c',
    descriptiveName: 'Steep ascent (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'traffic_calming', value: 'chicane' },
          { key: 'traffic_calming', value: 'choker' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A7c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A9',
    signId: 'A9',
    name: 'Sign A9',
    descriptiveName: 'Moveable bridge (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'bridge', value: 'movable' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A9.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A11',
    signId: 'A11',
    name: 'Sign A11',
    descriptiveName: 'Quay or river bank ahead (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'natural', value: 'water' },
          { key: 'water', value: 'river' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A11.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A13',
    signId: 'A13',
    name: 'Sign A13',
    descriptiveName: 'Bumpy road (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'bump' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A13.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A14',
    signId: 'A14',
    name: 'Sign A14',
    descriptiveName: 'Speed bump (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'traffic_calming', value: 'bump' },
          { key: 'traffic_calming', value: 'hump' },
          { key: 'traffic_calming', value: 'table' },
          { key: 'traffic_calming', value: 'cushion' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A14.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A15',
    signId: 'A15',
    name: 'Sign A15',
    descriptiveName: 'Slippery road (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'slippery' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A15.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A17',
    signId: 'A17',
    name: 'Sign A17',
    descriptiveName: 'Loose chippings (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'loose_gravel' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A17.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A19',
    signId: 'A19',
    name: 'Sign A19',
    descriptiveName: 'Falling rocks (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'falling_rocks' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A19.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A21',
    signId: 'A21',
    name: 'Sign A21',
    descriptiveName: 'Pedestrian crossing (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'hazard', value: 'pedestrians' },
          { key: 'highway', value: 'crossing' },
          { key: 'crossing_ref', value: 'zebra' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A21.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A23',
    signId: 'A23',
    name: 'Sign A23',
    descriptiveName: 'Place where a lot of children come (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'children' },
          { key: 'hazard', value: 'school_zone' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A23.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A25',
    signId: 'A25',
    name: 'Sign A25',
    descriptiveName:
      'Bicycle and moped crossing or place where bicyclists and mopeds exit the cycleway and enter the road (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'cyclists' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A25.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A27',
    signId: 'A27',
    name: 'Sign A27',
    descriptiveName: 'Wild animal crossing (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'animal_crossing' },
          { key: 'hazard:animal', value: 'wild_animals' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A27.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A29',
    signId: 'A29',
    name: 'Sign A29',
    descriptiveName: 'Cattle crossing (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'animal_crossing' },
          { key: 'hazard:animal', value: 'livestock' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A29.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A31',
    signId: 'A31',
    name: 'Sign A31',
    descriptiveName: 'Construction (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'roadworks' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A31.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A33',
    signId: 'A33',
    name: 'Sign A33',
    descriptiveName: 'Traffic lights (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'highway', value: 'traffic_signals' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A33.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A35',
    signId: 'A35',
    name: 'Sign A35',
    descriptiveName: 'Low flying aircraft (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'low_flying_aircraft' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A35.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A37',
    signId: 'A37',
    name: 'Sign A37',
    descriptiveName: 'Side wind (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'side_winds' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A37.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A39',
    signId: 'A39',
    name: 'Sign A39',
    descriptiveName: 'Two-way traffic after part with one-way traffic',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'oneway', value: 'no' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A39.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A41',
    signId: 'A41',
    name: 'Sign A41',
    descriptiveName: 'Railway crossing with gates (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'crossing:barrier', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A41.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A43',
    signId: 'A43',
    name: 'Sign A43',
    descriptiveName: 'Railway crossing without gates (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'crossing:barrier', value: 'no' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A43.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A45',
    signId: 'A45',
    name: 'Sign A45',
    descriptiveName: 'Railway with single track crossing',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'railway', value: 'level_crossing' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A45.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A47',
    signId: 'A47',
    name: 'Sign A47',
    descriptiveName: 'Railway with two or more tracks crossing',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'railway', value: 'level_crossing' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A47.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A49',
    signId: 'A49',
    name: 'Sign A49',
    descriptiveName: 'Tram crossing (about 150m after the sign)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'railway', value: 'level_crossing' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A49.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A50',
    signId: 'A50',
    name: 'Sign A50',
    descriptiveName: 'Queues are likely (mostly used on dynamic signs)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'queues_likely' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A50.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A51',
    signId: 'A51',
    name: 'Sign A51',
    descriptiveName: 'Caution sign. A sign under it details the danger',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'traffic_sign', value: 'hazard' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_road_sign_A51.svg',
      licence: 'Public Domain',
    },
  },
]
