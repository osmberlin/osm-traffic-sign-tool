import type { SignType } from '../../TrafficSignDataTypes.js'

export const _traffic_ban: SignType[] = [
  {
    osmValuePart: '250',
    signId: '250',
    name: 'Zeichen 250',
    descriptiveName: 'Verbot für Fahrzeuge aller Art',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'vehicle', value: 'no' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_250_-_Verbot_für_Fahrzeuge_aller_Art,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '260',
    signId: '260',
    name: 'Zeichen 260',
    descriptiveName:
      'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'motor_vehicle', value: 'no' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_260_-_Verbot_für_Kraftr%C3%A4der_und_Mofas_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '251',
    signId: '251',
    name: 'Zeichen 251',
    descriptiveName: 'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'motorcar', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_251_-_Verbot_für_Kraftwagen_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '253',
    signId: '253',
    name: 'Zeichen 253',
    descriptiveName: 'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t…',
    description:
      'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger, und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'hgv', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_253_-_Verbot_für_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '254',
    signId: '254',
    name: 'Zeichen 254',
    descriptiveName: 'Verbot für Radfahrer',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'bicycle', value: 'no' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_254_-_Verbot_für_Radfahrer,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '255',
    signId: '255',
    name: 'Zeichen 255',
    descriptiveName: 'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'motorcycle', value: 'no' },
        { key: 'moped', value: 'no' },
        { key: 'mofa', value: 'no' },
      ],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_255_-_Verbot_für_Kraftr%C3%A4der,_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '257-50',
    signId: '257-50',
    name: 'Zeichen 257-50',
    descriptiveName: 'Verbot für Mofas',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'mofa', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_256_-_Verbot_für_Mofas,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '257-51',
    signId: '257-51',
    name: 'Zeichen 257-51',
    descriptiveName: 'Verbot für Reiter',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'horse', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-51_-_Verbot_für_Reiter,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '257-54',
    signId: '257-54',
    name: 'Zeichen 257-54',
    descriptiveName: 'Verbot für Kraftomnibusse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'bus', value: 'no' },
        { key: 'tourist_bus', value: 'no' },
      ],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-54_-_Verbot_für_Kraftomnibusse,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '259',
    signId: '259',
    name: 'Zeichen 259',
    descriptiveName: 'Verbot für Fußgänger',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'foot', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_259_-_Verbot_für_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '261',
    signId: '261',
    name: 'Zeichen 261',
    descriptiveName: 'Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'hazmat', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_261_-_Verbot_für_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gef%C3%A4hrlichen_Gütern,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '262[5.5]',
    signId: '262',
    signValue: 5.5,
    name: 'Zeichen 262',
    descriptiveName: 'Verbot für Fahrzeuge über angegebenem tatsächlichen Gewicht',
    description: null,
    kind: 'traffic_sign',
    valuePrompt: {
      prompt: 'Gewicht in Tonnen ohne Einheit',
      defaultValue: '5.5',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxweight', value: 'sign' }],
      conditionalTags: [{ key: 'maxweight', value: '5.5' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_262_-_Verbot_für_Fahrzeuge_deren_tats%C3%A4chliches_Gewicht_eine_gewisse_Grenze_überschreitet_(600x600);_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },

  {
    // NOTE: Formal gesehen wäre das 263-8, aber in https://github.com/osmberlin/osm-traffic-sign-tool/issues/60#issuecomment-2563086843 haben wir uns geeinigt, dass wir für dieses Zeichen die Klammer-Schreibweise verwenden.
    osmValuePart: '263[8]',
    signId: '263',
    signValue: 8,
    name: 'Zeichen 263',
    descriptiveName: 'Verbot für Fahrzeuge über angegebene tatsächliche Achslast',
    description: null,
    kind: 'traffic_sign',
    valuePrompt: {
      prompt: 'Achslast in Tonnen ohne Einheit',
      defaultValue: '8',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxaxleload', value: 'sign' }],
      conditionalTags: [{ key: 'maxaxleload', value: '8' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_263_-_Verbot_für_Fahrzeuge_über_angegebene_tats%C3%A4chliche_Achslast,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },

  {
    osmValuePart: '264[2]',
    signId: '264',
    signValue: 2,
    name: 'Zeichen 264',
    descriptiveName: 'Verbot für Fahrzeuge über die angegebene Breite einschließlich Ladung',
    description: null,
    kind: 'traffic_sign',
    valuePrompt: {
      prompt: 'Breite in Metern ohne Einheit',
      defaultValue: '2',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxwidth', value: 'sign' }],
      conditionalTags: [{ key: 'maxwidth', value: '2' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_264_-_Verbot_für_Fahrzeuge_über_angegebene_Breite_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '265[3.8]',
    signId: '265',
    signValue: 3.8,
    name: 'Zeichen 265',
    descriptiveName: 'Verbot für Fahrzeuge über die angegebene Höhe einschließlich Ladung',
    description: null,
    kind: 'traffic_sign',
    valuePrompt: {
      prompt: 'Höhe in Metern ohne Einheit',
      defaultValue: '3.8',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxheight', value: 'sign' }],
      conditionalTags: [{ key: 'maxheight', value: '3.8' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_265_-_Verbot_für_Fahrzeuge,_deren_tats%C3%A4chliche_H%C3%B6he_einschlie%C3%9Flich_Ladung_eine_bestimmte_Grenze_überschreitet_(600x600);_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '266[10]',
    signId: '266',
    name: 'Zeichen 266',
    descriptiveName: 'Verbot für Fahrzeuge und Züge über angegebene Läge einschließlich Ladung',
    description: null,
    kind: 'traffic_sign',
    signValue: 10,
    valuePrompt: {
      prompt: 'Läge in Metern ohne Einheit',
      defaultValue: '10',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxlength', value: 'sign' }],
      conditionalTags: [{ key: 'maxlength', value: '10' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_266_-_Verbot_für_Fahrzeuge_und_Züge_über_angegebene_L%C3%A4nge_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '269',
    signId: '269',
    name: 'Zeichen 269',
    descriptiveName: 'Verbot für Fahrzeuge mit wassergefährdender Ladung',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      conditionalTags: [{ key: 'hazmat:water', value: 'no' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_269_-_Verbot_für_Fahrzeuge_mit_wassergef%C3%A4hrdender_Ladung,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '268',
    signId: '268',
    name: 'Zeichen 268',
    descriptiveName: 'Schneeketten vorgeschrieben',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'snow_chains', value: 'required' }],
      conditionalTags: [],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
      visibility: 'search_only',
    },
    image: {
      sourceUrl:
        'https://de.m.wikipedia.org/wiki/Datei:Zeichen_268_-_Schneeketten_sind_vorgeschrieben,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
]
