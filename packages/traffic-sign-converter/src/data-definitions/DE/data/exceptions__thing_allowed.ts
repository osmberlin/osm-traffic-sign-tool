import type { SignType } from '../../TrafficSignDataTypes.js'

export const _exceptions__thing_allowed: SignType[] = [
  {
    osmValuePart: '1020-12',
    signId: '1020-12',
    name: 'Zusatzzeichen 1020-12',
    descriptiveName: 'Radfahrer und Anlieger frei',
    description: 'Anlieger im Sinne von Bewohner',
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'bicycle', value: 'yes' }],
      modifierValue: 'destination',
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1020-30',
    signId: '1020-30',
    name: 'Zusatzzeichen 1020-30',
    descriptiveName: 'Anlieger frei',
    description: 'Anlieger im Sinne von Bewohner und Lieferverkehr',
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['residential', 'service'],
      modifierValue: 'destination',
    },
    comments: [
      {
        tagReference: 'highway=*',
        comment:
          'Aufgrund von "Anlieger frei" eventuell als [Tag:highway=residential] oder [Tag:highway=service] einzustufen.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1022-10',
    signId: '1022-10',
    name: 'Zusatzzeichen 1022-10',
    descriptiveName: 'Radfahrer frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['footway'],
      uniqueTags: [{ key: 'bicycle', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1022-11',
    signId: '1022-11',
    name: 'Zusatzzeichen 1022-11',
    descriptiveName: 'Mofas frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'mofa', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1022-13',
    signId: '1022-13',
    name: 'Zusatzzeichen 1022-13',
    descriptiveName: 'E-Bikes frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'electric_bicycle', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1022-13_-_E-Bikes_frei_(450x600),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Kleinkrafträder frei"',
    redirects: [{ from: 'Kleinkrafträder frei', to: '"Kleinkrafträder frei"' }],
    signId: '"Kleinkrafträder frei"',
    name: 'Zusatzzeichen "Kleinkrafträder frei"',
    descriptiveName: 'Kleinkrafträder frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'mofa', value: 'yes' },
        { key: 'moped', value: 'yes' },
      ],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Kleinkrafträder_frei.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1022-16',
    signId: '1022-16',
    name: 'Zusatzzeichen 1022-16',
    descriptiveName: 'Elektrokleinstfahrzeuge frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'small_electric_vehicle', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1022-16_-_Elektrokleinstfahrzeuge_frei_(600x600),_StVO_2019.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '"Kfz-Verkehr frei"',
    redirects: [
      { from: '"Kraftfahrzeuge-frei"', to: '"Kfz-Verkehr frei"' },
      { from: '"KFZ frei"', to: '"Kfz-Verkehr frei"' },
      { from: 'Kraftfahrzeuge-frei', to: '"Kfz-Verkehr frei"' },
      { from: 'KFZ frei', to: '"Kfz-Verkehr frei"' },
    ],
    signId: '"Kfz-Verkehr frei"',
    name: 'Zusatzzeichen "Kfz-Verkehr frei"',
    descriptiveName: 'Kfz-Verkehr frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'motor_vehicle', value: 'yes' }],
    },
    comments: [
      {
        comment: 'Dieses Schild ist nicht Teil des offiziellen Verkehrszeichenkataloges.',
      },
    ],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_KFZ_frei.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1022-12',
    signId: '1022-12',
    name: 'Zusatzzeichen 1022-12',
    descriptiveName: 'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'motorcycle', value: 'yes' },
        { key: 'mofa', value: 'yes' },
        { key: 'moped', value: 'yes' },
      ],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-12_-_Kraftr%C3%A4der_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas_frei_(600x450),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1024-10',
    signId: '1024-10',
    name: 'Zusatzzeichen 1024-10',
    descriptiveName: 'Personenkraftwagen frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'motorcar', value: 'yes' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Zeichen 1024-10 (PKW frei) stimmt eigentlich nicht mit [Tag:motorcar=yes] überein, was sonst für "Kraftwagen und sonstige mehrspurige Kraftfahrzeuge" (inkl. LKW, Bus) genutzt wird. Zur Zeit gibt es aber noch keine bessere Alternative.',
      },
    ],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1024-12',
    signId: '1024-12',
    name: 'Zusatzzeichen 1024-12',
    descriptiveName: 'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t… frei',
    description:
      'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse frei (zulässiges Gewicht, nicht das tatsächliche Gewicht)',
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'hgv', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_über_3,5_t,_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1024-14',
    signId: '1024-14',
    name: 'Zusatzzeichen 1024-14',
    descriptiveName: 'Kraftomnibus frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'bus', value: 'yes' },
        { key: 'tourist_bus', value: 'yes' },
      ],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1024-16',
    signId: '1024-16',
    name: 'Zusatzzeichen 1024-16',
    descriptiveName: 'Straßenbahn frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      modifierValue: 'tram',
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_1024-16_-_Straßenbahn_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1024-17',
    signId: '1024-17',
    name: 'Zusatzzeichen 1024-17',
    descriptiveName: 'Kraftfahrzeuge und Züge … frei',
    description:
      'Kraftfahrzeuge und Züge, die nicht schneller als 25 km/h fahren können oder dürfen frei (im Gegensatz zu "landwirtschaftlicher Verkehr" handelt es sich hier um eine Fahrzeugklasse)',
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['track'],
      accessTags: [{ key: 'agricultural', value: 'yes' }],
    },
    comments: [
      {
        comment:
          'Aufgrund von Zusatzzeichen 1024-17 eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Züge,_die_nicht_schneller_als_25_km-h_fahren_k%C3%B6nnen_oder_dürfen,_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-30',
    signId: '1026-30',
    name: 'Zusatzzeichen 1026-30',
    descriptiveName: 'Taxi frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'taxi', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-32',
    signId: '1026-32',
    name: 'Zusatzzeichen 1026-32',
    descriptiveName: 'Linienverkehr frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'bus', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-35',
    signId: '1026-35',
    name: 'Zusatzzeichen 1026-35',
    descriptiveName: 'Lieferverkehr frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      modifierValue: 'delivery',
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-36',
    signId: '1026-36',
    name: 'Zusatzzeichen 1026-36',
    descriptiveName: 'Landwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['track'],
      modifierValue: 'agricultural',
      uniqueTags: [],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Aufgrund von "Landwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1020-13',
    signId: '1020-13',
    name: 'Zusatzzeichen 1020-13',
    descriptiveName: 'Inline Skater frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'inline_skates', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-13_-_Inline-Skaten_und_Rollschuhfahren_frei,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1020-32',
    signId: '1020-32',
    name: 'Zusatzzeichen 1020-32',
    descriptiveName: 'Bewohner mit Parkausweis Nr. … frei',
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
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1020-32_-_Bewohner_mit_Parkausweis_Nr._..._frei,_StVO_2002.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-33',
    signId: '1026-33',
    name: 'Zusatzzeichen 1026-33',
    descriptiveName: 'Einsatzfahrzeuge frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'emergency', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-33_-_Einsatzfahrzeuge_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-37',
    signId: '1026-37',
    name: 'Zusatzzeichen 1026-37',
    descriptiveName: 'Forstwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['track'],
      modifierValue: 'forestry',
      uniqueTags: [],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Aufgrund von "Forstwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-38',
    signId: '1026-38',
    name: 'Zusatzzeichen 1026-38',
    descriptiveName: 'Land- und forstwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: ['track'],
      modifierValue: 'agricultural;forestry',
      uniqueTags: [],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Aufgrund von "Land- und forstwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1026-39',
    signId: '1026-39',
    name: 'Zusatzzeichen 1026-39',
    descriptiveName: 'Betriebs- und Versorgungsfahrzeuge frei',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      highwayValues: [],
      modifierValue: 'private;delivery',
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-39_-_Betriebs-_und_Versorgungsdienst_frei_(330x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '1012-32',
    signId: '1012-32',
    name: 'Zusatzzeichen 1012-32',
    descriptiveName: 'Radfahrer absteigen',
    description: null,
    kind: 'exception_modifier',
    tagRecommendations: {
      uniqueTags: [{ key: 'bicycle', value: 'dismount' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'exception_modifier',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_1012-32_-_Radfahrer_absteigen_(420x231),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
]
