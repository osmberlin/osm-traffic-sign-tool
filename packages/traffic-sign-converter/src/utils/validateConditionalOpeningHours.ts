import opening_hours, {
  type nominatim_object,
  type opening_hours_warning,
  type opening_hours_warning_type,
  type optional_conf_param,
} from 'opening_hours'

export type OpeningHoursFeedbackItem = {
  /** Fragment from the input that triggered the issue (before `<---`). */
  reference: string | null
  /** Human-readable explanation without wrapping parentheses. */
  detail: string
}

export type ConditionalValidationResult = {
  severity: 'none' | 'warning' | 'error'
  messages: OpeningHoursFeedbackItem[]
}

export type ValidateConditionalOpeningHoursOptions = {
  requestedLocale?: string
  countryCode?: string
  state?: string
}

/**
 * opening_hours.js warning types we hide in the UI (not relevant for *:conditional on signs).
 */
export const SKIPPABLE_OPENING_HOURS_WARNING_TYPES = ['public_holiday'] as const

export const shouldSkipOpeningHoursWarningType = (type: opening_hours_warning_type) =>
  SKIPPABLE_OPENING_HOURS_WARNING_TYPES.includes(
    type as (typeof SKIPPABLE_OPENING_HOURS_WARNING_TYPES)[number],
  )

const mapStructuredWarningToFeedbackItem = (
  warning: opening_hours_warning,
): OpeningHoursFeedbackItem => {
  const reference =
    warning.position != null && warning.position > 0
      ? warning.value.slice(0, warning.position).trimEnd() || null
      : null

  return {
    reference,
    detail: warning.message,
  }
}

const partitionStructuredWarnings = (warnings: opening_hours_warning[]) => {
  const displayed: OpeningHoursFeedbackItem[] = []
  const skipped: OpeningHoursFeedbackItem[] = []

  for (const warning of warnings) {
    const item = mapStructuredWarningToFeedbackItem(warning)
    if (shouldSkipOpeningHoursWarningType(warning.type)) {
      skipped.push(item)
    } else {
      displayed.push(item)
    }
  }

  return { displayed, skipped }
}

/** Fatal errors are one string; uses balanced parentheses because detail text often contains nested "(feiertags)" etc. */
const OPENING_HOURS_MARKER = '<--- ('

const findBalancedClosingParenIndex = (text: string, openParenIndex: number) => {
  let depth = 0

  for (let index = openParenIndex; index < text.length; index++) {
    if (text[index] === '(') {
      depth++
    } else if (text[index] === ')') {
      depth--
      if (depth === 0) {
        return index
      }
    }
  }

  return null
}

/** Parses fatal opening_hours.js error strings thrown by the constructor. */
const parseOpeningHoursErrorMessage = (message: string): OpeningHoursFeedbackItem[] => {
  const trimmed = message.trim()
  if (!trimmed) {
    return []
  }

  if (!trimmed.includes(OPENING_HOURS_MARKER)) {
    return [{ reference: null, detail: trimmed }]
  }

  const items: OpeningHoursFeedbackItem[] = []
  let cursor = 0

  while (cursor < trimmed.length) {
    const markerIndex = trimmed.indexOf(OPENING_HOURS_MARKER, cursor)
    if (markerIndex === -1) {
      break
    }

    const referencePart = trimmed.slice(cursor, markerIndex).trim()
    const openParenIndex = markerIndex + OPENING_HOURS_MARKER.length - 1
    const closeParenIndex = findBalancedClosingParenIndex(trimmed, openParenIndex)

    if (closeParenIndex === null) {
      break
    }

    items.push({
      reference: referencePart || null,
      detail: trimmed.slice(openParenIndex + 1, closeParenIndex).trim(),
    })

    cursor = closeParenIndex + 1
  }

  return items
}

export const normalizeOpeningHoursLocale = (requestedLocale?: string): string => {
  if (!requestedLocale?.trim()) {
    return 'de'
  }

  const normalized = requestedLocale.trim().replace(/-/g, '_')
  const primary = normalized.split('_')[0]?.toLowerCase()

  return primary || 'de'
}

const buildNominatimObject = (opts?: ValidateConditionalOpeningHoursOptions): nominatim_object =>
  ({
    address: {
      country_code: (opts?.countryCode ?? 'de').toLowerCase(),
      state: opts?.state ?? 'BE',
    },
  }) as nominatim_object

const logOpeningHoursValidation = (
  input: string,
  parsedSeverity: 'warning' | 'error',
  originalMessages: string[],
  processedMessages: OpeningHoursFeedbackItem[],
  skipped: OpeningHoursFeedbackItem[],
  result: ConditionalValidationResult,
): ConditionalValidationResult => {
  console.info('[opening_hours validation]', {
    input,
    severity: parsedSeverity,
    original: originalMessages,
    processed: processedMessages,
    displayed: result.messages,
    skipped,
    skippedCount: skipped.length,
  })

  return result
}

export const validateConditionalOpeningHours = (
  input: string,
  opts?: ValidateConditionalOpeningHoursOptions,
): ConditionalValidationResult => {
  const trimmed = input.trim()

  if (!trimmed) {
    return { severity: 'none', messages: [] }
  }

  const locale = normalizeOpeningHoursLocale(opts?.requestedLocale)
  const nominatim = buildNominatimObject(opts)

  try {
    const parserConfig = {
      mode: 0,
      warnings_severity: 5,
      locale,
    } as optional_conf_param

    const oh = new opening_hours(trimmed, nominatim, parserConfig)
    const structuredWarnings = oh.getStructuredWarnings()

    if (structuredWarnings.length > 0) {
      const { displayed, skipped } = partitionStructuredWarnings(structuredWarnings)
      const processedMessages = structuredWarnings.map(mapStructuredWarningToFeedbackItem)
      const result: ConditionalValidationResult = {
        severity: displayed.length > 0 ? 'warning' : 'none',
        messages: displayed,
      }

      return logOpeningHoursValidation(
        trimmed,
        'warning',
        oh.getWarnings(),
        processedMessages,
        skipped,
        result,
      )
    }

    return { severity: 'none', messages: [] }
  } catch (error) {
    const originalMessages = [String(error)]
    const processedMessages = parseOpeningHoursErrorMessage(String(error))
    const result: ConditionalValidationResult = {
      severity: processedMessages.length > 0 ? 'error' : 'none',
      messages: processedMessages,
    }

    return logOpeningHoursValidation(
      trimmed,
      'error',
      originalMessages,
      processedMessages,
      [],
      result,
    )
  }
}
