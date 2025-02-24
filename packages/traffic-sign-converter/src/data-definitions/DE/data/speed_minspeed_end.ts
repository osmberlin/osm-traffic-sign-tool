import type { SignType } from '../../TrafficSignDataTypes.js'

export const _speed_minspeed_end: SignType[] = [
  {
    osmValuePart: '279[47]',
    signId: '279',
    name: 'Zeichen 279',
    descriptiveName: 'Ende der vorgeschriebenen Mindestgeschwindigkeit von ?? km/h',
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
        'https://de.wikipedia.org/wiki/Datei:Zeichen_279-30_-_Ende_der_vorgeschriebenen_Mindestgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '279-40',
    signId: '279-40',
    name: 'Zeichen 279-40',
    descriptiveName: 'Ende der vorgeschriebenen Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        // MISSING
        'https://de.wikipedia.org/wiki/Datei:Zeichen_279-40_-_Ende_der_vorgeschriebenen_Mindestgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '279-80',
    signId: '279-80',
    name: 'Zeichen 279-80',
    descriptiveName: 'Ende der vorgeschriebenen Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      sourceUrl:
        // MISSING
        'https://de.wikipedia.org/wiki/Datei:Zeichen_279-80_-_Ende_der_vorgeschriebenen_Mindestgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
]
