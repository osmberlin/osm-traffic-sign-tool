/**
 * All available OSM geometry types for traffic sign tagging.
 */
export const GEOMETRY_TYPES = ['node', 'way', 'way_centerline', 'area', 'relation'] as const

/**
 * Type representing all valid geometry types.
 */
export type GeometryType = (typeof GEOMETRY_TYPES)[number]
