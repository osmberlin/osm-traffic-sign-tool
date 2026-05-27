import * as m from '@app/paraglide/messages'
import { signCategories, type SignCategory } from '@osm-traffic-signs/converter'

const signCategoryLabelByCategory = {
  traffic_sign: m.sign_category_traffic_sign,
  exception_modifier: m.sign_category_exception_modifier,
  condition_modifier: m.sign_category_condition_modifier,
  direction_modifier: m.sign_category_direction_modifier,
  speed: m.sign_category_speed,
  hazard_sign: m.sign_category_hazard_sign,
  surface_sign: m.sign_category_surface_sign,
  object_sign: m.sign_category_object_sign,
  signpost: m.sign_category_signpost,
} as const satisfies Record<SignCategory, () => string>

export const getSignCategoryLabel = (category: SignCategory): string =>
  signCategoryLabelByCategory[category]()

export const signCategoryEntries = (): [SignCategory, string][] =>
  signCategories.map((category) => [category, getSignCategoryLabel(category)])
