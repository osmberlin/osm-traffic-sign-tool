import type { RedirectMapping } from './TrafficSignDataTypes.js'

/**
 * General redirects that apply across all countries.
 * These are NOT included in search functionality.
 * Used for lookup operations only (e.g., trafficSignTagToSigns, getSignWithRedirects).
 */
export const generalRedirects: RedirectMapping[] = [
  // Named traffic sign value redirects
  { from: 'no', to: 'none' }, // 1k vs. 12k usage
]
