import { describe, expect, test } from 'vitest'
import { signsByDescriptiveName } from '../../data/utils/signsByDescriptiveName.js'
import { collectConditionalTag } from './collectConditionalTag.js'

describe('collectConditionalTag()', () => {
  // https://osmtools.de/traffic_signs/?signs=276
  test('Single sign with conditional tag', () => {
    const signs = signsByDescriptiveName(['Überholverbot für Kraftfahrzeuge aller Art'])
    expect(collectConditionalTag(signs)).toMatchObject({ key: 'overtaking', value: 'no' })
  })

  // https://osmtools.de/traffic_signs/?signs=276,1040-30%5B16:00-18:00%5D
  test('Sign group with conditional sign with prompt', () => {
    const signs = signsByDescriptiveName([
      'Überholverbot für Kraftfahrzeuge aller Art',
      'Zeitliche Beschräkung',
    ])
    expect(collectConditionalTag(signs)).toMatchObject({
      key: 'overtaking:conditional',
      value: 'no @ 16-18',
    })
  })

  test('Sign group with conditional sign with static value', () => {
    const signs = signsByDescriptiveName([
      'Überholverbot für Kraftfahrzeuge aller Art',
      'Zeitliche Beschräkung: werktags',
    ])
    expect(collectConditionalTag(signs)).toMatchObject({
      key: 'overtaking:conditional',
      value: 'no @ Mo-Sa;PH off',
    })
  })
})
