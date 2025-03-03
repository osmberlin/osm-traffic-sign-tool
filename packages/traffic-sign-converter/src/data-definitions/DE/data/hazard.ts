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
]
