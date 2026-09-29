// Translation registry (Panoramax osm|traffic_sign value ↔ this tool's sign / sprite key)
export {
  allRegistryEntries,
  getRegistryEntry,
  osmValueToSpriteKey,
  spriteRegistry,
} from './registry/index.js'
export type {
  CountryRegistry,
  RegistryCountry,
  RegistryStatus,
  SpriteManifest,
  SpriteManifestSheet,
  SpriteRegistryEntry,
} from './registry/types.js'
export { registryCountries, registryStatuses } from './registry/types.js'

// Generated sprite manifest (which country sheets exist)
export { default as spriteManifest } from './data/sprites/manifest.json' with { type: 'json' }
