import type { SignType } from '../../TrafficSignDataTypes.js'

const minspeedLaneComment =
  'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.'

const createMinspeedStartSign = (speed: number, options?: { thematicOnly?: true }): SignType => ({
  osmValuePart: `275-${speed}`,
  signId: `275-${speed}`,
  name: `Zeichen 275-${speed}`,
  descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
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
    sourceLocalPath: `local-svgs/DE/275-${speed}.svg`,
    licence: 'Public Domain',
  },
})

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
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  createMinspeedStartSign(10, { thematicOnly: true }),
  createMinspeedStartSign(20, { thematicOnly: true }),
  createMinspeedStartSign(30),
  createMinspeedStartSign(40, { thematicOnly: true }),
  createMinspeedStartSign(50),
  createMinspeedStartSign(60, { thematicOnly: true }),
  createMinspeedStartSign(70, { thematicOnly: true }),
  createMinspeedStartSign(80),
  createMinspeedStartSign(90, { thematicOnly: true }),
  createMinspeedStartSign(100, { thematicOnly: true }),
  createMinspeedStartSign(110, { thematicOnly: true }),
  createMinspeedStartSign(120, { thematicOnly: true }),
  createMinspeedStartSign(130, { thematicOnly: true }),
]
