import type { SignType } from '../TrafficSignDataTypes.js'
import { _regulatory__Ra_series_right_of_way } from './data/regulatory__Ra_series_right_of_way.js'
import { _regulatory__Rb_series_control_of_movement } from './data/regulatory__Rb_series_control_of_movement.js'
import { _regulatory__Rc_series_miscellaneous } from './data/regulatory__Rc_series_miscellaneous.js'
import { _warning__Wa_series_physical_conditions } from './data/warning__Wa_series_physical_conditions.js'

export const trafficSignDataCA: SignType[] = [
  ..._regulatory__Ra_series_right_of_way,
  ..._regulatory__Rb_series_control_of_movement,
  ..._regulatory__Rc_series_miscellaneous,
  ..._warning__Wa_series_physical_conditions,
]
