import type { SignType } from '../TrafficSignDataTypes.js'
import { _conditions__only_for_thing } from './data/conditions__only_for_thing.js'
import { _conditions__other } from './data/conditions__other.js'
import { _conditions__time } from './data/conditions__time.js'
import { _exceptions__thing_allowed } from './data/exceptions__thing_allowed.js'
import { _hazard } from './data/hazard.js'
import { _infrastructure } from './data/infrastructure.js'
import { _notice } from './data/notice.js'
import { _overtaking } from './data/overtaking.js'
import { _speed_maxspeed_end } from './data/speed_maxspeed_end.js'
import { _speed_maxspeed_start } from './data/speed_maxspeed_start.js'
import { _speed_minspeed_end } from './data/speed_minspeed_end.js'
import { _speed_minspeed_start } from './data/speed_minspeed_start.js'
import { _speed_zones } from './data/speed_zones.js'
import { _surface } from './data/surface.js'
import { _traffic_ban } from './data/traffic_ban.js'

export const trafficSignDataDE: SignType[] = [
  ..._infrastructure,
  ..._traffic_ban,
  ..._speed_zones,
  ..._speed_maxspeed_start,
  ..._speed_maxspeed_end,
  ..._speed_minspeed_start,
  ..._speed_minspeed_end,
  ..._overtaking,
  ..._notice,
  ..._exceptions__thing_allowed,
  ..._conditions__only_for_thing,
  ..._conditions__time,
  ..._conditions__other,
  ..._surface,
  ..._hazard,

  // MISC SIGNS that are not grouped yet
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_394_-_Schild_für_Laternen,_StVO_1970.svg',
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
    compatibility: { canReceiveModifiers: false },
    comments: [{ comment: 'Wird als Punkt auf der Straße erfasst.' }],
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zeichen_357-50_-_Durchl%C3%A4ssige_Sackgasse_für_Fu%C3%9Fg%C3%A4nger_und_Radverkehr,_StVO_2009.svg',
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zeichen_357-51_-_Sackgasse;_für_Fu%C3%9Fg%C3%A4nger_durchl%C3%A4ssige_Sackgasse,_StVO_2009.svg',
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
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_357-52_-_Sackgasse;_für_Radverkehr_durchl%C3%A4ssige_Sackgasse,_StVO_2009.svg',
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    // TODO: foward/backward case https://wiki.openstreetmap.org/wiki/DE:Key:priority_road
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'object_sign',
    },
    image: {
      sourceUrl:
        'https://de.wikipedia.org/wiki/Datei:Zeichen_626-20_-_Leitplatte,_Aufstellung_links_(750x500),_StVO_2013.svg',
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'traffic_sign',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_215_-_Kreisverkehr,_StVO_2000.svg',
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'signpost',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'signpost',
    },
    image: {
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
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      visibility: 'search_only',
      signCategory: 'signpost',
    },
    image: {
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Zeichen_439_-_Vorwegweiser,_StVO_1992.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Kein Winterdienst',
    signId: 'Kein Winterdienst',
    name: 'Zeichen "Kein Winterdienst"',
    descriptiveName: 'Kein Winterdienst',
    description: 'Ein inoffizielles Verkehrszeichen.',
    kind: 'traffic_sign',
    tagRecommendations: { uniqueTags: [{ key: 'winter_service', value: 'no' }] },
    comments: [
      {
        comment: 'Dieses Schild ist nicht Teil des offiziellen Verkehrszeichenkataloges.',
      },
    ],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Kein_Winterdienst.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'Eingeschränkter Winterdienst',
    signId: 'Eingeschränkter Winterdienst',
    name: 'Zeichen "Eingeschränkter Winterdienst"',
    descriptiveName: 'Eingeschränkter Winterdienst',
    description: 'Ein inoffizielles Verkehrszeichen.',
    kind: 'traffic_sign',
    tagRecommendations: { uniqueTags: [{ key: 'winter_service', value: 'limited' }] },
    comments: [
      {
        comment: 'Dieses Schild ist nicht Teil des offiziellen Verkehrszeichenkataloges.',
      },
    ],
    compatibility: { canReceiveModifiers: false },
    catalogue: {
      signCategory: 'hazard_sign',
    },
    image: {
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Zusatzzeichen_Eingeschr%C3%A4nkter_Winterdienst.svg',
      licence: 'Public Domain',
    },
  },
]
