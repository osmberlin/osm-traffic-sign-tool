import type { CountryPrefixType } from './countryDefinitions.js'
import { signRelationsDE } from './DE/signRelationsDE.js'
import type { SignRelation } from './signRelationTypes.js'

export const signRelations: Record<CountryPrefixType, SignRelation[]> = {
  DE: signRelationsDE,
  BE: [],
  AT: [],
  CA: [],
  PL: [],
  FR: [],
  AU: [],
  BR: [],
  IT: [],
}
