import type { SignType } from '../../TrafficSignDataTypes.js'

export const _indication_ce: SignType[] = [
  {
    osmValuePart: 'CE1',
    signId: 'CE1',
    name: 'CE1',
    descriptiveName: 'Poste de secours.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'hospital' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE2a',
    signId: 'CE2a',
    name: 'CE2a',
    descriptiveName: 'Poste d’appel d’urgence.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'emergency', value: 'phone' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE2a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE2b',
    signId: 'CE2b',
    name: 'CE2b',
    descriptiveName: 'Cabine téléphonique.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'telephone' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE2b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE3a',
    signId: 'CE3a',
    name: 'CE3a',
    descriptiveName: 'Point d’information pour le tourisme ou les services.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'information' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE3a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE4a',
    signId: 'CE4a',
    name: 'CE4a',
    descriptiveName: 'Camping pour tentes.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'camp_site' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE4a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE4b',
    signId: 'CE4b',
    name: 'CE4b',
    descriptiveName: 'Camping pour caravanes.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'caravan_site' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE4b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE4c',
    signId: 'CE4c',
    name: 'CE4c',
    descriptiveName: 'Camping pour tentes et caravanes.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'tourism', value: 'camp_site' },
          { key: 'caravan', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE4c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE5a',
    signId: 'CE5a',
    name: 'CE5a',
    descriptiveName: 'Auberge de jeunesse.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'hostel' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE5a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE5b',
    signId: 'CE5b',
    name: 'CE5b',
    descriptiveName: 'Chambre d’hôtes ou gîte.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'tourism', value: 'bed_and_breakfast' },
          { key: 'tourism', value: 'guest_house' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE5b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE6a',
    signId: 'CE6a',
    name: 'CE6a',
    descriptiveName:
      'Itinéraire pédestre. Préférez highway=track pour les chemins qui sont ouverts aux véhicules agricoles.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [{ key: 'foot', value: 'yes' }],
        uniqueTags: [
          { key: 'highway', value: 'path' },
          { key: 'highway', value: 'track' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Signal-CE6a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE6b',
    signId: 'CE6b',
    name: 'CE6b',
    descriptiveName: 'Circuit de ski de fond.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'piste:type', value: 'nordic' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE6b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE7',
    signId: 'CE7',
    name: 'CE7',
    descriptiveName: 'Emplacement pour pique-nique.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'picnic_site' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE7.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE8',
    signId: 'CE8',
    name: 'CE8',
    descriptiveName: 'Gare auto/train.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'KEY', value: 'VALUE' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE8.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE10',
    signId: 'CE10',
    name: 'CE10',
    descriptiveName: 'Embarcadère.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'ferry_terminal' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE10.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE12',
    signId: 'CE12',
    name: 'CE12',
    descriptiveName: 'Toilettes.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'toilets' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE12.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE14',
    signId: 'CE14',
    name: 'CE14',
    descriptiveName:
      "Le panneau indique une installation accessible par les personnes handicapés ou à mobilité réduite. Ajouter wheelchair=yes sur l'objet utilisant ce signe.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE14.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE15a',
    signId: 'CE15a',
    name: 'CE15a',
    descriptiveName:
      'Station essence ouverte 24 sur 24, 7 jours sur 7 (nécessite souvent un paiement automatique par carte si la station n’a pas de personnel de caisse à toute heure).',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'fuel' },
          { key: 'opening_hours', value: '24/7' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE15a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE15c',
    signId: 'CE15c',
    name: 'CE15c',
    descriptiveName:
      'Rajouter les autres carburants distribués. Station essence ouverte 24 heures sur 24, 7 jours sur 7 (nécessite souvent un paiement automatique par carte si la station n’a pas de personnel de caisse à t',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'fuel' },
          { key: 'fuel:lpg', value: 'yes' },
          { key: 'opening_hours', value: '24/7' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE15c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE16',
    signId: 'CE16',
    name: 'CE16',
    descriptiveName: 'Restaurant ouvert 24 heures sur 24, 7 jours sur 7.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'restaurant' },
          { key: 'opening_hours', value: '24/7' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE16.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE17',
    signId: 'CE17',
    name: 'CE17',
    descriptiveName: 'Hôtel ou motel ouvert 24h/24, 7j/7.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'tourism', value: 'hotel' },
          { key: 'opening_hours', value: '24/7' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE17.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE18',
    signId: 'CE18',
    name: 'CE18',
    descriptiveName:
      'Débit de boissons ouvert 24h/24, 7j/7. La réglementation peut imposer des limitations sur la vente d’alcool à certaines heures.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'cafe' },
          { key: 'opening_hours', value: '24/7' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE18.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE20a',
    signId: 'CE20a',
    name: 'CE20a',
    descriptiveName: 'Gare de téléphérique.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'aerialway', value: 'cable_car' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE20a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE20b',
    signId: 'CE20b',
    name: 'CE20b',
    descriptiveName: 'Soit l’un soit l’autre',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'aerialway', value: 'chair_lift' },
          { key: 'aerialway', value: 'gondola' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE20b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE21',
    signId: 'CE21',
    name: 'CE21',
    descriptiveName: 'Point de vue touristique.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'viewpoint' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE21.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE23',
    signId: 'CE23',
    name: 'CE23',
    descriptiveName: 'Aire de jeux pour enfants.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'leisure', value: 'playground' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE23.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE24',
    signId: 'CE24',
    name: 'CE24',
    descriptiveName:
      'Station de vidange des eaux usées et des déchets pour caravanes, camping-car.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'sanitary_dump_station' },
          { key: 'sanitary_dump_station', value: '3=yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE24.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE25',
    signId: 'CE25',
    name: 'CE25',
    descriptiveName: 'Distributeur automatique de billets.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'atm' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE25.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE26',
    signId: 'CE26',
    name: 'CE26',
    descriptiveName: 'Station de gonflage gratuit.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'compressed_air' },
          { key: 'fee', value: 'no' },
          { key: 'compressed_air:opening_hours', value: '24/7' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_CE26.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'CE52',
    signId: 'CE52',
    name: 'CE52',
    descriptiveName: 'Aire de covoiturage.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'carpool', value: 'designated' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Fr-CE52-Covoiturage.svg',
      licence: 'Public Domain',
    },
  },
]
