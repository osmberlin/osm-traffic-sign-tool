import type { CombinationQaFilter } from '@app/src/features/searchParams/deSearch'
import {
  type CountryPrefixType,
  type SignStateType,
  type SignType,
  signsToTrafficSignTagValue,
  trafficSignTagToSigns,
} from '@osm-traffic-signs/converter'

export type CombinationBlockReason = 'no_modifiers' | 'incompatible_modifier'

export type CombinationRow = {
  signs: SignStateType[]
  tagValue: string
  primarySign?: SignStateType & { recodgnizedSign: true }
  modifierSign?: SignStateType & { recodgnizedSign: true }
  allowFeedback: boolean
  blockReason?: CombinationBlockReason
}

export type CombinationQaCounts = Record<CombinationQaFilter, number>

/** Cheap metadata for sign-picker filters (no tag conversion). */
export type PrimaryCombinationMeta = {
  combinationCount: number
  hasActionable: boolean
  hasBlocked: boolean
}

export const getPrimaryCombinationMeta = (
  primarySign: SignType,
  modifierSigns: SignType[],
): PrimaryCombinationMeta => {
  if (primarySign.compatibility?.canReceiveModifiers === false) {
    return { combinationCount: 1, hasActionable: false, hasBlocked: true }
  }

  const incompatible = new Set(primarySign.compatibility?.incompatibleModifiers ?? [])
  let blockedCount = 0
  for (const modifier of modifierSigns) {
    if (modifier.signId && incompatible.has(modifier.signId)) {
      blockedCount++
    }
  }

  const combinationCount = modifierSigns.length
  return {
    combinationCount,
    hasActionable: combinationCount - blockedCount > 0,
    hasBlocked: blockedCount > 0,
  }
}

const primaryMatchesFilter = (meta: PrimaryCombinationMeta, filter: CombinationQaFilter): boolean => {
  switch (filter) {
    case 'actionable':
      return meta.hasActionable
    case 'blocked':
      return meta.hasBlocked
    case 'all':
      return meta.combinationCount > 0
  }
}

export const countPrimarySignsByFilter = (
  primarySigns: SignType[],
  modifierSigns: SignType[],
): CombinationQaCounts => {
  const counts: CombinationQaCounts = { actionable: 0, blocked: 0, all: 0 }

  for (const sign of primarySigns) {
    const meta = getPrimaryCombinationMeta(sign, modifierSigns)
    if (meta.hasActionable) {
      counts.actionable++
    }
    if (meta.hasBlocked) {
      counts.blocked++
    }
    if (meta.combinationCount > 0) {
      counts.all++
    }
  }

  return counts
}

export const filterPrimarySigns = (
  primarySigns: SignType[],
  modifierSigns: SignType[],
  filter: CombinationQaFilter,
): SignType[] => {
  return primarySigns.filter((sign) =>
    primaryMatchesFilter(getPrimaryCombinationMeta(sign, modifierSigns), filter),
  )
}

const getRecognizedSigns = (signs: SignStateType[]) =>
  signs.filter((sign): sign is SignStateType & { recodgnizedSign: true } => sign.recodgnizedSign)

const classifyCombinationRow = (signs: SignStateType[]): Omit<CombinationRow, 'signs' | 'tagValue'> => {
  const recognized = getRecognizedSigns(signs)
  const primarySign = recognized.at(0)
  const modifierSign = recognized.at(1)
  const canReceiveModifiers = primarySign?.compatibility?.canReceiveModifiers !== false
  const canReceiveThisModifier =
    modifierSign &&
    !primarySign?.compatibility?.incompatibleModifiers?.includes(modifierSign.signId)
  const allowFeedback = Boolean(canReceiveModifiers && canReceiveThisModifier)

  if (!canReceiveModifiers) {
    return { primarySign, modifierSign, allowFeedback, blockReason: 'no_modifiers' }
  }

  if (!canReceiveThisModifier) {
    return { primarySign, modifierSign, allowFeedback, blockReason: 'incompatible_modifier' }
  }

  return { primarySign, modifierSign, allowFeedback }
}

export const buildCombinationRowsForPrimary = (
  primarySign: SignType,
  modifierSigns: SignType[],
  countryPrefix: CountryPrefixType,
): CombinationRow[] => {
  if (primarySign.compatibility?.canReceiveModifiers === false) {
    const signs = trafficSignTagToSigns(primarySign.osmValuePart, countryPrefix)
    const tagValue = signsToTrafficSignTagValue(signs, countryPrefix)
    return [{ signs, tagValue, ...classifyCombinationRow(signs) }]
  }

  return modifierSigns
    .map((modifierSign) => {
      const signs = trafficSignTagToSigns(
        [primarySign.osmValuePart, modifierSign.osmValuePart].join(','),
        countryPrefix,
      )
      const tagValue = signsToTrafficSignTagValue(signs, countryPrefix)
      return { signs, tagValue, ...classifyCombinationRow(signs) }
    })
    .sort((a, b) => a.tagValue.localeCompare(b.tagValue, 'de'))
}

export const buildCombinationRows = (
  primarySigns: SignType[],
  modifierSigns: SignType[],
  countryPrefix: CountryPrefixType,
): CombinationRow[] => {
  return primarySigns
    .flatMap((sign) => buildCombinationRowsForPrimary(sign, modifierSigns, countryPrefix))
    .sort((a, b) => a.tagValue.localeCompare(b.tagValue, 'de'))
}

export const filterCombinationRows = (
  rows: CombinationRow[],
  filter: CombinationQaFilter,
): CombinationRow[] => {
  switch (filter) {
    case 'actionable':
      return rows.filter((row) => row.allowFeedback)
    case 'blocked':
      return rows.filter((row) => !row.allowFeedback)
    case 'all':
      return rows
  }
}
