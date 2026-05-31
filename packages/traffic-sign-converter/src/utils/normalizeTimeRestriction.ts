import opening_hours from 'opening_hours'

const cleanWithOpeningHours = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    return new opening_hours(trimmed, undefined, 0).prettifyValue()
  } catch {
    return null
  }
}

const simplifyForTrafficSignValue = (value: string) => {
  return value
    .replaceAll('01:', '1:')
    .replaceAll('02:', '2:')
    .replaceAll('03:', '3:')
    .replaceAll('04:', '4:')
    .replaceAll('05:', '5:')
    .replaceAll('06:', '6:')
    .replaceAll('07:', '7:')
    .replaceAll('08:', '8:')
    .replaceAll('09:', '9:')
    .replaceAll(':00', '')
}

export const normalizePlateTimeRestriction = (value: string) => {
  const cleaned = cleanWithOpeningHours(value)
  if (!cleaned) return value.trim()
  return simplifyForTrafficSignValue(cleaned)
}

export const normalizeConditionalTimeRestriction = (value: string) => {
  return cleanWithOpeningHours(value) ?? value.trim()
}
