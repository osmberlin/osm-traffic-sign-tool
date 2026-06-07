import type { GeometryType } from '../../data-definitions/geometryTypes.js'
import type { SignStateType } from '../../data-definitions/TrafficSignDataTypes.js'

type RecognizedSignState = Extract<SignStateType, { recodgnizedSign: true }>
import { isOpeningHoursValuePromptFormat } from '../../data-definitions/valuePromptFormats.js'
import { normalizeConditionalTimeRestriction } from '../../utils/normalizeTimeRestriction.js'
import { getRecommendations } from './getRecommendations.js'

const PARKING_RESTRICTION_BY_SIGN_ID: Record<string, 'no_stopping' | 'no_parking'> = {
  '283': 'no_stopping',
  '286': 'no_parking',
  '290': 'no_parking',
}

const PARKING_LOT_SIGN_IDS = new Set(['314', '314.1'])

const VEHICLE_CLASS_MODIFIER_PREFIX = '1010-'

const PARKING_VEHICLE_DESIGNATED: Record<string, string[]> = {
  bus: ['bus', 'tourist_bus'],
  motorcar: ['motorcar'],
  motorcycle: ['motorcycle'],
  electric_vehicle: ['vehicle:electric'],
  motorhome: ['motorhome'],
  hgv: ['hgv'],
}

const PAYMENT_TAG_KEYS = ['fee', 'authentication:ticket'] as const
const DISC_TAG_KEYS = ['authentication:disc', 'maxstay'] as const

const hasSign = (signs: SignStateType[], signId: string) =>
  signs.some((sign) => sign.recodgnizedSign && sign.signId === signId)

const findSign = (signs: SignStateType[], signId: string): RecognizedSignState | undefined =>
  signs.find((sign): sign is RecognizedSignState => sign.recodgnizedSign && sign.signId === signId)

const getOpeningHoursCondition = (signs: SignStateType[]) => {
  const sign = findSign(signs, '1042-33')
  if (!sign) return null
  if (!isOpeningHoursValuePromptFormat(sign.valuePrompt?.format ?? '')) return null
  const raw = String(sign.signValue ?? sign.valuePrompt?.defaultValue ?? '')
  return normalizeConditionalTimeRestriction(raw)
}

const getMaxstayValue = (signs: SignStateType[]) => {
  const sign = findSign(signs, '1040-32') ?? findSign(signs, '1040-33')
  return String(sign?.signValue ?? sign?.valuePrompt?.defaultValue ?? '2 h')
}

const hasDoubledPaymentModifier = (signs: SignStateType[]) =>
  signs.some((sign) => sign.recodgnizedSign && sign.osmValuePart === '1053-31-1053-31')

const hasPaymentModifiers = (signs: SignStateType[]) =>
  signs.some(
    (sign) =>
      sign.recodgnizedSign &&
      (sign.signId === '1053-31' ||
        sign.signId === '1051-33' ||
        sign.osmValuePart === '1053-31-1053-31'),
  )

const getModifierValue = (sign: RecognizedSignState, geometry: GeometryType) => {
  if (sign.kind !== 'condition_modifier' && sign.kind !== 'exception_modifier') return undefined
  return getRecommendations(sign, geometry)?.modifierValue
}

const getVehicleClassModifiers = (signs: SignStateType[], geometry: GeometryType) =>
  signs.filter((sign): sign is RecognizedSignState => {
    if (!sign.recodgnizedSign || sign.kind !== 'condition_modifier') return false
    if (!sign.signId?.startsWith(VEHICLE_CLASS_MODIFIER_PREFIX)) return false
    return !!getModifierValue(sign, geometry)
  })

const applyDesignatedVehicleTags = (
  tagMap: Map<string, string | string[]>,
  modifierValue: string,
  designatedValue = 'designated',
) => {
  const keys = PARKING_VEHICLE_DESIGNATED[modifierValue] ?? [modifierValue]
  for (const key of keys) {
    tagMap.set(key, designatedValue)
  }
}

