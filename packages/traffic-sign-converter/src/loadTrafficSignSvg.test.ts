import { describe, expect, test } from 'vitest'
import { loadTrafficSignSvg } from './loadTrafficSignSvg.js'
import { trafficSignTagToSigns } from './trafficSignTagToSigns/trafficSignTagToSigns.js'

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

  test.each(['274.1[20]', '274.1[40]', '325.1[30]', 'DE:274.1[20]', '1020-30[Anlieger]'])(
    'loads the SVG of the parsed sign for the string %s',
    async (value) => {
      const [sign] = trafficSignTagToSigns(value, 'DE')
      const svgFromString = await loadTrafficSignSvg('DE', value)
      expect(svgFromString).toBeDefined()
      expect(svgFromString).toBe(await loadTrafficSignSvg('DE', sign!))
    },
  )
})
