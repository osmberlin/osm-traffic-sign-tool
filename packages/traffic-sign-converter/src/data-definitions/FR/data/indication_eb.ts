import type { SignType } from '../../TrafficSignDataTypes.js'

export const _indication_eb: SignType[] = [
  {
    osmValuePart: 'EB10',
    signId: 'EB10',
    name: 'EB10',
    descriptiveName: 'EB10',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'name', value: 'Le nom du lieu' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: "https://wiki.openstreetmap.org/wiki/File:Panneau_d'entree_d'agglomeration.jpg",
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'EB20',
    signId: 'EB20',
    name: 'EB20',
    descriptiveName:
      "Sortie d'agglomération Le noeud doit être placé sur le way de la route associée",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'name', value: 'Le nom du lieu' }] },
    ],
    catalogue: { signCategory: 'signpost' },
    image: {
      kind: 'remote',
      sourceUrl: "https://wiki.openstreetmap.org/wiki/File:Panneau_de_sortie_d'agglomeration.jpg",
      licence: 'Public Domain',
    },
  },
]
