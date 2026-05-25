import opening_hours, { type nominatim_object, type optional_conf_param } from 'opening_hours'

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
 * opening_hours.js messages we hide in the UI (not relevant for *:conditional on signs).
 * Matched by detail prefix after parsing.
 */
export const SKIPPABLE_OPENING_HOURS_MESSAGE_PREFIXES = [
  'Es wurde keine Regel für "PH" (feiertags) angegeben.',
] as const

export const shouldSkipOpeningHoursMessage = (detail: string): boolean =>
  SKIPPABLE_OPENING_HOURS_MESSAGE_PREFIXES.some((prefix) => detail.startsWith(prefix))

export const partitionOpeningHoursMessages = (
  messages: OpeningHoursFeedbackItem[],
): { displayed: OpeningHoursFeedbackItem[]; skipped: OpeningHoursFeedbackItem[] } => {
  const displayed: OpeningHoursFeedbackItem[] = []
  const skipped: OpeningHoursFeedbackItem[] = []

  for (const message of messages) {
    if (shouldSkipOpeningHoursMessage(message.detail)) {
      skipped.push(message)
    } else {
      displayed.push(message)
    }
  }

  return { displayed, skipped }
}

/** Fatal errors are one string; warnings are string[]. Neither is structured JSON. */
const OPENING_HOURS_MARKER = '<--- ('

const findBalancedClosingParenIndex = (text: string, openParenIndex: number): number | null => {
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

/**
 * Parses opening_hours.js feedback. Uses balanced parentheses because detail text
 * often contains nested "(feiertags)" etc. — a naive `\([^)]*\)` match truncates.
 */
export const parseOpeningHoursFeedbackMessage = (message: string): OpeningHoursFeedbackItem[] => {
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

/** Parses one chunk into reference + detail (strips wrapping parentheses). */
export const parseOpeningHoursFeedbackChunk = (chunk: string): OpeningHoursFeedbackItem => {
  const [first, ...rest] = parseOpeningHoursFeedbackMessage(chunk)

  if (!first) {
    return { reference: null, detail: chunk.trim() }
  }

  if (rest.length > 0) {
    return first
  }

  return first
}

/** Splits concatenated opening_hours.js feedback into separate raw chunks. */
export const splitOpeningHoursFeedbackMessage = (message: string): string[] =>
  parseOpeningHoursFeedbackMessage(message).map((item) =>
    item.reference ? `${item.reference} <--- (${item.detail})` : item.detail,
  )

export const flattenOpeningHoursMessages = (messages: string[]): OpeningHoursFeedbackItem[] =>
  messages.flatMap(parseOpeningHoursFeedbackMessage)

export const normalizeOpeningHoursLocale = (requestedLocale?: string): string => {
  if (!requestedLocale?.trim()) {
    return 'de'
  }

  const normalized = requestedLocale.trim().replace(/-/g, '_')
  const primary = normalized.split('_')[0]?.toLowerCase()

  return primary || 'de'
}

const buildNominatimObject = (
  opts?: ValidateConditionalOpeningHoursOptions,
): nominatim_object =>
  ({
    address: {
      country_code: (opts?.countryCode ?? 'de').toLowerCase(),
      state: opts?.state ?? 'BE',
    },
  }) as nominatim_object

const buildDisplayedValidationResult = (
  severity: 'warning' | 'error',
  messages: OpeningHoursFeedbackItem[],
): ConditionalValidationResult => {
  const { displayed } = partitionOpeningHoursMessages(messages)

  return {
    severity: displayed.length > 0 ? severity : 'none',
    messages: displayed,
  }
}

const logOpeningHoursValidation = (
  input: string,
  parsedSeverity: 'warning' | 'error',
  originalMessages: string[],
  processedMessages: OpeningHoursFeedbackItem[],
  result: ConditionalValidationResult,
): ConditionalValidationResult => {
  const { skipped } = partitionOpeningHoursMessages(processedMessages)

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
    const warnings = oh.getWarnings()

    if (warnings.length > 0) {
      const processedMessages = flattenOpeningHoursMessages(warnings)
      const result = buildDisplayedValidationResult('warning', processedMessages)

      return logOpeningHoursValidation(trimmed, 'warning', warnings, processedMessages, result)
    }

    return { severity: 'none', messages: [] }
  } catch (error) {
    const originalMessages = [String(error)]
    const processedMessages = flattenOpeningHoursMessages(originalMessages)
    const result = buildDisplayedValidationResult('error', processedMessages)

    return logOpeningHoursValidation(trimmed, 'error', originalMessages, processedMessages, result)
  }
}
