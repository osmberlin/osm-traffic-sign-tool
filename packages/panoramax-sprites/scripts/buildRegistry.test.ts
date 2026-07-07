import { describe, expect, it } from 'bun:test'
import { buildRegistry, classifyEntry } from './buildRegistry.ts'

describe('classifyEntry', () => {
  const base = {
    yolo: 'demo',
    country: 'DE',
    code: '274-30',
    hasCatalogue: true,
    signIdInCatalogue: true,
    svgExists: true,
  } as const

  it('marks a resolvable sign as ok with a sprite key = bare code', () => {
    const entry = classifyEntry(base)
    expect(entry.status).toBe('ok')
    expect(entry.osmValue).toBe('DE:274-30')
    expect(entry.spriteKey).toBe('274-30')
    expect(entry.signId).toBe('274-30')
    expect(entry.svgName).toBe('DE_274_30')
  })

  it('keeps the [value] suffix in the sprite key but strips it for the signId', () => {
    const entry = classifyEntry({ ...base, country: 'FR', code: 'B14[30]' })
    expect(entry.spriteKey).toBe('B14[30]') // what the Panoramax viewer looks up
    expect(entry.signId).toBe('B14') // catalogue / SVG lookup
    expect(entry.svgName).toBe('FR_B14')
  })

  it('classifies svg-missing (in catalogue, no SVG) with no sprite key', () => {
    const entry = classifyEntry({ ...base, svgExists: false })
    expect(entry.status).toBe('svg-missing')
    expect(entry.spriteKey).toBeNull()
    expect(entry.svgName).toBe('DE_274_30') // still resolvable name, just no file
  })

  it('classifies signId-not-in-tool', () => {
    const entry = classifyEntry({ ...base, signIdInCatalogue: false, svgExists: false })
    expect(entry.status).toBe('signId-not-in-tool')
    expect(entry.spriteKey).toBeNull()
  })

  it('classifies country-not-in-tool with a null svgName', () => {
    const entry = classifyEntry({
      yolo: 'demo',
      country: 'NL',
      code: 'A01-30',
      hasCatalogue: false,
      signIdInCatalogue: false,
      svgExists: false,
    })
    expect(entry.status).toBe('country-not-in-tool')
    expect(entry.svgName).toBeNull()
    expect(entry.osmValue).toBe('NL:A01-30')
  })
})

describe('buildRegistry (real data)', () => {
  it('covers all five countries, with NL/CH fully country-not-in-tool and DE/FR/BE producing ok icons', async () => {
    const { byCountry } = await buildRegistry()
    const by = Object.fromEntries(byCountry.map((c) => [c.country, c]))

    expect(byCountry.map((c) => c.country).sort()).toEqual(['BE', 'CH', 'DE', 'FR', 'NL'])

    for (const cc of ['NL', 'CH'] as const) {
      expect(by[cc]!.hasCatalogue).toBe(false)
      expect(by[cc]!.counts.ok).toBe(0)
      expect(by[cc]!.counts['country-not-in-tool']).toBe(by[cc]!.entries.length)
    }
    for (const cc of ['DE', 'FR', 'BE'] as const) {
      expect(by[cc]!.hasCatalogue).toBe(true)
      expect(by[cc]!.counts.ok).toBeGreaterThan(0)
    }

    // Every ok entry must carry a sprite key + svg name; non-ok entries must not have a sprite key.
    for (const country of byCountry) {
      for (const entry of country.entries) {
        if (entry.status === 'ok') {
          expect(entry.spriteKey).not.toBeNull()
          expect(entry.svgName).not.toBeNull()
        } else {
          expect(entry.spriteKey).toBeNull()
        }
      }
    }
  })
})
