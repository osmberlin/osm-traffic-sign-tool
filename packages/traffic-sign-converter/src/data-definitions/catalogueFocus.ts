import type {
  CatalogueFocusLevel,
  CatalogueFocusView,
  FocusArea,
  SignType,
} from './TrafficSignDataTypes.js'

export const focusLevel = (
  sign: SignType,
  view: CatalogueFocusView,
): CatalogueFocusLevel | undefined => {
  const f = sign.catalogue.focus
  if (f === undefined) return view === 'default' ? true : undefined
  return f[view]
}

export const isInCatalogueView = (sign: SignType, view: CatalogueFocusView): boolean =>
  focusLevel(sign, view) !== undefined

export const isHighlightedInView = (sign: SignType, view: CatalogueFocusView): boolean =>
  focusLevel(sign, view) === 'highlight'

export const isAlleOnlySign = (sign: SignType): boolean => sign.catalogue.focus?.all === true

export const isAllFocus = (focuses: FocusArea[]): boolean => focuses.includes('all')

export const isDefaultFocus = (focuses: FocusArea[]): boolean =>
  focuses.length === 0 || (focuses.length === 1 && focuses[0] === 'default')

export const thematicFocuses = (focuses: FocusArea[]): CatalogueFocusView[] =>
  focuses.filter((f): f is CatalogueFocusView => f !== 'default' && f !== 'all')

/** Active view for highlight strip; null on Alle. */
export const activeCatalogueFocusView = (focuses: FocusArea[]): CatalogueFocusView | null => {
  if (isAllFocus(focuses)) return null
  if (isDefaultFocus(focuses)) return 'default'
  return thematicFocuses(focuses)[0] ?? null
}

export const matchesFocusFilter = (sign: SignType, focuses: FocusArea[]): boolean => {
  if (isAllFocus(focuses)) return true
  if (isAlleOnlySign(sign)) return false
  if (isDefaultFocus(focuses)) return isInCatalogueView(sign, 'default')
  return thematicFocuses(focuses).some((t) => isInCatalogueView(sign, t))
}

export const filterSignsByFocus = (signs: SignType[], focuses: FocusArea[]): SignType[] =>
  signs.filter((sign) => matchesFocusFilter(sign, focuses))
