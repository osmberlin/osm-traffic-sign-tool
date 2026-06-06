import type { SignType } from '../../TrafficSignDataTypes.js'

export const _danger_a: SignType[] = [
  {
    osmValuePart: 'A1a',
    signId: 'A1a',
    name: 'A1a',
    descriptiveName:
      'Annonce de virage Si le way est à double sens, il y a probablement un panneau symétrique à taguer en sens inverse, de l’autre côté de la section dangereuse. Sur la section dangereuse, rechercher la pr',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'turn' },
          { key: 'hazard', value: 'curve' },
          { key: 'curve', value: 'hairpin' },
          { key: 'curve', value: 'loop' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A1a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A1c',
    signId: 'A1c',
    name: 'A1c',
    descriptiveName:
      'Annonce de succession de virages Si le way est à double sens, il y a probablement un panneau (symétrique si le nombre de virages est impair) à taguer en sens inverse, de l’autre côté de la section dan',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'turns' },
          { key: 'hazard', value: 'curves' },
          { key: 'curves', value: 'serpentine' },
          { key: 'curves', value: 'extended' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A1c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A2a',
    signId: 'A2a',
    name: 'A2a',
    descriptiveName: 'Dos d’âne ou cassis',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'traffic_calming', value: 'yes' },
          { key: 'traffic_calming', value: 'hump' },
          { key: 'hazard', value: 'damaged_road' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A2a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A3',
    signId: 'A3',
    name: 'A3',
    descriptiveName: 'Chaussée rétrécie de chaque côté.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'traffic_calming', value: 'choker' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:French_road_sign_A3.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A3a',
    signId: 'A3a',
    name: 'A3a',
    descriptiveName: "Chaussée rétrécie d'un côté.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:French_road_sign_A3a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A4+M9z',
    signId: 'A4+M9z',
    name: 'A4+M9z',
    descriptiveName: "Chaussée rétrécie d'un côté.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'slippery' },
          { key: 'hazard', value: 'slippery_road' },
          { key: 'hazard', value: 'ice' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_M9z-6.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A6',
    signId: 'A6',
    name: 'A6',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'bridge', value: 'movable' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A6.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A7',
    signId: 'A7',
    name: 'A7',
    descriptiveName:
      "Proximité d'un passage à niveau avec barrières À l'emplacement du croisement, dispositif de type G2 (barrières et signalisation automatique).",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'railway', value: 'crossing' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A7.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A8',
    signId: 'A8',
    name: 'A8',
    descriptiveName:
      "Passage à niveau sans barrière automatique À l'emplacement du croisement, panneau de type G1 (croix de Saint-André).",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'railway', value: 'crossing' },
          { key: 'crossing:barrier', value: 'no' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A8.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A9a',
    signId: 'A9a',
    name: 'A9a',
    descriptiveName: 'Traversées de voies réservées aux véhicules de transport en commun',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_Road_Sign_A9a.png',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A9b',
    signId: 'A9b',
    name: 'A9b',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A9.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A13a',
    signId: 'A13a',
    name: 'A13a',
    descriptiveName:
      'Zone fréquenté par des enfants Indique la proximité d’un endroit fréquenté par les enfants.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'school_zone' },
          { key: 'hazard', value: 'children' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A13a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A13b',
    signId: 'A13b',
    name: 'A13b',
    descriptiveName: 'Passage piéton Voir Key:crossing pour plus de détails.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'highway', value: 'crossing' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A13b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A14',
    signId: 'A14',
    name: 'A14',
    descriptiveName:
      'Danger quelconque Voir Key:hazard pour trouver la bonne valeur à ajouter à la clé hazard=*.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A14.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A15a1',
    signId: 'A15a1',
    name: 'A15a1',
    descriptiveName:
      "Passage d'animaux domestiques * Vous pouvez ajouter la clé sur la voie pour indiquer le côté concerné par le danger.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'animal_crossing' },
          { key: 'hazard:animal', value: 'livestock' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A15a1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A15b',
    signId: 'A15b',
    name: 'A15b',
    descriptiveName:
      "Passage d'animaux sauvages Vous pouvez ajouter la clé direction=* sur la voie pour indiquer le côté concerné par le danger.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'animal_crossing' },
          { key: 'hazard:animal', value: 'wild_animal' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A15b.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A15c',
    signId: 'A15c',
    name: 'A15c',
    descriptiveName:
      'Passage de cavaliers Vous pouvez ajouter la clé direction=* sur la voie pour indiquer le côté concerné par le danger.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'horse_riders' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A15c.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A16',
    signId: 'A16',
    name: 'A16',
    descriptiveName: 'Sur un way avec : * {{Template:fr:Tag|incline|',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A16.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A16[10%]',
    signId: 'A16',
    name: 'A16[10%]',
    descriptiveName: 'Descente dangereuse',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/FR:Signalisation_routi%C3%A8re_en_France',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A17',
    signId: 'A17',
    name: 'A17',
    descriptiveName:
      "Feu tricolore Pour les intersections avec voies séparées, on place l'attribut sur chaque intersection. Pour les intersections plus complexes, on peut envisager l’utilisation d’une relation (à compléte",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'highway', value: 'traffic_signals' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A17.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A18',
    signId: 'A18',
    name: 'A18',
    descriptiveName:
      'Voie à double-sens La route est a double sens à partir du panneau. Contrairement aux autres panneaux de danger, celui-ci prend effet immédiatement.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway', value: 'yes' },
          { key: 'oneway', value: 'no' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A18.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A19',
    signId: 'A19',
    name: 'A19',
    descriptiveName:
      "Chute de pierres Vous pouvez ajouter la clé direction=* sur la voie pour indiquer le sur quel cote de la voie le danger s'applique si ce n'est que sur un coté.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'falling_rocks' },
          { key: 'hazard', value: 'rock_slide' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A19.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A20',
    signId: 'A20',
    name: 'A20',
    descriptiveName: 'Quai ou berge à proximité',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A20.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A21',
    signId: 'A21',
    name: 'A21',
    descriptiveName: 'Arrivé fréquente de cyclistes',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'cyclists' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A21.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A23',
    signId: 'A23',
    name: 'A23',
    descriptiveName: 'Dangers aériens',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'low_flying_aircraft' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A23.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'A24',
    signId: 'A24',
    name: 'A24',
    descriptiveName: 'Vent latéral',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'side_winds' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_A24.svg',
      licence: 'Public Domain',
    },
  },
]
