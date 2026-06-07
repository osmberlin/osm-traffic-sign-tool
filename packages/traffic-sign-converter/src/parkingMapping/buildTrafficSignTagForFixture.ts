import type { ParkingScenarioFixture } from './parseAreaTags.js'

const VALUE_PROMPT_SIGN_IDS: Record<string, keyof ParkingScenarioFixture['placeholders']> = {
  '1042-33': 'OPENINGHOURS',
  '1040-32': 'TIME',
  '1040-33': 'TIME',
  '1020-32': 'AUSWEIS',
  '1044-30': 'AUSWEIS',
  '1044-11': 'AUSWEIS',
  '1053-33': 'OTHER',
}

export const buildTrafficSignTagForFixture = (fixture: ParkingScenarioFixture) => {
  const parts = fixture.trafficSignKey.replace(/^DE:/, '').split(',')

  const augmented = parts.map((signId) => {
    const placeholderKey = VALUE_PROMPT_SIGN_IDS[signId]
    if (!placeholderKey || !fixture.placeholders[placeholderKey]) return signId

    const value = fixture.sampleSubstitution[placeholderKey]
    return `${signId}[${value}]`
  })

  return `traffic_sign=DE:${augmented.join(',')}`
}
