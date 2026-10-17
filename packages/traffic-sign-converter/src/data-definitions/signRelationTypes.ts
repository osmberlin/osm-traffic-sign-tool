/**
 * - `zone`: an area that starts and ends with a sign, e.g. Tempo 30-Zone `274.1` / `274.2`
 * - `section`: a rule along the road until its end sign, e.g. maxspeed `274-50` / `278-50`
 * - `place`: entering and leaving a place, e.g. Ortstafel `310` / `311`
 * - `incline`: the same slope seen from both directions, e.g. Gefälle `108` / Steigung `110`
 */
export type SignRelationKind = 'zone' | 'section' | 'place' | 'incline'

export type SignRelationRole = 'start' | 'end' | 'downhill' | 'uphill'

/** What a related pair of signs is about, close to the OSM key it maps to. */
export type SignRelationTopic =
  | 'maxspeed'
  | 'minspeed'
  | 'parking_restriction'
  | 'parking_fee'
  | 'living_street'
  | 'pedestrian'
  | 'bicycle_road'
  | 'bicycle_zone'
  | 'motorway'
  | 'motorroad'
  | 'cycle_highway'
  | 'city_limit'
  | 'incline'

/** Two catalogue signs (`osmValuePart`) that belong together. */
export type SignRelation =
  | { kind: 'zone' | 'section' | 'place'; topic: SignRelationTopic; start: string; end: string }
  | { kind: 'incline'; topic: 'incline'; downhill: string; uphill: string }

export type SignRelationMatch = {
  kind: SignRelationKind
  topic: SignRelationTopic
  role: SignRelationRole
  /** `osmValuePart` of the other sign, with the same value for signs with a value prompt */
  counterpart: string
}
