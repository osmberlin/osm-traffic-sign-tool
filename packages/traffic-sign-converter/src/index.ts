// To Signs
export { tagsToSigns } from './tagsToSigns/tagsToSigns.js'
export { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'

// To `traffic_sign`-Tag
export { signsToTrafficSignTagValue } from './signsToTrafficSignTag/signsToTrafficSignTagValue.js'

// To Tags
export { showSignsToTagsWarning } from './signsToTags/showSignsToTagsWarning.js'
export { signsToApplicability } from './signsToTags/signsToApplicability.js'
export { signsToComments } from './signsToTags/signsToComments.js'
export { signsToTags } from './signsToTags/signsToTags.js'
export {
  mergeTagMaps,
  optionalTagsToMap,
  signsToOptionalTags,
  signsToOptionalTagsBySign,
} from './signsToTags/signsToOptionalTags.js'
export { signsToTopLevelComments } from './signsToTags/signsToTopLevelComments.js'

// Data Definitions
export * from './data-definitions/countryDefinitions.js'
export type { CountryPrefixType } from './data-definitions/countryDefinitions.js'
export {
  countryCatalogueMeta,
  getCatalogueDisplayName,
  getCatalogueIconicSignOsmValuePart,
  getCatalogueMaturity,
  getCountryCatalogueMeta,
  hasQaCapability,
} from './data-definitions/countryCatalogueMeta.js'
export {
  geometryTagRecommendationsMaturity,
  isVisibleMaturity,
} from './data-definitions/featureMaturities.js'
export type { MaturityKey } from './referenceLinks/types.js'
export * from './data-definitions/geometryTypes.js'
export * from './data-definitions/namedTrafficSignValues.js'
export type * from './data-definitions/TrafficSignDataTypes.js'
export {
  activeCatalogueFocusView,
  filterSignsByFocus,
  focusLevel,
  isAlleOnlySign,
  isAllFocus,
  isDefaultFocus,
  isHighlightedInView,
  isInCatalogueView,
  matchesFocusFilter,
  thematicFocuses,
} from './data-definitions/catalogueFocus.js'
export {
  QUESTION_NIL_ANSWER_ID,
  focusAreas,
  modifierSignCatalogueCategories,
  signCategories,
  signFocusTags,
  trafficSignCatalogueCategories,
  catalogueFocusViews,
  taggingSuggestionsQaStatuses,
} from './data-definitions/TrafficSignDataTypes.js'
export {
  classifyTaggingSuggestionsQa,
  countSignsByTaggingSuggestionsQa,
  filterSignsByTaggingSuggestionsQa,
  hasTagRecommendationsContent,
  taggingSuggestionsQaFilters,
} from './data-definitions/taggingSuggestionsQa.js'
export {
  classifySignQuestionsQa,
  countSignsByQuestionsQa,
  filterSignsByQuestionsQa,
  questionsQaFilters,
  signHasQuestions,
} from './data-definitions/questionsQa.js'
export type {
  CatalogueFocus,
  CatalogueFocusLevel,
  CatalogueFocusView,
  FocusArea,
  ModifierSignCatalogueCategory,
  OptionalTagGuidance,
  OptionalTagsBySignEntry,
  OptionalTagsRecommendation,
  QuestionAnswer,
  QuestionAnswersBySign,
  SignCategory,
  SignFocusTag,
  SignQuestion,
  TagRecommendationTag,
  TaggingSuggestionsQaStatus,
  TrafficSignCatalogueCategory,
  ValuePrompt,
} from './data-definitions/TrafficSignDataTypes.js'
export {
  cycleInfrastructureQuestions,
  guidanceModeQuestion,
  hazardSignNodeQuestions,
  highwayClassQuestion,
  pathInfrastructureQuestions,
  sidepathQuestion,
  signDirectionQuestion,
  surfaceColorQuestion,
} from './data-definitions/questionCatalog.js'
export {
  getSelectedAnswerId,
  isExplicitNilSelection,
  resolveEffectiveAnswerId,
  resolveQuestionAnswer,
} from './questions/resolveQuestionAnswer.js'
export {
  collectSignQuestionGroups,
  dedupeEquivalentAnswersForUrl,
  getQuestionEquivalenceKey,
  resolveGroupedEffectiveAnswerId,
  resolveGroupedSelectedAnswerId,
  syncEquivalentQuestionAnswers,
} from './questions/groupSignQuestions.js'
export type { SignQuestionGroup } from './questions/groupSignQuestions.js'
export type {
  TaggingSuggestionsQaCategory,
  TaggingSuggestionsQaCounts,
  TaggingSuggestionsQaFilter,
} from './data-definitions/taggingSuggestionsQa.js'
export type {
  QuestionsQaCounts,
  QuestionsQaFilter,
  SignQuestionsQaCategory,
} from './data-definitions/questionsQa.js'
export {
  getValuePromptInputAttributes,
  isOpeningHoursValuePromptFormat,
  valuePromptFormats,
  valuePromptInputFormats,
} from './data-definitions/valuePromptFormats.js'
export type {
  NumericValuePromptFormat,
  OpeningHoursValuePromptFormat,
  ValuePromptFormat,
  ValuePromptInputAttributes,
} from './data-definitions/valuePromptFormats.js'

// Data SVGs
export { createSvgFilename } from './utils/createSvgFilename.js'
export { createSvgImportname } from './utils/createSvgImportname.js'
export {
  flattenOpeningHoursMessages,
  normalizeOpeningHoursLocale,
  parseOpeningHoursFeedbackChunk,
  parseOpeningHoursFeedbackMessage,
  partitionOpeningHoursMessages,
  shouldSkipOpeningHoursMessage,
  SKIPPABLE_OPENING_HOURS_MESSAGE_PREFIXES,
  splitOpeningHoursFeedbackMessage,
  validateConditionalOpeningHours,
} from './utils/validateConditionalOpeningHours.js'
export type {
  ConditionalValidationResult,
  OpeningHoursFeedbackItem,
  ValidateConditionalOpeningHoursOptions,
} from './utils/validateConditionalOpeningHours.js'

export {
  sharedAccessBanRecommendation,
  sharedBridlewayRecommendation,
  sharedCyclewayRecommendation,
  sharedFootwayRecommendation,
  sharedMaxspeedRecommendation,
  sharedOnewayRecommendation,
  sharedParkingRestrictionRecommendation,
  sharedPriorityRecommendation,
  sharedSegregatedFootCyclePathRecommendation,
  sharedSharedFootCyclePathRecommendation,
} from './sharedRecommendationPresets.js'
export type { SharedAccessBanKind, SharedPriorityKind } from './sharedRecommendationPresets.js'

// Country reference links
export { buildSignReferenceLinks } from './referenceLinks/buildSignReferenceLinks.js'
export type { SignReferenceLinks } from './referenceLinks/buildSignReferenceLinks.js'
export { buildOsmWikiKeyUrl, buildOsmWikiTagUrl } from './referenceLinks/buildOsmWikiUrl.js'
export type {
  CountryCatalogueMeta,
  CountryQaCapabilities,
  CountryReferenceLinkConfig,
} from './referenceLinks/types.js'
export { betaQaCapabilities, fullQaCapabilities } from './referenceLinks/types.js'

// Data PER COUNTRY: DE
// export * from './data-definitions/DE/trafficSignDataDE.js'
// export * from './data-svgs/DE/svgExports.js'

// Utils
export { splitIntoSignValueParts } from './trafficSignTagToSigns/utils/splitIntoSignValueParts.js'
export { splitSignIdSignValue } from './trafficSignTagToSigns/utils/splitSignIdSignValue.js'
export { buildRedirectMap } from './utils/buildRedirectMap.js'
export { combineSignIdSignValue } from './utils/combineSignIdSignValue.js'
export { getRedirectsForSign } from './utils/getRedirectsForSign.js'
export { getSignWithRedirects } from './utils/getSignWithRedirects.js'
export { toTag } from './utils/toTag.js'
