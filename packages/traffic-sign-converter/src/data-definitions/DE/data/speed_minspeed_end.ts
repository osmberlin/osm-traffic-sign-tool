import type { SignType } from '../../TrafficSignDataTypes.js'

const minspeedLaneComment =
  'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.'

const createMinspeedEndSign = (speed: number, options?: { thematicOnly?: true }): SignType => ({
  osmValuePart: `279-${speed}`,
  signId: `279-${speed}`,
  name: `Zeichen 279-${speed}`,
  descriptiveName: 'Ende der vorgeschriebenen Mindestgeschwindigkeit',
  description: null,
  kind: 'traffic_sign',
  tagRecommendationsByGeometry: 'none',
  taggingSuggestionsQa: 'none',
  comments: [
    {
      tagReference: null,
      lang: 'de',
      comment: minspeedLaneComment,
    },
  ],
  catalogue: {
    signCategory: 'speed',
    ...(options?.thematicOnly ? { focus: { highway: true } } : {}),
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
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    comments: [
      {
        tagReference: null,
        lang: 'de',
        comment: minspeedLaneComment,
      },
    ],
    catalogue: {
      signCategory: 'speed',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_279-30_-_Ende_der_vorgeschriebenen_Mindestgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  createMinspeedEndSign(10, { thematicOnly: true }),
  createMinspeedEndSign(20, { thematicOnly: true }),
  createMinspeedEndSign(30),
  createMinspeedEndSign(40, { thematicOnly: true }),
  createMinspeedEndSign(50),
  createMinspeedEndSign(60, { thematicOnly: true }),
  createMinspeedEndSign(70, { thematicOnly: true }),
  createMinspeedEndSign(80, { thematicOnly: true }),
  createMinspeedEndSign(90, { thematicOnly: true }),
  createMinspeedEndSign(100, { thematicOnly: true }),
  createMinspeedEndSign(110, { thematicOnly: true }),
  createMinspeedEndSign(120, { thematicOnly: true }),
  createMinspeedEndSign(130, { thematicOnly: true }),
]
