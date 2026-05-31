import { describe, expect, test } from 'vitest'
import { _conditions__time } from '../data-definitions/DE/data/conditions__time.js'
import {
  normalizeConditionalTimeRestriction,
  normalizePlateTimeRestriction,
} from './normalizeTimeRestriction.js'

describe('normalizeTimeRestriction', () => {
  describe('normalizePlateTimeRestriction()', () => {
    test('normalizes full-hour range to sign format', () => {
      expect(normalizePlateTimeRestriction('06:00-18:00')).toBe('6-18')
      expect(normalizePlateTimeRestriction('16-18')).toBe('16-18')
    })

    test('keeps minute precision without leading-zero hours', () => {
      expect(normalizePlateTimeRestriction('06:30-18:15')).toBe('6:30-18:15')
    })

    test('simplifies multiple ranges and weekday prefixes from clean opening_hours output', () => {
      expect(normalizePlateTimeRestriction('Mo-Sa 08:00-11:00,16:00-18:00')).toBe(
        'Mo-Sa 8-11,16-18',
      )
      expect(normalizePlateTimeRestriction('Mo-Sa 08:30-11:30,16:00-18:00')).toBe(
        'Mo-Sa 8:30-11:30,16-18',
      )
    })

    test('returns input unchanged when opening_hours parsing fails', () => {
      expect(normalizePlateTimeRestriction('Su 6-22:00')).toBe('Su 6-22:00')
    })
  })

  describe('normalizeConditionalTimeRestriction()', () => {
    test('normalizes full-hour range to HH:MM-HH:MM', () => {
      expect(normalizeConditionalTimeRestriction('6-21')).toBe('06:00-21:00')
      expect(normalizeConditionalTimeRestriction('22-6')).toBe('22:00-06:00')
    })

    test('normalizes minute precision with leading-zero hours', () => {
      expect(normalizeConditionalTimeRestriction('6:30-18:15')).toBe('06:30-18:15')
    })

    test('normalizes multi-range opening_hours expressions to canonical format', () => {
      expect(normalizeConditionalTimeRestriction('Mo-Sa 8:00-11:00,16:00-18:00')).toBe(
        'Mo-Sa 08:00-11:00,16:00-18:00',
      )
      expect(normalizeConditionalTimeRestriction('PH off;Mo-Sa 8:30-11:30,16:00-18:00')).toBe(
        'PH off;Mo-Sa 8:30-11:30,16:00-18:00',
      )
    })

    test('returns input unchanged when opening_hours parsing fails', () => {
      expect(normalizeConditionalTimeRestriction('Su 6-22:00')).toBe('Su 6-22:00')
    })
  })

  describe('catalogue defaults stay parseable after normalization', () => {
    const defaults = _conditions__time
      .filter((sign) => sign.valuePrompt && typeof sign.signValue === 'string')
      .map((sign) => ({
        signId: sign.signId,
        format: sign.valuePrompt!.format,
        value: String(sign.signValue),
      }))

    test.each(defaults)(
      'normalizes default $signId ($format): "$value"',
      ({ format, value, signId }) => {
        const conditional = normalizeConditionalTimeRestriction(value)
        expect(conditional.length).toBeGreaterThan(0)

        if (format === 'time_restriction') {
          const plate = normalizePlateTimeRestriction(value)
          expect(plate.length).toBeGreaterThan(0)
          expect(plate).not.toContain(':00')
          for (const paddedHour of [
            '01:',
            '02:',
            '03:',
            '04:',
            '05:',
            '06:',
            '07:',
            '08:',
            '09:',
          ]) {
            expect(plate, `unexpected padded hour in ${signId}`).not.toContain(paddedHour)
          }
        }
      },
    )
  })

  describe('catalogue defaults keep conditional output stable', () => {
    const defaults = _conditions__time
      .filter((sign) => sign.valuePrompt && typeof sign.signValue === 'string')
      .map((sign) => ({
        signId: sign.signId,
        value: String(sign.signValue),
      }))

    test.each(defaults)('keeps default conditional value unchanged for $signId', ({ value }) => {
      expect(normalizeConditionalTimeRestriction(value)).toBe(value)
    })

    test.each(defaults)('is idempotent for conditional normalization on $signId', ({ value }) => {
      const once = normalizeConditionalTimeRestriction(value)
      const twice = normalizeConditionalTimeRestriction(once)
      expect(twice).toBe(once)
    })
  })

  describe('always-replace simplifier details', () => {
    test('removes all :00 parts and all 01:..09: hour prefixes', () => {
      expect(normalizePlateTimeRestriction('01:00-09:00')).toBe('1-9')
      expect(normalizePlateTimeRestriction('08:30-09:00')).toBe('8:30-9')
    })
  })
})
