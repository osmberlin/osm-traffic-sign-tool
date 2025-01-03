// To Signs
export { tagsToSigns } from './tagsToSigns/tagsToSigns.js'
export { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'

// To Tag
export { signToTrafficSignTagValue } from './signToTrafficSignTag/signToTrafficSignTagValue.js'

// To Tags
export { signToComments } from './signToTags/signToComments.js'
export { signToTags } from './signToTags/signToTags.js'

// Data Definitions
export * from './data-definitions/countryDefinitions.js'
export type { CountryPrefixType } from './data-definitions/countryDefinitions.js'
export * from './data-definitions/namedTrafficSignValues.js'
export type * from './data-definitions/TrafficSignDataTypes.js'

// Data SVGs
export { createSvgFilename } from './utils/createSvgFilename.js'
export { createSvgImportname } from './utils/createSvgImportname.js'

// Data PER COUNTRY: DE
// export * from './data-definitions/DE/trafficSignDataDE.js'
// export * from './data-svgs/DE/svgExports.js'

// Utils
export { splitIntoSignValueParts } from './trafficSignTagToSigns/utils/splitIntoSignValueParts.js'
export { splitSignIdSignValue } from './trafficSignTagToSigns/utils/splitSignIdSignValue.js'
export { combineSignIdSignValue } from './utils/combineSignIdSignValue.js'
export { toTag } from './utils/toTag.js'