const applyConditionalVehicleTags = (
  tagMap: Map<string, string | string[]>,
  modifierValue: string,
  condition: string,
  baseValue: string,
  conditionalValue: string,
) => {
  const keys = PARKING_VEHICLE_DESIGNATED[modifierValue] ?? [modifierValue]
  for (const key of keys) {
    tagMap.delete(key)
    tagMap.set(key, baseValue)
    tagMap.set(`${key}:conditional`, `${conditionalValue} @ (${condition})`)
  }
}

const applyConditionalPaymentTags = (
  tagMap: Map<string, string | string[]>,
  condition: string,
  baseValue = 'no',
  conditionalValue = 'yes',
) => {
  for (const key of PAYMENT_TAG_KEYS) {
    tagMap.set(key, baseValue)
    tagMap.set(`${key}:conditional`, `${conditionalValue} @ (${condition})`)
  }
}

const applyPaymentExceptionSubkeys = (
  tagMap: Map<string, string | string[]>,
  accessKeys: string[],
) => {
  for (const key of PAYMENT_TAG_KEYS) {
    const value = tagMap.get(key)
    if (value !== 'yes') continue
    for (const accessKey of accessKeys) {
      tagMap.set(`${key}:${accessKey}`, 'no')
    }
  }
}

const clearDiscTags = (tagMap: Map<string, string | string[]>) => {
  for (const key of DISC_TAG_KEYS) {
    tagMap.delete(key)
    tagMap.delete(`${key}:conditional`)
  }
  tagMap.delete('fee')
}

const applyDiscOnlyConditionals = (
  tagMap: Map<string, string | string[]>,
  condition: string,
  maxstay: string,
) => {
  clearDiscTags(tagMap)
  tagMap.set('authentication:disc:conditional', `yes @ (${condition})`)
  tagMap.set('maxstay:conditional', `${maxstay} @ (${condition})`)
}

const applyDiscInvertedConditionals = (
  tagMap: Map<string, string | string[]>,
  condition: string,
  maxstay: string,
) => {
  clearDiscTags(tagMap)
  tagMap.set('authentication:disc', 'no')
  tagMap.set('authentication:disc:conditional', `yes @ (${condition})`)
  tagMap.set('maxstay', 'no')
  tagMap.set('maxstay:conditional', `${maxstay} @ (${condition})`)
}

const applyResidentsMaxstayException = (
  tagMap: Map<string, string | string[]>,
  maxstay: string,
  zone: string | undefined,
) => {
  if (zone) tagMap.set('zone', zone)
  tagMap.set('maxstay', maxstay)
  tagMap.set('maxstay:conditional', `no @ residents`)
}

const applyResidentsTicketSwap = (tagMap: Map<string, string | string[]>, maxstay: string) => {
  clearDiscTags(tagMap)
  tagMap.set('authentication:ticket', 'yes')
  tagMap.set('authentication:ticket:conditional', `no @ (residents)`)
  tagMap.set('maxstay', maxstay)
  tagMap.set('maxstay:conditional', `no @ (residents)`)
}

