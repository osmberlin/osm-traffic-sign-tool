import { describe, expect, test } from 'vitest'
import { loadTrafficSignSvg } from './loadTrafficSignSvg.js'

describe('loadTrafficSignSvg', () => {
  test('loads a bundled DE sign SVG', async () => {
    const svg = await loadTrafficSignSvg('DE', '274.1-20')
    expect(svg).toBeDefined()
    expect(typeof svg).toBe('string')
    expect(svg!.length).toBeGreaterThan(0)
  })

  test('returns undefined when no loader exists', async () => {
    const svg = await loadTrafficSignSvg('BR', 'A-49a')
    expect(svg).toBeUndefined()
  })
})
