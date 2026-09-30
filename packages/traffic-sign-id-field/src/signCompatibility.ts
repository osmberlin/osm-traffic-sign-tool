import type { SignStateType, SignType } from '@osm-traffic-signs/converter'

/**
 * "Never use with this existing sign": a candidate is excluded when an
 * existing sign lists it in `compatibility.incompatibleModifiers`, or when the
 * candidate lists an existing sign there (the data is not always symmetric).
 *
 * TODO: replace with a canonical helper from @osm-traffic-signs/converter once
 * it exists, so the web tool and this field share one rule set.
 */
export const isSignExcludedByCompatibility = (
  candidate: SignType,
  existingSigns: SignStateType[],
): boolean => {
  const existingIds = new Set<string>()
  const disallowedIds = new Set<string>()

  for (const sign of existingSigns) {
    if (!sign.recodgnizedSign || !sign.signId) continue
    existingIds.add(sign.signId)
    const incompatible =
      'compatibility' in sign ? sign.compatibility?.incompatibleModifiers : undefined
    for (const id of incompatible ?? []) disallowedIds.add(id)
  }

  if (candidate.signId && disallowedIds.has(candidate.signId)) return true

  const candidateIncompatible = candidate.compatibility?.incompatibleModifiers ?? []
  return candidateIncompatible.some((id) => existingIds.has(id))
}