const applyRestrictionParkingCombination = (
  tagMap: Map<string, string | string[]>,
  signs: SignStateType[],
  geometry: GeometryType,
  baseRestriction: 'no_stopping' | 'no_parking',
) => {
  const openingHoursCondition = getOpeningHoursCondition(signs)
  const vehicleConditionMods = getVehicleClassModifiers(signs, geometry)
  const exceptionMods = signs.filter(
    (sign): sign is RecognizedSignState =>
      sign.recodgnizedSign && sign.kind === 'exception_modifier',
  )
  const hasResidentsException = hasSign(signs, '1020-32')
  const paymentModifiers = hasPaymentModifiers(signs)
  const doubledPayment = hasDoubledPaymentModifier(signs)

  const hasDeliveryException = exceptionMods.some(
    (sign) => getModifierValue(sign, geometry) === 'delivery',
  )

  if (hasSign(signs, '1053-33') && vehicleConditionMods.length === 0 && !openingHoursCondition) {
    tagMap.delete('restriction')
    const weightSign = findSign(signs, '1053-33')
    if (weightSign?.signValue !== undefined) {
      tagMap.set('maxweight', String(weightSign.signValue))
    }
    return
  }

  if (hasDeliveryException) {
    tagMap.delete('restriction')
    tagMap.set('access', 'delivery')
    return
  }

  if (paymentModifiers && doubledPayment) {
    tagMap.delete('restriction')
    if (openingHoursCondition) {
      applyConditionalPaymentTags(tagMap, openingHoursCondition)
    } else {
      for (const key of PAYMENT_TAG_KEYS) tagMap.set(key, 'no')
    }
    return
  }

  if (hasResidentsException && openingHoursCondition) {
    tagMap.set('restriction', baseRestriction)
    tagMap.set(
      'restriction:conditional',
      `no_parking @ (${openingHoursCondition}); none @ residents`,
    )
    const zone = findSign(signs, '1020-32')?.signValue
    if (zone) tagMap.set('zone', String(zone))
    return
  }

  if (hasResidentsException) {
    tagMap.set('restriction', baseRestriction)
    tagMap.set('restriction:conditional', `none @ residents`)
    const zone = findSign(signs, '1020-32')?.signValue
    if (zone) tagMap.set('zone', String(zone))
    return
  }

  if (openingHoursCondition && vehicleConditionMods.length > 0) {
    tagMap.delete('restriction')
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (!modifierValue) continue
      tagMap.set(
        `restriction:${modifierValue}:conditional`,
        `${baseRestriction} @ (${openingHoursCondition})`,
      )
    }
    return
  }

  if (openingHoursCondition) {
    tagMap.delete('restriction')
    tagMap.set('restriction:conditional', `${baseRestriction} @ (${openingHoursCondition})`)
    return
  }

  if (vehicleConditionMods.length > 0) {
    tagMap.delete('restriction')
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) tagMap.set(`restriction:${modifierValue}`, baseRestriction)
    }
    return
  }

  if (!paymentModifiers) {
    tagMap.set('restriction', baseRestriction)
  }

  for (const sign of exceptionMods) {
    const recs = getRecommendations(sign, geometry)
    if (!recs || getModifierValue(sign, geometry) === 'delivery') continue

    for (const accessTag of recs.accessTags ?? []) {
      tagMap.delete(accessTag.key)
      const restrictionKey =
        accessTag.key === 'electric_vehicle'
          ? 'restriction:vehicle:electric'
          : `restriction:${accessTag.key}`
      tagMap.set(restrictionKey, 'none')
    }
  }
}

