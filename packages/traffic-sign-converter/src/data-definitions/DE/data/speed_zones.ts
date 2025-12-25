import type { SignType } from '../../TrafficSignDataTypes.js'

export const _speed_zones: SignType[] = [
  {
    osmValuePart: '274.1[47]',
    signId: '274.1',
    name: 'Zeichen 274.1',
    descriptiveName: 'Tempo ??-Zone',
    description: 'Beginn einer Tempo ??-Zone',
    kind: 'traffic_sign',
    signValue: 47,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '47',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [
        { key: 'source:maxspeed', valueTemplate: 'DE:zone$' },
        { key: 'zone:maxspeed', valueTemplate: 'DE:$' },
      ],
      conditionalTags: [{ key: 'maxspeed', value: '30' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274.1_-_Beginn_einer_Tempo_30-Zone,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '274.1',
    signId: '274.1',
    redirects: [{ from: '274.1[30]', to: '274.1' }],
    name: 'Zeichen 274.1',
    descriptiveName: 'Tempo 30-Zone',
    description: 'Beginn einer Tempo 30-Zone',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [
        { key: 'source:maxspeed', value: 'DE:zone30' },
        { key: 'zone:maxspeed', value: 'DE:30' },
      ],
      conditionalTags: [{ key: 'maxspeed', value: '30' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'speed',
      visibility: 'search_only',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274.1_-_Beginn_einer_Tempo_30-Zone,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '274.2',
    signId: '274.2',
    redirects: [{ from: '274.2[30]', to: '274.2' }],
    name: 'Zeichen 274.2',
    descriptiveName: 'Tempo 30-Zone (Ende)',
    description: 'Ende einer Tempo 30-Zone',
    kind: 'traffic_sign',
    signValue: 30,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '30',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      conditionalTags: [],
    },
    comments: [],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'speed',
      visibility: 'search_only',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274.2_-_Ende_einer_Tempo_30-Zone_(einseitig),_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
]
