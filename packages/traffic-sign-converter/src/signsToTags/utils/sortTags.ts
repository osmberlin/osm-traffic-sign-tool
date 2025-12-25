// Based on https://wiki.openstreetmap.org/wiki/Key:access#Land-based_transportation
const sortedAccessKeys = [
  'access',
  'foot',
  'dog',
  'ski',
  'ski:nordic',
  'ski:alpine',
  'ski:telemark',
  'inline_skates',
  'horse',
  'portage',
  'vehicle',
  'bicycle',
  'electric_bicycle',
  'mtb',
  'cargo_bike',
  'kick_scooter',
  'carriage',
  'cycle_rickshaw',
  'hand_cart',
  'trailer',
  'caravan',
  'motor_vehicle',
  'electric_vehicle',
  'motorcycle',
  'moped',
  'speed_pedelec',
  'mofa',
  'small_electric_vehicle',
  'motorcar',
  'motorhome',
  'tourist_bus',
  'coach',
  'goods',
  'hgv',
  'hgv_articulated',
  'bdouble',
  'agricultural',
  'auto_rickshaw',
  'nev',
  'golf_cart',
  'microcar',
  'atv',
  'ohv',
  'snowmobile',
  'psv',
  'bus',
  'taxi',
  'minibus',
  'share_taxi',
  'hov',
  'carpool',
  'car_sharing',
  'emergency',
  'hazmat',
  'hazmat:water',
  'school_bus',
  'disabled',
]

export const sortTags = (tags: Map<string, string | string[]>) => {
  const sortedMap = new Map<string, string | string[]>()

  // Move `highway` to top
  if (tags.has('highway')) {
    sortedMap.set('highway', tags.get('highway')!)
    tags.delete('highway')
  }

  // Sort access tags
  for (const sortKey of sortedAccessKeys) {
    if (tags.has(sortKey)) {
      sortedMap.set(sortKey, tags.get(sortKey)!)
      tags.delete(sortKey)
    }
  }

  // Sort the remaining keys alphabetically
  const sortedKeys = Array.from(tags.keys()).sort((a, b) => a.localeCompare(b))
  for (const key of sortedKeys) {
    sortedMap.set(key, tags.get(key)!)
  }

  // Move the `traffic_sign` tag to the end of the list
  const trafficSignValue = sortedMap.get('traffic_sign')
  if (trafficSignValue) {
    sortedMap.delete('traffic_sign')
    sortedMap.set('traffic_sign', trafficSignValue)
  }

  return sortedMap
}
