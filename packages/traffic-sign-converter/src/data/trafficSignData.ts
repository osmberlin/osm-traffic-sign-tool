import type { SignType } from './TrafficSignDataTypes.js'

export const trafficSignData: SignType[] = [
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
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_237_-_Sonderweg_Radfahrer,_StVO_1992.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_238_-_Sonderweg_Reiter,_StVO_1992.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_239_-_Sonderweg_Fußgänger,_StVO_1992.svg',
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
      visibility: 'highlight',
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
      visibility: 'highlight',
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
      svgPath: '/trafficSignsSvgs/Zeichen_244.1_-_Beginn_einer_Fahrradstraße,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_244.1_-_Beginn_einer_Fahrradstra%C3%9Fe,_StVO_2013.svg',
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
      accessTags: [{ key: 'vehicle', value: 'no' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
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
    descriptiveName:
      'Verbot für Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger, und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse',
    description: null,
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
      accessTags: [{ key: 'bicycle', value: 'no' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_255_-_Verbot_für_Krafträder,_auch_mit_Beiwagen,_Kleinkrafträder_und_Mofas,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_255_-_Verbot_f%C3%BCr_Kraftr%C3%A4der,_auch_mit_Beiwagen,_Kleinkraftr%C3%A4der_und_Mofas,_StVO_1992.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_256_-_Verbot_für_Mofas,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_256_-_Verbot_f%C3%BCr_Mofas,_StVO_1992.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_257-51_-_Verbot_für_Reiter,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-51_-_Verbot_f%C3%BCr_Reiter,_StVO_2017.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_257-54_-_Verbot_für_Kraftomnibusse,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_257-54_-_Verbot_f%C3%BCr_Kraftomnibusse,_StVO_2017.svg',
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
      svgPath: '/trafficSignsSvgs/Zeichen_259_-_Verbot_für_Fußgänger,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_259_-_Verbot_f%C3%BCr_Fu%C3%9Fg%C3%A4nger,_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_261_-_Verbot_für_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gefährlichen_Gütern,_StVO_1988.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_261_-_Verbot_f%C3%BCr_kennzeichnungspflichtige_Kraftfahrzeuge_mit_gef%C3%A4hrlichen_G%C3%BCtern,_StVO_1988.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_262_-_Verbot_für_Fahrzeuge_deren_tatsächliches_Gewicht_eine_gewisse_Grenze_überschreitet_(600x600);_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_262_-_Verbot_f%C3%BCr_Fahrzeuge_deren_tats%C3%A4chliches_Gewicht_eine_gewisse_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_263_-_Verbot_für_Fahrzeuge_über_angegebene_tatsächliche_Achslast,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_263_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_tats%C3%A4chliche_Achslast,_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_264_-_Verbot_für_Fahrzeuge_über_angegebene_Breite_einschließlich_Ladung,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_264_-_Verbot_f%C3%BCr_Fahrzeuge_%C3%BCber_angegebene_Breite_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_265_-_Verbot_für_Fahrzeuge,_deren_tatsächliche_Höhe_einschließlich_Ladung_eine_bestimmte_Grenze_überschreitet_(600x600);_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_265_-_Verbot_f%C3%BCr_Fahrzeuge,_deren_tats%C3%A4chliche_H%C3%B6he_einschlie%C3%9Flich_Ladung_eine_bestimmte_Grenze_%C3%BCberschreitet_(600x600);_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_266_-_Verbot_für_Fahrzeuge_und_Züge_über_angegebene_Länge_einschließlich_Ladung,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_266_-_Verbot_f%C3%BCr_Fahrzeuge_und_Z%C3%BCge_%C3%BCber_angegebene_L%C3%A4nge_einschlie%C3%9Flich_Ladung,_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_269_-_Verbot_für_Fahrzeuge_mit_wassergefährdender_Ladung,_StVO_1988.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_269_-_Verbot_f%C3%BCr_Fahrzeuge_mit_wassergef%C3%A4hrdender_Ladung,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '274.1[30]',
    signId: '274.1',
    name: 'Zeichen 274.1',
    descriptiveName: 'Tempo 30-Zone',
    description: '(Anhang)',
    kind: 'traffic_sign',
    signValue: 30,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '30',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [
        { key: 'source:maxspeed', value: 'DE:zone' },
        { key: 'zone:maxspeed', valueTemplate: 'DE:$' },
      ],
      conditionalTags: [{ key: 'maxspeed', value: '30' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_274.1_-_Beginn_einer_Tempo_30-Zone,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274.1_-_Beginn_einer_Tempo_30-Zone,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '274.2[30]',
    signId: '274.2',
    name: 'Zeichen 274.2',
    descriptiveName: 'Ende einer Tempo 30-Zone',
    description: '(Ende)',
    kind: 'traffic_sign',
    signValue: 30,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '30',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      conditionalTags: [],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_274.2_-_Ende_einer_Tempo_30-Zone_(einseitig),_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274.2_-_Ende_einer_Tempo_30-Zone_(einseitig),_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '274[60]',
    signId: '274',
    name: 'Zeichen 274',
    descriptiveName: 'Zulässige Höchstgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    signValue: 60,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '60',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxspeed', value: 'sign' }],
      conditionalTags: [{ key: 'maxspeed', value: '60' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
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
    osmValuePart: '274[70]',
    signId: '274',
    name: 'Zeichen 274',
    descriptiveName: 'Zulässige Höchstgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    signValue: 70,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '70',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:maxspeed', value: 'sign' }],
      conditionalTags: [{ key: 'maxspeed', value: '70' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_274-70_-_Zulaessige_Hoechstgeschwindigkeit,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_274-70_-_Zul%C3%A4ssige_H%C3%B6chstgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '275[30]',
    signId: '275',
    name: 'Zeichen 275',
    descriptiveName: 'Vorgeschriebene Mindestgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    signValue: 30,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '30',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'source:minspeed', value: 'sign' }],
      conditionalTags: [{ key: 'minspeed', value: '30' }],
    },
    comments: [
      {
        tagReference: null,
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
    osmValuePart: '278[10]',
    signId: '278',
    name: 'Zeichen 278',
    descriptiveName: 'Ende der zulässigen Höchstgeschwindigkeit',
    description: null,
    kind: 'traffic_sign',
    signValue: 10,
    valuePrompt: {
      prompt: 'Geschwindigkeit in km/h ohne Einheit',
      defaultValue: '10',
      format: 'integer',
    },
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
      conditionalTags: [],
    },
    comments: [],
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_278-10_-_Ende_der_zulässigen_Höchstgeschwindigkeit,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_278-10_-_Ende_der_zul%C3%A4ssigen_H%C3%B6chstgeschwindigkeit,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_276_-_Überholverbot_für_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_276_-_%C3%9Cberholverbot_f%C3%BCr_Kraftfahrzeuge_aller_Art,_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_277_-_Überholverbot_für_Kraftfahrzeuge_mit_einem_zulässigen_Gesamtgewicht_über_2,8_t,_einschließlich_ihrer_Anhänger,_StVO_1992.svg',
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
      svgPath:
        '/trafficSignsSvgs/Zeichen_277.1_-_Verbot_des_Ueberholens_von_einspurigen_Fahrzeugen_fuer_mehrspurige_Kraftfahrzeuge_und_Kraftraedern_mit_Beiwagen;_StVO_2020.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_277.1_-_Verbot_des_%C3%9Cberholens_von_einspurigen_Fahrzeugen_f%C3%BCr_mehrspurige_Kraftfahrzeuge_und_Kraftr%C3%A4dern_mit_Beiwagen;_StVO_2020.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '354',
    signId: '354',
    name: 'Zeichen 354',
    descriptiveName: 'Wasserschutzgebiet',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'hazmat:water', value: 'permissive' }],
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
    osmValuePart: '1020-12',
    signId: '1020-12',
    name: 'Zusatzzeichen 1020-12',
    descriptiveName: 'Radfahrer und Anlieger frei',
    description: 'Anlieger im Sinne von Bewohner',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'bicycle', value: 'yes' }],
      conditionalValue: 'destination',
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
    osmValuePart: '1020-30',
    signId: '1020-30',
    name: 'Zusatzzeichen 1020-30',
    descriptiveName: 'Anlieger frei',
    description: 'Anlieger im Sinne von Bewohner und Lieferverkehr',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['residential', 'service'],
      accessValue: 'destination',
    },
    comments: [
      {
        tagReference: 'highway=*',
        comment:
          'Aufgrund von "Anlieger frei" eventuell als [Tag:highway=residential] oder <code>service</code> einzustufen.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
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
    osmValuePart: '1022-10',
    signId: '1022-10',
    name: 'Zusatzzeichen 1022-10',
    descriptiveName: 'Radfahrer frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['footway'],
      uniqueTags: [{ key: 'bicycle', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      visibility: 'highlight',
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
    osmValuePart: '1022-11',
    signId: '1022-11',
    name: 'Zusatzzeichen 1022-11',
    descriptiveName: 'Mofas frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'mofa', value: 'yes' }],
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
    osmValuePart: '1022-12',
    signId: '1022-12',
    name: 'Zusatzzeichen 1022-12',
    descriptiveName: 'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
    description: null,
    kind: 'modifier_sign',
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
    osmValuePart: '1024-10',
    signId: '1024-10',
    name: 'Zusatzzeichen 1024-10',
    descriptiveName: 'Personenkraftwagen frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'motorcar', value: 'yes' }],
    },
    comments: [
      {
        tagReference: null,
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
    osmValuePart: '1024-12',
    signId: '1024-12',
    name: 'Zusatzzeichen 1024-12',
    descriptiveName: 'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t…',
    description:
      'Kraftfahrzeuge mit einem zulässigen Gesamtgewicht über 3,5 t, einschließlich ihrer Anhäger und Zugmaschinen, ausgenommen Personenkraftwagen und Kraftomnibusse frei (zulässiges Gewicht, nicht das tatsächliche Gewicht)',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'hgv', value: 'yes' }],
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
    osmValuePart: '1024-14',
    signId: '1024-14',
    name: 'Zusatzzeichen 1024-14',
    descriptiveName: 'Kraftomnibus frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [
        { key: 'bus', value: 'yes' },
        { key: 'tourist_bus', value: 'yes' },
      ],
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
    osmValuePart: '1024-17',
    signId: '1024-17',
    name: 'Zusatzzeichen 1024-17',
    descriptiveName: 'Kraftfahrzeuge und Züge … frei',
    description:
      'Kraftfahrzeuge und Züge, die nicht schneller als 25 km/h fahren können oder dürfen frei (im Gegensatz zu "landwirtschaftlicher Verkehr" handelt es sich hier um eine Fahrzeugklasse)',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      uniqueTags: [{ key: 'agricultural', value: 'yes' }],
    },
    comments: [
      {
        comment:
          'Aufgrund von Zusatzzeichen 1024-17 eventuell als [Tag:highway=track] einzustufen.',
      },
    ],
    catalogue: {
      visibility: 'highlight',
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
    osmValuePart: '1026-30',
    signId: '1026-30',
    name: 'Zusatzzeichen 1026-30',
    descriptiveName: 'Taxi frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessTags: [{ key: 'taxi', value: 'yes' }],
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
    osmValuePart: '1026-32',
    signId: '1026-32',
    name: 'Zusatzzeichen 1026-32',
    descriptiveName: 'Linienverkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'bus', value: 'yes' }],
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
    osmValuePart: '1026-35',
    signId: '1026-35',
    name: 'Zusatzzeichen 1026-35',
    descriptiveName: 'Lieferverkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      accessValue: 'delivery',
      uniqueTags: [],
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
    osmValuePart: '1026-36',
    signId: '1026-36',
    name: 'Zusatzzeichen 1026-36',
    descriptiveName: 'Landwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessValue: 'agricultural',
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
    osmValuePart: '1020-13',
    signId: '1020-13',
    name: 'Zusatzzeichen 1020-13',
    descriptiveName: 'Inline Skater frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'inline_skates', value: 'yes' }],
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
    osmValuePart: '1026-33',
    signId: '1026-33',
    name: 'Zusatzzeichen 1026-33',
    descriptiveName: 'Einsatzfahrzeuge frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'emergency', value: 'yes' }],
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
    osmValuePart: '1026-37',
    signId: '1026-37',
    name: 'Zusatzzeichen 1026-37',
    descriptiveName: 'Forstwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessValue: 'forestry',
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
    osmValuePart: '1026-38',
    signId: '1026-38',
    name: 'Zusatzzeichen 1026-38',
    descriptiveName: 'Land- und forstwirtschaftlicher Verkehr frei',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['track'],
      accessValue: 'agricultural;forestry',
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
      conditionalValueFromValuePrompt: true,
    },
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
      uniqueTags: [],
      conditionalValueFromValuePrompt: true,
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
    osmValuePart: '1042-30',
    signId: '1042-30',
    name: 'Zusatzzeichen 1042-30',
    descriptiveName: 'Zeitliche Beschräkung: werktags',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      conditionalValue: 'Mo-Sa;PH off',
    },
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
      uniqueTags: [],
      conditionalValueFromValuePrompt: true,
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
      uniqueTags: [],
      conditionalValueFromValuePrompt: true,
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
      uniqueTags: [],
      conditionalValueFromValuePrompt: true,
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
      uniqueTags: [],
      conditionalValueFromValuePrompt: true,
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
      uniqueTags: [],
      conditionalValueFromValuePrompt: true,
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
    osmValuePart: '1042-38',
    signId: '1042-38',
    name: 'Zusatzzeichen 1042-38',
    descriptiveName: 'Zeitliche Beschräkung: Werktags, außer Samstags',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
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
    osmValuePart: '1042-51',
    signId: '1042-51',
    name: 'Zusatzzeichen 1042-51',
    descriptiveName: 'Zeitliche Beschräkung: Sa und So',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
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
    osmValuePart: '1053-35',
    signId: '1053-35',
    name: 'Zusatzzeichen 1053-35',
    descriptiveName: 'Beschräkung: bei Nässe',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
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
    osmValuePart: '1012-31',
    signId: '1012-31',
    name: 'Zusatzzeichen 1012-31',
    descriptiveName: 'Ende',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [],
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
    osmValuePart: '1000-30',
    signId: '1000-30',
    name: 'Zusatzzeichen 1000-30',
    descriptiveName: 'Beide Richtungen',
    description: 'zwei gegengerichtete waagerechte Pfeile',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'oneway', value: 'no' }],
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
    osmValuePart: '1000-31',
    signId: '1000-31',
    name: 'Zusatzzeichen 1000-31',
    descriptiveName: 'Beide Richtungen',
    description: 'zwei gegengerichtete senkrechte Pfeile',
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [{ key: 'oneway', value: 'no' }],
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
    osmValuePart: '1000-32',
    signId: '1000-32',
    name: 'Zusatzzeichen 1000-32',
    descriptiveName: 'Radverkehr kreuzt von links und rechts',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: ['path', 'cycleway'],
      uniqueTags: [{ key: 'oneway', value: 'no' }],
    },
    comments: [
      {
        tagReference: null,
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
    osmValuePart: '1000-33',
    signId: '1000-33',
    name: 'Zusatzzeichen 1000-33',
    descriptiveName: 'Radverkehr im Gegenverkehr',
    description: null,
    kind: 'modifier_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'oneway:cycleway', value: 'no' }],
    },
    comments: [
      {
        tagReference: null,
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
    osmValuePart: '298',
    signId: '298',
    name: 'Zeichen 298',
    descriptiveName: 'Sperrflächen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'area:highway', value: 'prohibited' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'surface_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_298_-_Sperrflaechen,_StVO_1970.svg',
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_298_-_Sperrfl%C3%A4chen,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '299',
    signId: '299',
    name: 'Zeichen 299',
    descriptiveName: 'Sperrflächen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'area:highway', value: 'prohibited' }],
    },
    comments: [],
    catalogue: {
      signCategory: 'surface_sign',
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
    osmValuePart: '220-10',
    signId: '220-10',
    name: 'Zeichen 220-10',
    descriptiveName: 'Einbahnstraße – linksweisend',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: [],
      uniqueTags: [{ key: 'oneway', value: 'yes' }],
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
    name: 'Zeichen 220-20',
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
  {
    osmValuePart: '205',
    signId: '205',
    name: 'Zeichen 205',
    descriptiveName: 'Vorfahrt gewähren',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_205_-_Vorfahrt_gewaehren!_StVO_1970.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_205_-_Vorfahrt_gew%C3%A4hren!_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '394-50',
    signId: '394-50',
    name: 'Zeichen 394-50',
    descriptiveName: 'Laternenring – Schild',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'highway', value: 'street_lamp' }],
    },
    comments: [
      {
        comment:
          'Kennzeichnung von Laternen, welche nachts abgeschaltet werden. Wird bei Laternen verwendet, die sich in geschlossenen Ortschaften befinden. Siehe auch [Tag:highway=street_lamp], [Key:lit]',
      },
      {
        comment:
          'Aktuell vor allem [in Göttingen in Verwendung](https://overpass-turbo.eu/s/1Tfd).',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_394_-_Schild_fuer_Laternen,_StVO_1970.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_394_-_Schild_f%C3%BCr_Laternen,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '206',
    signId: '206',
    name: 'Zeichen 206',
    descriptiveName: 'Halt! Vorfahrt gewähren',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'highway', value: 'stop' }],
    },
    comments: [{ comment: 'Wird als Punkt auf der Straße erfasst.' }],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_206_-_Halt!_Vorfahrt_gewähren!_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_206_-_Halt!_Vorfahrt_gew%C3%A4hren!_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '620-40',
    signId: '620-40',
    name: 'Zeichen 620-40',
    descriptiveName: 'Leitpfosten (rechts)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_620-40_-_Leitpfosten_(rechts),_StVO_1992.svg',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zeichen_620-40_-_Leitpfosten_(rechts),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '620-41',
    signId: '620-41',
    name: 'Zeichen 620-41',
    descriptiveName: 'Leitpfosten (links)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_620-41_-_Leitpfosten_(links),_StVO_1992.svg',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zeichen_620-41_-_Leitpfosten_(links),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '357',
    signId: '357',
    name: 'Zeichen 357',
    descriptiveName: 'Sackgasse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [
      {
        comment:
          'Eine Sackgasse muss für Router nicht speziell gekennzeichnet werden. Um auf die Existenz des Zeichens hinzuweisen, sollte ein spezieller Punkt (neben) dem Weg eingezeichnet werden. Um den letzten Punkt eines Weges, der auch nicht für Fußgänger oder andere Fortbewegungsmittel weitergeht, zu kennzeichnen, siehe [How_to_map_a#Sackgasse](https://wiki.openstreetmap.org/wiki/DE:How_to_map_a/S#Sackgasse).',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_357_-_Sackgasse,_StVO_1992.svg',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Zeichen_357_-_Sackgasse,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '357-50',
    signId: '357-50',
    name: 'Zeichen 357-50',
    descriptiveName: 'Für Radverkehr und Fußgänger durchlässige Sackgasse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [
      {
        comment:
          'Eine Sackgasse muss für Router nicht speziell gekennzeichnet werden. Um auf die Existenz des Zeichens hinzuweisen, sollte ein spezieller Punkt (neben) dem Weg eingezeichnet werden.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_357-50_-_Durchlässige_Sackgasse_für_Fußgänger_und_Radverkehr,_StVO_2009.svg',
      sourceUrl:
        'https://upload.wikimedia.org/wikipedia/commons/2/2d/Zeichen_357-50_-_Durchl%C3%A4ssige_Sackgasse_f%C3%BCr_Fu%C3%9Fg%C3%A4nger_und_Radverkehr%2C_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '357-51',
    signId: '357-51',
    name: 'Zeichen 357-51',
    descriptiveName: 'Für Fußgänger durchlässige Sackgasse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [
      {
        comment:
          'Eine Sackgasse muss für Router nicht speziell gekennzeichnet werden. Um auf die Existenz des Zeichens hinzuweisen, sollte ein spezieller Punkt (neben) dem Weg eingezeichnet werden.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_357-51_-_Sackgasse;_für_Fußgänger_durchlässige_Sackgasse,_StVO_2009.svg',
      sourceUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/76/Zeichen_357-51_-_Sackgasse%3B_f%C3%BCr_Fu%C3%9Fg%C3%A4nger_durchl%C3%A4ssige_Sackgasse%2C_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '357-52',
    signId: '357-52',
    name: 'Zeichen 357-52',
    descriptiveName: 'Für Radverkehr durchlässige Sackgasse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [
      {
        comment:
          'Eine Sackgasse muss für Router nicht speziell gekennzeichnet werden. Um auf die Existenz des Zeichens hinzuweisen, sollte ein spezieller Punkt (neben) dem Weg eingezeichnet werden.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_357-51_-_Sackgasse;_für_Fußgänger_durchlässige_Sackgasse,_StVO_2009.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_357-52_-_Sackgasse;_f%C3%BCr_Radverkehr_durchl%C3%A4ssige_Sackgasse,_StVO_2009.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '224',
    signId: '224',
    name: 'Zeichen 224',
    descriptiveName: 'Haltestelle',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [
      {
        comment:
          'Aus [der Wiki-Seite](https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:224) geht nicth hervor, an welchem `public_transport=*` Object das `traffic_sign` hinterlegt werden sollte.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_224.svg',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Zeichen_224.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '267',
    signId: '267',
    name: 'Zeichen 267',
    descriptiveName: 'Verbot der Einfahrt',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [
      {
        important: true,
        comment:
          'Bitte [die Wiki-Seite](https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:267) konsultieren zum Tagging.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_267_-_Verbot_der_Einfahrt,_StVO_1970.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_267_-_Verbot_der_Einfahrt,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '306',
    signId: '306',
    name: 'Zeichen 306',
    descriptiveName: 'Vorfahrtstraße',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        {
          key: 'priority_road',
          value: 'designated',
        },
      ],
    },
    comments: [
      {
        comment:
          '[Die Wiki-Seite](https://wiki.openstreetmap.org/wiki/DE:Key:priority_road) geht auf weitere Werte `yes_unposted` und `end` ein.',
      },
    ],
    // TODO: foward/backward case https://wiki.openstreetmap.org/wiki/DE:Key:priority_road
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_306_-_Vorfahrtstraße,_StVO_1970.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_306_-_Vorfahrtstra%C3%9Fe,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '307',
    signId: '307',
    name: 'Zeichen 307',
    descriptiveName: 'Ende der Vorfahrtstraße',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        {
          key: 'priority_road',
          value: 'end',
        },
      ],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_306_-_Vorfahrtstraße,_StVO_1970.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_307_-_Ende_der_Vorfahrtstra%C3%9Fe,_StVO_1981.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '386.3',
    signId: '386.3',
    name: 'Zeichen 386.3',
    descriptiveName: 'Touristische Unterrichtungstafel',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        {
          key: 'tourism',
          value: 'information',
        },
        {
          key: 'information',
          value: 'board',
        },
        {
          key: 'board_type',
          value: 'sight',
        },
      ],
    },
    comments: [
      {
        comment:
          '[Die Wiki-Seite](https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:386.3) listet weitere übliche Tags auf um den Inhalt der Tafel zu erfassen.',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_386.3_-_Touristische_Unterrichtungstafel_(2400x3600),_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_386.3_-_Touristische_Unterrichtungstafel_(2400x3600),_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '385',
    signId: '385',
    name: 'Zeichen 385',
    descriptiveName: 'Ortshinweistafel',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [
        {
          key: 'name',
          value: '*',
        },
      ],
    },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_385_-_Ortshinweistafel,_StVO_1988.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_385_-_Ortshinweistafel,_StVO_1988.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '626-20',
    signId: '626-20',
    name: 'Zeichen 626-20',
    descriptiveName: 'Leitplatte, Aufstellung links',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_626-20_-_Leitplatte,_Aufstellung_links_(750x500),_StVO_2013.svg',
      sourceUrl:
        'https://de.m.wikipedia.org/wiki/Datei:Zeichen_626-20_-_Leitplatte,_Aufstellung_links_(750x500),_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '222',
    signId: '222',
    name: 'Zeichen 222',
    descriptiveName: 'Vorgeschriebene Vorbeifahrt, Rechts vorbei',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_222_-_Vorgeschriebene_Vorbeifahrt,_Rechts_vorbei,_StVO_2017.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_222_-_Vorgeschriebene_Vorbeifahrt,_Rechts_vorbei,_StVO_2017.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '331.1',
    signId: '331.1',
    name: 'Zeichen 331.1',
    descriptiveName: 'Kraftfahrstraße',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'motorroad', value: 'yes' }],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_331.1_-_Kraftfahrstraße,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_331.1_-_Kraftfahrstra%C3%9Fe,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '331.2',
    signId: '331.2',
    name: 'Zeichen 331.2',
    descriptiveName: 'Ende der Kraftfahrstraße',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_331.2_-_Ende_der_Kraftfahrstraße,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_331.2_-_Ende_der_Kraftfahrstra%C3%9Fe,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '330.1',
    signId: '330.1',
    name: 'Zeichen 330.1',
    descriptiveName: 'Autobahn',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      highwayValues: ['motorway'],
    },
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_330.1_-_Autobahn,_StVO_2013.svg',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Zeichen_330.1_-_Autobahn,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '330.2',
    signId: '330.2',
    name: 'Zeichen 330.2',
    descriptiveName: 'Ende der Autobahn',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_330.2_-_Ende_der_Autobahn,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_330.2_-_Ende_der_Autobahn,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
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
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_136-10_-_Kinder,_Aufstellung_rechts,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_330.2_-_Ende_der_Autobahn,_StVO_2013.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '301',
    signId: '301',
    name: 'Zeichen 301',
    descriptiveName: 'Vorfahrt',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_301_-_Vorfahrt,_StVO_1970.svg',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Zeichen_301_-_Vorfahrt,_StVO_1970.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '215',
    signId: '215',
    name: 'Zeichen 215',
    descriptiveName: 'Kreisverkehr',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {
      uniqueTags: [{ key: 'junction', value: 'roundabout' }],
    },
    comments: [
      { comment: '`oneway=true` im Kreisverkehr wird automatisch angenommen.' },
      {
        tagReference: 'highway=mini_roundabout',
        comment:
          'Alternativ wird `highway=mini_roundabout` wird als Punkt auf der `highway` Linie erfasst für Kreisverkehre ohne bauliche Begrenzung in der Mitte. Diese haben in Deutschland aber selten eine Beschilderung. ',
      },
    ],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_215_-_Kreisverkehr,_StVO_2000.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_215_-_Kreisverkehr,_StVO_2000.svg',
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
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_138-10_-_Radverkehr,_StVO_2013.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_138-10_-_Radverkehr,_StVO_2013.svg',
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
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_103-20_-_Kurve_(rechts),_StVO_1992.svg',
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
    catalogue: {
      visibility: 'search_only',
      signCategory: 'hazard_sign',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_103-10_-_Kurve_(links),_StVO_1992.svg',
      sourceUrl:
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Zeichen_103-10_-_Kurve_%28links%29%2C_StVO_1992.svg',
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
      signCategory: 'train_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_201_–_Andreaskreuz_–_Dem_Schienenverkehr_Vorrang_gewähren!_StVO_1970.svg',
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
      signCategory: 'train_sign',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_201-51_-_Andreaskreuz_(stehend)_mit_Blitzpfeil,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_201-51_-_Andreaskreuz_(stehend)_mit_Blitzpfeil,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '449',
    signId: '449',
    name: 'Zeichen 449',
    descriptiveName: 'Vorwegweiser auf Autobahnen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'signpost',
    },
    image: {
      svgPath:
        '/trafficSignsSvgs/Zeichen_449_-_Vorwegweiser_auf_Autobahnen_(nach_RWBA),_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_449_-_Vorwegweiser_auf_Autobahnen_(nach_RWBA),_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '438',
    signId: '438',
    name: 'Zeichen 438',
    descriptiveName: 'Vorwegweiser außerhalb von Autobahnen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'signpost',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_438_-_Vorwegweiser;_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_438_-_Vorwegweiser;_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: '439',
    signId: '439',
    name: 'Zeichen 439',
    descriptiveName: 'Gegliederter Vorwegweiser außerhalb von Autobahnen',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    comments: [],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'signpost',
    },
    image: {
      svgPath: '/trafficSignsSvgs/Zeichen_439_-_Vorwegweiser,_StVO_1992.svg',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_439_-_Vorwegweiser,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
]
