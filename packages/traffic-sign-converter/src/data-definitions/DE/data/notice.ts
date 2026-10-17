import type { SignType } from '../../TrafficSignDataTypes.js'

const cityLimitComment = {
  lang: 'de',
  comment:
    'Ortstafeln werden meist als [Tag:traffic_sign=city_limit] mit `city_limit=begin` bzw. `city_limit=end` und `name=*` erfasst, siehe [DE:Tag:traffic_sign=city_limit](https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3Dcity_limit).',
} as const

export const _notice: SignType[] = [
  {
    osmValuePart: '354',
    signId: '354',
    name: 'Zeichen 354',
    descriptiveName: 'Wasserschutzgebiet',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: [],
        uniqueTags: [{ key: 'hazmat:water', value: 'permissive' }],
      },
    ],
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '600',
    signId: '600',
    name: 'Zeichen 600',
    descriptiveName: 'Absperrschranke (Barke)',
    description: 'Absperrschranke, z. B. an Baustellen oder gesperrten Straßen',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zeichen_600.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '310',
    signId: '310',
    name: 'Zeichen 310',
    descriptiveName: 'Ortstafel Vorderseite (Ortseingang)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'city_limit', value: 'begin' }] },
    ],
    comments: [cityLimitComment],
    catalogue: {
      signCategory: 'signpost',
    },
    image: {
      kind: 'remote',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zeichen_310.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '311',
    signId: '311',
    name: 'Zeichen 311',
    descriptiveName: 'Ortstafel Rückseite (Ortsausgang)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'city_limit', value: 'end' }] },
    ],
    comments: [cityLimitComment],
    catalogue: {
      signCategory: 'signpost',
    },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zeichen_311_-_Ortstafel_R%C3%BCckseite,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
]
