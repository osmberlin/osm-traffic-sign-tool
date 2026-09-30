import type {
  TrafficSignFieldAdapters,
  TrafficSignFieldContext,
  TrafficSignFieldDefinition,
  TrafficSignFieldInstance,
} from './types.js'

export declare function createTrafficSignField(
  field: TrafficSignFieldDefinition,
  context: TrafficSignFieldContext,
  adapters: TrafficSignFieldAdapters,
): TrafficSignFieldInstance

export type { TrafficSignFieldInstance }
