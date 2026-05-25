import type { SignType } from '../../TrafficSignDataTypes.js'

const minspeedLaneComment =
  'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.'

const createMinspeedEndSign = (
  speed: number,
  options?: { visibility?: 'search_only' },
): SignType => ({
  osmValuePart: `279-${speed}`,
  signId: `279-${speed}`,
  name: `Zeichen 279-${speed}`,
  descriptiveName: 'Ende der vorgeschriebenen Mindestgeschwindigkeit',
  description: null,
  kind: 'traffic_sign',
  tagRecommendations: {
    highwayValues: [],
    uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
    conditionalTags: [{ key: 'minspeed', value: `${speed}` }],
  },
  comments: [
    {
      tagReference: null,
      comment: minspeedLaneComment,
    },
  ],
  catalogue: {
    signCategory: 'speed',
    focus: ['highway'],
    ...(options?.visibility ? { visibility: options.visibility } : {}),
  },
  image: {
    kind: 'local',
    sourceLocalPath: `local-svgs/DE/279-${speed}.svg`,
    licence: 'Public Domain',
  },
})

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
        comment: minspeedLaneComment,
      },
    ],
    catalogue: {
      signCategory: 'speed',
      focus: ['highway'],
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_279-30_-_Ende_der_vorgeschriebenen_Mindestgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  createMinspeedEndSign(10, { visibility: 'search_only' }),
  createMinspeedEndSign(20, { visibility: 'search_only' }),
  createMinspeedEndSign(30),
  createMinspeedEndSign(40, { visibility: 'search_only' }),
  createMinspeedEndSign(50),
  createMinspeedEndSign(60, { visibility: 'search_only' }),
  createMinspeedEndSign(70, { visibility: 'search_only' }),
  createMinspeedEndSign(80, { visibility: 'search_only' }),
  createMinspeedEndSign(90, { visibility: 'search_only' }),
  createMinspeedEndSign(100, { visibility: 'search_only' }),
  createMinspeedEndSign(110, { visibility: 'search_only' }),
  createMinspeedEndSign(120, { visibility: 'search_only' }),
  createMinspeedEndSign(130, { visibility: 'search_only' }),
]
