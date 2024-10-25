import { TrafficSignState } from '@osm-traffic-signs/converter'

export type AggregatedComments = [string, string, string][]
export const aggregateComments = (selectedSigns: TrafficSignState[]) => {
  const aggregatedComments: AggregatedComments = selectedSigns
    .map((sign) => {
      if (sign.recodgnizedSign === false) return

      const title = [sign.name, sign.description].join(' – ')
      const keyComment = sign.tagsComment ? [sign.osmValuePart, title, sign.tagsComment] : undefined
      return keyComment as [string, string, string] | undefined
    })
    .filter(Boolean)

  return aggregatedComments
}
