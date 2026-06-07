import scenarios from './parking_mapping_scenarios.json' with { type: 'json' }
import type { ParkingScenarioFixture } from './parseAreaTags.js'

export const parkingMappingScenarios = scenarios as ParkingScenarioFixture[]
