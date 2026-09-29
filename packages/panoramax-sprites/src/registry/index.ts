import registryBE from '../data/registry_BE.json' with { type: 'json' }
import registryCH from '../data/registry_CH.json' with { type: 'json' }
import registryDE from '../data/registry_DE.json' with { type: 'json' }
import registryFR from '../data/registry_FR.json' with { type: 'json' }
import registryNL from '../data/registry_NL.json' with { type: 'json' }
import type { CountryRegistry, RegistryCountry, SpriteRegistryEntry } from './types.js'

export * from './types.js'

/** Full per-country registry, keyed by country code. */
export const spriteRegistry: Record<RegistryCountry, CountryRegistry> = {
  DE: registryDE as CountryRegistry,
  FR: registryFR as CountryRegistry,
  NL: registryNL as CountryRegistry,
  CH: registryCH as CountryRegistry,
  BE: registryBE as CountryRegistry,
}

const entriesByOsmValue = new Map<string, SpriteRegistryEntry>()
for (const country of Object.values(spriteRegistry)) {
  for (const entry of country.entries) entriesByOsmValue.set(entry.osmValue, entry)
}

/** Look up the registry entry for a Panoramax `osm|traffic_sign` value, e.g. `FR:C113`. */
export function getRegistryEntry(osmValue: string): SpriteRegistryEntry | undefined {
  return entriesByOsmValue.get(osmValue)
}

/**
 * Translate a Panoramax `osm|traffic_sign` value to its MapLibre sprite key, or `null` when the
 * class has no icon in a generated sheet (missing SVG / catalogue).
 */
export function osmValueToSpriteKey(osmValue: string): string | null {
  return entriesByOsmValue.get(osmValue)?.spriteKey ?? null
}

/** All entries flattened across countries. */
export function allRegistryEntries(): SpriteRegistryEntry[] {
  return Object.values(spriteRegistry).flatMap((country) => country.entries)
}
