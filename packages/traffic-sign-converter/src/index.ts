// To Signs
export { tagsToSigns } from './tagsToSigns/tagsToSigns.js'
export { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'

// To Tag
export { signToTrafficSignTagValue } from './signToTrafficSignTag/signToTrafficSignTagValue.js'

// To Tags
export { signToTags } from './signToTags/signToTags.js'

// Data
export { CountryPrefixSchema, countryPrefixes } from './data/countryPrefixes.js'
export type { CountryPrefixesType } from './data/countryPrefixes.js'
export type {
  LegacyTrafficSignDataType as TrafficSignDataType,
  LegacyTrafficSignState as TrafficSignState,
} from './data/legacy/typesLegacy.js'
export { legacyTrafficSignData as trafficSignData } from './data/trafficSignDataLegacy.js'

// Utils
export { combineSignIdSignValue } from './signIdSignValueUtils/combineSignIdSignValue.js'
export { splitSignIdSignValue } from './trafficSignTagToSigns/utils/splitSignIdSignValue.js'
