const newData = [
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
    catalogue: {
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_237_-_Sonderweg_Radfahrer,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_237_-_Sonderweg_Radfahrer,_StVO_1992.svg',
      licence: 'Public Domain',
    },
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
      svgPath: '/trafficSignsSvgs/Zeichen_238_-_Sonderweg_Reiter,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_238_-_Sonderweg_Reiter,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '239',
      signId: '239',
      name: 'Zeichen 239',
      descriptiveName: 'Fußgänger',
      description: null,
      osmTags: {
        highway: 'footway',
        foot: 'designated',
      },
      impliedKey: 'access',
      mostUsed: true,
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_239_-_Sonderweg_Fußgänger,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_239_-_Sonderweg_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
        licence: 'Public Domain',
      },
      identifyingTags: {
        highway: 'footway',
        foot: 'designated',
      },
    },
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
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_239_-_Sonderweg_Fußgänger,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_239_-_Sonderweg_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
      licence: 'Public Domain',
    },
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
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Manchmal wird auch [Tag:highway=cycleway] genutzt (siehe <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Entscheidungshilfe_zwischen_footway.2C_cycleway_und_path">Kontroversen</a>). Auch beachten: <a href="https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren#Stra.C3.9Fenbegleitende_Wege">Straßenbegleitende Wege</a>.',
      },
    ],
    catalogue: {
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_240_-_Gemeinsamer_Fuß-_und_Radweg,_StVO_1992.svg',
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
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_241-30_-_getrennter_Rad-_und_Fußweg,_StVO_1992.svg',
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
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_241-31_-_getrennter_Fuß-_und_Radweg,_StVO_1992.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_242.1_-_Beginn_einer_Fußgängerzone,_StVO_2009.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_242.1_-_Beginn_einer_Fu%C3%9Fg%C3%A4ngerzone,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '244.1',
    signId: '244.1',
    name: 'Zeichen 244.1',
    descriptiveName: 'Fahrradstraße',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['cycleway'],
      uniqueTags: [
        { key: 'bicycle_road', value: 'yes' },
        { key: 'bicycle', value: 'designated' },
        { key: 'maxspeed', value: '30' },
        { key: 'source:maxspeed', value: 'DE:bicycle_road' },
      ],
    },
    comments: [
      {
        tagReference: 'highway=cycleway',
        comment:
          'Die Straßenklasse ist nach ihrer Verkehrsbedeutung auszuwählen. Siehe auch [Wiki Fahrradstraßen](https://wiki.openstreetmap.org/wiki/DE:Tag:bicycle_road%3Dyes)',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_244.1_-_Beginn_einer_Fahrradstraße,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_244.1_-_Beginn_einer_Fahrradstra%C3%9Fe,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '245',
      signId: '245',
      name: 'Zeichen 245',
      descriptiveName: 'Busfahrstreifen',
      description: null,
      restrictionKeys: ['vehicle'],
      osmTags: {
        highway: 'service',
        bus: 'designated',
      },
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '245',
    signId: '245',
    name: 'Zeichen 245',
    descriptiveName: 'Bussonderfahrstreifen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['service', 'busway'],
      uniqueTags: [{ key: 'bus', value: 'designated' }],
      conditionalTag: { key: 'vehicle', value: 'no' },
    },
    comments: [
      {
        // TODO: Hier ist die Aufteilung Centerline / Separate Linie essentiell, da in DE meist über das lane-Schema zu taggen.
        // Siehe auch https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland
        // tagReference: 'UNKOWN',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_245_-_Bussonderfahrstreifen,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '325.1',
    signId: '325.1',
    name: 'Zeichen 325.1',
    descriptiveName: 'Verkehrsberuhigter Bereich',
    description: '(Anfang)',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_325.1_-_Beginn_eines_verkehrsberuhigten_Bereichs,_StVO_2009.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_325.1_-_Beginn_eines_verkehrsberuhigten_Bereichs,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '250',
    signId: '250',
    name: 'Zeichen 250',
    descriptiveName: 'Verbot für Fahrzeuge aller Art',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'vehicle', value: 'no' },
    },
    comments: [],
    catalogue: {
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_250_-_Verbot_für_Fahrzeuge_aller_Art,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_250_-_Verbot_f%C3%BCr_Fahrzeuge_aller_Art,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '260',
    signId: '260',
    name: 'Zeichen 260',
    descriptiveName: null,
    description:
      'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'motor_vehicle', value: 'no' },
    },
    comments: [],
    catalogue: {
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_260_-_Verbot_für_Krafträder_und_Mofas_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_260_-_Verbot_f%C3%BCr_Kraftr%C3%A4der_und_Mofas_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '251',
    signId: '251',
    name: 'Zeichen 251',
    descriptiveName: null,
    description: 'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'motorcar', value: 'no' },
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_251_-_Verbot_für_Kraftwagen_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_251_-_Verbot_f%C3%BCr_Kraftwagen_und_sonstige_mehrspurige_Kraftfahrzeuge,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '253',
    signId: '253',
    name: 'Zeichen 253',
    descriptiveName: null,
    description:
      'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger, und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'hgv', value: 'no' },
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_253_-_Verbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_253_-_Verbot_f%C3%BCr_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht,_StVO_1992.svg',
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
      accessTag: { key: 'bicycle', value: 'no' },
    },
    comments: [],
    catalogue: {
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_254_-_Verbot_für_Radfahrer,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_254_-_Verbot_f%C3%BCr_Radfahrer,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '255',
    signId: '255',
    name: 'Zeichen 255',
    descriptiveName: null,
    description: 'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'motorcycle', value: 'no' },
        { key: 'moped', value: 'no' },
        { key: 'mofa', value: 'no' },
      ],
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_255_-_Verbot_für_Krafträder,_auch_mit_Beiwagen,_Kleinkrafträder_und_Mofas,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_255_-_Verbot_f%C3%BCr_Kraftr%C3%A4der,_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '257-50',
      signId: '257-50',
      name: 'Zeichen 257-50',
      descriptiveName: 'Verbot für Mofas',
      description: null,
      restrictionKeys: ['mofa'],
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_256_-_Verbot_für_Mofas,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_256_-_Verbot_f%C3%BCr_Mofas,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '257-50',
    signId: '257-50',
    name: 'Zeichen 257-50',
    descriptiveName: 'Verbot für Mofas',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_256_-_Verbot_für_Mofas,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_256_-_Verbot_f%C3%BCr_Mofas,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '257-51',
      signId: '257-51',
      name: 'Zeichen 257-51',
      descriptiveName: 'Verbot für Reiter',
      description: null,
      restrictionKeys: ['horse'],
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_257-51_-_Verbot_für_Reiter,_StVO_2017.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-51_-_Verbot_f%C3%BCr_Reiter,_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '257-51',
    signId: '257-51',
    name: 'Zeichen 257-51',
    descriptiveName: 'Verbot für Reiter',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_257-51_-_Verbot_für_Reiter,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-51_-_Verbot_f%C3%BCr_Reiter,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '257-54',
      signId: '257-54',
      name: 'Zeichen 257-54',
      descriptiveName: 'Verbot für Kraftomnibusse',
      description: null,
      restrictionKeys: ['bus', 'tourist_bus'],
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_257-54_-_Verbot_für_Kraftomnibusse,_StVO_2017.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-54_-_Verbot_f%C3%BCr_Kraftomnibusse,_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '257-54',
    signId: '257-54',
    name: 'Zeichen 257-54',
    descriptiveName: 'Verbot für Kraftomnibusse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_257-54_-_Verbot_für_Kraftomnibusse,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-54_-_Verbot_f%C3%BCr_Kraftomnibusse,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '259',
      signId: '259',
      name: 'Zeichen 259',
      descriptiveName: 'Verbot für Fußgänger',
      description: null,
      restrictionKeys: ['foot'],
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_259_-_Verbot_für_Fußgänger,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_259_-_Verbot_f%C3%BCr_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '259',
    signId: '259',
    name: 'Zeichen 259',
    descriptiveName: 'Verbot für Fußgänger',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_259_-_Verbot_für_Fußgänger,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_259_-_Verbot_f%C3%BCr_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '261',
      signId: '261',
      name: 'Zeichen 261',
      descriptiveName: null,
      description: 'Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern',
      restrictionKeys: ['hazmat'],
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_261_-_Verbot_für_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gefährlichen_Gütern,_StVO_1988.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_261_-_Verbot_f%C3%BCr_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gef%C3%A4hrlichen_G%C3%BCtern,_StVO_1988.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '261',
    signId: '261',
    name: 'Zeichen 261',
    descriptiveName: null,
    description: 'Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern',
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_261_-_Verbot_für_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gefährlichen_Gütern,_StVO_1988.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_261_-_Verbot_f%C3%BCr_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gef%C3%A4hrlichen_G%C3%BCtern,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '262[5.5]',
      signId: '262',
      signValue: '5.5',
      name: 'Zeichen 262',
      descriptiveName: null,
      description: 'Verbot für Fahrzeuge über angegebenem tatsächlichen Gewicht',
      key: 'maxweight',
      osmTags: {
        'source:maxweight': 'sign',
      },
      valuePrompt: {
        prompt: 'Gewicht in Tonnen ohne Einheit',
        defaultValue: '5.5',
        format: 'float',
      },
      impliedKey: 'conditional',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_262_-_Verbot_für_Fahrzeuge_deren_tatsächliches_Gewicht_eine_gewisse_Grenze_überschreitet_(600x600);_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_262_-_Verbot_f%C3%BCr_Fahrzeuge_deren_tats%C3%A4chliches_Gewicht_eine_gewisse_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '262[5.5]',
    signId: '262',
    name: 'Zeichen 262',
    descriptiveName: null,
    description: 'Verbot für Fahrzeuge über angegebenem tatsächlichen Gewicht',
    kind: 'traffic_sign',
    signValue: '5.5',
    valuePrompt: {
      prompt: 'Gewicht in Tonnen ohne Einheit',
      defaultValue: '5.5',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:maxweight', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_262_-_Verbot_für_Fahrzeuge_deren_tatsächliches_Gewicht_eine_gewisse_Grenze_überschreitet_(600x600);_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_262_-_Verbot_f%C3%BCr_Fahrzeuge_deren_tats%C3%A4chliches_Gewicht_eine_gewisse_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '263[8]',
      signId: '263',
      signValue: '8',
      name: 'Zeichen 263',
      descriptiveName: null,
      description: 'Verbot für Fahrzeuge über angegebene tatsächliche Achslast',
      key: 'maxaxleload',
      osmTags: {
        'source:maxaxleload': 'sign',
      },
      valuePrompt: {
        prompt: 'Achslast in Tonnen ohne Einheit',
        defaultValue: '8',
        format: 'float',
      },
      impliedKey: 'conditional',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_263_-_Verbot_für_Fahrzeuge_über_angegebene_tatsächliche_Achslast,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_263_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_tats%C3%A4chliche_Achslast,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '263[8]',
    signId: '263',
    name: 'Zeichen 263',
    descriptiveName: null,
    description: 'Verbot für Fahrzeuge über angegebene tatsächliche Achslast',
    kind: 'traffic_sign',
    signValue: '8',
    valuePrompt: {
      prompt: 'Achslast in Tonnen ohne Einheit',
      defaultValue: '8',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:maxaxleload', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_263_-_Verbot_für_Fahrzeuge_über_angegebene_tatsächliche_Achslast,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_263_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_tats%C3%A4chliche_Achslast,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '264[2]',
      signId: '264',
      signValue: '2',
      name: 'Zeichen 264',
      descriptiveName: null,
      description: 'Verbot für Fahrzeuge über die angegebene Breite einschließlich Ladung',
      key: 'maxwidth',
      osmTags: {
        'source:maxwidth': 'sign',
      },
      valuePrompt: {
        prompt: 'Breite in Metern ohne Einheit',
        defaultValue: '2',
        format: 'float',
      },
      impliedKey: 'conditional',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_264_-_Verbot_für_Fahrzeuge_über_angegebene_Breite_einschließlich_Ladung,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_264_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_Breite_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '264[2]',
    signId: '264',
    name: 'Zeichen 264',
    descriptiveName: null,
    description: 'Verbot für Fahrzeuge über die angegebene Breite einschließlich Ladung',
    kind: 'traffic_sign',
    signValue: '2',
    valuePrompt: {
      prompt: 'Breite in Metern ohne Einheit',
      defaultValue: '2',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:maxwidth', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_264_-_Verbot_für_Fahrzeuge_über_angegebene_Breite_einschließlich_Ladung,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_264_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_Breite_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '265[3.8]',
      signId: '265',
      signValue: '3.8',
      name: 'Zeichen 265',
      descriptiveName: null,
      description: 'Verbot für Fahrzeuge über die angegebene Höhe einschließlich Ladung',
      key: 'maxheight',
      osmTags: {
        'source:maxheight': 'sign',
      },
      valuePrompt: {
        prompt: 'Höhe in Metern ohne Einheit',
        defaultValue: '3.8',
        format: 'float',
      },
      impliedKey: 'conditional',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_265_-_Verbot_für_Fahrzeuge,_deren_tatsächliche_Höhe_einschließlich_Ladung_eine_bestimmte_Grenze_überschreitet_(600x600);_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_265_-_Verbot_f%C3%BCr_Fahrzeuge,_deren_tats%C3%A4chliche_H%C3%B6he_einschlie%C3%9Flich_Ladung_eine_bestimmte_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '265[3.8]',
    signId: '265',
    name: 'Zeichen 265',
    descriptiveName: null,
    description: 'Verbot für Fahrzeuge über die angegebene Höhe einschließlich Ladung',
    kind: 'traffic_sign',
    signValue: '3.8',
    valuePrompt: {
      prompt: 'Höhe in Metern ohne Einheit',
      defaultValue: '3.8',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:maxheight', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_265_-_Verbot_für_Fahrzeuge,_deren_tatsächliche_Höhe_einschließlich_Ladung_eine_bestimmte_Grenze_überschreitet_(600x600);_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_265_-_Verbot_f%C3%BCr_Fahrzeuge,_deren_tats%C3%A4chliche_H%C3%B6he_einschlie%C3%9Flich_Ladung_eine_bestimmte_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '266[10]',
      signId: '266',
      signValue: '10',
      name: 'Zeichen 266',
      descriptiveName: null,
      description: 'Verbot für Fahrzeuge und Züge über angegebene Läge einschließlich Ladung',
      key: 'maxlength',
      osmTags: {
        'source:maxlength': 'sign',
      },
      valuePrompt: {
        prompt: 'Läge in Metern ohne Einheit',
        defaultValue: '10',
        format: 'float',
      },
      impliedKey: 'conditional',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_266_-_Verbot_für_Fahrzeuge_und_Züge_über_angegebene_Länge_einschließlich_Ladung,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_266_-_Verbot_f%C3%BCr_Fahrzeuge_und_Z%C3%BCge_%C3%BCber_angegebene_L%C3%A4nge_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '266[10]',
    signId: '266',
    name: 'Zeichen 266',
    descriptiveName: null,
    description: 'Verbot für Fahrzeuge und Züge über angegebene Läge einschließlich Ladung',
    kind: 'traffic_sign',
    signValue: '10',
    valuePrompt: {
      prompt: 'Läge in Metern ohne Einheit',
      defaultValue: '10',
      format: 'float',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:maxlength', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_266_-_Verbot_für_Fahrzeuge_und_Züge_über_angegebene_Länge_einschließlich_Ladung,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_266_-_Verbot_f%C3%BCr_Fahrzeuge_und_Z%C3%BCge_%C3%BCber_angegebene_L%C3%A4nge_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '269',
      signId: '269',
      name: 'Zeichen 269',
      descriptiveName: 'Verbot für Fahrzeuge mit wassergefährdender Ladung',
      description: null,
      restrictionKeys: ['hazmat:water'],
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_269_-_Verbot_für_Fahrzeuge_mit_wassergefährdender_Ladung,_StVO_1988.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_269_-_Verbot_f%C3%BCr_Fahrzeuge_mit_wassergef%C3%A4hrdender_Ladung,_StVO_1988.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '269',
    signId: '269',
    name: 'Zeichen 269',
    descriptiveName: 'Verbot für Fahrzeuge mit wassergefährdender Ladung',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_269_-_Verbot_für_Fahrzeuge_mit_wassergefährdender_Ladung,_StVO_1988.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_269_-_Verbot_f%C3%BCr_Fahrzeuge_mit_wassergef%C3%A4hrdender_Ladung,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '274[60]',
      signId: '274',
      signValue: '60',
      name: 'Zeichen 274',
      descriptiveName: 'Zulässige Höchstgeschwindigkeit',
      description: null,
      key: 'maxspeed',
      osmTags: {
        'source:maxspeed': 'sign',
      },
      valuePrompt: {
        prompt: 'Geschwindigkeit in km/h ohne Einheit',
        defaultValue: '60',
        format: 'integer',
      },
      mostUsed: true,
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_274-60_-_Zulässige_Höchstgeschwindigkeit,_StVO_2017.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_274-60_-_Zul%C3%A4ssige_H%C3%B6chstgeschwindigkeit,_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '274[60]',
    signId: '274',
    name: 'Zeichen 274',
    descriptiveName: 'Zulässige Höchstgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    signValue: '60',
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '60',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:maxspeed', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      mostUsed: true,
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_274-60_-_Zulässige_Höchstgeschwindigkeit,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274-60_-_Zul%C3%A4ssige_H%C3%B6chstgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '275[30]',
      signId: '275',
      signValue: '30',
      name: 'Zeichen 275',
      descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
      description: null,
      key: 'minspeed',
      osmTags: {
        'source:minspeed': 'sign',
      },
      tagsComment:
        'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.',
      valuePrompt: {
        prompt: 'Geschwindigkeit in km/h ohne Einheit',
        defaultValue: '30',
        format: 'integer',
      },
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '275[30]',
    signId: '275',
    name: 'Zeichen 275',
    descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    signValue: '30',
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '30',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Dieses Verkehrszeichen wird nur außerhalb geschlossener Ortschaften fahrstreifenbezogen, niemals aber auf dem rechten von mehreren Fahrstreifen, angeordnet. Die Geschwindigkeit pro Fahrstreifen wird bspw. mit `minspeed:lanes=80|50|` (siehe [Key:minspeed]) angegeben.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_275_-_Vorgeschriebene_Mindestgeschwindigkeit,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '276',
      signId: '276',
      name: 'Zeichen 276',
      descriptiveName: 'Überholverbot für Kraftfahrzeuge aller Art',
      description: null,
      osmTags: {
        overtaking: 'no',
      },
      tagsComment:
        'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking=forward/backward] entsprechend der Wegrichtung.',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_276_-_Überholverbot_für_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_276_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '276',
    signId: '276',
    name: 'Zeichen 276',
    descriptiveName: 'Überholverbot für Kraftfahrzeuge aller Art',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'overtaking', value: 'no' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking=forward/backward] entsprechend der Wegrichtung.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_276_-_Überholverbot_für_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_276_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '277',
      signId: '277',
      name: 'Zeichen 277',
      descriptiveName: 'Überholverbot für Kraftfahrzeuge über 3,5 t',
      description: null,
      osmTags: {
        'overtaking:hgv': 'no',
      },
      tagsComment:
        'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking:hgv=forward/backward] entsprechend der Wegrichtung.',
      category: 'traffic_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '277',
    signId: '277',
    name: 'Zeichen 277',
    descriptiveName: 'Überholverbot für Kraftfahrzeuge über 3,5 t',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'overtaking:hgv', value: 'no' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Wenn Überholen in eine Richtung erlaubt: [Tag:overtaking:hgv=forward/backward] entsprechend der Wegrichtung.',
      },
    ],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '354',
      signId: '354',
      name: 'Zeichen 354',
      descriptiveName: 'Wasserschutzgebiet',
      description: null,
      osmTags: {
        'hazmat:water': 'permissive',
      },
      category: 'traffic_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '354',
    signId: '354',
    name: 'Zeichen 354',
    descriptiveName: 'Wasserschutzgebiet',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'hazmat:water', value: 'permissive' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_354_-_Wasserschutzgebiet,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1020-12',
      signId: '1020-12',
      name: 'Zusatzzeichen 1020-12',
      descriptiveName: 'Radfahrer und Anlieger frei',
      description: 'Anlieger im Sinne von Bewohner',
      restrictionValue: 'destination',
      osmTags: {
        bicycle: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1020-12',
    signId: '1020-12',
    name: 'Zusatzzeichen 1020-12',
    descriptiveName: 'Radfahrer und Anlieger frei',
    description: 'Anlieger im Sinne von Bewohner',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'bicycle', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-12_-_Radfahrer_und_Anlieger_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1020-30',
      signId: '1020-30',
      name: 'Zusatzzeichen 1020-30',
      descriptiveName: 'Anlieger frei (Anlieger im Sinne von Bewohner)',
      description: null,
      restrictionValue: 'destination',
      validations: {
        requiredKey: 'highway',
      },
      tagsComment:
        'Aufgrund von "Anlieger frei" eventuell als [Tag:highway=residential] oder <code>service</code> einzustufen.',
      mostUsed: true,
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1020-30',
    signId: '1020-30',
    name: 'Zusatzzeichen 1020-30',
    descriptiveName: 'Anlieger frei (Anlieger im Sinne von Bewohner)',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Aufgrund von "Anlieger frei" eventuell als [Tag:highway=residential] oder <code>service</code> einzustufen.',
      },
    ],
    TODOVALIDATION: {
      requiredKey: 'highway',
    },
    catalogue: {
      mostUsed: true,
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-30_-_Anlieger_frei_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1022-10',
      signId: '1022-10',
      name: 'Zusatzzeichen 1022-10',
      descriptiveName: 'Radfahrer frei',
      description: null,
      osmTags: {
        bicycle: 'yes',
      },
      mostUsed: true,
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1022-10',
    signId: '1022-10',
    name: 'Zusatzzeichen 1022-10',
    descriptiveName: 'Radfahrer frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'bicycle', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      mostUsed: true,
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-10_-_Radfahrer_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1022-11',
      signId: '1022-11',
      name: 'Zusatzzeichen 1022-11',
      descriptiveName: 'Mofas frei',
      description: null,
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
        licence: 'Public Domain',
      },
      osmTags: {
        mofa: 'yes',
      },
      category: 'modifier_sign',
    },
    osmValuePart: '1022-11',
    signId: '1022-11',
    name: 'Zusatzzeichen 1022-11',
    descriptiveName: 'Mofas frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'mofa', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-11_-_Mofas_frei_(600x450),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1022-12',
      signId: '1022-12',
      name: 'Zusatzzeichen 1022-12',
      descriptiveName: 'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
      description: null,
      osmTags: {
        motorcycle: 'yes',
        mofa: 'yes',
        moped: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1022-12_-_Krafträder_auch_mit_Beiwagen,_Kleinkrafträder_und_Mofas_frei_(600x450),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-12_-_Kraftr%C3%A4der_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas_frei_(600x450),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1022-12',
    signId: '1022-12',
    name: 'Zusatzzeichen 1022-12',
    descriptiveName: 'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [
        { key: 'motorcycle', value: 'yes' },
        { key: 'mofa', value: 'yes' },
        { key: 'moped', value: 'yes' },
      ],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1022-12_-_Krafträder_auch_mit_Beiwagen,_Kleinkrafträder_und_Mofas_frei_(600x450),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1022-12_-_Kraftr%C3%A4der_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas_frei_(600x450),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1024-10',
      signId: '1024-10',
      name: 'Zusatzzeichen 1024-10',
      descriptiveName: 'Personenkraftwagen frei',
      description: null,
      osmTags: {
        motorcar: 'yes',
      },
      tagsComment:
        'Zeichen 1024-10 (PKW frei) stimmt eigentlich nicht mit [Tag:motorcar=yes] überein, was sonst für "Kraftwagen und sonstige mehrspurige Kraftfahrzeuge" (inkl. LKW, Bus) genutzt wird. Zur Zeit gibt es aber noch keine bessere Alternative.',
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1024-10',
    signId: '1024-10',
    name: 'Zusatzzeichen 1024-10',
    descriptiveName: 'Personenkraftwagen frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'motorcar', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Zeichen 1024-10 (PKW frei) stimmt eigentlich nicht mit [Tag:motorcar=yes] überein, was sonst für "Kraftwagen und sonstige mehrspurige Kraftfahrzeuge" (inkl. LKW, Bus) genutzt wird. Zur Zeit gibt es aber noch keine bessere Alternative.',
      },
    ],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-10_-_Personenkraftwagen_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1024-12',
      signId: '1024-12',
      name: 'Zusatzzeichen 1024-12',
      descriptiveName: null,
      description:
        'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse frei (zulässiges Gewicht, nicht das tatsächliche Gewicht)',
      key: 'hgv',
      value: 'yes',
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_3,5_t,_einschließlich_ihrer_Anhänger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_%C3%BCber_3,5_t,_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1024-12',
    signId: '1024-12',
    name: 'Zusatzzeichen 1024-12',
    descriptiveName: null,
    description:
      'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse frei (zulässiges Gewicht, nicht das tatsächliche Gewicht)',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'yes',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_3,5_t,_einschließlich_ihrer_Anhänger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-12_-_Kraftfahrzeuge_mit_einem_zul%C3%A4ssigen_Gesamtgewicht_%C3%BCber_3,5_t,_einschlie%C3%9Flich_ihrer_Anh%C3%A4nger_und_Zugmaschinen,_ausgenommen_Personenkraftwagen_und_Kraftomnibusse_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1024-14',
      signId: '1024-14',
      name: 'Zusatzzeichen 1024-14',
      descriptiveName: 'Kraftomnibus frei',
      description: null,
      osmTags: {
        bus: 'yes',
        tourist_bus: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1024-14',
    signId: '1024-14',
    name: 'Zusatzzeichen 1024-14',
    descriptiveName: 'Kraftomnibus frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [
        { key: 'bus', value: 'yes' },
        { key: 'tourist_bus', value: 'yes' },
      ],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-14_-_Kraftomnibusse_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1024-17',
      signId: '1024-17',
      name: 'Zusatzzeichen 1024-17',
      descriptiveName: null,
      description:
        'Kraftfahrzeuge und Züge, die nicht schneller als 25 km/h fahren können oder dürfen frei (im Gegensatz zu "landwirtschaftlicher Verkehr" handelt es sich hier um eine Fahrzeugklasse)',
      osmTags: {
        agricultural: 'yes',
      },
      tagsComment:
        'Aufgrund von Zusatzzeichen 1024-17 eventuell als [Tag:highway=track] einzustufen.',
      validations: {
        requiredKey: 'highway',
        shouldBeHighwayValue: 'track',
      },
      mostUsed: true,
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Züge,_die_nicht_schneller_als_25_km-h_fahren_können_oder_dürfen,_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Z%C3%BCge,_die_nicht_schneller_als_25_km-h_fahren_k%C3%B6nnen_oder_d%C3%BCrfen,_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1024-17',
    signId: '1024-17',
    name: 'Zusatzzeichen 1024-17',
    descriptiveName: null,
    description:
      'Kraftfahrzeuge und Züge, die nicht schneller als 25 km/h fahren können oder dürfen frei (im Gegensatz zu "landwirtschaftlicher Verkehr" handelt es sich hier um eine Fahrzeugklasse)',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'agricultural', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Aufgrund von Zusatzzeichen 1024-17 eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    TODOVALIDATION: {
      requiredKey: 'highway',
      shouldBeHighwayValue: 'track',
    },
    catalogue: {
      mostUsed: true,
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Züge,_die_nicht_schneller_als_25_km-h_fahren_können_oder_dürfen,_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1024-17_-_Kraftfahrzeuge_und_Z%C3%BCge,_die_nicht_schneller_als_25_km-h_fahren_k%C3%B6nnen_oder_d%C3%BCrfen,_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-30',
      signId: '1026-30',
      name: 'Zusatzzeichen 1026-30',
      descriptiveName: 'Taxi frei',
      description: null,
      osmTags: {
        taxi: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-30',
    signId: '1026-30',
    name: 'Zusatzzeichen 1026-30',
    descriptiveName: 'Taxi frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'taxi', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-30_-_Taxi_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-32',
      signId: '1026-32',
      name: 'Zusatzzeichen 1026-32',
      descriptiveName: 'Linienverkehr frei',
      description: "'psv' steht für 'Public Service Vehicle', also 'öffentliches Verkehrsmittel'",
      osmTags: {
        bus: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-32',
    signId: '1026-32',
    name: 'Zusatzzeichen 1026-32',
    descriptiveName: 'Linienverkehr frei',
    description: "'psv' steht für 'Public Service Vehicle', also 'öffentliches Verkehrsmittel'",
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'bus', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-32_-_Linienverkehr_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-35',
      signId: '1026-35',
      name: 'Zusatzzeichen 1026-35',
      descriptiveName: 'Lieferverkehr frei',
      description: null,
      restrictionValue: 'delivery',
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-35',
    signId: '1026-35',
    name: 'Zusatzzeichen 1026-35',
    descriptiveName: 'Lieferverkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-35_-_Lieferverkehr_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-36',
      signId: '1026-36',
      name: 'Zusatzzeichen 1026-36',
      descriptiveName: 'Landwirtschaftlicher Verkehr frei',
      description: null,
      restrictionValue: 'agricultural',
      tagsComment:
        'Aufgrund von "Landwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      validations: {
        requiredKey: 'highway',
        shouldBeHighwayValue: 'track',
      },
      mostUsed: true,
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-36',
    signId: '1026-36',
    name: 'Zusatzzeichen 1026-36',
    descriptiveName: 'Landwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Aufgrund von "Landwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    TODOVALIDATION: {
      requiredKey: 'highway',
      shouldBeHighwayValue: 'track',
    },
    catalogue: {
      mostUsed: true,
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-36_-_Landwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1020-13',
      signId: '1020-13',
      name: 'Zusatzzeichen 1020-13',
      descriptiveName: 'Inline Skater frei',
      description: null,
      osmTags: {
        inline_skates: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1020-13_-_Inline-Skaten_und_Rollschuhfahren_frei,_StVO_2009.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-13_-_Inline-Skaten_und_Rollschuhfahren_frei,_StVO_2009.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1020-13',
    signId: '1020-13',
    name: 'Zusatzzeichen 1020-13',
    descriptiveName: 'Inline Skater frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'inline_skates', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1020-13_-_Inline-Skaten_und_Rollschuhfahren_frei,_StVO_2009.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1020-13_-_Inline-Skaten_und_Rollschuhfahren_frei,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-33',
      signId: '1026-33',
      name: 'Zusatzzeichen 1026-33',
      descriptiveName: 'Einsatzfahrzeuge frei',
      description: null,
      osmTags: {
        emergency: 'yes',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1026-33_-_Einsatzfahrzeuge_frei_(450x600),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-33_-_Einsatzfahrzeuge_frei_(450x600),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-33',
    signId: '1026-33',
    name: 'Zusatzzeichen 1026-33',
    descriptiveName: 'Einsatzfahrzeuge frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'emergency', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1026-33_-_Einsatzfahrzeuge_frei_(450x600),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-33_-_Einsatzfahrzeuge_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-37',
      signId: '1026-37',
      name: 'Zusatzzeichen 1026-37',
      descriptiveName: 'Forstwirtschaftlicher Verkehr frei',
      description: null,
      restrictionValue: 'forestry',
      tagsComment:
        'Aufgrund von "Forstwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      validations: {
        requiredKey: 'highway',
        shouldBeHighwayValue: 'track',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-37',
    signId: '1026-37',
    name: 'Zusatzzeichen 1026-37',
    descriptiveName: 'Forstwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Aufgrund von "Forstwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    TODOVALIDATION: {
      requiredKey: 'highway',
      shouldBeHighwayValue: 'track',
    },
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-37_-_Forstwirtschaftlicher_Verkehr_frei,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1026-38',
      signId: '1026-38',
      name: 'Zusatzzeichen 1026-38',
      descriptiveName: 'Land- und forstwirtschaftlicher Verkehr frei',
      description: null,
      restrictionValue: 'agricultural;forestry',
      tagsComment:
        'Aufgrund von "Land- und forstwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      validations: {
        requiredKey: 'highway',
        shouldBeHighwayValue: 'track',
      },
      category: 'modifier_sign',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1026-38',
    signId: '1026-38',
    name: 'Zusatzzeichen 1026-38',
    descriptiveName: 'Land- und forstwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Aufgrund von "Land- und forstwirtschaftlicher Verkehr frei" eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    TODOVALIDATION: {
      requiredKey: 'highway',
      shouldBeHighwayValue: 'track',
    },
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1026-38_-_Land-_und_forstwirtschaftlicher_Verkehr_frei_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1040-30[16-18]',
      signId: '1040-30',
      signValue: '16-18',
      name: 'Zusatzzeichen 1040-30',
      descriptiveName: 'Zeitliche Beschräkung',
      description: null,
      valuePrompt: {
        prompt: 'Uhrzeit von-bis',
        defaultValue: '16-18',
        format: 'time_restriction',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1040-30_-_Zeitliche_Beschraenkung_(16_-_18_h),_330x600,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1040-30_-_Zeitliche_Beschr%C3%A4nkung_(16_-_18_h),_330x600,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1040-30[16-18]',
    signId: '1040-30',
    name: 'Zusatzzeichen 1040-30',
    descriptiveName: 'Zeitliche Beschräkung',
    description: null,
    kind: 'modifier_sign',
    signValue: '16-18',
    valuePrompt: {
      prompt: 'Uhrzeit von-bis',
      defaultValue: '16-18',
      format: 'time_restriction',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1040-30_-_Zeitliche_Beschraenkung_(16_-_18_h),_330x600,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1040-30_-_Zeitliche_Beschr%C3%A4nkung_(16_-_18_h),_330x600,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1040-31[08-11,16-18]',
      signId: '1040-31',
      signValue: '08-11,16-18',
      name: 'Zusatzzeichen 1040-31',
      descriptiveName: 'Zeitliche Beschräkung',
      description: null,
      valuePrompt: {
        prompt: 'Uhrzeit von-bis, von-bis',
        defaultValue: '08-11,16-18',
        format: 'opening_hours',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1040-31_-_Zeitliche_Beschraenkung_(8_-_11_h,_16_-_18_h),_330x600,_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1040-31_-_Zeitliche_Beschr%C3%A4nkung_(8_-_11_h,_16_-_18_h),_330x600,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1040-31[08-11,16-18]',
    signId: '1040-31',
    name: 'Zusatzzeichen 1040-31',
    descriptiveName: 'Zeitliche Beschräkung',
    description: null,
    kind: 'modifier_sign',
    signValue: '08-11,16-18',
    valuePrompt: {
      prompt: 'Uhrzeit von-bis, von-bis',
      defaultValue: '08-11,16-18',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1040-31_-_Zeitliche_Beschraenkung_(8_-_11_h,_16_-_18_h),_330x600,_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1040-31_-_Zeitliche_Beschr%C3%A4nkung_(8_-_11_h,_16_-_18_h),_330x600,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-30',
      signId: '1042-30',
      name: 'Zusatzzeichen 1042-30',
      descriptiveName: 'Zeitliche Beschräkung: werktags',
      description: null,
      value: 'Mo-Sa;PH off',
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1042-30_-_werktags_(600x330),_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-30_-_werktags_(600x330),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-30',
    signId: '1042-30',
    name: 'Zusatzzeichen 1042-30',
    descriptiveName: 'Zeitliche Beschräkung: werktags',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'Mo-Sa;PH off',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1042-30_-_werktags_(600x330),_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-30_-_werktags_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-31[Mo-Sa 18-19]',
      signId: '1042-31',
      signValue: 'Mo-Sa 18-19',
      name: 'Zusatzzeichen 1042-31',
      descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis',
      description: null,
      valuePrompt: {
        prompt: 'Werktags, Uhrzeit von-bis',
        defaultValue: 'Mo-Sa 18-19',
        format: 'opening_hours',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1042-31_-_werktags_18_-_19_h_(600x330),_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-31_-_werktags_18_-_19_h_(600x330),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-31[Mo-Sa 18-19]',
    signId: '1042-31',
    name: 'Zusatzzeichen 1042-31',
    descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis',
    description: null,
    kind: 'modifier_sign',
    signValue: 'Mo-Sa 18-19',
    valuePrompt: {
      prompt: 'Werktags, Uhrzeit von-bis',
      defaultValue: 'Mo-Sa 18-19',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1042-31_-_werktags_18_-_19_h_(600x330),_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-31_-_werktags_18_-_19_h_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-32[PH off;Mo-Sa 8:30-11:30,16-18]',
      signId: '1042-32',
      signValue: 'PH off;Mo-Sa 8:30-11:30,16-18',
      name: 'Zusatzzeichen 1042-32',
      descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis, von-bis',
      description: null,
      valuePrompt: {
        prompt: 'Werktags, Uhrzeit von-bis, von-bis',
        defaultValue: 'PH off;Mo-Sa 8:30-11:30,16-18',
        format: 'opening_hours',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1042-32_-_werktags_8.30_-_11.30,_16_-_18_h_(600x450),_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-32_-_werktags_8.30_-_11.30,_16_-_18_h_(600x450),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-32[PH off;Mo-Sa 8:30-11:30,16-18]',
    signId: '1042-32',
    name: 'Zusatzzeichen 1042-32',
    descriptiveName: 'Zeitliche Beschräkung: werktags, von-bis, von-bis',
    description: null,
    kind: 'modifier_sign',
    signValue: 'PH off;Mo-Sa 8:30-11:30,16-18',
    valuePrompt: {
      prompt: 'Werktags, Uhrzeit von-bis, von-bis',
      defaultValue: 'PH off;Mo-Sa 8:30-11:30,16-18',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1042-32_-_werktags_8.30_-_11.30,_16_-_18_h_(600x450),_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-32_-_werktags_8.30_-_11.30,_16_-_18_h_(600x450),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-33[Mo-Fr 16-18]',
      signId: '1042-33',
      signValue: 'Mo-Fr 16-18',
      name: 'Zusatzzeichen 1042-33',
      descriptiveName: 'Zeitliche Beschräkung: Mo-Fr, von-bis',
      description: null,
      valuePrompt: {
        prompt: 'Mo-Fr, Uhrzeit von-bis',
        defaultValue: 'Mo-Fr 16-18',
        format: 'opening_hours',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1042-33_-_Mo_-_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-33_-_Mo_-_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-33[Mo-Fr 16-18]',
    signId: '1042-33',
    name: 'Zusatzzeichen 1042-33',
    descriptiveName: 'Zeitliche Beschräkung: Mo-Fr, von-bis',
    description: null,
    kind: 'modifier_sign',
    signValue: 'Mo-Fr 16-18',
    valuePrompt: {
      prompt: 'Mo-Fr, Uhrzeit von-bis',
      defaultValue: 'Mo-Fr 16-18',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1042-33_-_Mo_-_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-33_-_Mo_-_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-34[Tu,Th,Fr 16-18]',
      signId: '1042-34',
      signValue: 'Tu,Th,Fr 16-18',
      name: 'Zusatzzeichen 1042-34',
      descriptiveName: 'Zeitliche Beschräkung: Di,Do,Fr, von-bis',
      description: null,
      valuePrompt: {
        prompt: 'Tu,Th,Fr, Uhrzeit von-bis',
        defaultValue: 'Tu,Th,Fr 16-18',
        format: 'opening_hours',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1042-34_-_Di,_Do,_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-34_-_Di,_Do,_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-34[Tu,Th,Fr 16-18]',
    signId: '1042-34',
    name: 'Zusatzzeichen 1042-34',
    descriptiveName: 'Zeitliche Beschräkung: Di,Do,Fr, von-bis',
    description: null,
    kind: 'modifier_sign',
    signValue: 'Tu,Th,Fr 16-18',
    valuePrompt: {
      prompt: 'Tu,Th,Fr, Uhrzeit von-bis',
      defaultValue: 'Tu,Th,Fr 16-18',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1042-34_-_Di,_Do,_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-34_-_Di,_Do,_Fr,_16_-_18_h_(600x330),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-35[Su,PH 6-22]',
      signId: '1042-35',
      signValue: 'Su,PH 6-22',
      name: 'Zusatzzeichen 1042-35',
      descriptiveName: 'Zeitliche Beschräkung: So- und Feiertage, von-bis',
      description: null,
      valuePrompt: {
        prompt: 'So- und Feiertage, Uhrzeit von-bis',
        defaultValue: 'Su,PH 6-22',
        format: 'opening_hours',
      },
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1042-35_-_6_-_22_h_an_Sonn-und_Feiertagen_(450x600),_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-35_-_6_-_22_h_an_Sonn-und_Feiertagen_(450x600),_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-35[Su,PH 6-22]',
    signId: '1042-35',
    name: 'Zusatzzeichen 1042-35',
    descriptiveName: 'Zeitliche Beschräkung: So- und Feiertage, von-bis',
    description: null,
    kind: 'modifier_sign',
    signValue: 'Su,PH 6-22',
    valuePrompt: {
      prompt: 'So- und Feiertage, Uhrzeit von-bis',
      defaultValue: 'Su,PH 6-22',
      format: 'opening_hours',
    },
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'REMOVE',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1042-35_-_6_-_22_h_an_Sonn-und_Feiertagen_(450x600),_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-35_-_6_-_22_h_an_Sonn-und_Feiertagen_(450x600),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-38',
      signId: '1042-38',
      name: 'Zusatzzeichen 1042-38',
      descriptiveName: 'Zeitliche Beschräkung: Werktags, außer Samstags',
      description: null,
      value: 'Mo-Fr;PH off',
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1042-38_-_werktags_außer_samstags_(600x330),_StVO_2017.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-38_-_werktags_au%C3%9Fer_samstags_(600x330),_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-38',
    signId: '1042-38',
    name: 'Zusatzzeichen 1042-38',
    descriptiveName: 'Zeitliche Beschräkung: Werktags, außer Samstags',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'Mo-Fr;PH off',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1042-38_-_werktags_außer_samstags_(600x330),_StVO_2017.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-38_-_werktags_au%C3%9Fer_samstags_(600x330),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1042-51',
      signId: '1042-51',
      name: 'Zusatzzeichen 1042-51',
      descriptiveName: 'Zeitliche Beschräkung: Sa und So',
      description: null,
      value: 'Sa,Su',
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1042-51_-_Sa_und_So_(600x330),_StVO_2017.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-51_-_Sa_und_So_(600x330),_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1042-51',
    signId: '1042-51',
    name: 'Zusatzzeichen 1042-51',
    descriptiveName: 'Zeitliche Beschräkung: Sa und So',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'Sa,Su',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1042-51_-_Sa_und_So_(600x330),_StVO_2017.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1042-51_-_Sa_und_So_(600x330),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1053-35',
      signId: '1053-35',
      name: 'Zusatzzeichen 1053-35',
      descriptiveName: 'Beschräkung: bei Nässe',
      description: null,
      value: 'wet',
      conditional: true,
      category: 'modifier_sign_restriction',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1053-35_-_Bei_Naesse_(600x600),_StVO_2017.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1053-35_-_Bei_N%C3%A4sse_(600x600),_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1053-35',
    signId: '1053-35',
    name: 'Zusatzzeichen 1053-35',
    descriptiveName: 'Beschräkung: bei Nässe',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
      conditionalValue: 'wet',
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign_restriction',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1053-35_-_Bei_Naesse_(600x600),_StVO_2017.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zusatzzeichen_1053-35_-_Bei_N%C3%A4sse_(600x600),_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1012-31',
      signId: '1012-31',
      name: 'Zusatzzeichen 1012-31',
      descriptiveName: 'Ende',
      description: null,
      category: 'modifier_sign',
      image: {
        svgPath: '/trafficSignsSvgs/Zusatzzeichen_1012-31_-_Ende_(600x330),_StVO_1992.svg',
        sourceUrl:
          'https://upload.wikimedia.org/wikipedia/commons/2/25/Zusatzzeichen_1012-31_-_Ende_%28600x330%29%2C_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1012-31',
    signId: '1012-31',
    name: 'Zusatzzeichen 1012-31',
    descriptiveName: 'Ende',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zusatzzeichen_1012-31_-_Ende_(600x330),_StVO_1992.svg',
      sourceUrl:
        'https://upload.wikimedia.org/wikipedia/commons/2/25/Zusatzzeichen_1012-31_-_Ende_%28600x330%29%2C_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1000-30',
      signId: '1000-30',
      name: 'Zusatzzeichen 1000-30',
      descriptiveName: 'Beide Richtungen',
      description: 'zwei gegengerichtete waagerechte Pfeile',
      category: 'modifier_sign',
      osmTags: {
        oneway: 'no',
      },
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1000-30',
    signId: '1000-30',
    name: 'Zusatzzeichen 1000-30',
    descriptiveName: 'Beide Richtungen',
    description: 'zwei gegengerichtete waagerechte Pfeile',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'oneway', value: 'no' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1000-31',
      signId: '1000-31',
      name: 'Zusatzzeichen 1000-31',
      descriptiveName: 'Beide Richtungen',
      description: 'zwei gegengerichtete senkrechte Pfeile',
      category: 'modifier_sign',
      osmTags: {
        highway: ['path', 'cycleway'],
        oneway: 'no',
      },
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1000-31_-_beide_Richtungen,_zwei_gegengerichtete_senkrechte_Pfeile,_StVO_1992.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1000-31',
    signId: '1000-31',
    name: 'Zusatzzeichen 1000-31',
    descriptiveName: 'Beide Richtungen',
    description: 'zwei gegengerichtete senkrechte Pfeile',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [
        { key: 'highway', value: ['path', 'cycleway'] },
        { key: 'oneway', value: 'no' },
      ],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1000-31_-_beide_Richtungen,_zwei_gegengerichtete_senkrechte_Pfeile,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-30_-_beide_Richtungen,_zwei_gegengerichtete_waagerechte_Pfeile,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1000-32',
      signId: '1000-32',
      name: 'Zusatzzeichen 1000-32',
      descriptiveName: 'Radverkehr kreuzt von links und rechts',
      description: null,
      category: 'modifier_sign',
      osmTags: {
        highway: ['path', 'cycleway'],
        oneway: 'no',
      },
      tagsComment:
        'Bitte <a href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1000-33">Wiki beachten</a>, das Tool ist hier nicht vollständig.',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1000-32_-_Radfahrer_kreuzen_von_rechts_und_links,_StVO_1997.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-32_-_Radfahrer_kreuzen_von_rechts_und_links,_StVO_1997.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1000-32',
    signId: '1000-32',
    name: 'Zusatzzeichen 1000-32',
    descriptiveName: 'Radverkehr kreuzt von links und rechts',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [
        { key: 'highway', value: ['path', 'cycleway'] },
        { key: 'oneway', value: 'no' },
      ],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Bitte <a href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1000-33">Wiki beachten</a>, das Tool ist hier nicht vollständig.',
      },
    ],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1000-32_-_Radfahrer_kreuzen_von_rechts_und_links,_StVO_1997.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-32_-_Radfahrer_kreuzen_von_rechts_und_links,_StVO_1997.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '1000-33',
      signId: '1000-33',
      name: 'Zusatzzeichen 1000-33',
      descriptiveName: 'Radverkehr im Gegenverkehr',
      description: null,
      category: 'modifier_sign',
      osmTags: {
        cycleway: ['opposite', 'opposite_lane', 'opposite_track '],
      },
      tagsComment:
        'Bitte <a href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1000-33">Wiki beachten</a>, das Tool ist hier nicht vollständig.',
      image: {
        svgPath:
          '/trafficSignsSvgs/Zusatzzeichen_1000-33_-_Radverkehr_im_Gegenverkehr,_StVO_1997.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-33_-_Radverkehr_im_Gegenverkehr,_StVO_1997.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '1000-33',
    signId: '1000-33',
    name: 'Zusatzzeichen 1000-33',
    descriptiveName: 'Radverkehr im Gegenverkehr',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'cycleway', value: ['opposite', 'opposite_lane', 'opposite_track '] }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [
      {
        tagReference: 'UNKOWN',
        comment:
          'Bitte <a href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1000-33">Wiki beachten</a>, das Tool ist hier nicht vollständig.',
      },
    ],
    catalogue: {
      signCategory: 'modifier_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zusatzzeichen_1000-33_-_Radverkehr_im_Gegenverkehr,_StVO_1997.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zusatzzeichen_1000-33_-_Radverkehr_im_Gegenverkehr,_StVO_1997.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '298',
      signId: '298',
      name: 'Zeichen 298',
      descriptiveName: 'Sperrflächen',
      description: null,
      category: 'traffic_sign',
      osmTags: {
        'area:highway': 'prohibited',
      },
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_298_-_Sperrflaechen,_StVO_1970.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zeichen_298_-_Sperrfl%C3%A4chen,_StVO_1970.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '298',
    signId: '298',
    name: 'Zeichen 298',
    descriptiveName: 'Sperrflächen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'area:highway', value: 'prohibited' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_298_-_Sperrflaechen,_StVO_1970.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_298_-_Sperrfl%C3%A4chen,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '299',
      signId: '299',
      name: 'Zeichen 299',
      descriptiveName: 'Sperrflächen',
      description: null,
      category: 'traffic_sign',
      osmTags: {
        'area:highway': 'prohibited',
      },
      image: {
        svgPath:
          '/trafficSignsSvgs/Zeichen_299_-_Grenzmarkierung_fuer_Halt-_und_Parkverbote,_StVO_1992.svg',
        sourceUrl:
          'https://de.wikipedia.org/wiki/Datei:Zeichen_299_-_Grenzmarkierung_f%C3%BCr_Halt-_und_Parkverbote,_StVO_1992.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '299',
    signId: '299',
    name: 'Zeichen 299',
    descriptiveName: 'Sperrflächen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'area:highway', value: 'prohibited' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_299_-_Grenzmarkierung_fuer_Halt-_und_Parkverbote,_StVO_1992.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_299_-_Grenzmarkierung_f%C3%BCr_Halt-_und_Parkverbote,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    TOODORIGINAL: {
      osmValuePart: '220-10',
      signId: '220-10',
      name: 'Zeichen DE:220-10',
      descriptiveName: 'Einbahnstraße – linksweisend',
      description: null,
      category: 'traffic_sign',
      osmTags: {
        oneway: 'yes',
      },
      image: {
        svgPath: '/trafficSignsSvgs/Zeichen_220-10_-_Einbahnstraße,_linksweisend,_StVO_2017.svg',
        sourceUrl:
          'https://wiki.openstreetmap.org/wiki/File:Zeichen_220-10_-_Einbahnstra%C3%9Fe,_linksweisend,_StVO_2017.svg',
        licence: 'Public Domain',
      },
    },
    osmValuePart: '220-10',
    signId: '220-10',
    name: 'Zeichen DE:220-10',
    descriptiveName: 'Einbahnstraße – linksweisend',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTag: { key: 'UNKOWN', value: 'UNKOWN' },
      uniqueTags: [{ key: 'oneway', value: 'yes' }],
      conditionalTag: { key: 'UNKOWN', value: 'UNKOWN' },
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_220-10_-_Einbahnstraße,_linksweisend,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_220-10_-_Einbahnstra%C3%9Fe,_linksweisend,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '220-20',
    signId: '220-20',
    name: 'Zeichen DE:220-20',
    descriptiveName: 'Einbahnstraße – rechtsweisend',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'oneway', value: 'yes' }],
    },
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_220-20_-_Einbahnstraße,_rechtsweisend,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_220-20_-_Einbahnstra%C3%9Fe,_rechtsweisend,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
]
