/** The five countries referenced by the Panoramax detection CSV. */
export const registryCountries = ['DE', 'FR', 'NL', 'CH', 'BE'] as const
export type RegistryCountry = (typeof registryCountries)[number]

/**
 * Resolution status of one detection class against this tool's catalogue.
 *
 * - `ok`                  — signId is in the catalogue AND a bundled SVG exists → goes into a sprite.
 * - `svg-missing`         — signId is in the catalogue but no SVG is bundled yet.
 * - `signId-not-in-tool`  — the country catalogue exists, but this signId is not in it.
 * - `country-not-in-tool` — the country has no catalogue in this tool at all (NL, CH today).
 */
export const registryStatuses = [
  'ok',
  'svg-missing',
  'signId-not-in-tool',
  'country-not-in-tool',
] as const
export type RegistryStatus = (typeof registryStatuses)[number]

export type SpriteRegistryEntry = {
  /** Semantic detection-class key from the YAML, e.g. `arrow_left_down`. */
  yolo: string
  country: RegistryCountry
  /** Panoramax `osm|traffic_sign` value, e.g. `FR:C113` (reconstructed `country:code`). */
  osmValue: string
  /**
   * MapLibre sprite key = what the Panoramax viewer looks up (osmValue minus the `CC:` prefix),
   * e.g. `C113`, `274-30`, `B14[30]`. Only present when `status === 'ok'`.
   */
  spriteKey: string | null
  /** Bare sign id (spriteKey without any `[value]` suffix), used for catalogue + SVG lookup. */
  signId: string
  /** internal_svgs filename stem, e.g. `FR_C113`. Null when no catalogue/SVG. */
  svgName: string | null
  status: RegistryStatus
}

export type CountryRegistry = {
  country: RegistryCountry
  /** Whether this country has a catalogue in the tool (false → all entries `country-not-in-tool`). */
  hasCatalogue: boolean
  counts: Record<RegistryStatus, number>
  entries: SpriteRegistryEntry[]
}

export type SpriteManifestSheet = {
  country: RegistryCountry
  /** Base name (no extension), matching Panoramax's `trafficsigns_<cc>` convention. */
  spriteBaseName: string
  keyCount: number
  /**
   * Sprite keys that were `ok` in the registry but whose SVG could not be rasterized (corrupt /
   * unsupported source SVG). They are absent from the sheet — a distinct, rarer failure than the
   * registry statuses.
   */
  unsupportedKeys: string[]
}
export type SpriteManifest = {
  sheets: SpriteManifestSheet[]
}
