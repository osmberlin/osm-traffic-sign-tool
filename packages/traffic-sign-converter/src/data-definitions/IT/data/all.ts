import type { SignType } from '../../TrafficSignDataTypes.js'

export const _all: SignType[] = [
  {
    osmValuePart: 'II.5',
    signId: 'II.5',
    name: 'Curva a sinistra',
    descriptiveName: 'Dangerous bend (to the left)',
    description: 'Vienna A, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'curve' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_curva_pericolosa_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.4',
    signId: 'II.4',
    name: 'Curva a destra',
    descriptiveName: 'Dangerous bend (to the right)',
    description: 'Vienna A, 1b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'curve' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_curva_pericolosa_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.7',
    signId: 'II.7',
    name: 'Doppia curva, la prima a sinistra',
    descriptiveName: 'Dangerous double bend (the first to the left)',
    description: 'Vienna A, 1c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'curves' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_doppia_curva_sx.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.6',
    signId: 'II.6',
    name: 'Doppia curva, la prima a destra',
    descriptiveName: 'Dangerous double bend (the first to the right)',
    description: 'Vienna A, 1d',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'curves' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_doppia_curva_dx.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.15',
    signId: 'II.15',
    name: 'Discesa pericolosa',
    descriptiveName: 'Dangerous descent',
    description: 'Vienna A, 2a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_discesa_pericolosa.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.16',
    signId: 'II.16',
    name: 'Salita ripida',
    descriptiveName: 'Dangerous ascent',
    description: 'Vienna A, 3a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_salita_ripida.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.17',
    signId: 'II.17',
    name: 'Strettoia simmetrica',
    descriptiveName: 'Carriageway narrows (both sides)',
    description: 'Vienna A, 4a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'narrow', value: 'yes' },
          { key: 'traffic_calming', value: 'chicane' },
          { key: 'traffic_calming', value: 'choker' },
          { key: 'hazard', value: 'road_narrows' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strettoia_simmetrica.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.19',
    signId: 'II.19',
    name: 'Strettoia asimmetrica a destra',
    descriptiveName: 'Carriageway narrows (right side)',
    description: 'Vienna A, 4b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'narrow', value: 'yes' },
          { key: 'traffic_calming', value: 'chicane' },
          { key: 'traffic_calming', value: 'choker' },
          { key: 'hazard', value: 'road_narrows' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strettoia_asimmetrica_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.18',
    signId: 'II.18',
    name: 'Strettoia asimmetrica a sinistra',
    descriptiveName: 'Carriageway narrows (left side)',
    description: 'Vienna A, 4b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'narrow', value: 'yes' },
          { key: 'traffic_calming', value: 'chicane' },
          { key: 'traffic_calming', value: 'choker' },
          { key: 'hazard', value: 'road_narrows' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strettoia_asimmetrica_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.1',
    signId: 'II.1',
    name: 'Strada deformata',
    descriptiveName: 'Uneven road',
    description: 'Vienna A, 7a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'damaged_road' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strada_deformata_(figura_II_1).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.2',
    signId: 'II.2',
    name: 'Dosso',
    descriptiveName: 'Hump in road',
    description: 'Vienna A, 7b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'traffic_calming', value: 'bump' },
          { key: 'traffic_calming', value: 'hump' },
          { key: 'traffic_calming', value: 'table' },
          { key: 'traffic_calming', value: 'cushion' },
          { key: 'hazard', value: 'bump' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_dosso.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.3',
    signId: 'II.3',
    name: 'Cunetta',
    descriptiveName: 'Dip in road',
    description: 'Vienna A, 7c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'dip' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_cunetta.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.22',
    signId: 'II.22',
    name: 'Strada sdrucciolevole',
    descriptiveName: 'Slippery road',
    description: 'Vienna A, 9',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'slippery' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strada_sdrucciolevole.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.26',
    signId: 'II.26',
    name: 'Doppio senso di circolazione',
    descriptiveName: 'Two-way traffic',
    description: 'Vienna A, 23',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'oneway', value: 'no' },
          { key: 'hazard', value: 'contraflow' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_doppio_senso_di_circolazione_(figura_II_26).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.31a',
    signId: 'II.31a',
    name: 'Semaforo',
    descriptiveName: 'Light signals (vertical)',
    description: 'Vienna A, 17a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        highwayValues: ['traffic_signals'],
        uniqueTags: [{ key: 'hazard', value: 'traffic_signals' }],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_semaforo_verticale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.31b',
    signId: 'II.31b',
    name: 'Semaforo',
    descriptiveName: 'Light signals (horizontal)',
    description: 'Vienna A, 17c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        highwayValues: ['traffic_signals'],
        uniqueTags: [{ key: 'hazard', value: 'traffic_signals' }],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_semaforo_orizzontale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.13',
    signId: 'II.13',
    name: 'Attraversamento pedonale',
    descriptiveName: 'Pedestrian crossing',
    description: 'Vienna A, 12',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        highwayValues: ['crossing'],
        uniqueTags: [
          { key: 'crossing_ref', value: 'zebra' },
          { key: 'hazard', value: 'pedestrian_crossing' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_attraversamento_pericoloso.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.23',
    signId: 'II.23',
    name: 'Bambini',
    descriptiveName: 'Children',
    description: 'Vienna A, 13',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'children' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_bambini.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.24',
    signId: 'II.24',
    name: 'Animali domestici vaganti',
    descriptiveName: 'Cattle crossing',
    description: 'Vienna A, 15a',
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
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_animali_domestici_vaganti.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.25',
    signId: 'II.25',
    name: 'Animali selvatici vaganti',
    descriptiveName: 'Wildlife crossing',
    description: 'Vienna A, 15b',
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
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_animali_selvatici_vaganti.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.33',
    signId: 'II.33',
    name: 'Forte vento laterale',
    descriptiveName: 'Cross-wind',
    description: 'Vienna A, 31',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'side_winds' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_forte_vento_laterale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.21',
    signId: 'II.21',
    name: 'Banchina cedevole',
    descriptiveName: 'Dangerous shoulder',
    description: 'Vienna A, 8',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_banchina_pericolosa.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.34',
    signId: 'II.34',
    name: 'Pericolo di incendio',
    descriptiveName: 'Danger of wildfires',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pericolo_di_incendio.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.29',
    signId: 'II.29',
    name: 'Materiale instabile',
    descriptiveName: 'Loose gravel',
    description: 'Vienna A, 10a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'loose_gravel' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_materiale_instabile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.30a',
    signId: 'II.30a',
    name: 'Caduta massi',
    descriptiveName: 'Falling rocks',
    description: 'Vienna A, 11a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'falling_rocks' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_caduta_massi_da_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.30b',
    signId: 'II.30b',
    name: 'Caduta massi',
    descriptiveName: 'Falling rocks',
    description: 'Vienna A, 11a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'falling_rocks' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_caduta_massi_da_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.14',
    signId: 'II.14',
    name: 'Attraversamento ciclabile',
    descriptiveName: 'Cyclists entering or crossing',
    description: 'Vienna A, 14',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'cyclists' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_attraversamento_ciclabile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.32',
    signId: 'II.32',
    name: 'Aeromobili',
    descriptiveName: 'Airfield',
    description: 'Vienna A, 30',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'low_flying_aircraft' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_aeromobili.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.27',
    signId: 'II.27',
    name: 'Circolazione Rotatoria',
    descriptiveName: 'Roundabout ahead',
    description: 'Vienna A, 22',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'junction', value: 'roundabout' },
          { key: 'hazard', value: 'roundabout' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_circolazione_rotatoria.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.35',
    signId: 'II.35',
    name: 'Altri pericoli',
    descriptiveName: 'Other dangers',
    description: 'Vienna A, 32',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_altri_pericoli.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.12',
    signId: 'II.12',
    name: 'Attraversamento tranviario',
    descriptiveName: 'Intersection with a tramway line',
    description: 'Vienna A, 27',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_attraversamento_tramviario.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.28',
    signId: 'II.28',
    name: 'Sbocco su molo o su argine',
    descriptiveName: 'Road leads on to quay or river bank',
    description: 'Vienna A, 6',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_sbocco_su_molo.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.8',
    signId: 'II.8',
    name: 'Passaggio a livello con barriere',
    descriptiveName: 'Level-crossings with gates',
    description: 'Vienna A, 25',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'crossing:barrier', value: 'yes' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_passaggio_a_livello_con_barriere.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.9',
    signId: 'II.9',
    name: 'Passaggio a livello senza barriere',
    descriptiveName: 'Other level-crossings',
    description: 'Vienna A, 26',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['node'],
        uniqueTags: [
          { key: 'railway', value: 'level_crossing' },
          { key: 'crossing:barrier', value: 'no' },
        ],
      },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_passaggio_a_livello_senza_barriere.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.10a',
    signId: 'II.10a',
    name: "Croce di Sant'Andrea",
    descriptiveName: 'Single-rail level-crossing',
    description: 'Vienna A, 28a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_croce_di_S.Andrea.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.10b',
    signId: 'II.10b',
    name: "Doppia croce di Sant'Andrea",
    descriptiveName: 'Multi-rail level-crossing',
    description: 'Vienna A, 28b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_Doppia_croce_di_Sant%27Andrea.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.11a',
    signId: 'II.11a',
    name: 'Pannello distanziometrico',
    descriptiveName: 'Advanced sign (150 m)',
    description: 'Vienna A, 29a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pannello_distanziometrico_150.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.11b',
    signId: 'II.11b',
    name: 'Pannello distanziometrico',
    descriptiveName: 'Advanced sign (100 m)',
    description: 'Vienna A, 29b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pannello_distanziometrico_100.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.11c',
    signId: 'II.11c',
    name: 'Pannello distanziometrico',
    descriptiveName: 'Advanced sign (50 m)',
    description: 'Vienna A, 29c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pannello_distanziometrico_50.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.20',
    signId: 'II.20',
    name: 'Ponte mobile',
    descriptiveName: 'Movable bridge',
    description: 'Vienna A, 5',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'bridge', value: 'movable' }] },
    ],
    catalogue: { signCategory: 'hazard_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_ponte_mobile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.36',
    signId: 'II.36',
    name: 'Dare precedenza',
    descriptiveName: 'Give way',
    description: 'Vienna B, 1',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['node'], highwayValues: ['give_way'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_dare_precedenza.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.37',
    signId: 'II.37',
    name: 'Fermarsi e dare precedenza',
    descriptiveName: 'Stop',
    description: 'Vienna B, 2a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['node'], highwayValues: ['stop'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fermarsi_e_dare_precedenza_-_stop.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.38',
    signId: 'II.38',
    name: 'Preavviso di dare precedenza',
    descriptiveName: 'Advance warning of give way',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_distanza_(modello_II_1-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.39',
    signId: 'II.39',
    name: 'Preavviso di fermarsi e dare precedenza',
    descriptiveName: 'Advance warning of stop',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.40',
    signId: 'II.40',
    name: 'Intersezione con precedenza a destra',
    descriptiveName: 'Intersection with general priority ahead',
    description: 'Vienna A, 18',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_intersezione_con_precedenza_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.41',
    signId: 'II.41',
    name: 'Dare precedenza nei sensi unici alternati',
    descriptiveName: 'Oncoming traffic has priority',
    description: 'Vienna B, 5',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_dare_precedenza_nei_sensi_unici_alternati.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.42',
    signId: 'II.42',
    name: 'Fine del diritto di precedenza',
    descriptiveName: 'End of priority road',
    description: 'Vienna B, 4',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_del_diritto_di_precedenza.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.43a',
    signId: 'II.43a',
    name: 'Intersezione con diritto di precedenza',
    descriptiveName: 'Intersection with a road the users of which must give way',
    description: 'Vienna A, 19a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_intersezione_con_diritto_di_precedenza.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.43b',
    signId: 'II.43b',
    name: 'Intersezione a "T" con diritto di precedenza',
    descriptiveName: 'Intersection with a road the users of which must give way',
    description: 'Vienna A, 19b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_intersezione_a_T_con_diritto_di_precedenza_dx.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.43c',
    signId: 'II.43c',
    name: 'Intersezione a "T" con diritto di precedenza',
    descriptiveName: 'Intersection with a road the users of which must give way',
    description: 'Vienna A, 19b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_intersezione_a_T_con_diritto_di_precedenza_sx.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.43d',
    signId: 'II.43d',
    name: 'Confluenza a destra',
    descriptiveName: 'Intersection with a road the users of which must give way',
    description: 'Vienna A, 19c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_confluenza_dx.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.43e',
    signId: 'II.43e',
    name: 'Confluenza a sinistra',
    descriptiveName: 'Intersection with a road the users of which must give way',
    description: 'Vienna A, 19c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_confluenza_sx.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.44',
    signId: 'II.44',
    name: 'Diritto di precedenza',
    descriptiveName: 'Priority road',
    description: 'Vienna B, 3',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_diritto_di_precedenza.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.45',
    signId: 'II.45',
    name: 'Diritto di precedenza nei sensi unici alternati',
    descriptiveName: 'Priority over oncoming traffic',
    description: 'Vienna B, 6',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_diritto_di_precedenza_nei_sensi_unici_alternati.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.46',
    signId: 'II.46',
    name: 'Divieto di transito',
    descriptiveName: 'Closed to all vehicles in both directions',
    description: 'Vienna C, 2',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          "Il divieto di transito vieta il transito a tutti i veicoli (veicoli a motore, biciclette, veicoli a trazione animale, veicoli a braccia ...). L'utilizzo della combinazione motor_vehicle=no + bicycle=no per mappare questo segnale è imprecisa in quanto si perdono le informazioni a riguardo dei veicoli a braccia, a trazione animale, slitte...",
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'vehicle', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.47',
    signId: 'II.47',
    name: 'Senso vietato',
    descriptiveName: 'No entry',
    description: 'Vienna C, 1a',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          "Nella grande maggioranza dei casi la presenza di questo segnale implica la presenza di un senso unico in direzione contraria; in alcuni casi è effettivamente possibile che la strada sia a doppio senso ma ne sia precluso l'accesso da un'entrata da una parte (senza avere neanche un tratto a senso unico). In questo caso per la mappatura è più appropriato l'uso di relazioni.",
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'oneway', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_senso_vietato.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.48',
    signId: 'II.48',
    name: 'Divieto di sorpasso',
    descriptiveName: 'Prohibition of overtaking',
    description: 'Vienna C, 13ab',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'overtaking', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_sorpasso.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.49',
    signId: 'II.49',
    name: 'Distanziamento minimo obbligatorio',
    descriptiveName: 'Minimum distance between vehicles',
    description: 'Vienna C, 10',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_distanziamento_minimo_obbligatorio.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.50',
    signId: 'II.50',
    name: 'Limite massimo di velocità',
    descriptiveName: 'Speed limit',
    description: 'Vienna C, 14',
    kind: 'traffic_sign',
    comments: [{ comment: 'Utilizzare: traffic_sign=maxspeed + maxspeed=*', lang: 'it' }],
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'source:maxspeed', value: 'sign' },
          { key: 'maxspeed:type', value: 'sign' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_limite_di_velocit%C3%A0_50.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.51',
    signId: 'II.51',
    name: 'Divieto di segnalazioni acustiche',
    descriptiveName: 'Prohibition of the use of audible warning devices',
    description: 'Vienna C, 15',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'honking', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_segnalazioni_acustiche.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.52',
    signId: 'II.52',
    name: 'Divieto di sorpasso per i veicoli di massa a pieno carico superiore a 3,5 tonnellate',
    descriptiveName: 'Prohibition of overtaking for trucks',
    description: 'Vienna C, 13ba',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'overtaking:hgv', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_sorpasso_per_veicoli_oltre_3,5t.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.53',
    signId: 'II.53',
    name: 'Transito vietato ai veicoli a trazione animale',
    descriptiveName: 'No entry for animal-powered vehicles',
    description: 'Vienna C, 3j',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'carriage', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_alla_trazione_animale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.54',
    signId: 'II.54',
    name: 'Transito vietato ai pedoni',
    descriptiveName: 'No entry for pedestrians',
    description: 'Vienna C, 3i',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'foot', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_pedoni.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.55',
    signId: 'II.55',
    name: 'Transito vietato alle biciclette',
    descriptiveName: 'No entry for bicycles',
    description: 'Vienna C, 3c',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          "Il divieto di transito si applica a tutti i velocipedi (ovvero l'insieme dei veicoli non a motore mossi per mezzo di pedali/manovelle) e non solo alle biciclette propriamente dette. In ogni caso il tag bicycle=* copre tutti i veicoli di questo genere.",
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'bicycle', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_velocipedi_(figura_II_55).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.56',
    signId: 'II.56',
    name: 'Transito vietato ai motocicli',
    descriptiveName: 'No entry for motorcycles',
    description: 'Vienna C, 3b',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          'Il divieto si riferisce ai soli motocicli (veicoli a motore a 2 ruote non considerati ciclomotori) e pertanto il segnale non ha alcuna implicazione per i ciclomotori (moped=*).',
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'motorcycle', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_motocicli.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.57',
    signId: 'II.57',
    name: 'Transito vietato ai veicoli a braccia',
    descriptiveName: 'No entry for hand carts',
    description: 'Vienna C, 3k',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'hand_cart', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_a_veicoli_a_braccia.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.58',
    signId: 'II.58',
    name: 'Transito vietato a tutti gli autoveicoli',
    descriptiveName: 'No entry for all motor vehicles',
    description: 'Vienna C, 3a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'motorcar', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_a_tutti_gli_autoveicoli.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.59',
    signId: 'II.59',
    name: 'Transito vietato agli autobus',
    descriptiveName: 'No entry for buses',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        accessTags: [{ key: 'bus', value: 'no' }],
        uniqueTags: [{ key: 'tourist_bus', value: 'no' }],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_agli_autobus.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.60a',
    signId: 'II.60a',
    name: 'Transito vietato ai veicoli di massa a pieno carico superiore a 3,5 tonnellate',
    descriptiveName: 'No entry for trucks (with a permissible maximum with more than 3.5 t)',
    description: 'Vienna C, 3e',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          'Il segnale vieta il transito ai veicoli destinati al trasporto di cose con massa a pieno carico superiore a 3,5 t che in OSM sono indicati con il tag hgv=*.',
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      { geometries: ['way'], accessTags: [{ key: 'hgv', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_ai_veicoli_da_trasporto.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.60b',
    signId: 'II.60b',
    name: 'Transito vietato ai veicoli di massa a pieno carico superiore a ... tonnellate',
    descriptiveName: 'No entry for trucks with a permissible maximum with more than ... t',
    description: null,
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          "Per mappare questo segnale in realtà sono diffusi (e sono probabilmente predominanti numericamente) differenti schemi di tagging, spesso basati sull'utilizzo di maxweight=* combinato con una restrizione condizionale. Il problema a riguardo di questi schemi è il fatto che il peso indicato nel segnale è una massa a pieno carico (maxweightrating=*) e non una massa effettiva (maxweight=*) e per lungo tempo si è utilizzato quest'ultimo tag per entrambi i casi.",
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_veicoli_di_massa_a_pieno_carico_superiore_alle_..._tonnellate_(figura_II_60-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.61',
    signId: 'II.61',
    name: 'Transito vietato a tutti i veicoli a motore trainanti un rimorchio',
    descriptiveName: 'No entry for vehicles drawing a trailer',
    description: 'Vienna C, 3f',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'trailer', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_ai_veicoli_a_motore_con_rimorchio.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.62',
    signId: 'II.62',
    name: 'Transito vietato alle macchine agricole',
    descriptiveName: 'No entry for tractors',
    description: 'Vienna C, 3l',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'agricultural', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_alle_macchine_agricole.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.63',
    signId: 'II.63',
    name: 'Transito vietato ai veicoli che trasportano merci pericolose',
    descriptiveName: 'No entry for vehicles transporting dangerous goods',
    description: 'Vienna C, 3h',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazmat', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_a_trasporti_pericolosi.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.64a',
    signId: 'II.64a',
    name: 'Transito vietato ai veicoli che trasportano esplosivi o prodotti facilmente infiammabili',
    descriptiveName: 'No entry for vehicles carrying explosives or readily inflammable substances',
    description: 'Vienna C, 3m',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazmat:explosive', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_ai_veicoli_con_esplosivi_od_infiammabili.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.64b',
    signId: 'II.64b',
    name: "Transito vietato ai veicoli che trasportano prodotti suscettibili di contaminare l'acqua",
    descriptiveName: 'No entry for vehicles carrying goods capable of water pollution',
    description: 'Vienna C, 3n',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazmat:water', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_agli_inquinanti_idrici.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.65',
    signId: 'II.65',
    name: 'Transito vietato ai veicoli aventi larghezza superiore a ... metri',
    descriptiveName: 'No entry for vehicles wider than the specified limit',
    description: 'Vienna C, 5',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_veicoli_aventi_larghezza_superiore_a_..._metri_(figura_II_65).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.66',
    signId: 'II.66',
    name: 'Transito vietato ai veicoli aventi altezza complessiva superiore a ... metri',
    descriptiveName: 'No entry for vehicles higher than the specified limit',
    description: 'Vienna C, 6',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_veicoli_aventi_altezza_superiore_a_..._metri_(figura_II_66).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.67',
    signId: 'II.67',
    name: 'Transito vietato ai veicoli, o a complessi di veicoli, aventi lunghezza superiore a ... metri',
    descriptiveName:
      'No entry for vehicles or vehicle combinations longer than the specified limit',
    description: 'Vienna C, 9',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          'Si noti che il divieto di transito si applicata a tutti i veicoli più lunghi del valore indicato e non solamente agli autocarri (nonostante nel disegno compaia un camion).',
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_ai_veicoli_lunghi.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.68',
    signId: 'II.68',
    name: 'Transito vietato ai veicoli aventi una massa superiore a ... tonnellate',
    descriptiveName: 'No entry for vehicles heavier than the specified limit',
    description: 'Vienna C, 7',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_veicoli_aventi_una_massa_superiore_a_..._tonnellate_(figura_II_68).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.69',
    signId: 'II.69',
    name: 'Transito vietato ai veicoli aventi massa per asse superiore a ... tonnellate',
    descriptiveName:
      'No entry for vehicles which immediate weight per axle is over the specified limit',
    description: 'Vienna C, 8',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_transito_vietato_ai_veicoli_aventi_massa_per_asse_superiore_a_..._tonnellate_(figura_II_69).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.70',
    signId: 'II.70',
    name: 'Via libera',
    descriptiveName: 'End of all prohibitions',
    description: 'Vienna C, 17a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_via_libera.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.71',
    signId: 'II.71',
    name: 'Fine limitazione di velocità',
    descriptiveName: 'End of speed limit',
    description: 'Vienna C, 17b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_limite_di_velocit%C3%A0_50.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.72',
    signId: 'II.72',
    name: 'Fine divieto di sorpasso',
    descriptiveName: 'End of overtaking prohibition',
    description: 'Vienna C, 17c',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_del_divieto_di_sorpasso.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.73',
    signId: 'II.73',
    name: 'Fine divieto di sorpasso per i veicoli di massa a pieno carico superiore a 3,5 t',
    descriptiveName: 'End of overtaking prohibition for trucks',
    description: 'Vienna C, 17d',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_del_divieto_di_sorpasso_per_veicoli_oltre_3,5t.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.74',
    signId: 'II.74',
    name: 'Divieto di sosta',
    descriptiveName: 'Parking prohibited',
    description: 'Vienna C, 18',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          'Il divieto di sosta si applica al lato della strada dove è posto il segnale. Si ricordi che nei centri abitati, in assenza di ulteriori indicazioni (es. pannello integrativo, linea continua al margine della carreggiata, cordolo dipinto in giallo e nero, ...) il divieto di sosta si applica solo dalle 8.00 alle 20:00; fuori dai centri abitati invece il divieto è permanente (salvo diversa indicazione).',
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'parking:side:restriction', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_sosta.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.75',
    signId: 'II.75',
    name: 'Divieto di fermata',
    descriptiveName: 'Standing and parking prohibited',
    description: 'Vienna C, 19',
    kind: 'traffic_sign',
    comments: [
      {
        comment:
          'Il divieto di fermata si applica al lato della strada dove è posto il segnale. Salvo diversa indicazione il segnale ha sempre validità permanente (sia dentro che fuori i centri abitati).',
        lang: 'it',
      },
    ],
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [{ key: 'parking:side:restriction', value: 'no_stopping' }],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_fermata.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.76',
    signId: 'II.76',
    name: 'Parcheggio',
    descriptiveName: 'Parking',
    description: 'Vienna E, 14a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'parking' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_parcheggio_(figura_II_76).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.77',
    signId: 'II.77',
    name: 'Preavviso di parcheggio',
    descriptiveName: 'Advance warning of parking',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_parcheggio_(figura_II_77).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.78',
    signId: 'II.78',
    name: 'Passo carrabile',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'parking:side:restriction', value: 'no' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_passo_carrabile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.79',
    signId: 'II.79',
    name: 'Sosta consentita a particolare categoria',
    descriptiveName: 'Various parking exceptions',
    description: null,
    kind: 'traffic_sign',
    comments: [{ comment: 'Segnale composito, usando diversi modelli', lang: 'it' }],
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_parcheggio_riservato_pronto_soccorso.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.80a',
    signId: 'II.80a',
    name: 'Direzione obbligatoria diritto',
    descriptiveName: 'Mandatory direction straight ahead',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'only_straight_on' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzione_obbligatoria_dritto.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.80b',
    signId: 'II.80b',
    name: 'Direzione obbligatoria a sinistra',
    descriptiveName: 'Turn left here',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'only_left_turn' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzione_obbligatoria_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.80c',
    signId: 'II.80c',
    name: 'Direzione obbligatoria a destra',
    descriptiveName: 'Turn right here',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'only_right_turn' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzione_obbligatoria_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.80d',
    signId: 'II.80d',
    name: 'Preavviso di direzione obbligatoria a destra',
    descriptiveName: 'Mandatory left turn',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'only_right_turn' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_direzione_obbligatoria_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.80e',
    signId: 'II.80e',
    name: 'Preavviso di direzione obbligatoria a sinistra',
    descriptiveName: 'Mandatory right turn',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'only_left_turn' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_direzione_obbligatoria_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.81a',
    signId: 'II.81a',
    name: 'Direzioni consentite destra e sinistra',
    descriptiveName: 'Mandatory right or left turn',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'no_straight_on' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzioni_consentite_a_destra_ed_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.81b',
    signId: 'II.81b',
    name: 'Direzioni consentite diritto e destra',
    descriptiveName: 'Mandatory direction straight ahead or right turn',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'no_left_turn' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzioni_consentite_a_dritto_ed_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.81c',
    signId: 'II.81c',
    name: 'Direzioni consentite diritto e sinistra',
    descriptiveName: 'Mandatory direction straight ahead or left turn',
    description: 'Vienna D, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['relation'],
        uniqueTags: [
          { key: 'type', value: 'restriction' },
          { key: 'restriction', value: 'no_right_turn' },
        ],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzioni_consentite_a_dritto_ed_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.82a',
    signId: 'II.82a',
    name: 'Passaggio obbligatorio a sinistra',
    descriptiveName: 'Pass by on the left-hand side',
    description: 'Vienna D, 2',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_passaggio_obbligatorio_a_sinistra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.82b',
    signId: 'II.82b',
    name: 'Passaggio obbligatorio a destra',
    descriptiveName: 'Pass by on the right-hand side',
    description: 'Vienna D, 2',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_passaggio_obbligatorio_a_destra.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.83',
    signId: 'II.83',
    name: 'Passaggi consentiti',
    descriptiveName: 'Drive around',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_passaggi_consentiti.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.84',
    signId: 'II.84',
    name: 'Rotatoria',
    descriptiveName: 'Compulsary Roundabout',
    description: 'Vienna D, 3',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'junction', value: 'roundabout' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_rotatoria.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.85',
    signId: 'II.85',
    name: 'Limite minimo di velocità',
    descriptiveName: 'Compulsory minimum speed',
    description: 'Vienna D, 7',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_limite_minimo_di_velocit%C3%A0_(figura_II_85).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.86',
    signId: 'II.86',
    name: 'Fine limite minimo di velocità',
    descriptiveName: 'End of compulsory minimum speed',
    description: 'Vienna D, 8',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_limite_minimo_di_velocit%C3%A0_30.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.87',
    signId: 'II.87',
    name: 'Catene per neve obbligatorie',
    descriptiveName: 'Snow chains compulsory',
    description: 'Vienna D, 9',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'snow_chains', value: 'required' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_catene_da_neve_obbligatorie.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.88',
    signId: 'II.88',
    name: 'Percorso pedonale',
    descriptiveName: 'Compulsory footpath',
    description: 'Vienna D, 5',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['footway'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_percorso_pedonale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.89',
    signId: 'II.89',
    name: 'Fine del percorso pedonale',
    descriptiveName: 'End footpath',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_percorso_pedonale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.90',
    signId: 'II.90',
    name: 'Pista ciclabile',
    descriptiveName: 'Compulsory cycle track',
    description: 'Vienna D, 4',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['cycleway'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pista_ciclabile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.91',
    signId: 'II.91',
    name: 'Fine pista ciclabile',
    descriptiveName: 'End Cycleway',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_pista_ciclabile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.92a',
    signId: 'II.92a',
    name: 'Pista ciclabile contigua al marciapiede',
    descriptiveName: 'Footpath and cycleway',
    description: 'Vienna D, 11a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: ['cycleway'],
        accessTags: [
          { key: 'foot', value: 'designated' },
          { key: 'bicycle', value: 'designated' },
        ],
        uniqueTags: [{ key: 'segregated', value: 'yes' }],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pista_ciclabile_contigua_al_marciapiede.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.93a',
    signId: 'II.93a',
    name: 'Fine della pista ciclabile contigua al marciapiede',
    descriptiveName: 'End of footpath and cycleway',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_pista_ciclabile_contigua_al_marciapiede.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.92b',
    signId: 'II.92b',
    name: 'Percorso pedonale e ciclabile',
    descriptiveName: 'Footpath and cycleway',
    description: 'Vienna D, 11b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: ['cycleway'],
        accessTags: [
          { key: 'foot', value: 'designated' },
          { key: 'bicycle', value: 'designated' },
        ],
        uniqueTags: [{ key: 'segregated', value: 'no' }],
      },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_percorso_pedonale_e_ciclabile_(figura_II_92-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.93b',
    signId: 'II.93b',
    name: 'Fine del percorso pedonale e ciclabile',
    descriptiveName: 'End of footpath and cycleway',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_percorso_pedonale_e_ciclabile.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.94',
    signId: 'II.94',
    name: 'Percorso riservato ai quadrupedi da soma o da sella',
    descriptiveName: 'Compulsory track for riders on horseback',
    description: 'Vienna D, 6',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['bridleway'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_percorso_riservato_ai_quadrupedi.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.95',
    signId: 'II.95',
    name: 'Fine del percorso riservato ai quadrupedi da soma o da sella',
    descriptiveName: 'End of path for riders on animals',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_percorso_riservato_ai_quadrupedi.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.96',
    signId: 'II.96',
    name: 'Alt - Dogana',
    descriptiveName: 'Prohibition of passing without stopping (Customs)',
    description: 'Vienna C, 16',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'customs' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_dogana.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.97a',
    signId: 'II.97a',
    name: 'Confine di Stato tra paesi della Comunità Europea',
    descriptiveName: 'European state boundary',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_confine_di_Stato_tra_paesi_della_Comunit%C3%A0_Europea_(figura_II_97-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.97b',
    signId: 'II.97b',
    name: 'Preavviso di confine di Stato tra paesi della Comunità Europea',
    descriptiveName: 'Advance warning of european state boundary',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_confine_di_Stato_tra_paesi_della_Comunit%C3%A0_Europea_(Francia).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.98',
    signId: 'II.98',
    name: 'Alt - Polizia',
    descriptiveName: 'Prohibition of passing without stopping (Police)',
    description: 'Vienna C, 16',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Fig._52_-_Alt_-_Polizia_-_1959.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.99',
    signId: 'II.99',
    name: 'Alt - Stazione',
    descriptiveName: 'Prohibition of passing without stopping (Tollbooth)',
    description: 'Vienna C, 16',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'barrier', value: 'toll_booth' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_stazione.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.233',
    signId: 'II.233',
    name: 'Segnale di preavviso di intersezione urbana',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezione_urbana_(figura_II_233).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.234',
    signId: 'II.234',
    name: 'Segnale di preavviso di intersezione extraurbana',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezione_extraurbana.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.235',
    signId: 'II.235',
    name: 'Segnale di preavviso di diramazione autostradale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezione_per_diramazione_autostradale_(figura_II_235).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.236',
    signId: 'II.236',
    name: 'segnale di preavviso di intersezioni ravvicinate urbane',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezioni_ravvicinate_urbane_(figura_II_236).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.237',
    signId: 'II.237',
    name: 'segnale di preavviso di intersezioni ravvicinate extraurbane',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezioni_ravvicinate_extraurbane_(figura_II_237).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.238',
    signId: 'II.238',
    name: 'segnale di preavviso di intersezione urbana rotatoria',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezione_urbana_rotatoria_(figura_II_238).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.239',
    signId: 'II.239',
    name: 'segnale di preavviso di intersezione urbana, con divieto di transito per una categoria di veicoli su un ramo della intersezione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezione_urbana,_con_divieto_di_transito_per_una_categoria_di_veicoli_su_un_ramo_della_intersezione_(figura_II_239).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.240',
    signId: 'II.240',
    name: "segnale di preavviso di intersezione extraurbana con passaggio a livello su un ramo dell'intersezione",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preavviso_di_intersezione_extraurbana_con_passaggio_a_livello_su_un_ramo_dell%27intersezione_(figura_II_240).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.241',
    signId: 'II.241',
    name: 'segnale di preselezione urbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preselezione_urbano_(figura_II_241).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.242',
    signId: 'II.242',
    name: 'segnale di preselezione urbano posto sopra la carreggiata',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preselezione_urbano_posto_sopra_la_carreggiata_(figura_II_242).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.243',
    signId: 'II.243',
    name: 'Segnale di preselezione extraurbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preselezione_extraurbano_(figura_II_243).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.244',
    signId: 'II.244',
    name: 'segnale di preselezione urbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preselezione_urbano_(figura_II_244).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.245',
    signId: 'II.245',
    name: 'Segnale di preselezione extraurbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_preselezione_extraurbano.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.246',
    signId: 'II.246',
    name: 'segnali di corsia con funzione di preavviso',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnali_di_corsia_con_funzione_di_preavviso_(figura_II_246).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.247',
    signId: 'II.247',
    name: 'segnali di corsia con funzioni di preselezione e di direzione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnali_di_corsia_con_funzioni_di_preselezione_e_di_direzione_(figura_II_247).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.248',
    signId: 'II.248',
    name: 'segnale di direzione urbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_direzione_urbano_(figura_II_248).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.249',
    signId: 'II.249',
    name: 'segnale di direzione extraurbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_direzione_extraurbano_(figura_II_249).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.251',
    signId: 'II.251',
    name: 'segnali di corsia con funzioni di direzione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnali_di_corsia_con_funzioni_di_direzione_(figura_II_251).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.250',
    signId: 'II.250',
    name: 'segnali di corsia con funzione di direzione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnali_di_corsia_con_funzione_di_direzione_(figura_II_250).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.253',
    signId: 'II.253',
    name: 'gruppo segnaletico unitario urbano monofilare',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_gruppo_segnaletico_unitario_urbano_monofilare_(figura_II_253).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.254',
    signId: 'II.254',
    name: 'gruppo segnaletico unitario extraurbano',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_gruppo_segnaletico_unitario_extraurbano_(figura_II_254).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.252',
    signId: 'II.252',
    name: "segnali di corsia con funzione di direzione con le modalità per l'utilizzo delle singole corsie",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnali_di_corsia_con_funzione_di_direzione_con_le_modalit%C3%A0_per_l%27utilizzo_delle_singole_corsie_(figura_II_252).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.255',
    signId: 'II.255',
    name: 'gruppo segnaletico unitario urbano bifilare',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_gruppo_segnaletico_unitario_urbano_bifilare_(figura_II_255).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.256',
    signId: 'II.256',
    name: 'segnale identificazione itinerario internazionale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_identificazione_itinerario_internazionale_(figura_II_256).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.257',
    signId: 'II.257',
    name: 'segnale identificazione autostrada',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_identificazione_autostrada_(figura_II_257).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.258',
    signId: 'II.258',
    name: 'segnale identificazione strada statale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_identificazione_strada_statale_(figura_II_258).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.259',
    signId: 'II.259',
    name: 'segnale identificazione strada provinciale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_identificazione_strada_provinciale_(figura_II_259).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.260',
    signId: 'II.260',
    name: 'segnale di progressiva chilometrica',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_progressiva_chilometrica_(figura_II_261).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.261',
    signId: 'II.261',
    name: 'segnale identificazione strada comunale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_identificazione_strada_comunale_(figura_II_260).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.262',
    signId: 'II.262',
    name: 'segnale di progressiva ettometrica',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_progressiva_ettometrica_(figura_II_262).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.263',
    signId: 'II.263',
    name: 'progressiva distanziometrica autostradale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_progressiva_distanziometrica_autostradale_(figura_II_263).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.264',
    signId: 'II.264',
    name: 'progressiva distanziometrica autostradale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_progressiva_km_autostradale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.265',
    signId: 'II.265',
    name: 'progressiva distanziometrica integrata con segnale di conferma su strade extraurbane',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_progressiva_distanziometrica_integrata_con_segnale_di_conferma_su_strade_extraurbane_(figura_II_265).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.266',
    signId: 'II.266',
    name: 'progressiva distanziometrica per strada statale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_progressiva_distanziometrica_per_strada_statale_(figura_II_266).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.267',
    signId: 'II.267',
    name: 'progressiva distanziometrica per strada provinciale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_progressiva_distanziometrica_per_strada_provinciale_(figura_II_267).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.268',
    signId: 'II.268',
    name: 'progressiva distanziometrica per strada comunale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['milestone'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_progressiva_distanziometrica_per_strada_comunale_(figura_II_268).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.269',
    signId: 'II.269',
    name: 'numero identificazione autostrada + freccia verticale con funzione di direzione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_numero_identificazione_autostrada_%2B_freccia_verticale_con_funzione_di_direzione_(figura_II_269).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.270',
    signId: 'II.270',
    name: 'numeri identificazione strada statale + freccia e strada comunale + freccia con funzione di direzione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_numeri_identificazione_strada_statale_%2B_freccia_e_strada_comunale_%2B_freccia_con_funzione_di_direzione_(figura_II_270).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.271',
    signId: 'II.271',
    name: 'numero identificazione strada provinciale + freccia con funzione di direzione',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_numero_identificazione_strada_provinciale_%2B_freccia_con_funzione_di_direzione_(figura_II_271).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.272',
    signId: 'II.272',
    name: 'Segnale di itinerario',
    descriptiveName: 'Itinerary sign',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_itinerario_extraurbano_(figura_II_272).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.273',
    signId: 'II.273',
    name: 'Inizio centro abitato',
    descriptiveName: 'Begin of city limits',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_inizio_centro_abitato_(figura_II_273).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.274',
    signId: 'II.274',
    name: 'Fine centro abitato',
    descriptiveName: 'End of city limits',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'city_limit', value: 'end' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_centro_abitato_(figura_II_274).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.275',
    signId: 'II.275',
    name: 'Inizio e fine regione',
    descriptiveName: 'Begin and end of region',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_inizio_e_fine_regione_(figura_II_275).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.276',
    signId: 'II.276',
    name: 'Inizio e fine provincia',
    descriptiveName: 'Begin and end of province',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_inizio_e_fine_provincia_(figura_II_276).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.277',
    signId: 'II.277',
    name: 'Pronto soccorso',
    descriptiveName: 'First aid',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_pronto_soccorso_(figura_II_277).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.278',
    signId: 'II.278',
    name: 'Stazione',
    descriptiveName: 'Station',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_stazione_(figura_II_278).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.279',
    signId: 'II.279',
    name: 'Polizia',
    descriptiveName: 'Police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_polizia_(figura_II_279).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.280',
    signId: 'II.280',
    name: 'Carabinieri',
    descriptiveName: 'Military police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_carabinieri_(figura_II_280).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.281',
    signId: 'II.281',
    name: 'Informazioni',
    descriptiveName: 'Informations',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_informazioni_(figura_II_281).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.282',
    signId: 'II.282',
    name: 'Ospedale',
    descriptiveName: 'Hospital',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_ospedale_(figura_II_282).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.283',
    signId: 'II.283',
    name: 'Comune',
    descriptiveName: 'City hall',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_comune_(figura_II_283).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.284',
    signId: 'II.284',
    name: 'Polizia municipale',
    descriptiveName: 'City police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_localizzazione_polizia_municipale_(figura_II_284).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.285',
    signId: 'II.285',
    name: 'Segnale di conferma Autostradale',
    descriptiveName: 'Motorway confirmatory sign',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_conferma_autostradale_(figura_II_285).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.286',
    signId: 'II.286',
    name: 'Segnale di conferma Autostradale',
    descriptiveName: 'Motorway confirmatory sign',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_numero_identificazione_autostrada_%2B_freccia_verticale_con_funzione_di_conferma_(figura_II_286).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.287',
    signId: 'II.287',
    name: 'Segnale di conferma Urbano',
    descriptiveName: 'Urban confirmatory sign',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_conferma_urbano_(figura_II_287).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.288',
    signId: 'II.288',
    name: 'Segnale di conferma Urbano a 2 posti',
    descriptiveName: 'Urban confirmatory sign with 2 spaces',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_conferma_urbano_(figura_II_288).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.289',
    signId: 'II.289',
    name: 'Segnale di conferma urbano a 3 posti',
    descriptiveName: 'Urban confirmatory sign with 3 spaces',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_conferma_urbano_(figura_II_289).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.291',
    signId: 'II.291',
    name: 'Segnale Nome Strada',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_nome_strada.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.292',
    signId: 'II.292',
    name: 'Segnale nome strada con senso unico',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'oneway', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_nome-strada_combinato_col_senso_unico_e_numeri_civici_(figura_II_292).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.293',
    signId: 'II.293',
    name: 'Numero civico',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_numero_civico_perpendicolare_all%27asse_stradale_(figura_II_293).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.294',
    signId: 'II.294',
    name: 'segnali turistici e di territorio',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnali_turistici_e_di_territorio_(figura_II_294).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.295',
    signId: 'II.295',
    name: 'Segnale di localizzazione territoriale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fiume.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.297',
    signId: 'II.297',
    name: 'Segnali di direzione per le industrie',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzione_per_le_industrie.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.296',
    signId: 'II.296',
    name: 'Segnale di avvio zona industriale',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_avvio_zona_industriale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.298',
    signId: 'II.298',
    name: 'Preavviso di informazioni turistico alberghiere',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_informazioni_turistico_alberghiere.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.299',
    signId: 'II.299',
    name: 'informazioni alberghiere',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_informazioni_alberghere.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.300',
    signId: 'II.300',
    name: 'preavviso alberghiero',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_alberghero.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.301',
    signId: 'II.301',
    name: 'direzione alberghiera',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzione_alberghiera.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.302',
    signId: 'II.302',
    name: 'Ospedale',
    descriptiveName: 'Hospital',
    description: 'Vienna E, 13b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'hospital' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_ospedale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.303',
    signId: 'II.303',
    name: 'Attraversamento pedonale',
    descriptiveName: 'Pedestrian crossing',
    description: 'Vienna E, 12a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['node'], highwayValues: ['crossing'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_attraversamento_pedonale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.304',
    signId: 'II.304',
    name: 'Scuolabus',
    descriptiveName: 'School bus (stop)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_scuolabus_(figura_II_304).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.305',
    signId: 'II.305',
    name: 'SOS',
    descriptiveName: 'Emergency phone',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'emergency', value: 'phone' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_SOS_(figura_II_305).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.306',
    signId: 'II.306',
    name: 'Sottopassaggio pedonale',
    descriptiveName: 'Pedestrian underpass',
    description: 'Vienna G, 20',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: ['footway'],
        uniqueTags: [{ key: 'tunnel', value: 'yes' }],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_sottopassaggio_pedonale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.307',
    signId: 'II.307',
    name: 'Sovrapassaggio pedonale',
    descriptiveName: 'Pedestrian overpass',
    description: 'Vienna G, 20',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: ['footway'],
        uniqueTags: [{ key: 'bridge', value: 'yes' }],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_sovrappassaggio_pedonale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.308',
    signId: 'II.308',
    name: 'Rampa pedonale',
    descriptiveName: 'Pedestrian underpass without steps',
    description: 'Vienna G, 21',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: ['footway'],
        uniqueTags: [{ key: 'tunnel', value: 'yes' }],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_rampa_pedonale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.309',
    signId: 'II.309',
    name: 'Strada senza uscita',
    descriptiveName: 'No through road',
    description: 'Vienna G, 13',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'noexit', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strada_senza_uscita.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.310',
    signId: 'II.310',
    name: 'Preavviso di strada senza uscita',
    descriptiveName: 'No through road on side road',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'noexit', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_strada_senza_uscita_OSX.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.311',
    signId: 'II.311',
    name: 'Preavviso di strada senza uscita',
    descriptiveName: 'No through road on side road',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'noexit', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_strada_senza_uscita_DX.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.312',
    signId: 'II.312',
    name: 'Velocità consigliata',
    descriptiveName: 'Advisory speed',
    description: 'Vienna G, 17',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_velocit%C3%A0_consigliata_50.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.313',
    signId: 'II.313',
    name: 'Fine velocità consigliata',
    descriptiveName: 'End advisory speed',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_velocit%C3%A0_consigliata_50.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.314',
    signId: 'II.314',
    name: 'Strada riservata ai veicoli a motore',
    descriptiveName: 'Motorroad (road for motor vehicles only)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'motorroad', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strada_riservata_ai_veicoli_a_motore.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.315',
    signId: 'II.315',
    name: 'Fine strada riservata ai veicoli a motore',
    descriptiveName: 'End of motorroad (end of road for motor vehicles only)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'motorroad', value: 'no' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_strada_riservata_ai_veicoli_a_motore.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.316',
    signId: 'II.316',
    name: 'Galleria',
    descriptiveName: 'Tunnel',
    description: 'Vienna E, 11a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tunnel', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_galleria_blu.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.317',
    signId: 'II.317',
    name: 'Ponte',
    descriptiveName: 'Bridge',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'bridge', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_ponte_blu.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.318',
    signId: 'II.318',
    name: 'Zona residenziale',
    descriptiveName: 'Home zone',
    description: 'Vienna E, 17',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_zona_residenziale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.319',
    signId: 'II.319',
    name: 'Fine zona residenziale',
    descriptiveName: 'End of home zone',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_zona_residenziale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.320',
    signId: 'II.320',
    name: 'Area pedonale urbana',
    descriptiveName: 'Pedestrian zone',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['pedestrian'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_area_pedonale_(figura_II_320).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.321',
    signId: 'II.321',
    name: 'Fine area pedonale urbana',
    descriptiveName: 'End of pedestrian zone',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['pedestrian'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_area_pedonale_(figura_II_321).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.322a',
    signId: 'II.322a',
    name: 'Zona a traffico limitato',
    descriptiveName: 'Restricted vehicluar access zone',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'boundary', value: 'limited_traffic_zone' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_zona_traffico_limitato_(figura_II_322-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.322b',
    signId: 'II.322b',
    name: 'Fine zona a traffico limitato',
    descriptiveName: 'End of restricted vehicluar access zone',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'boundary', value: 'limited_traffic_zone' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_zona_a_traffico_limitato_(figura_II_322-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.323a',
    signId: 'II.323a',
    name: 'Zona a velocità limitata',
    descriptiveName: 'Maximum speed zone',
    description: 'Vienna E, 9d',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'maxspeed', value: '30' },
          { key: 'zone:maxspeed', value: 'IT:30' },
          { key: 'maxspeed:type', value: 'IT:zone30' },
        ],
      },
    ],
    catalogue: { signCategory: 'speed' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_zona_a_velocit%C3%A0_limitata_(figura_II_323-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.323b',
    signId: 'II.323b',
    name: 'Fine zona a velocità limitata',
    descriptiveName: 'End maximum speed zone',
    description: 'Vienna E, 10d',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_zona_a_velocit%C3%A0_limitata_(figura_II_323-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.324',
    signId: 'II.324',
    name: 'Attraversamento ciclabile',
    descriptiveName: 'Bicycle crossing',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['node'], highwayValues: ['crossing'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_attraversamento_ciclabile_2.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.325',
    signId: 'II.325',
    name: 'Svolta a sinistra semidiretta',
    descriptiveName: 'Route for making an indirect left turn',
    description: 'Vienna G, 3',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_svolta_a_sx_semidiretta.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.326',
    signId: 'II.326',
    name: 'Svolta a sinistra indiretta',
    descriptiveName: 'Route for making an indirect left turn',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_svolta_a_sx_indiretta.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.327',
    signId: 'II.327',
    name: 'Inversione di marcia',
    descriptiveName: 'Infrastructure for reversing (u-turn)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_inversione_di_marcia.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.328',
    signId: 'II.328',
    name: 'Piazzola su viabilità ordinaria',
    descriptiveName: 'Emergency stopping place',
    description: 'Vienna E, 18a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['emergency_bay'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_piazzola_su_viabilit%C3%A0_ordinaria.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.329',
    signId: 'II.329',
    name: 'Piazzola + SOS autostradale',
    descriptiveName: 'Emergency stopping place with emergency phone (on motorways)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        highwayValues: ['emergency_bay'],
        uniqueTags: [{ key: 'emergency', value: 'phone' }],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_piazzola_autostradale_sos.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.330',
    signId: 'II.330',
    name: 'Transitabilità',
    descriptiveName: 'Road open or closed',
    description: 'Vienna G, 15',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_via_libera_(figura_II_331).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.337',
    signId: 'II.337',
    name: 'Uso corsie su strada extraurbana',
    descriptiveName: 'Lanes usage for extra urban roads',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_uso_corsie_(figura_II_337).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.338',
    signId: 'II.338',
    name: 'Uso corsie su autostrada',
    descriptiveName: 'Lanes usage for motor roads',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_uso_corsie_(figura_II_338).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.339',
    signId: 'II.339',
    name: 'Uso corsie su strada urbana',
    descriptiveName: 'Lanes usage for urban roads',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_uso_corsie_(figura_II_339).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.340',
    signId: 'II.340',
    name: 'Uso corsie su strada urbana a senso unico',
    descriptiveName: 'Lanes usage for one-way urban roads',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_uso_corsie_(figura_II_340).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.341',
    signId: 'II.341',
    name: 'Variazione corsie disponibili',
    descriptiveName: 'Change in the number of lanes (2 -> 1)',
    description: 'Vienna G, 12a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_variazione_corsie_disponibili_(figura_II_341).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.342',
    signId: 'II.342',
    name: 'Variazione corsie disponibili',
    descriptiveName: 'Change in the number of lanes (1 -> 2)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_variazione_corsie_disponibili_(figura_II_342).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.343',
    signId: 'II.343',
    name: 'Variazione corsie disponibili',
    descriptiveName: 'Change in the number of lanes (3 -> 2)',
    description: 'Vienna G, 12a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_variazione_corsie_disponibili_(figura_II_343,_verde).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.344',
    signId: 'II.344',
    name: 'Variazione corsie disponibili',
    descriptiveName: 'Change in the number of lanes (2 -> 3)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_variazione_corsie_disponibili_(figura_II_344,_verde).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.345',
    signId: 'II.345',
    name: 'Inizio autostrada (sfondo verde) / inizio strada extraurbana principale (sfondo blu)',
    descriptiveName: 'Motorway (green background) / Expressway (blue background)',
    description: 'Vienna E, 5a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_inizio_autostrada_(figura_II_345).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.346',
    signId: 'II.346',
    name: 'Fine autostrada (sfondo verde) / fine strada extraurbana principale (sfondo blu)',
    descriptiveName: 'End motorway (green background) / end expressway (blue background)',
    description: 'Vienna E, 5b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_fine_autostrada.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.347',
    signId: 'II.347',
    name: 'Preavviso di inizio autostrada (sfondo verde) / preavviso di inizio strada extraurbana principale (sfondo blu)',
    descriptiveName: 'Motorway ahead (green background) / Expressway ahead (blue background)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_di_inizio_autostrada_(figura_II_347).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.348',
    signId: 'II.348',
    name: 'Senso unico parallelo',
    descriptiveName: 'One way',
    description: 'Vienna E, 3b',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'oneway', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_senso_unico_(a_destra).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.349',
    signId: 'II.349',
    name: 'Senso unico frontale',
    descriptiveName: 'One way',
    description: 'Vienna E, 3a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'oneway', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_senso_unico_frontale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.350',
    signId: 'II.350',
    name: 'Preavviso deviazione consigliata autocarri in transito',
    descriptiveName: 'Suggested detour for trucks ahead',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'route', value: 'detour' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_deviazione_consigliata_autocarri.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.351',
    signId: 'II.351',
    name: 'Deviazione consigliata autocarri in transito',
    descriptiveName: 'Advised itinerary for heavy vehicles',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'route', value: 'detour' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_direzione_autocarri_consigliata.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.352',
    signId: 'II.352',
    name: 'Limiti di velocità generali',
    descriptiveName: 'General speed limits',
    description: 'Vienna G, 14',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_limiti_di_velocit%C3%A0_generali_(figura_II_352).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.353',
    signId: 'II.353',
    name: 'Pronto soccorso',
    descriptiveName: 'First aid',
    description: 'Vienna F, 1a',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'emergency', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pronto_soccorso_(figura_II_353).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.354',
    signId: 'II.354',
    name: 'Assistenza meccanica',
    descriptiveName: 'Breakdown service',
    description: 'Vienna F, 2',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'craft', value: 'mechanic' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_riparazioni.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.355',
    signId: 'II.355',
    name: 'Telefono',
    descriptiveName: 'Telephone',
    description: 'Vienna F, 3',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'telephone' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_telefono.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.356',
    signId: 'II.356',
    name: 'Rifornimento',
    descriptiveName: 'Filling station',
    description: 'Vienna F, 4',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'fuel' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_rifornimento.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.357',
    signId: 'II.357',
    name: 'Rifornimento (verde)',
    descriptiveName: 'Filling station (green)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'fuel' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_rifornimento_verde.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.358',
    signId: 'II.358',
    name: 'Fermata autobus',
    descriptiveName: 'Bus stop',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'], highwayValues: ['bus_stop'] }],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_sign_-_fermata_autobus.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.359',
    signId: 'II.359',
    name: 'Fermata tram',
    descriptiveName: 'Tramway stop',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'railway', value: 'tram_stop' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fermata_tram.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.360',
    signId: 'II.360',
    name: 'Informazioni',
    descriptiveName: 'Informations',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'tourism', value: 'information' },
          { key: 'information', value: 'office' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_informazioni_(figura_II_360).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.361',
    signId: 'II.361',
    name: 'Ostello per la gioventù',
    descriptiveName: 'Youth hostel',
    description: 'Vienna F, 13',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'hostel' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_ostello_per_la_giovent%C3%B9.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.362',
    signId: 'II.362',
    name: 'Area per picnic',
    descriptiveName: 'Picnic site',
    description: 'Vienna F, 8',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'picnic_site' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_area_pic_nic.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.363',
    signId: 'II.363',
    name: 'Campeggio',
    descriptiveName: 'Camping and caravan site',
    description: 'Vienna F, 12',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'camp_site' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_campeggio.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.364',
    signId: 'II.364',
    name: 'Radio informazioni stradali',
    descriptiveName: 'Radio station giving traffic information',
    description: 'Vienna F, 14',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_radio_informazioni_stradali.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.365',
    signId: 'II.365',
    name: 'Motel',
    descriptiveName: 'Hotel or motel',
    description: 'Vienna F, 5',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'tourism', value: 'hotel' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_albergo.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.366',
    signId: 'II.366',
    name: 'Bar',
    descriptiveName: 'Refreshments or cafeteria',
    description: 'Vienna F, 7',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'bar' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_bar.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.367',
    signId: 'II.367',
    name: 'Ristorante',
    descriptiveName: 'Restaurant',
    description: 'Vienna F, 6',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'restaurant' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_ristorante.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.368',
    signId: 'II.368',
    name: 'Parcheggio di scambio (bus)',
    descriptiveName: 'Park and ride (bus)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'park_ride', value: 'bus' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_parcheggio_di_scambio_con_autobus.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.369',
    signId: 'II.369',
    name: 'Parcheggio di scambio (tram)',
    descriptiveName: 'Park and ride (tramway)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'park_ride', value: 'tram' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_parcheggio_di_scambio_con_tram.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.370',
    signId: 'II.370',
    name: 'Parcheggio di scambio (treno)',
    descriptiveName: 'Park and ride (railway)',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'parking' },
          { key: 'park_ride', value: 'train' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_parcheggio_di_scambio_con_metro.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.371',
    signId: 'II.371',
    name: 'Parcheggio di scambio (pedoni)',
    descriptiveName: 'Starting-point for walks',
    description: 'Vienna F, 9',
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'parking' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_parcheggio_%2B_escursionismo.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.372',
    signId: 'II.372',
    name: 'Auto su treno',
    descriptiveName: 'Motorail',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_auto_su_treno_(figura_II_372).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.373',
    signId: 'II.373',
    name: 'Auto al seguito',
    descriptiveName: 'Motorail',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_auto_al_seguito_(figura_II_373).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.374',
    signId: 'II.374',
    name: 'Auto su nave',
    descriptiveName: 'Ferry',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_auto_su_nave.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.375',
    signId: 'II.375',
    name: 'Taxi',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_taxi.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.376',
    signId: 'II.376',
    name: 'Area di servizio',
    descriptiveName: 'Service area',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'amenity', value: 'fuel' },
          { key: 'craft', value: 'mechanic' },
          { key: 'amenity', value: 'restaurant' },
        ],
      },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_area_di_servizio.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.377',
    signId: 'II.377',
    name: 'Area attrezzata con impianti di scarico',
    descriptiveName: 'Caravan waste disposal site',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'amenity', value: 'sanitary_dump_station' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_area_con_scarico_liquami.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.378',
    signId: 'II.378',
    name: 'Polizia Stradale',
    descriptiveName: 'Road Police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Segnale_stradale_italiano_-_polizia_stradale_(figura_II_378).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.379',
    signId: 'II.379',
    name: 'Polizia di stato',
    descriptiveName: 'State Police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_polizia_di_stato.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.380',
    signId: 'II.380',
    name: 'Carabinieri',
    descriptiveName: 'Military Police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_carabinieri.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'II.381',
    signId: 'II.381',
    name: 'Guardia di finanza',
    descriptiveName: 'Financial police',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_guardia_di_finanza.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.1',
    signId: 'MII.1',
    name: 'Distanza',
    descriptiveName: 'Distance',
    description: 'Vienna H, 1',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_distanza_(modello_II_1-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.2',
    signId: 'MII.2',
    name: 'Estesa',
    descriptiveName: 'Length',
    description: 'Vienna H, 2',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_estesa_(modello_II_2-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.3',
    signId: 'MII.3',
    name: 'Periodo',
    descriptiveName: 'Period',
    description: null,
    kind: 'condition_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_validit%C3%A0_(modello_II_3-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.3c',
    signId: 'MII.3c',
    name: 'Periodo',
    descriptiveName: 'Period',
    description: null,
    kind: 'condition_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_validit%C3%A0_(modello_II_3-c).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.3d',
    signId: 'MII.3d',
    name: 'Periodo',
    descriptiveName: 'Period',
    description: null,
    kind: 'condition_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_validit%C3%A0_(modello_II_3-d).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.4a',
    signId: 'MII.4a',
    name: 'Limitazioni',
    descriptiveName: 'Limitations',
    description: 'Vienna H, 5',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_limitazione_(modello_II_4-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.4b',
    signId: 'MII.4b',
    name: 'Eccezioni',
    descriptiveName: 'Exceptions',
    description: 'Vienna H, 6',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_eccezione_(modello_II_4-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.5a1',
    signId: 'MII.5a1',
    name: 'Inizio',
    descriptiveName: 'Begin',
    description: 'Vienna H, 4a',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_inizio_verticale_(modello_II_5-a1).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.5a2',
    signId: 'MII.5a2',
    name: 'Continuazione',
    descriptiveName: 'Repeat',
    description: 'Vienna H, 4b',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_continua_verticale_(modello_II_5-a2).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.5a3',
    signId: 'MII.5a3',
    name: 'Fine',
    descriptiveName: 'End',
    description: 'Vienna H, 4c',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_verticale_(modello_II_5-a3).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.5b1',
    signId: 'MII.5b1',
    name: 'Inizio',
    descriptiveName: 'Begin',
    description: 'Vienna H, 3a',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_inizio_orizzontale_(modello_II_5-b1).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.5b2',
    signId: 'MII.5b2',
    name: 'Continuazione',
    descriptiveName: 'Repeat',
    description: 'Vienna H, 3b',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_continua_orizzontale_(modello_II_5-b2).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.5b3',
    signId: 'MII.5b3',
    name: 'Fine',
    descriptiveName: 'End',
    description: 'Vienna H, 3c',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_fine_orizzontale_(modello_II_5-b3).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6',
    signId: 'MII.6',
    name: 'Pannello integrativo a testo libero',
    descriptiveName: 'Additional free text notice',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pannello_integrativi_a_testo_libero-eccetto_traffico_locale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6a',
    signId: 'MII.6a',
    name: 'Segni orizzontali in corso di rifacimento',
    descriptiveName: 'Missing road markings',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segni_orizzontali_in_rifacimento_(modello_II_6-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6b',
    signId: 'MII.6b',
    name: 'Incidente',
    descriptiveName: 'Accident',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_incidente_(modello_II_6-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6c',
    signId: 'MII.6c',
    name: 'Attraversamento di binari',
    descriptiveName: 'Road intersects tracks',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['node'], uniqueTags: [{ key: 'railway', value: 'level_crossing' }] },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_attraversamento_binari.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6d',
    signId: 'MII.6d',
    name: 'Sgombraneve in azione',
    descriptiveName: 'Snowplow in action',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_sgombraneve_in_azione.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6e',
    signId: 'MII.6e',
    name: 'Zona soggetta ad allagamento',
    descriptiveName: 'Flood prone zone',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'flood_prone', value: 'yes' }] },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_zona_soggetta_ad_allagamento.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6f',
    signId: 'MII.6f',
    name: 'Coda',
    descriptiveName: 'Congestion',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'queues_likely' }] },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_Coda.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6g',
    signId: 'MII.6g',
    name: 'Mezzi di lavoro in azione',
    descriptiveName: 'Heavy equipment in action',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_mezzi_di_lavoro_in_azione.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6h',
    signId: 'MII.6h',
    name: 'Strada sdrucciolevole per ghiaccio',
    descriptiveName: 'Slippery road because of ice or snow',
    description: 'Vienna H, 9',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'slippery' }] },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strada_sdrucciolevole_per_ghiaccio.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6i',
    signId: 'MII.6i',
    name: 'Strada sdrucciolevole per pioggia',
    descriptiveName: 'Slippery road because of rain',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'hazard', value: 'slippery' }] },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_strada_sdrucciolevole_per_pioggia.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6l',
    signId: 'MII.6l',
    name: 'Autocarri in rallentamento',
    descriptiveName: 'Trucks slowing down',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_sign_-_autocarri_in_rallentamento_(modello_II_6-l).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6m',
    signId: 'MII.6m',
    name: 'Zona rimozione coatta',
    descriptiveName: 'Forced removal',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_rimozione_forzata.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6n',
    signId: 'MII.6n',
    name: 'Segnale di corsia',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_segnale_di_corsia.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6p1',
    signId: 'MII.6p1',
    name: 'Tornanti',
    descriptiveName: 'Hairpin turn',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'curve' },
          { key: 'curve', value: 'hairpin' },
        ],
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_tornante_(modello_II_6-p1).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6p2',
    signId: 'MII.6p2',
    name: 'Tornanti',
    descriptiveName: 'Hairpin turn',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: [
      {
        geometries: ['way'],
        uniqueTags: [
          { key: 'hazard', value: 'curve' },
          { key: 'curve', value: 'hairpin' },
        ],
      },
    ],
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_numero_del_tornante_(modello_II_6-p2).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6q1',
    signId: 'MII.6q1',
    name: 'Pulizia stradale',
    descriptiveName: 'Road cleaning',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pulizia_meccanica_della_strada.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.6q2',
    signId: 'MII.6q2',
    name: 'Pulizia stradale',
    descriptiveName: 'Road cleaning',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_pulizia_meccanica_della_strada_(modello_II_6-q2).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.7a',
    signId: 'MII.7a',
    name: 'Andamento strada principale',
    descriptiveName: 'Bend in priority road',
    description: 'Vienna H, 8',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_andamento_strada_principale.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.7b',
    signId: 'MII.7b',
    name: 'Andamento strada principale',
    descriptiveName: 'Bend in priority road',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_andamento_strada_principale1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.7c',
    signId: 'MII.7c',
    name: 'Andamento strada principale',
    descriptiveName: 'Bend in priority road',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_andamento_strada_principale2.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.7d',
    signId: 'MII.7d',
    name: 'Andamento strada principale',
    descriptiveName: 'Bend in priority road',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_andamento_strada_principale3.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.7e',
    signId: 'MII.7e',
    name: 'Andamento strada principale',
    descriptiveName: 'Bend in priority road',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_andamento_strada_principale4.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.8a',
    signId: 'MII.8a',
    name: 'Divieto di sosta temporaneo',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_sosta_temporaneo_(modello_II_8-a).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.8b',
    signId: 'MII.8b',
    name: 'Itinerario obbligatorio per merci pericolose',
    descriptiveName: 'Mandatory direction for vehicles carrying dangerous goods',
    description: 'Vienna D, 10c',
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_itinerario_obbligatorio_merci_pericolose_(modello_II_8-b).svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.8c',
    signId: 'MII.8c',
    name: 'Itinerario obbligatorio per merci',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_preavviso_deviazione_obbligatoria_autocarri.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'MII.8d',
    signId: 'MII.8d',
    name: 'Divieto di transito autocarri',
    description: null,
    kind: 'exception_modifier',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'exception_modifier' },
    image: {
      kind: 'remote',
      sourceUrl:
        'https://wiki.openstreetmap.org/wiki/File:Italian_traffic_signs_-_divieto_di_transito_autocarri.svg',
      licence: 'Public Domain',
    },
  },
]
