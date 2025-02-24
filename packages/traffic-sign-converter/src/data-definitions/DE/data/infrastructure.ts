import type { SignType } from '../../TrafficSignDataTypes.js'

export const _infrastructure: SignType[] = [
  {
    osmValuePart: '237',
    signId: '237',
    name: 'Zeichen 237',
    descriptiveName: 'Radweg',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['cycleway'],
      uniqueTags: [{ key: 'bicycle', value: 'designated' }],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
      },
    ],
    compatibility: { incompatibleModifiers: ['1020-12', '1022-10'] },
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_237_-_Sonderweg_Radfahrer,_StVO_1992.svg',
      licence: 'Public Domain',
    },
    identifyingTags: [{ key: 'highway', value: 'cycleway' }],
  },
  {
    osmValuePart: '238',
    signId: '238',
    name: 'Zeichen 238',
    descriptiveName: 'Reitweg',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['bridleway'],
    },
    comments: [
      {
        tagReference: 'highway=bridleway',
        comment:
          'Mit highway=bridleway wird die Benutzungserlaubnis auf Reitende beschränkt, siehe [Default Access Restrictions](https://wiki.openstreetmap.org/wiki/OSM_tags_for_routing/Access-Restrictions#Germany).',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_238_-_Sonderweg_Reiter,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '239',
    signId: '239',
    name: 'Zeichen 239',
    descriptiveName: 'Gehweg',
    description: 'Weg für Fußgänger',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['footway'],
      uniqueTags: [{ key: 'foot', value: 'designated' }],
    },
    comments: [
      {
        tagReference: 'highway=footway',
        comment: 'Ohne Zusatzzeichen sind diese Wege nicht für Radfahrende zugelassen.',
      },
    ],
    questions: [
      {
        question: 'Führung',
        answers: [
          {
            label: 'Straßenbegleitend',
            tags: [{ key: 'footway', value: 'sidewalk' }],
          },
          {
            label: 'Selbstständig geführt',
            tags: [{ key: 'is_sidepath', value: 'no' }],
          },
        ],
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_239_-_Sonderweg_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
      licence: 'Public Domain',
    },
    identifyingTags: [
      { key: 'highway', value: 'footway' },
      { key: 'foot', value: 'designated' },
    ],
  },
  {
    osmValuePart: '240',
    signId: '240',
    name: 'Zeichen 240',
    descriptiveName: 'Gemeinsamer Fuß- und Radweg',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['path'],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'foot', value: 'designated' },
        { key: 'segregated', value: 'no' },
      ],
    },
    comments: [
      {
        tagReference: null,
        comment:
          'Manchmal wird auch [Tag:highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_240_-_Gemeinsamer_Fu%C3%9F-_und_Radweg,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '241-30',
    signId: '241-30',
    name: 'Zeichen 241-30',
    descriptiveName: 'Getrennter Rad- und Gehweg',
    description: 'Radweg links',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'foot', value: 'designated' },
        { key: 'segregated', value: 'yes' },
      ],
    },
    comments: [
      {
        tagReference: 'highway=cycleway',
        comment:
          'Andere Länder haben sich auf ein Tagging mit [Tag:highway=cycleway] geeinigt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>).',
      },
      {
        comment:
          'Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_241-30_-_getrennter_Rad-_und_Fu%C3%9Fweg,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '241-31',
    signId: '241-31',
    name: 'Zeichen 241-31',
    descriptiveName: 'Getrennter Rad- und Gehweg',
    description: 'Radweg rechts',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'foot', value: 'designated' },
        { key: 'segregated', value: 'yes' },
      ],
    },
    comments: [
      {
        tagReference: 'highway=cycleway',
        comment:
          'Andere Länder haben sich auf ein Tagging mit [Tag:highway=cycleway] geeinigt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>).',
      },
      {
        comment:
          'Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_241-31_-_getrennter_Fu%C3%9F-_und_Radweg,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '242.1',
    signId: '242.1',
    name: 'Zeichen 242',
    descriptiveName: 'Fußgängerbereich',
    description: 'Beginn einer Fußgängerzone',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['pedestrian'],
      uniqueTags: [{ key: 'foot', value: 'designated' }],
    },
    comments: [
      {
        tagReference: 'highway=pedestrian',
        comment:
          'Das Verkehrszeichen und die Highway-Klasse werden für alle Straßen in der Zone eingetragen.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_242.1_-_Beginn_einer_Fu%C3%9Fg%C3%A4ngerzone,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '242.2',
    signId: '242.2',
    name: 'Zeichen 242.2',
    descriptiveName: 'Fußgängerzone (Ende)',
    description: 'Ende einer Fußgängerzone',
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
      visibility: 'search_only',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_242.2_-_Ende_einer_Fu%C3%9Fg%C3%A4ngerzone,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '244.1',
    signId: '244.1',
    name: 'Zeichen 244.1',
    descriptiveName: 'Fahrradstraße',
    description: 'Beginn einer Fahrradstraße',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['cycleway', 'residential'],
      accessTags: [{ key: 'vehicle', value: 'no' }],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'bicycle_road', value: 'yes' },
        { key: 'maxspeed', value: '30' }, // TODO Tagging: I remember to not tag `maxspeed` as a value but as a category
        { key: 'source:maxspeed', value: 'DE:bicycle_road' },
      ],
    },
    comments: [
      {
        tagReference: 'highway=*',
        comment:
          'Die Straßenklasse ist nach ihrer Verkehrsbedeutung auszuwählen. Siehe auch [Wiki Fahrradstraßen](https://wiki.openstreetmap.org/wiki/DE:Tag:bicycle_road%3Dyes)',
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_244.1_-_Beginn_einer_Fahrradstra%C3%9Fe,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '244.2',
    signId: '244.2',
    name: 'Zeichen 244.2',
    descriptiveName: 'Fahrradstraße',
    description: 'Ende einer Fahrradstraße',
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: { signCategory: 'traffic_sign', visibility: 'search_only' },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_244.2_-_Ende_einer_Fahrradstra%C3%9Fe,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '244.3',
    signId: '244.3',
    name: 'Zeichen 244.3',
    descriptiveName: 'Fahrradzone',
    description: 'Beginn einer Fahrradzone',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['residential'],
      accessTags: [{ key: 'vehicle', value: 'no' }],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'bicycle_road', value: 'yes' },
        { key: 'maxspeed', value: '30' },
        { key: 'source:maxspeed', value: 'DE:bicycle_zone' },
      ],
    },
    comments: [
      {
        tagReference: 'highway=*',
        comment:
          'Die Straßenklasse ist nach ihrer Verkehrsbedeutung auszuwählen. Siehe auch [Wiki Fahrradstraßen](https://wiki.openstreetmap.org/wiki/DE:Tag:bicycle_road%3Dyes)',
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_244.3_-_Beginn_einer_Fahrradzone,_StVO_2020.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '244.4',
    signId: '244.4',
    name: 'Zeichen 244.4',
    descriptiveName: 'Fahrradzone',
    description: 'Ende einer Fahrradzone',
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: { signCategory: 'traffic_sign', visibility: 'search_only' },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_244.4_-_Ende_einer_Fahrradzone,_StVO_2020.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '325.1',
    signId: '325.1',
    name: 'Zeichen 325.1',
    descriptiveName: 'Verkehrsberuhigter Bereich',
    description: 'Beginn eines verkehrsberuhigten Bereichs',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['living_street'],
    },
    comments: [
      {
        comment:
          'Impliziert [Tag:foot=yes], [Tag:bicycle=yes]. Kein [Key:maxspeed] setzen, siehe [Tag:highway=living_street]. Auch maxspeed-Source-Angaben sind nicht wichtig, da der highway-Tag bereits ausreicht.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_325.1_-_Beginn_eines_verkehrsberuhigten_Bereichs,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '325.2',
    signId: '325.2',
    name: 'Zeichen 325.2',
    descriptiveName: 'Verkehrsberuhigter Bereich (Ende)',
    description: 'Ende eines verkehrsberuhigten Bereichs',
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
      visibility: 'search_only',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_325.2_-_Ende_eines_verkehrsberuhigten_Bereichs,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '245',
    signId: '245',
    name: 'Zeichen 245',
    descriptiveName: 'Bussonderfahrstreifen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['service', 'busway'],
      uniqueTags: [{ key: 'bus', value: 'designated' }],
      conditionalTags: [{ key: 'vehicle', value: 'no' }],
    },
    comments: [
      // TODO: Hier ist die Aufteilung Centerline / Separate Linie essentiell, da in DE meist über das lane-Schema zu taggen.
      // Siehe auch https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland
      // tagReference: null,
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
]