const applyParkingLotCombination = (
  tagMap: Map<string, string | string[]>,
  signs: SignStateType[],
  geometry: GeometryType,
) => {
  const openingHoursCondition = getOpeningHoursCondition(signs)
  const vehicleConditionMods = getVehicleClassModifiers(signs, geometry)
  const hasResidentsException = hasSign(signs, '1020-32')
  const hasDiscModifier = hasSign(signs, '1040-32') || hasSign(signs, '1040-33')
  const hasDisabledModifier = hasSign(signs, '1044-10') || hasSign(signs, '1044-11')
  const hasResidentsAccessModifier = hasSign(signs, '1044-30')
  const paymentModifiers = hasPaymentModifiers(signs)
  const maxstay = getMaxstayValue(signs)
  const residentsZone =
    findSign(signs, '1020-32')?.signValue ?? findSign(signs, '1044-30')?.signValue

  if (
    vehicleConditionMods.length === 1 &&
    getModifierValue(vehicleConditionMods[0]!, geometry) === 'motorcycle' &&
    !hasDiscModifier &&
    !paymentModifiers &&
    !openingHoursCondition &&
    !hasResidentsException &&
    !hasDisabledModifier &&
    !hasResidentsAccessModifier
  ) {
    tagMap.delete('access')
    tagMap.delete('fee')
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) tagMap.delete(modifierValue)
    }
    tagMap.set('amenity', 'motorcycle_parking')
    return
  }

  if (paymentModifiers && hasSign(signs, '1024-14')) {
    tagMap.set('authentication:ticket', 'yes')
    tagMap.set('fee', 'yes')
    applyPaymentExceptionSubkeys(tagMap, ['bus', 'tourist_bus'])
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) applyDesignatedVehicleTags(tagMap, modifierValue)
    }
    if (vehicleConditionMods.length > 0) tagMap.set('vehicle', 'no')
    return
  }

  if (paymentModifiers && hasResidentsException && openingHoursCondition) {
    tagMap.set('authentication:ticket', 'yes')
    tagMap.set('fee', 'yes')
    if (residentsZone) {
      tagMap.set('zone:conditional', `${residentsZone} @ (${openingHoursCondition})`)
    }
    tagMap.delete('zone')
    return
  }

  if (paymentModifiers && openingHoursCondition && !hasDoubledPaymentModifier(signs)) {
    applyConditionalPaymentTags(tagMap, openingHoursCondition)
    return
  }

  if (paymentModifiers) {
    tagMap.set('authentication:ticket', 'yes')
    tagMap.set('fee', 'yes')
    if (hasResidentsException && residentsZone) {
      tagMap.set('zone', String(residentsZone))
    }
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) applyDesignatedVehicleTags(tagMap, modifierValue)
    }
    if (vehicleConditionMods.length > 0) tagMap.set('vehicle', 'no')
    return
  }

  if (hasResidentsAccessModifier && openingHoursCondition) {
    tagMap.delete('access')
    tagMap.delete('fee')
    const zone = findSign(signs, '1044-30')?.signValue
    if (zone) tagMap.set('zone', String(zone))
    tagMap.set('access:conditional', `private @ (${openingHoursCondition})`)
    return
  }

  if (hasResidentsAccessModifier) {
    tagMap.delete('fee')
    return
  }

  if (hasDisabledModifier && openingHoursCondition) {
    tagMap.delete('access')
    tagMap.delete('fee')
    if (hasSign(signs, '1044-11')) {
      const ref = findSign(signs, '1044-11')?.signValue
      if (ref) tagMap.set('ref', String(ref))
      tagMap.set('access:conditional', `no @ (${openingHoursCondition})`)
      tagMap.set('disabled:conditional', `private @ (${openingHoursCondition})`)
    } else {
      tagMap.set('access', 'yes')
      tagMap.set('access:conditional', `no @ (${openingHoursCondition})`)
      tagMap.set('disabled:conditional', `designated @ (${openingHoursCondition})`)
    }
    return
  }

  if (hasDisabledModifier) {
    tagMap.delete('fee')
    return
  }

  if (openingHoursCondition && !hasDiscModifier && !vehicleConditionMods.length) {
    tagMap.delete('access')
    tagMap.delete('fee')
    tagMap.set('access', 'no')
    tagMap.set('access:conditional', `yes @ (${openingHoursCondition})`)
    return
  }

  if (openingHoursCondition && vehicleConditionMods.length > 0 && !hasDiscModifier) {
    tagMap.delete('access')
    tagMap.delete('fee')
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (!modifierValue) continue
      applyConditionalVehicleTags(
        tagMap,
        modifierValue,
        openingHoursCondition,
        modifierValue === 'motorcar' ? 'yes' : 'designated',
        'designated',
      )
    }
    const hasMotorcarOnlyDesignated = vehicleConditionMods.some(
      (sign) => getModifierValue(sign, geometry) === 'motorcar',
    )
    tagMap.set('vehicle', hasMotorcarOnlyDesignated ? 'designated' : 'yes')
    tagMap.set('vehicle:conditional', `no @ (${openingHoursCondition})`)
    return
  }

  if (hasSign(signs, '1050-32') && hasDiscModifier && openingHoursCondition) {
    tagMap.delete('access')
    tagMap.delete('fee')
    tagMap.set('authentication:disc', 'yes')
    tagMap.delete('authentication:disc:conditional')
    tagMap.set('maxstay:conditional', `${maxstay} @ (${openingHoursCondition})`)
    tagMap.delete('maxstay')
    return
  }

  if (hasDiscModifier && hasSign(signs, '1040-33') && hasResidentsException) {
    applyResidentsTicketSwap(tagMap, maxstay)
    return
  }

  if (hasDiscModifier && hasResidentsException && openingHoursCondition) {
    clearDiscTags(tagMap)
    if (residentsZone) tagMap.set('zone', String(residentsZone))
    tagMap.set('authentication:disc:conditional', `yes @ (${openingHoursCondition})`)
    tagMap.set('maxstay:conditional', `${maxstay} @ (${openingHoursCondition}); no @ residents`)
    return
  }

  if (hasDiscModifier && hasResidentsException) {
    clearDiscTags(tagMap)
    if (residentsZone) tagMap.set('zone', String(residentsZone))
    tagMap.set('authentication:disc', 'yes')
    applyResidentsMaxstayException(tagMap, maxstay, undefined)
    return
  }

  if (hasDiscModifier && openingHoursCondition && vehicleConditionMods.length > 0) {
    applyDiscInvertedConditionals(tagMap, openingHoursCondition, maxstay)
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) applyDesignatedVehicleTags(tagMap, modifierValue)
    }
    tagMap.set('vehicle', 'no')
    return
  }

  if (hasDiscModifier && openingHoursCondition) {
    applyDiscOnlyConditionals(tagMap, openingHoursCondition, maxstay)
    return
  }

  if (hasDiscModifier && vehicleConditionMods.length > 0) {
    tagMap.set('authentication:disc', 'yes')
    tagMap.set('fee', 'no')
    tagMap.set('maxstay', maxstay)
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) applyDesignatedVehicleTags(tagMap, modifierValue)
    }
    tagMap.set('vehicle', 'no')
    return
  }

  if (hasDiscModifier) {
    tagMap.set('authentication:disc', 'yes')
    tagMap.set('maxstay', maxstay)
    return
  }

  if (vehicleConditionMods.length > 0) {
    tagMap.delete('access')
    tagMap.delete('fee')
    for (const sign of vehicleConditionMods) {
      const modifierValue = getModifierValue(sign, geometry)
      if (modifierValue) applyDesignatedVehicleTags(tagMap, modifierValue)
    }
    tagMap.set('vehicle', 'no')
    return
  }

  if (!hasDisabledModifier && !hasResidentsAccessModifier) {
    tagMap.set('access', 'yes')
    tagMap.set('fee', 'no')
  }
}

export const applyParkingCombinationTags = (
  tagMap: Map<string, string | string[]>,
  signs: SignStateType[],
  geometry: GeometryType,
) => {
  if (geometry !== 'way') return

  const trafficSigns = signs.filter((sign) => sign.recodgnizedSign && sign.kind === 'traffic_sign')
  if (trafficSigns.length !== 1) return

  const primaryId = trafficSigns[0]?.signId
  if (!primaryId) return

  const baseRestriction = PARKING_RESTRICTION_BY_SIGN_ID[primaryId]
  if (baseRestriction) {
    applyRestrictionParkingCombination(tagMap, signs, geometry, baseRestriction)
    return
  }

  if (PARKING_LOT_SIGN_IDS.has(primaryId)) {
    applyParkingLotCombination(tagMap, signs, geometry)
  }
}
