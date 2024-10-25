import { TrafficSignState } from '@osm-traffic-signs/converter'
import type { AggregatedTags } from './aggregateTags'

export const addRestrictionTags = (
  aggregatedTags: AggregatedTags,
  selectedSigns: TrafficSignState[],
) => {
  // Handle restriction: Collect keys, add all given values to those key (or 'no')
  const restrictionKeys: string[] = selectedSigns
    .map((sign) => {
      return 'restrictionKeys' in sign && sign.restrictionKeys
    })
    .flat()
    .filter(Boolean)

  const restrictionValues: string[] = selectedSigns
    .map((sign) => {
      return 'restrictionValue' in sign && sign.restrictionValue
    })
    .filter(Boolean)

  const conditialValues = selectedSigns
    .map((sign) => {
      if (sign.recodgnizedSign === false) return
      return sign.conditional && 'value' in sign && sign.value
    })
    .filter(Boolean)

  restrictionKeys.forEach((restrictionKey) => {
    const value = restrictionValues.join(',') || 'no'
    if (conditialValues.length) {
      const conditionals = conditialValues.join(' AND ')
      aggregatedTags.push([`${restrictionKey}:conditional`, `${value} @ (${conditionals})`])
    } else {
      aggregatedTags.push([restrictionKey, value])
    }
  })
}
