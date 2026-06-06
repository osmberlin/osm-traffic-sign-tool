import type { SignType } from '../TrafficSignDataTypes.js'
import { _direction } from './data/direction.js'
import { _extra } from './data/extra.js'
import { _mandatory } from './data/mandatory.js'
import { _parking } from './data/parking.js'
import { _priority } from './data/priority.js'
import { _prohibitory } from './data/prohibitory.js'
import { _warning } from './data/warning.js'

export const trafficSignDataBE: SignType[] = [
  ..._warning,
  ..._priority,
  ..._prohibitory,
  ..._mandatory,
  ..._parking,
  ..._direction,
  ..._extra,
]
