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
  {
    osmValuePart: '"Gehwegschäden"',
    signId: '"Gehwegschäden"',
    redirects: [{ from: 'Gehwegschäden', to: '"Gehwegschäden"' }],
    name: 'Zusatzzeichen "Gehwegschäden"',
    descriptiveName: 'Gehwegschäden',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['footway', 'path'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Gehwegsch%C3%A4den.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Radwegschäden"',
    signId: '"Radwegschäden"',
    redirects: [{ from: 'Radwegschäden', to: '"Radwegschäden"' }],
    name: 'Zusatzzeichen "Radwegschäden"',
    descriptiveName: 'Radwegschäden',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['cycleway', 'path'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Radwegsch%C3%A4den.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Geh- und Radwegschäden"',
    signId: '"Geh- und Radwegschäden"',
    redirects: [{ from: 'Geh- und Radwegschäden', to: '"Geh- und Radwegschäden"' }],
    name: 'Zusatzzeichen "Geh- und Radwegschäden"',
    descriptiveName: 'Geh- und Radwegschäden',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Geh-_und_Radwegsch%C3%A4den.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Schäden im Gehweg"',
    signId: '"Schäden im Gehweg"',
    redirects: [{ from: 'Schäden im Gehweg', to: '"Schäden im Gehweg"' }],
    name: 'Zusatzzeichen "Schäden im Gehweg"',
    descriptiveName: 'Schäden im Gehweg',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['footway', 'path'],
      uniqueTags: [
        { key: 'hazard', value: 'damaged_road' },
        { key: 'smoothness', value: 'bad' },
      ],
    },
    comments: [
      {
        comment:
          'Alternative smoothness values: `intermediate`, `very_bad`. See [smoothness gallery](https://wiki.openstreetmap.org/wiki/Key:smoothness/Gallery) for examples.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Sch%C3%A4den_im_Gehweg.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '108[10]',
    signId: '108',
    name: 'Zeichen 108',
    descriptiveName: 'Gefälle von ??%',
    description: null,
    kind: 'traffic_sign',
    signValue: 10,
    valuePrompt: {
      prompt: 'Gefälle in Prozent ohne Einheit',
      defaultValue: '10',
      format: 'integer',
    },
    redirects: [
      { from: '108-4', to: '108[4]' },
      { from: '108-5', to: '108[5]' },
      { from: '108-6', to: '108[6]' },
      { from: '108-7', to: '108[7]' },
      { from: '108-8', to: '108[8]' },
      { from: '108-9', to: '108[9]' },
      { from: '108-11', to: '108[11]' },
      { from: '108-12', to: '108[12]' },
      { from: '108-13', to: '108[13]' },
      { from: '108-14', to: '108[14]' },
      { from: '108-16', to: '108[16]' },
      { from: '108-17', to: '108[17]' },
      { from: '108-18', to: '108[18]' },
      { from: '108-19', to: '108[19]' },
      { from: '108-20', to: '108[20]' },
      { from: '108-21', to: '108[21]' },
      { from: '108-22', to: '108[22]' },
      { from: '108-23', to: '108[23]' },
      { from: '108-24', to: '108[24]' },
      { from: '108-25', to: '108[25]' },
    ],
    tagRecommendations: {
      uniqueTags: [
        { key: 'incline', valueTemplate: '-$%' },
        { key: 'hazard', value: 'incline' },
      ],
    },
    comments: [
      {
        comment:
          'Es gibt eine Reihe weiterer Zeichen mit expliziten IDs. Das Tool unterstützt zurzeit nur 10 % und 15 % als explizite Einträge und verwendet die Klammer-Notation für alle weiteren Werte. Eine [Liste aller offiziellen IDs findest du im Wiki](https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#Gefahrzeichen_nach_Anlage_1_(zu_%C2%A7_40_Absatz_6_und_7_StVO)).',
      },
    ],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_108-10_-_Gef%C3%A4lle,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '108-10',
    signId: '108-10',
    name: 'Zeichen 108-10',
    descriptiveName: 'Gefälle von 10 %',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        { key: 'incline', value: '-10%' },
        { key: 'hazard', value: 'incline' },
      ],
    },
    comments: [],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_108-10_-_Gef%C3%A4lle,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '108-15',
    signId: '108-15',
    name: 'Zeichen 108-15',
    descriptiveName: 'Gefälle von 15 %',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        { key: 'incline', value: '-15%' },
        { key: 'hazard', value: 'incline' },
      ],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_108-15_-_Gef%C3%A4lle,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '110[10]',
    signId: '110',
    name: 'Zeichen 110',
    descriptiveName: 'Steigung von ??%',
    description: null,
    kind: 'traffic_sign',
    signValue: 10,
    valuePrompt: {
      prompt: 'Steigung in Prozent ohne Einheit',
      defaultValue: '10',
      format: 'integer',
    },
    redirects: [
      { from: '110-4', to: '110[4]' },
      { from: '110-5', to: '110[5]' },
      { from: '110-6', to: '110[6]' },
      { from: '110-7', to: '110[7]' },
      { from: '110-8', to: '110[8]' },
      { from: '110-9', to: '110[9]' },
      { from: '110-11', to: '110[11]' },
      { from: '110-12', to: '110[12]' },
      { from: '110-13', to: '110[13]' },
      { from: '110-14', to: '110[14]' },
      { from: '110-16', to: '110[16]' },
      { from: '110-17', to: '110[17]' },
      { from: '110-18', to: '110[18]' },
      { from: '110-19', to: '110[19]' },
      { from: '110-20', to: '110[20]' },
      { from: '110-21', to: '110[21]' },
      { from: '110-22', to: '110[22]' },
      { from: '110-23', to: '110[23]' },
      { from: '110-24', to: '110[24]' },
      { from: '110-25', to: '110[25]' },
    ],
    tagRecommendations: {
      uniqueTags: [
        { key: 'incline', valueTemplate: '$%' },
        { key: 'hazard', value: 'incline' },
      ],
    },
    comments: [
      {
        comment:
          'Es gibt eine Reihe weiterer Zeichen mit expliziten IDs. Das Tool unterstützt zurzeit nur 10 % und 15 % als explizite Einträge und verwendet die Klammer-Notation für alle weiteren Werte. Eine [Liste aller offiziellen IDs findest du im Wiki](https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#Gefahrzeichen_nach_Anlage_1_(zu_%C2%A7_40_Absatz_6_und_7_StVO)).',
      },
    ],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_110-10_-_Steigung,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '110-10',
    signId: '110-10',
    name: 'Zeichen 110-10',
    descriptiveName: 'Steigung von 10 %',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        { key: 'incline', value: '10%' },
        { key: 'hazard', value: 'incline' },
      ],
    },
    comments: [],
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_110-10_-_Steigung,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '110-15',
    signId: '110-15',
    name: 'Zeichen 110-15',
    descriptiveName: 'Steigung von 15 %',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        { key: 'incline', value: '15%' },
        { key: 'hazard', value: 'incline' },
      ],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_110-15_-_Steigung,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
]
