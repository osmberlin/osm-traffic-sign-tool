import * as m from '@app/paraglide/messages'
import type { FocusArea } from '@osm-traffic-signs/converter'

export const getFocusLabel = (focus: FocusArea): string => {
  const labels: Record<FocusArea, () => string> = {
    default: m.focus_default,
    bike_foot: m.focus_bike_foot,
    parking: m.focus_parking,
    highway: m.focus_highway,
    all: m.focus_all,
  }

  return labels[focus]()
}
