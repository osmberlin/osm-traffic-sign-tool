import { sharedPriorityRecommendation } from '../../sharedRecommendationPresets.js'
import type { SignType } from '../../TrafficSignDataTypes.js'

export const _priority_ab: SignType[] = [
  {
    osmValuePart: 'AB1',
    signId: 'AB1',
    name: 'AB1',
    descriptiveName:
      "Priorité à droite En cas de présence d'un panonceau « Carefour dangereux », voir hazard=dangerous_junction.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: 'none',
    taggingSuggestionsQa: 'none',
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB1.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'AB2',
    signId: 'AB2',
    name: 'AB2',
    descriptiveName:
      "Priorité ponctuelle Panneau de signalisation d'une priorité ponctuelle. Elément wikidata Q3362280.",
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB2.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'AB3a',
    signId: 'AB3a',
    name: 'AB3a',
    descriptiveName: 'AB3a',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: sharedPriorityRecommendation('give_way'),
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB3a.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'AB4',
    signId: 'AB4',
    name: 'AB4',
    descriptiveName: 'AB4',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: sharedPriorityRecommendation('stop'),
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB4.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'AB6',
    signId: 'AB6',
    name: 'AB6',
    descriptiveName:
      'Route à caractère prioritaire Les usagers de la route sur laquelle est implantée ce panneau sont prioritaires à toutes les intersections.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'priority_road', value: 'yes_unposted' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB6.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'AB7',
    signId: 'AB7',
    name: 'AB7',
    descriptiveName:
      'Fin de route à caractère prioritaire Ce panneau indique la fin du caractère prioritaire de la route en question.',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [{ geometries: ['way'] }],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB7.svg',
      licence: 'Public Domain',
    },
  },
  {
    osmValuePart: 'AB25',
    signId: 'AB25',
    name: 'AB25',
    descriptiveName: 'AB25',
    description: null,
    kind: 'traffic_sign',
    tagRecommendationsByGeometry: [
      { geometries: ['way'], uniqueTags: [{ key: 'junction', value: 'roundabout' }] },
    ],
    catalogue: { signCategory: 'traffic_sign' },
    image: {
      kind: 'remote',
      sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:France_road_sign_AB25.svg',
      licence: 'Public Domain',
    },
  },
]
