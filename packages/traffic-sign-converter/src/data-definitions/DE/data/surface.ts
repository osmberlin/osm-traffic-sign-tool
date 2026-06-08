import { markingColorQuestion } from '../../questionCatalog.js'
import type { SignType } from '../../TrafficSignDataTypes.js'

export const _surface: SignType[] = [
  {
    osmValuePart: '298',
    signId: '298',
    name: 'Zeichen 298',
    descriptiveName: 'Sperrflächen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: [],
        uniqueTags: [
          { key: 'road_marking', value: 'restriction' },
          { key: 'pattern', value: 'stripes' },
        ],
      },
    ],
    comments: [
      {
        lang: 'de',
        comment:
          'Die Markierung ist in der Regel weiß. Bei Sonderfällen kann optional `colour=*` gesetzt werden (z. B. gelbe Baustellenmarkierungen oder lila Markierungen auf Privatgrund). Siehe [DE:Key:road_marking](https://wiki.openstreetmap.org/wiki/DE:Key:road_marking#Weitere_Attribute).',
      },
    ],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'surface_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_298_-_Sperrfl%C3%A4chen,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '299',
    signId: '299',
    name: 'Zeichen 299',
    descriptiveName: 'Grenzmarkierung für Halt- und Parkverbote',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: [],
        uniqueTags: [
          { key: 'road_marking', value: 'restriction' },
          { key: 'pattern', value: 'zigzag' },
        ],
      },
    ],
    questions: [markingColorQuestion()],
    comments: [],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'surface_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_299_-_Grenzmarkierung_für_Halt-_und_Parkverbote,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '295',
    signId: '295',
    name: 'Zeichen 295',
    descriptiveName: 'Fahrstreifenbegrenzung und Fahrbahnbegrenzung',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: [] }],
    comments: [],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'surface_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_295_-_Fahrstreifenbegrenzung_und_Fahrbahnbegrenzung,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '340',
    signId: '340',
    name: 'Zeichen 340',
    descriptiveName: 'Leitlinie',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: [], uniqueTags: [] }],
    comments: [],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'surface_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_340_%E2%80%93_Leitlinie,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
]
