import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType, SignType } from '../../data-definitions/TrafficSignDataTypes.js'
import {
  HighwayClassCatalogueConflictError,
  getCatalogueHighwayValues,
  signHasRuntimeHighwayClassCatalogueConflict,
} from '../../data-definitions/validateHighwayClassCatalogue.js'
import { signHasHighwayQuestion } from './collectQuestionTags.js'
import { getRecommendations } from './getRecommendations.js'
import { uniqueArray } from './uniqueArray.js'

export const groupHasHighwayQuestion = (signs: SignStateType[] | undefined): boolean =>
  Array.isArray(signs) && signs.some(signHasHighwayQuestion)

export const findConflictingCatalogueHighwayContributors = (
  signs: SignStateType[] | undefined,
  geometry: GeometryType,
) => {
  if (!Array.isArray(signs) || !groupHasHighwayQuestion(signs)) {
    return []
  }

  const conflicts: { osmValuePart: string; highwayValues: string[] }[] = []

  for (const sign of signs) {
    if (!sign.recodgnizedSign || signHasHighwayQuestion(sign)) {
      continue
    }

    const recommendations = getRecommendations(sign, geometry)
    if (recommendations?.highwayValues && recommendations.highwayValues.length > 0) {
      conflicts.push({
        osmValuePart: sign.osmValuePart,
        highwayValues: recommendations.highwayValues,
      })
    }
  }

  return conflicts
}

export const collectHighwayValues = (
  signs: SignStateType[] | undefined,
  geometry: GeometryType,
) => {
  if (!Array.isArray(signs)) return []

  const groupIncludesHighwayQuestion = groupHasHighwayQuestion(signs)
  const invalidDefinitions = signs.filter(
    (sign) =>
      sign.recodgnizedSign &&
      signHasRuntimeHighwayClassCatalogueConflict(sign as SignType, groupIncludesHighwayQuestion),
  )

  if (invalidDefinitions.length > 0) {
    throw new HighwayClassCatalogueConflictError(
      invalidDefinitions.map((sign) => sign.osmValuePart),
      uniqueArray(
        invalidDefinitions.flatMap((sign) => getCatalogueHighwayValues(sign as SignType)),
      ),
    )
  }

  if (groupIncludesHighwayQuestion) {
    return []
  }

  const all: string[] = []
  for (const sign of signs) {
    if (!sign.recodgnizedSign) continue
    const recs = getRecommendations(sign, geometry)
    if (recs?.highwayValues) {
      all.push(...recs.highwayValues)
    }
  }

  const deduplicated = uniqueArray(all)

  return deduplicated
}
