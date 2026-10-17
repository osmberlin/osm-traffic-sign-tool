import {
  countryDefinitions,
  type CountryPrefixType,
} from '../data-definitions/countryDefinitions.js'
import { signRelations } from '../data-definitions/signRelations.js'
import type {
  SignRelation,
  SignRelationMatch,
  SignRelationRole,
} from '../data-definitions/signRelationTypes.js'
import type { SignStateType, SignType } from '../data-definitions/TrafficSignDataTypes.js'
import { trafficSignTagToSigns } from '../trafficSignTagToSigns/trafficSignTagToSigns.js'
import { combineSignIdSignValue } from './combineSignIdSignValue.js'

type RelationIndex = {
  byOsmValuePart: Map<string, SignRelationMatch>
  /** Pairs with a value prompt on both sides (`274[47]` / `278[47]`), `counterpart` is a `signId` */
  bySignId: Map<string, SignRelationMatch>
}

const relationSides = (relation: SignRelation): [SignRelationRole, string, string][] =>
  relation.kind === 'incline'
    ? [
        ['downhill', relation.downhill, relation.uphill],
        ['uphill', relation.uphill, relation.downhill],
      ]
    : [
        ['start', relation.start, relation.end],
        ['end', relation.end, relation.start],
      ]

const relationIndexCache = new Map<CountryPrefixType, RelationIndex>()

const getRelationIndex = (countryPrefix: CountryPrefixType) => {
  const cached = relationIndexCache.get(countryPrefix)
  if (cached) return cached

  const catalogue = new Map(
    countryDefinitions[countryPrefix].map((sign) => [sign.osmValuePart, sign]),
  )
  const index: RelationIndex = { byOsmValuePart: new Map(), bySignId: new Map() }

  // The first relation of a sign wins, e.g. `274.2` ends `274.1` before the generic `274.1[47]`
  for (const relation of signRelations[countryPrefix]) {
    for (const [role, osmValuePart, counterpart] of relationSides(relation)) {
      const side = { kind: relation.kind, topic: relation.topic, role, counterpart }
      if (!index.byOsmValuePart.has(osmValuePart)) index.byOsmValuePart.set(osmValuePart, side)

      const sign = catalogue.get(osmValuePart)
      const counterpartSign = catalogue.get(counterpart)
      if (sign?.valuePrompt && counterpartSign?.valuePrompt && !index.bySignId.has(sign.signId)) {
        index.bySignId.set(sign.signId, { ...side, counterpart: counterpartSign.signId })
      }
    }
  }

  relationIndexCache.set(countryPrefix, index)
  return index
}

/**
 * The sign that belongs to this one: the end of a zone or section (`274.1` → `274.2`,
 * `274-50` → `278-50`), the other side of a place (`310` → `311`) or the opposite direction of a
 * slope (`108[12]` → `110[12]`). A string is parsed like `trafficSignTagToSigns()` and must hold
 * one sign.
 */
export const getSignRelation = (
  countryPrefix: CountryPrefixType,
  signOrOsmValuePart: SignType | SignStateType | string,
): SignRelationMatch | undefined => {
  const signs =
    typeof signOrOsmValuePart === 'string'
      ? trafficSignTagToSigns(signOrOsmValuePart, countryPrefix)
      : [signOrOsmValuePart]
  const sign = signs.length === 1 ? signs[0] : undefined
  if (!sign?.signId) return undefined

  const index = getRelationIndex(countryPrefix)
  const exact = index.byOsmValuePart.get(sign.osmValuePart)
  if (exact) return exact

  const withValue = sign.signValue === undefined ? undefined : index.bySignId.get(sign.signId)
  if (!withValue) return undefined
  return {
    ...withValue,
    counterpart: combineSignIdSignValue(withValue.counterpart, sign.signValue),
  }
}
