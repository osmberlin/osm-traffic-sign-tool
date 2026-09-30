/**
 * Tags a `traffic_sign` value implies, as a plan of changes to the way's tags.
 * The recommendations come from the converter (`signsToTags`); this module only compares
 * them with the tags and is pure.
 */

import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import type { ConverterModule } from './types.js'

type Tags = Record<string, string>

/** `signsToTags` result as a plain object: a value, or the allowed values for `highway` */
export type SignTags = Record<string, string | string[]>
export type Recommend = (trafficSignValue: string) => SignTags

export type SignPlanCause = 'sign' | 'normalize' | 'previous_sign' | 'restore'

export type SignPlanRow = {
  kind: 'add' | 'change' | 'remove'
  key: string
  /** new value; the old value for `remove` */
  value: string
  from?: string
  cause: SignPlanCause
}

/** Where a traffic sign key applies: the way itself, or one side of a road */
export type SignTarget =
  | { kind: 'self' }
  | {
      kind: 'side'
      prefix: 'cycleway' | 'sidewalk'
      side: 'left' | 'right' | 'both' | undefined
    }

/** Separate paths may change their `highway` to what the sign implies; roads never do */
const PATH_HIGHWAYS = new Set([
  'cycleway',
  'footway',
  'path',
  'pedestrian',
  'track',
  'bridleway',
  'steps',
])

/** On a road side only these tags have a side form (`cycleway:right:foot` …) */
const SIDE_KEYS = new Set(['bicycle', 'foot', 'segregated'])

/**
 * `traffic_sign` → the way; `cycleway:right:traffic_sign` → that side.
 * Directional keys (`traffic_sign:forward`) are not supported yet.
 */
export const signTarget = (key: string): SignTarget | undefined => {
  if (key === 'traffic_sign') return { kind: 'self' }
  const side = key.match(/^(cycleway|sidewalk)(?::(left|right|both))?:traffic_sign$/)
  if (side) {
    return {
      kind: 'side',
      prefix: side[1] as 'cycleway' | 'sidewalk',
      side: side[2] as 'left' | 'right' | 'both' | undefined,
    }
  }
  return undefined
}

/** The converter's recommendations for a way with this `traffic_sign` value */
export const createSignRecommend =
  (
    converter: Pick<ConverterModule, 'trafficSignTagToSigns' | 'signsToTags'>,
    countryPrefix: CountryPrefixType,
  ): Recommend =>
  (value) => {
    const signs = converter.trafficSignTagToSigns(value, countryPrefix)
    return Object.fromEntries(converter.signsToTags(signs, countryPrefix, 'way'))
  }

const safeRecommend = (recommend: Recommend, value: string): SignTags => {
  try {
    return recommend(value)
  } catch {
    return {}
  }
}

/**
 * The recommended tags that apply to this way, with their OSM keys.
 * `traffic_sign` itself is left out (handled as normalization).
 */
const applicableTags = (signTags: SignTags, target: SignTarget, tags: Tags) => {
  const result: Record<string, string> = {}

  if (target.kind === 'side') {
    const prefix = target.side ? `${target.prefix}:${target.side}` : target.prefix
    for (const [key, value] of Object.entries(signTags)) {
      if (SIDE_KEYS.has(key) && typeof value === 'string') result[`${prefix}:${key}`] = value
    }
    return result
  }

  const highways = signTags.highway
  const highway = tags.highway
  if (Array.isArray(highways) && highways.length && highway && !highways.includes(highway)) {
    // A sign for another kind of way (e.g. a bus lane sign on the road): its tags are not for this way
    if (!PATH_HIGHWAYS.has(highway)) return {}
    result.highway = highways[0]!
  }
  for (const [key, value] of Object.entries(signTags)) {
    if (key === 'highway' || key === 'traffic_sign' || typeof value !== 'string') continue
    result[key] = value
  }
  return result
}

/**
 * Changes to make the tags match the sign in `key`:
 * - add / change the tags the sign implies (highway only for separate paths),
 * - normalize the sign value (`DE:241` → `DE:241-30`),
 * - remove tags that the previous sign implied and the new one does not, or restore their
 *   value from the downloaded version (`originalTags`) if it had a different one.
 *
 * `previousSign` is the value before the mapper changed it (in this editing session, else
 * the downloaded version). Returns `undefined` when the sign did not change (existing ways
 * are left alone), and an empty list when everything matches.
 */
export const signTagPlan = ({
  key,
  tags,
  previousSign,
  originalTags,
  recommend,
}: {
  key: string
  tags: Tags
  previousSign: string | undefined
  /** Tags of the downloaded version, if any */
  originalTags?: Tags
  recommend: Recommend
}): SignPlanRow[] | undefined => {
  const target = signTarget(key)
  const value = tags[key]
  if (!target || previousSign === value) return undefined

  const rows: SignPlanRow[] = []
  const signTags = value ? safeRecommend(recommend, value) : {}
  const wanted = value ? applicableTags(signTags, target, tags) : {}

  if (value && typeof signTags.traffic_sign === 'string' && signTags.traffic_sign !== value) {
    rows.push({
      kind: 'change',
      key,
      value: signTags.traffic_sign,
      from: value,
      cause: 'normalize',
    })
  }

  for (const [wantedKey, wantedValue] of Object.entries(wanted)) {
    const current = tags[wantedKey]
    if (current === undefined) {
      rows.push({ kind: 'add', key: wantedKey, value: wantedValue, cause: 'sign' })
    } else if (current !== wantedValue) {
      rows.push({
        kind: 'change',
        key: wantedKey,
        value: wantedValue,
        from: current,
        cause: 'sign',
      })
    }
  }

  if (previousSign) {
    const previous = applicableTags(safeRecommend(recommend, previousSign), target, tags)
    for (const [previousKey, previousValue] of Object.entries(previous)) {
      if (previousKey === 'highway' || previousKey in wanted) continue
      if (tags[previousKey] !== previousValue) continue
      const original = originalTags?.[previousKey]
      if (original !== undefined && original !== previousValue) {
        rows.push({
          kind: 'change',
          key: previousKey,
          value: original,
          from: previousValue,
          cause: 'restore',
        })
      } else {
        rows.push({
          kind: 'remove',
          key: previousKey,
          value: previousValue,
          cause: 'previous_sign',
        })
      }
    }
  }

  return rows
}

/** The tag update that applies all rows (`undefined` removes a tag) */
export const signTagPlanChanges = (rows: SignPlanRow[]) => {
  const changes: Record<string, string | undefined> = {}
  for (const row of rows) {
    changes[row.key] = row.kind === 'remove' ? undefined : row.value
  }
  return changes
}
