import type { SignType } from '../../TrafficSignDataTypes.js'

export const _hazard: SignType[] = [
  {
    osmValuePart: '136-10',
    signId: '136-10',
    name: 'Zeichen 136-10',
    descriptiveName: 'Vorsicht, Kinder! – Aufstellung rechts',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'children' }],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_330.2_-_Ende_der_Autobahn,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '101',
    signId: '101',
    name: 'Zeichen 101',
    descriptiveName: 'Gefahrstelle',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_101_-_Gefahrstelle,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '138-10',
    signId: '138-10',
    name: 'Zeichen 138-10',
    descriptiveName: 'Radverkehr – Aufstellung rechts',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'cyclists' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_138-10_-_Radverkehr,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '101-15',
    signId: '101-15',
    name: 'Zeichen 101-15',
    descriptiveName: 'Steinschlag',
    description: 'Aufstellung rechts',
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'falling_rocks' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_101-15_-_Steinschlag,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '101-25',
    signId: '101-25',
    name: 'Zeichen 101-25',
    descriptiveName: 'Steinschlag',
    description: 'Aufstellung links',
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'falling_rocks' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'hazard_sign',
      visibility: 'search_only',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_101-25_-_Steinschlag,_Aufstellung_links,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '103-20',
    signId: '103-20',
    name: 'Zeichen 103-20',
    descriptiveName: 'Kurve (rechts)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'curve' }],
    },
    comments: [],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_103-20_-_Kurve_(rechts),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '103-10',
    signId: '103-10',
    name: 'Zeichen 103-10',
    descriptiveName: 'Kurve (links)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'hazard', value: 'curve' }],
    },
    comments: [],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zeichen_103-10_-_Kurve_(links),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '201-50',
    signId: '201-50',
    name: 'Zeichen 201-50',
    descriptiveName: 'Andreaskreuz — stehend',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        { key: 'railway', value: 'level_crossing' },
        { key: 'crossing:saltire', value: 'yes' },
      ],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_201-50_%E2%80%93_Andreaskreuz_-_Dem_Schienenverkehr_Vorrang_gew%C3%A4hren!_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '201-51',
    signId: '201-51',
    name: 'Zeichen 201-51',
    descriptiveName: 'Andreaskreuz — stehend',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        { key: 'railway', value: 'level_crossing' },
        { key: 'crossing:saltire', value: 'yes' },
      ],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_201-51_-_Andreaskreuz_(stehend)_mit_Blitzpfeil,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Gehwegschäden"',
    signId: '"Gehwegschäden"',
    redirects: [{ from: 'Gehwegschäden', to: '"Gehwegschäden"' }],
    name: 'Zusatzzeichen "Gehwegschäden"',
    descriptiveName: 'Gehwegschäden',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['footway', 'path'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Gehwegsch%C3%A4den.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Radwegschäden"',
    signId: '"Radwegschäden"',
    redirects: [{ from: 'Radwegschäden', to: '"Radwegschäden"' }],
    name: 'Zusatzzeichen "Radwegschäden"',
    descriptiveName: 'Radwegschäden',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['cycleway', 'path'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Radwegsch%C3%A4den.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Geh- und Radwegschäden"',
    signId: '"Geh- und Radwegschäden"',
    redirects: [{ from: 'Geh- und Radwegschäden', to: '"Geh- und Radwegschäden"' }],
    name: 'Zusatzzeichen "Geh- und Radwegschäden"',
    descriptiveName: 'Geh- und Radwegschäden',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Geh-_und_Radwegsch%C3%A4den.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Schäden im Gehweg"',
    signId: '"Schäden im Gehweg"',
    redirects: [{ from: 'Schäden im Gehweg', to: '"Schäden im Gehweg"' }],
    name: 'Zusatzzeichen "Schäden im Gehweg"',
    descriptiveName: 'Schäden im Gehweg',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['footway', 'path'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Sch%C3%A4den_im_Gehweg.svg',
      licence: 'Public Domain',
    },
  },
]
