import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

beforeEach(() => {
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})
import {
  flattenOpeningHoursMessages,
  normalizeOpeningHoursLocale,
  parseOpeningHoursFeedbackChunk,
  partitionOpeningHoursMessages,
  shouldSkipOpeningHoursMessage,
  splitOpeningHoursFeedbackMessage,
  validateConditionalOpeningHours,
} from './validateConditionalOpeningHours.js'

describe('normalizeOpeningHoursLocale()', () => {
  test('returns de for empty input', () => {
    expect(normalizeOpeningHoursLocale()).toBe('de')
    expect(normalizeOpeningHoursLocale('')).toBe('de')
    expect(normalizeOpeningHoursLocale('   ')).toBe('de')
  })

  test('normalizes de_DE and de-DE to de', () => {
    expect(normalizeOpeningHoursLocale('de_DE')).toBe('de')
    expect(normalizeOpeningHoursLocale('de-DE')).toBe('de')
  })
})

describe('parseOpeningHoursFeedbackChunk()', () => {
  test('splits reference and detail and removes wrapping parentheses', () => {
    expect(
      parseOpeningHoursFeedbackChunk(
        'Su 6-22: <--- (Unerwartetes Zeichen: "timesep" Das bedeutet, dass die Syntax an dieser Stelle nicht erkannt werden konnte.)',
      ),
    ).toEqual({
      reference: 'Su 6-22:',
      detail:
        'Unerwartetes Zeichen: "timesep" Das bedeutet, dass die Syntax an dieser Stelle nicht erkannt werden konnte.',
    })
  })

  test('parses chunks without trailing colon on reference', () => {
    expect(
      parseOpeningHoursFeedbackChunk(
        'Su 6-22 <--- (Zeitspanne ohne Minutenangabe angegeben. Bitte verwende stattdessen folgende Syntax "06:00-22:00".)',
      ),
    ).toEqual({
      reference: 'Su 6-22',
      detail:
        'Zeitspanne ohne Minutenangabe angegeben. Bitte verwende stattdessen folgende Syntax "06:00-22:00".',
    })
  })
})

describe('splitOpeningHoursFeedbackMessage()', () => {
  test('splits concatenated fatal error string into multiple items', () => {
    const combined =
      'Su 6-22: <--- (Unerwartetes Zeichen: "timesep" Das bedeutet, dass die Syntax an dieser Stelle nicht erkannt werden konnte.) Su 6-22 <--- (Zeitspanne ohne Minutenangabe angegeben. Das ist nicht sehr eindeutig! Bitte verwende stattdessen folgende Syntax "06:00-22:00".)'

    const result = splitOpeningHoursFeedbackMessage(combined)

    expect(result).toHaveLength(2)
    expect(result[0]).toContain('timesep')
    expect(result[1]).toContain('06:00-22:00')
  })
})

describe('partitionOpeningHoursMessages()', () => {
  test('separates skippable and displayed messages', () => {
    const phDetail =
      'Es wurde keine Regel für "PH" (feiertags) angegeben. Weitere Hinweise.'
    const other = { reference: '16:00-18:00', detail: 'Some other warning.' }

    const result = partitionOpeningHoursMessages([
      { reference: 'Mo-Sa 18:00-19:00', detail: phDetail },
      other,
    ])

    expect(result.skipped).toHaveLength(1)
    expect(result.displayed).toEqual([other])
  })
})

describe('flattenOpeningHoursMessages()', () => {
  test('flattens and parses multiple strings', () => {
    const result = flattenOpeningHoursMessages([
      'A <--- (first.) B <--- (second.)',
      'C <--- (third.)',
    ])

    expect(result).toEqual([
      { reference: 'A', detail: 'first.' },
      { reference: 'B', detail: 'second.' },
      { reference: 'C', detail: 'third.' },
    ])
  })
})

describe('validateConditionalOpeningHours()', () => {
  test('returns none for blank input', () => {
    expect(validateConditionalOpeningHours('')).toEqual({ severity: 'none', messages: [] })
    expect(validateConditionalOpeningHours('   ')).toEqual({ severity: 'none', messages: [] })
  })

  test('returns error for malformed syntax', () => {
    const result = validateConditionalOpeningHours('Di-So+12:00-13:00', { requestedLocale: 'de' })

    expect(result.severity).toBe('error')
    expect(result.messages.length).toBeGreaterThan(0)
    expect(result.messages.some((message) => message.detail.includes('+'))).toBe(true)
  })

  test('returns multiple parsed error messages when parser concatenates them', () => {
    const result = validateConditionalOpeningHours('Su 6-22:00', { requestedLocale: 'de' })

    expect(result.severity).toBe('error')
    expect(result.messages).toHaveLength(2)
    expect(result.messages[0].reference).toBe('Su 6-22:')
    expect(result.messages[0].detail).toContain('timesep')
    expect(result.messages[1].reference).toBe('Su 6-22')
    expect(result.messages[1].detail).toContain('06:00-22:00')
  })

  test('returns none for valid syntax without warnings', () => {
    const result = validateConditionalOpeningHours('Mo-Fr 16:00-18:00; PH off', {
      requestedLocale: 'de',
    })

    expect(result).toEqual({ severity: 'none', messages: [] })
  })

  test('returns warning when parser reports a non-skippable soft issue', () => {
    const result = validateConditionalOpeningHours('Di 12:00-13:00', { requestedLocale: 'de' })

    expect(result.severity).toBe('warning')
    expect(result.messages.length).toBeGreaterThan(0)
    expect(result.messages[0].reference).toBe('Di')
    expect(result.messages[0].detail).toContain('Tu')
  })

  test('does not truncate warnings with nested parentheses', () => {
    const result = validateConditionalOpeningHours('Mo-Sa 18:00-19:00', { requestedLocale: 'de' })

    expect(result.severity).toBe('none')
    expect(result.messages).toEqual([])
  })

  test('logs but hides skippable PH holiday warnings in the UI', () => {
    const result = validateConditionalOpeningHours('Mo-Sa 18:00-19:00', { requestedLocale: 'de' })

    expect(result.severity).toBe('none')
    expect(result.messages).toEqual([])
    expect(shouldSkipOpeningHoursMessage('Es wurde keine Regel für "PH" (feiertags) angegeben. …')).toBe(
      true,
    )
    expect(vi.mocked(console.info)).toHaveBeenCalledWith(
      '[opening_hours validation]',
      expect.objectContaining({
        original: expect.arrayContaining([
          expect.stringContaining('Es wurde keine Regel für "PH" (feiertags) angegeben.'),
        ]),
        processed: expect.arrayContaining([
          expect.objectContaining({
            detail: expect.stringContaining('Es wurde keine Regel für "PH" (feiertags) angegeben.'),
          }),
        ]),
        skippedCount: 1,
        skipped: expect.arrayContaining([
          expect.objectContaining({
            detail: expect.stringContaining('Es wurde keine Regel für "PH" (feiertags) angegeben.'),
          }),
        ]),
      }),
    )
  })

  test('uses locale normalization from requestedLocale', () => {
    const result = validateConditionalOpeningHours('invalid!!!', { requestedLocale: 'de_DE' })

    expect(result.severity).toBe('error')
    expect(result.messages[0].detail.length).toBeGreaterThan(0)
  })
})
