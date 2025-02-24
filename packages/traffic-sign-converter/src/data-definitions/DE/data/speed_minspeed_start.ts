import type { SignType } from '../../TrafficSignDataTypes.js'

export const _speed_minspeed_start: SignType[] = [
  {
    osmValuePart: '275[47]',
    signId: '275',
    name: 'Zeichen 275',
    descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit von ?? km/h',
    description: null,
    kind: 'traffic_sign',
    signValue: 47,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '47',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
      conditionalTags: [{ key: 'minspeed', value: '47' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.',
      },
    ],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '275-30',
    signId: '275-30',
    name: 'Zeichen 275-30',
    descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
      conditionalTags: [{ key: 'minspeed', value: '30' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.',
      },
    ],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '275-40',
    signId: '275-40',
    name: 'Zeichen 275-40',
    descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
      conditionalTags: [{ key: 'minspeed', value: '40' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.',
      },
    ],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        // MISSING
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_275-40_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '275-80',
    signId: '275-80',
    name: 'Zeichen 275-80',
    descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
      conditionalTags: [{ key: 'minspeed', value: '80' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.',
      },
    ],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        // MISSING
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_275-80_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
]
