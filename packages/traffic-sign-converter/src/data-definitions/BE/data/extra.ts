import type { SignType } from '../../TrafficSignDataTypes.js'

export const _extra: SignType[] = [
  {
    osmValuePart: 'M1',
    signId: 'M1',
    name: 'Sign M1',
    descriptiveName: 'Placed under sign B1, B5 or E9a when that sign only applies to bicycles.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M2',
    signId: 'M2',
    name: 'Sign M2',
    descriptiveName:
      '(French text "EXCEPTÉ") (German text "AUSSER") Placed under sign C1, C3, C31, D1 or D3 when that sign doesn\'t apply to bicycles.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [{ key: 'bicycle', value: 'yes' }],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'except', value: 'bicycle' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M2.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M3',
    signId: 'M3',
    name: 'Sign M3',
    descriptiveName:
      '(French text "EXCEPTÉ") (German text "AUSSER") Placed under sign C1, C3, C31, D1 or D3 when that sign doesn\'t apply to bicycles and mopeds class A.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [
          { key: 'bicycle', value: 'yes' },
          { key: 'mofa', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'except', value: 'bicycle;mofa' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M3.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M3bis',
    signId: 'M3bis',
    name: 'Sign M3bis',
    descriptiveName:
      '(French text "EXCEPTÉ") (German text "AUSSER") Placed under sign C1, C3, C31, D1 or D3 when that sign doesn\'t apply to bicycles and all mopeds (classes A, B and P).',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [
          { key: 'bicycle', value: 'yes' },
          { key: 'mofa', value: 'yes' },
          { key: 'moped', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:moped', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
          { key: 'speed_pedelec', value: 'yes' },
          { key: 'except', value: 'bicycle;mofa;moped;speed_pedelec' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M3bis.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M4',
    signId: 'M4',
    name: 'Sign M4',
    descriptiveName:
      'Placed under sign F19 when cyclists are allowed to drive in both directions on a one-way road',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'oneway:bicycle', value: 'no' }],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M4.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M5',
    signId: 'M5',
    name: 'Sign M5',
    descriptiveName:
      'Placed under sign F19 when cyclists and mopeds class A are allowed to drive in both directions on a one-way road',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M5.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M6',
    signId: 'M6',
    name: 'Sign M6',
    descriptiveName:
      '(French text "OBLIGATOIRE") Placed under sign D7 when mopeds class B have to drive on the cycleway.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M6.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M7',
    signId: 'M7',
    name: 'Sign M7',
    descriptiveName:
      '(French text "INTERDIT") Placed under sign D7 when mopeds class B are not allowed to drive on the cycleway.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'moped', value: 'no' }], modifierValue: 'yes' },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M7.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M8',
    signId: 'M8',
    name: 'Sign M8',
    descriptiveName:
      'Placed under sign B1, B5 or E9a when that sign only applies to bicycles and mopeds.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'moped', value: 'no' }], modifierValue: 'yes' },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M8.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M9',
    signId: 'M9',
    name: 'Sign M9',
    descriptiveName:
      'Placed under sign B1, B5 or B17 when bicycles can come from both directions at the intersection. (For example when crossing a two-way cycle lane when entering the intersection, or when bicycles are allowed to drive in both directions on a one-way road.)',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'moped', value: 'no' }], modifierValue: 'yes' },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M9.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M10',
    signId: 'M10',
    name: 'Sign M10',
    descriptiveName:
      'Placed under sign B1, B5 or B17 when bicycles, mopeds and/or speed pedelecs can come from both directions at the intersection. (For example when crossing a two-way cycle lane when entering the intersection, or when bicycles, mopeds and/or speed pedelecs are allowed to drive in both directions on a one-way road.)',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'moped', value: 'no' }], modifierValue: 'yes' },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M10.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M11',
    signId: 'M11',
    name: 'Sign M11',
    descriptiveName:
      '(French text "EXCEPTÉ") (German text "AUSSER") Placed under sign C1, C3, C31 or D1 when that sign doesn\'t apply to bicycles and speed pedelecs.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [{ key: 'bicycle', value: 'yes' }],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
          { key: 'speed_pedelec', value: 'yes' },
          { key: 'except', value: '3=bicycle;speed_pedelec' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M11.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M12',
    signId: 'M12',
    name: 'Sign M12',
    descriptiveName:
      '(French text "EXCEPTÉ") (German text "AUSSER") Placed under sign C1, C3, C31 or D1 when that sign doesn\'t apply to bicycles, mopeds class A and speed pedelecs.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [
          { key: 'bicycle', value: 'yes' },
          { key: 'mofa', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
          { key: 'speed_pedelec', value: 'yes' },
          { key: 'except', value: '3=bicycle;mofa;speed_pedelec' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M12.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M13',
    signId: 'M13',
    name: 'Sign M13',
    descriptiveName:
      '(French text "OBLIGATOIRE") Placed under sign D7 when speed pedelecs have to drive on the cycleway.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [
          { key: 'bicycle', value: 'yes' },
          { key: 'mofa', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
          { key: 'speed_pedelec', value: 'yes' },
          { key: 'except', value: '3=bicycle;mofa;speed_pedelec' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M13.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M14',
    signId: 'M14',
    name: 'Sign M14',
    descriptiveName:
      '(French text "OBLIGATOIRE") Placed under sign D7 when mopeds class B and speed pedelecs have to drive on the cycleway.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [
          { key: 'bicycle', value: 'yes' },
          { key: 'mofa', value: 'yes' },
        ],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
          { key: 'speed_pedelec', value: 'yes' },
          { key: 'except', value: '3=bicycle;mofa;speed_pedelec' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M14.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M15',
    signId: 'M15',
    name: 'Sign M15',
    descriptiveName:
      '(French text "INTERDIT") Placed under sign D7 when speed pedelecs are not allowed to drive on the cycleway.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'speed_pedelec', value: 'no' }],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M15.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M16',
    signId: 'M16',
    name: 'Sign M16',
    descriptiveName:
      '(French text "INTERDIT") Placed under sign D7 when mopeds class B and speed pedelecs are not allowed to drive on the cycleway.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [{ key: 'moped', value: 'no' }],
        uniqueTags: [{ key: 'speed_pedelec', value: 'no' }],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M16.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M17',
    signId: 'M17',
    name: 'Sign M17',
    descriptiveName:
      'Placed under sign F19 when cyclists and speed pedelecs are allowed to drive in both directions on a one-way road.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M17.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M18',
    signId: 'M18',
    name: 'Sign M18',
    descriptiveName:
      'Placed under sign F19 when cyclists, mopeds class A and speed pedelecs are allowed to drive in both directions on a one-way road.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M18.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M19',
    signId: 'M19',
    name: 'Sign M19',
    descriptiveName:
      'Placed under sign B1, B5 or E9a when that sign only applies to speed pedelecs.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M19.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M20',
    signId: 'M20',
    name: 'Sign M20',
    descriptiveName:
      'Placed under sign B1, B5 or E9a when that sign only applies to bicycles and speed pedelecs.',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M20.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M21',
    signId: 'M21',
    name: 'Sign M21',
    descriptiveName:
      "Placed under sign E9a when that sign only applies to (non-)motorised personal transporters ('voortbewegingstoestellen'/'engins de déplacement').",
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M21.png',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M22',
    signId: 'M22',
    name: 'Sign M22',
    descriptiveName:
      "Placed under sign E9a when that sign only applies to shared (non-)motorised personal transporters ('deelvoortbewegingstoestellen'/'engins de déplacement en libre-partage').",
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M22.png',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M23',
    signId: 'M23',
    name: 'Sign M23',
    descriptiveName:
      "Placed under sign E9a when that sign only applies to bike-share bicycles ('deelfietsen'/'bicyclettes en libre-partage').",
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M23.png',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'M24',
    signId: 'M24',
    name: 'Sign M24',
    descriptiveName:
      "Placed under sign E9a when that sign only applies to bike-share bicycles and (non-)motorised personal transporters ('deelfietsen en deelvoortbewegingstoestellen'/'bicyclettes et engins de déplacement en libre-partage').",
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway:bicycle', value: 'no' },
          { key: 'oneway:mofa', value: 'no' },
          { key: 'oneway:speed_pedelec', value: 'no' },
        ],
        modifierValue: 'no',
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Belgian_traffic_sign_M24.png',
      licence: 'Public Domain',
    },
  },
]
