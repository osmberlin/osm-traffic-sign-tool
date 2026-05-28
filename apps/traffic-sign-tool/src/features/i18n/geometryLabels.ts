import * as m from '@app/paraglide/messages'
import type { GeometryType } from '@osm-traffic-signs/converter'

const geometryLabelByType = {
  node: m.geometry_node,
  way: m.geometry_way,
  way_centerline: m.geometry_way_centerline,
  area: m.geometry_area,
  relation: m.geometry_relation,
} as const satisfies Record<GeometryType, () => string>

type GeometryLabelOptions = {
  wayAsSeparate?: boolean
}

export const getGeometryLabel = (
  geometry: GeometryType,
  options?: GeometryLabelOptions,
): string => {
  if (geometry === 'way' && options?.wayAsSeparate) {
    return m.geometry_way_separate()
  }

  return geometryLabelByType[geometry]()
}
