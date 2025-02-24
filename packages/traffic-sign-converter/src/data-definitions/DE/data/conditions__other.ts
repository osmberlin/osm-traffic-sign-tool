import type { SignType } from '../../TrafficSignDataTypes.js'

export const _conditions__other: SignType[] = [
  {
    osmValuePart: '1053-35',
    signId: '1053-35',
    name: 'Zusatzzeichen 1053-35',
    descriptiveName: 'Beschräkung: bei Nässe',
    description: null,
    kind: 'condition_modifier',
    tagRecommendations: {
      uniqueTags: [],
      modifierValue: 'wet',
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1053-35_-_Bei_N%C3%A4sse_(600x600),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1053-33',
    signId: '1053-33',
    name: 'Zusatzzeichen 1053-33',
    descriptiveName: 'Massenangabe 7,5 t',
    description:
      '7,5 t zulässige Gesamtmasse einschließlich Anhänger überschreitet die angegebene Grenze',
    kind: 'condition_modifier',
    tagRecommendations: {
      uniqueTags: [],
      modifierValue: 'maxweightrating>7.5',
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1053-33_-_Massenangabe_%E2%80%93_7,5_t_(420x231),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1053-37',
    signId: '1053-37',
    name: 'Zusatzzeichen 1053-37',
    descriptiveName: 'Massenangabe 12 t',
    description:
      '12 t zulässige Gesamtmasse einschließlich Anhänger überschreitet die angegebene Grenze',
    kind: 'condition_modifier',
    tagRecommendations: {
      uniqueTags: [],
      modifierValue: 'weight>12',
    },
    comments: [],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1053-37_-_Massenangabe_%E2%80%93_12_t_(420x231),_StVO_2005.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1060-33',
    signId: '1060-33',
    name: 'Zusatzzeichen 1060-33',
    descriptiveName: 'Massenangabe 2,8 t',
    description:
      '2,8 t zulässige Gesamtmasse einschließlich Anhänger überschreitet die angegebene Grenze',
    kind: 'condition_modifier',
    tagRecommendations: {
      uniqueTags: [],
      modifierValue: 'weight>2.8',
    },
    comments: [
      {
        comment: 'Nur in Verbindung mit Zeichen 277 "Überholverbot für Kraftfahrzeuge über 3,5 t"',
      },
    ],
    catalogue: {
      signCategory: 'condition_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1060-33_-_Massenangabe_-_2,8_t,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1012-31',
    signId: '1012-31',
    name: 'Zusatzzeichen 1012-31',
    descriptiveName: 'Ende',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_1012-31_-_Ende_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1000-30',
    signId: '1000-30',
    name: 'Zusatzzeichen 1000-30',
    descriptiveName: 'Beide Richtungen',
    description: 'zwei gegengerichtete waagerechte Pfeile',
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'oneway', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1000-31',
    signId: '1000-31',
    name: 'Zusatzzeichen 1000-31',
    descriptiveName: 'Beide Richtungen',
    description: 'zwei gegengerichtete senkrechte Pfeile',
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [{ key: 'oneway', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-31_-_beide_Richtungen,_zwei_gegengerichtete_senkrechte_Pfeile,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1000-32',
    signId: '1000-32',
    name: 'Zusatzzeichen 1000-32',
    descriptiveName: 'Radverkehr kreuzt von links und rechts',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      uniqueTags: [{ key: 'oneway:bicycle', value: 'no' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Bitte <a href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1000-33">Wiki beachten</a>, das Tool ist hier nicht vollständig.',
      },
    ],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-32_-_Radfahrer_kreuzen_von_rechts_und_links,_StVO_1997.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1000-33',
    signId: '1000-33',
    name: 'Zusatzzeichen 1000-33',
    descriptiveName: 'Radverkehr im Gegenverkehr',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'oneway:bicycle', value: 'no' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Bitte <a href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1000-33">Wiki beachten</a>, das Tool ist hier nicht vollständig.',
      },
    ],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-33_-_Radverkehr_im_Gegenverkehr,_StVO_1997.svg',
      licence: 'Public Domain',
    },
  },
]
