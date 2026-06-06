import type { SignType } from '../../TrafficSignDataTypes.js'

export const _panels: SignType[] = [
  {
    osmValuePart: 'T-16',
    signId: 'T-16',
    name: 'T-16',
    descriptiveName: 'T-16: miejsce wyjazdu pojazdów uprzywilejowanych straży pożarnej',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'hazard', value: 'emergency_vehicles' }],
        modifierValue: 'emergency_vehicles',
      },
    ],
    catalogue: { signCategory: 'condition_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:PL_road_sign_T-16.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'T-16a',
    signId: 'T-16a',
    name: 'T-16a',
    descriptiveName: 'T-16: miejsce wyjazdu pojazdów uprzywilejowanych pogotowia ratunkowego',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'hazard', value: 'emergency_vehicles' }],
        modifierValue: 'emergency_vehicles',
      },
    ],
    catalogue: { signCategory: 'condition_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:PL_road_sign_T-16a.svg',
      licence: 'Public Domain',
    },
  },
]
