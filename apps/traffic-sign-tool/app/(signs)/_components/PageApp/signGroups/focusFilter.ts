import type { FocusArea, SignType } from '@osm-traffic-signs/converter'

export const isAllFocus = (focuses: FocusArea[]): boolean => focuses.includes('all')

export const isDefaultFocus = (focuses: FocusArea[]): boolean =>
  focuses.length === 0 || (focuses.length === 1 && focuses[0] === 'default')

const thematicFocuses = (focuses: FocusArea[]): FocusArea[] =>
  focuses.filter((f) => f !== 'default' && f !== 'all')

export const matchesFocusFilter = (sign: SignType, focuses: FocusArea[]): boolean => {
  if (isAllFocus(focuses) || isDefaultFocus(focuses)) {
    return true
  }

  const thematic = thematicFocuses(focuses)
  if (thematic.length === 0) {
    return true
  }

  const signFocus = sign.catalogue.focus ?? []
  return thematic.some((focus) => signFocus.includes(focus))
}

export const applyVisibilityFilter = (sign: SignType, focuses: FocusArea[]): boolean => {
  if (isAllFocus(focuses)) {
    return true
  }

  return sign.catalogue.visibility !== 'search_only'
}

export const filterSignsByFocus = (signs: SignType[], focuses: FocusArea[]): SignType[] =>
  signs.filter((sign) => applyVisibilityFilter(sign, focuses) && matchesFocusFilter(sign, focuses))
