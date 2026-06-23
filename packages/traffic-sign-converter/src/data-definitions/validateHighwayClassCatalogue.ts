import type { CountryPrefixType } from './countryDefinitions.js'
import type { GeometryType } from './geometryTypes.js'
import type { SignType } from './TrafficSignDataTypes.js'

export class HighwayClassCatalogueConflictError extends Error {
  constructor(
    public readonly conflictingSignOsmValueParts: string[],
    public readonly highwayValues: string[],
  ) {
    super(
      `Sign group includes a highwayClass question but catalogue highwayValues remain on: ${conflictingSignOsmValueParts.join(', ')} (${highwayValues.join(', ')}). Remove highwayValues from those sign definitions.`,
    )
    this.name = 'HighwayClassCatalogueConflictError'
  }
}

export type HighwayClassCatalogueViolation = {
  country: CountryPrefixType
  signOsmValuePart: string
  rule:
    | 'highwayQuestionWithCatalogueHighwayValues'
    | 'modifierMultiValueHighwayValuesWithoutContext'
  message: string
}

export const signHasHighwayClassQuestion = (sign: SignType): boolean =>
  Boolean(sign.questions?.some((question) => question.affectsHighway))

export const getCatalogueHighwayValues = (
  sign: SignType,
  geometry: GeometryType = 'way',
): string[] => {
  if (sign.tagRecommendationsByGeometry === 'none') {
    return []
  }

  const recommendation = sign.tagRecommendationsByGeometry.find((entry) =>
    entry.geometries.includes(geometry),
  )

  return recommendation?.highwayValues ?? []
}

const modifierHasStaleMultiValueHighwayValues = (sign: SignType): boolean => {
  if (sign.kind !== 'exception_modifier' && sign.kind !== 'condition_modifier') {
    return false
  }

  if (sign.tagRecommendationsByGeometry === 'none') {
    return false
  }

  for (const recommendation of sign.tagRecommendationsByGeometry) {
    const highwayValues = recommendation.highwayValues
    if (!highwayValues || highwayValues.length <= 1) {
      continue
    }

    const hasAccessTags = (recommendation.accessTags?.length ?? 0) > 0
    const hasModifierValue =
      ('modifierValue' in recommendation && Boolean(recommendation.modifierValue)) ||
      ('modifierValueFromValuePrompt' in recommendation &&
        Boolean(recommendation.modifierValueFromValuePrompt))

    if (!hasAccessTags && !hasModifierValue) {
      return true
    }
  }

  return false
}

/** Catalogue highwayValues that conflict with a highwayClass question (build + runtime guard). */
export const signHasInvalidCatalogueHighwayValues = (sign: SignType): boolean => {
  if (signHasHighwayClassQuestion(sign) && getCatalogueHighwayValues(sign).length > 0) {
    return true
  }

  return modifierHasStaleMultiValueHighwayValues(sign)
}

export const signHasRuntimeHighwayClassCatalogueConflict = (
  sign: SignType,
  groupIncludesHighwayQuestion: boolean,
): boolean => {
  if (signHasHighwayClassQuestion(sign) && getCatalogueHighwayValues(sign).length > 0) {
    return true
  }

  return groupIncludesHighwayQuestion && modifierHasStaleMultiValueHighwayValues(sign)
}

export const findHighwayClassCatalogueViolations = (
  country: CountryPrefixType,
  signs: SignType[],
): HighwayClassCatalogueViolation[] => {
  const violations: HighwayClassCatalogueViolation[] = []

  for (const sign of signs) {
    if (signHasHighwayClassQuestion(sign) && getCatalogueHighwayValues(sign).length > 0) {
      violations.push({
        country,
        signOsmValuePart: sign.osmValuePart,
        rule: 'highwayQuestionWithCatalogueHighwayValues',
        message: `${country}:${sign.osmValuePart} defines both a highwayClass question and catalogue highwayValues (${getCatalogueHighwayValues(sign).join(', ')}). Remove highwayValues from the sign definition.`,
      })
    }

    if (modifierHasStaleMultiValueHighwayValues(sign)) {
      violations.push({
        country,
        signOsmValuePart: sign.osmValuePart,
        rule: 'modifierMultiValueHighwayValuesWithoutContext',
        message: `${country}:${sign.osmValuePart} defines multi-value catalogue highwayValues without access/modifier context. Remove highwayValues or migrate to a highwayClass question on the main sign.`,
      })
    }
  }

  return violations
}

export const formatHighwayClassCatalogueViolations = (
  violations: HighwayClassCatalogueViolation[],
): string => violations.map((violation) => violation.message).join('\n')
