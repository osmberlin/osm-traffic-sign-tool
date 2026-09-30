import type { buildToolUrl } from './buildToolUrl.js'
import type { createTrafficSignField } from './createTrafficSignField.js'

declare global {
  var OsmTrafficSignIdField: {
    buildToolUrl: typeof buildToolUrl
    createTrafficSignField: typeof createTrafficSignField
  }
}

export {}
