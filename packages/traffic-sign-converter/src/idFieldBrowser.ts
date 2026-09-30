/**
 * Browser entry for the iD traffic sign field (`dist/id-field-browser.js`, bundled via Vite).
 * Self-contained ESM: iD can `import()` it without resolving npm packages like `opening_hours`.
 */
export { countries } from './data-definitions/countryDefinitions.js'
export { getValuePromptInputAttributes } from './data-definitions/valuePromptFormats.js'
export { signsToTags } from './signsToTags/signsToTags.js'
export { signsToTrafficSignTagValue } from './signsToTrafficSignTag/signsToTrafficSignTagValue.js'
export { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'
export { splitSignIdSignValue } from './trafficSignTagToSigns/utils/splitSignIdSignValue.js'
export { combineSignIdSignValue } from './utils/combineSignIdSignValue.js'
export { createSvgImportname } from './utils/createSvgImportname.js'
