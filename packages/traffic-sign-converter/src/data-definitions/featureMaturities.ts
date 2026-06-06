import type { MaturityKey } from '../referenceLinks/types.js'

/** Tag recommendations grouped by geometry type (node, way, …). */
export const geometryTagRecommendationsMaturity = 'beta' as const satisfies MaturityKey

export const isVisibleMaturity = (maturity: MaturityKey): maturity is Exclude<MaturityKey, 'stable'> =>
  maturity !== 'stable'
