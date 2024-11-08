import { describe, expect, test } from 'vitest'
import { osmtoolsUrl } from './osmtoolsUrl.js'

describe('osmtoolsUrl()', () => {
  test('works', () => {
    const result = osmtoolsUrl('DE:237,1022-10,1024-17;250')
    expect(result).toBe('http://osmtools.de/traffic_signs/?signs=237,1022-10,1024-17,250')
  })
})
