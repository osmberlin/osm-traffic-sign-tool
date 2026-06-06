import type {
  TagRecommendationsTrafficSignObject,
  TagRecommendationTag,
} from './TrafficSignDataTypes.js'

type WayRecommendation = Pick<
  TagRecommendationsTrafficSignObject,
  'geometries' | 'highwayValues' | 'uniqueTags' | 'accessTags' | 'conditionalTags'
>

const way = (rec: Omit<WayRecommendation, 'geometries'>): TagRecommendationsTrafficSignObject => ({
  geometries: ['way'],
  ...rec,
})

const node = (
  rec: Pick<TagRecommendationsTrafficSignObject, 'uniqueTags' | 'highwayValues'>,
): TagRecommendationsTrafficSignObject => ({
  geometries: ['node'],
  ...rec,
})

/** Dedicated cycleway (bicycle=designated, highway=cycleway). */
export const sharedCyclewayRecommendation = (): TagRecommendationsTrafficSignObject[] => [
  way({
    highwayValues: ['cycleway'],
    uniqueTags: [{ key: 'bicycle', value: 'designated' }],
  }),
]

/** Dedicated footway (foot=designated, highway=footway). */
export const sharedFootwayRecommendation = (): TagRecommendationsTrafficSignObject[] => [
  way({
    highwayValues: ['footway'],
    uniqueTags: [{ key: 'foot', value: 'designated' }],
  }),
]

/** Shared foot and cycle path (segregated=no). */
export const sharedSharedFootCyclePathRecommendation =
  (): TagRecommendationsTrafficSignObject[] => [
    way({
      highwayValues: ['path'],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'foot', value: 'designated' },
        { key: 'segregated', value: 'no' },
      ],
    }),
  ]

/** Segregated foot and cycle path (segregated=yes). */
export const sharedSegregatedFootCyclePathRecommendation =
  (): TagRecommendationsTrafficSignObject[] => [
    way({
      highwayValues: ['path'],
      uniqueTags: [
        { key: 'bicycle', value: 'designated' },
        { key: 'foot', value: 'designated' },
        { key: 'segregated', value: 'yes' },
      ],
    }),
  ]

/** Bridleway. */
export const sharedBridlewayRecommendation = (): TagRecommendationsTrafficSignObject[] => [
  way({ highwayValues: ['bridleway'] }),
]

export type SharedAccessBanKind =
  | 'vehicle'
  | 'motor_vehicle'
  | 'motorcar'
  | 'hgv'
  | 'bicycle'
  | 'motorcycle'
  | 'mofa'
  | 'horse'
  | 'bus'

const accessBanTags: Record<SharedAccessBanKind, TagRecommendationTag[]> = {
  vehicle: [{ key: 'vehicle', value: 'no' }],
  motor_vehicle: [{ key: 'motor_vehicle', value: 'no' }],
  motorcar: [{ key: 'motorcar', value: 'no' }],
  hgv: [{ key: 'hgv', value: 'no' }],
  bicycle: [{ key: 'bicycle', value: 'no' }],
  motorcycle: [{ key: 'motorcycle', value: 'no' }],
  mofa: [{ key: 'mofa', value: 'no' }],
  horse: [{ key: 'horse', value: 'no' }],
  bus: [
    { key: 'bus', value: 'no' },
    { key: 'tourist_bus', value: 'no' },
  ],
}

export const sharedAccessBanRecommendation = (
  kind: SharedAccessBanKind,
): TagRecommendationsTrafficSignObject[] => [
  way({ highwayValues: [], accessTags: accessBanTags[kind] }),
]

export type SharedPriorityKind = 'stop' | 'give_way'

export const sharedPriorityRecommendation = (
  kind: SharedPriorityKind,
): TagRecommendationsTrafficSignObject[] => {
  if (kind === 'stop') {
    return [node({ uniqueTags: [{ key: 'highway', value: 'stop' }] })]
  }
  return [{ geometries: ['node'] }]
}

/** Maxspeed on way; use conditionalTags with literal or valuePrompt on sign. */
export const sharedMaxspeedRecommendation = (
  speed?: string,
): TagRecommendationsTrafficSignObject[] => [
  way({
    highwayValues: [],
    uniqueTags: [{ key: 'source:maxspeed', value: 'sign' }],
    conditionalTags: speed
      ? [{ key: 'maxspeed', value: speed }]
      : [{ key: 'maxspeed', value: '$' }],
  }),
]

/** Oneway street. */
export const sharedOnewayRecommendation = (): TagRecommendationsTrafficSignObject[] => [
  way({ highwayValues: [], uniqueTags: [{ key: 'oneway', value: 'yes' }] }),
]

/** No parking / no stopping on way. */
export const sharedParkingRestrictionRecommendation = (
  kind: 'no_parking' | 'no_stopping',
): TagRecommendationsTrafficSignObject[] => [
  way({
    highwayValues: [],
    uniqueTags: [{ key: kind, value: 'yes' }],
  }),
]
