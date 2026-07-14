import type { SignType } from '../TrafficSignDataTypes.js'
import { _beacons_j } from './data/beacons_j.js'
import { _danger_a } from './data/danger_a.js'
import { _danger_ak } from './data/danger_ak.js'
import { _idiograms_id } from './data/idiograms_id.js'
import { _indication_c } from './data/indication_c.js'
import { _indication_ce } from './data/indication_ce.js'
import { _indication_e } from './data/indication_e.js'
import { _indication_eb } from './data/indication_eb.js'
import { _indication_sr3 } from './data/indication_sr3.js'
import { _level_crossing_g } from './data/level_crossing_g.js'
import { _other } from './data/other.js'
import { _panels_m } from './data/panels_m.js'
import { _prescription_b } from './data/prescription_b.js'
import { _priority_ab } from './data/priority_ab.js'
import { _safety_sr } from './data/safety_sr.js'
import { _symbols_si_sc } from './data/symbols_si_sc.js'
import { _symbols_su } from './data/symbols_su.js'
import { _temporary_k } from './data/temporary_k.js'

export const trafficSignDataFR: SignType[] = [
  ..._danger_a,
  ..._idiograms_id,
  ..._indication_c,
  ..._indication_ce,
  ..._indication_e,
  ..._indication_eb,
  ..._indication_sr3,
  ..._level_crossing_g,
  ..._other,
  ..._panels_m,
  ..._prescription_b,
  ..._priority_ab,
  ..._symbols_si_sc,
  ..._symbols_su,
  ..._beacons_j,
  ..._danger_ak,
  ..._safety_sr,
  ..._temporary_k,
]
