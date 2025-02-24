import type { SignType } from '../../TrafficSignDataTypes.js'

export const _overtaking: SignType[] = [
  {
    osmValuePart: '276',
    signId: '276',
    name: 'Zeichen 276',
    descriptiveName: 'Überholverbot für Kraftfahrzeuge aller Art',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      conditionalTags: [{ key: 'overtaking', value: 'no' }],
    },
    comments: [
      {
        tagReference: 'overtaking:forward=*',
        comment:
          'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking=forward/backward] entsprechend der Wegrichtung.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_276_-_%C3%9Cberholverbot_für_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '277',
    signId: '277',
    name: 'Zeichen 277',
    descriptiveName: 'Überholverbot für Kraftfahrzeuge über 3,5 t',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'overtaking:hgv', value: 'no' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking:hgv=forward/backward] entsprechend der Wegrichtung.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '277.1',
    signId: '277.1',
    name: 'Zeichen 277.1',
    descriptiveName:
      'Verbot des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
    },
    comments: [
      {
        tagReference: null,
        important: true,
        comment: 'Es gibt noch kein etabliertes Tagging Schema für dieses Verkehrszeichen.',
      },
      {
        tagReference: null,
        comment:
          'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking:hgv=forward/backward] entsprechend der Wegrichtung.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_277.1_-_Verbot_des_%C3%9Cberholens_von_einspurigen_Fahrzeugen_für_mehrspurige_Kraftfahrzeuge_und_Kraftr%C3%A4dern_mit_Beiwagen;_StVO_2020.svg',
      licence: 'Public Domain',
    },
  },
]
