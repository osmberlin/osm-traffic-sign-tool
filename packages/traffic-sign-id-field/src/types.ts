import type { CountryPrefixType, SignStateType, SignType } from '@osm-traffic-signs/converter'

export type TrafficSignFieldDefinition = {
  key: string
  type: string
  safeid?: string
  domId?: string
}

export type TrafficSignFieldContext = {
  container: () => { select: (selector: string) => { selectAll: (selector: string) => unknown } }
  graph: () => { entity: (id: string) => { tags: Record<string, string> } }
  cleanTagValue: (value: string) => string
  asset: (path: string) => string
}

export type ComboboxInstance = {
  fetcher: (
    fn: (query: string, callback: (items: ComboboxItem[]) => void) => void,
  ) => ComboboxInstance
  caseSensitive: (value: boolean) => ComboboxInstance
  minItems: (n: number) => ComboboxInstance
  on: (event: string, handler: (d?: ComboboxItem, value?: string) => void) => ComboboxInstance
  (input: D3Selection, attachTo: D3Selection): void
  off?: (context: unknown) => void
}

export type ComboboxItem = {
  key: string
  value: string
  title?: string
  display?: (selection: D3Selection) => void
}

export type D3Selection = {
  attr: (name: string, value?: string | number | boolean | null) => D3Selection
  classed: (name: string, value?: boolean) => D3Selection
  data: (data: unknown[]) => D3Selection
  enter: () => D3Selection
  merge: (other: D3Selection) => D3Selection
  append: (type: string) => D3Selection
  insert: (type: string, before?: string | (() => unknown)) => D3Selection
  select: (selector: string) => D3Selection
  selectAll: (selector: string) => D3Selection
  remove: () => void
  text: (value?: string | ((d: unknown) => string)) => D3Selection
  html: (value?: string) => D3Selection
  style: (name: string, value?: string | null) => D3Selection
  property: (name: string, value?: unknown) => D3Selection
  on: (name: string, handler?: ((event: Event, d: unknown) => void) | null) => D3Selection
  call: (fn: (...args: unknown[]) => void, ...args: unknown[]) => D3Selection
  each: (fn: (this: Element, d: unknown, i: number) => void) => D3Selection
  node: () => HTMLElement | null
  nodes: () => HTMLElement[]
  empty: () => boolean
  filter: (fn: (d: unknown, i: number) => boolean) => D3Selection
}

export type ValuePromptInputAttributes = {
  type: 'number' | 'text'
  step?: string
}

export type ConverterModule = {
  trafficSignTagToSigns: (
    input: string,
    countryPrefix: CountryPrefixType | undefined,
  ) => SignStateType[]
  signsToTrafficSignTagValue: (
    signs: SignStateType[],
    countryPrefix: CountryPrefixType | undefined,
  ) => string
  createSvgImportname: (countryPrefix: CountryPrefixType, osmValuePart: string) => string
  combineSignIdSignValue: (signId: string, signValue: string | number | undefined) => string
  splitSignIdSignValue: (osmValuePart: string) => {
    signId: string
    signValue: string | undefined
  }
  getValuePromptInputAttributes: (format: string) => ValuePromptInputAttributes
  countries: CountryPrefixType[]
}

export type CountryCatalogueModule = {
  trafficSignData: SignType[]
}

export type TrafficSignFieldAdapters = {
  uiCombobox: (context: TrafficSignFieldContext, klass: string) => ComboboxInstance
  utilRebind: <T extends object>(
    target: T,
    source: { on: ComboboxInstance['on'] },
    ...events: string[]
  ) => T
  utilGetSetValue: (input: D3Selection) => string
  utilNoAuto: (input: D3Selection) => void
  utilTotalExtent: (
    entityIDs: string[],
    graph: TrafficSignFieldContext['graph'] extends () => infer G ? G : never,
  ) => {
    center: () => [number, number]
  } | null
  uiTooltip: () => {
    placement: (value: string) => ReturnType<TrafficSignFieldAdapters['uiTooltip']>
    title: (fn: () => string) => ReturnType<TrafficSignFieldAdapters['uiTooltip']>
    (selection: D3Selection): void
  }
  svgIcon: (id: string) => (selection: D3Selection) => void
  t: (key: string, replacements?: Record<string, string>) => string
  countryCoder: {
    iso1A2Code: (loc: [number, number]) => string | null
  }
  loadConverter: () => Promise<ConverterModule>
  loadCountryCatalogue: (countryPrefix: CountryPrefixType) => Promise<CountryCatalogueModule>
  getSvgAssetUrl: (countryPrefix: CountryPrefixType, svgName: string) => string
}

export type SignRowData = {
  index: number
  sign: SignStateType
}

export type TrafficSignFieldInstance = {
  (selection: unknown): void
  tags: (tags: Record<string, string | string[] | undefined>) => TrafficSignFieldInstance
  entityIDs: (entityIDs: string[]) => TrafficSignFieldInstance
  focus: () => TrafficSignFieldInstance
  on: (type: string, listener: (...args: unknown[]) => void) => TrafficSignFieldInstance
}
