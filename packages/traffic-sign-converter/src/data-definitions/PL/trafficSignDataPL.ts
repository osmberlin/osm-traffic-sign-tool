import type { SignType } from '../TrafficSignDataTypes.js'
import { _information } from './data/information.js'
import { _mandatory } from './data/mandatory.js'
import { _panels } from './data/panels.js'
import { _prohibitory } from './data/prohibitory.js'
import { _tram } from './data/tram.js'
import { _warning } from './data/warning.js'

export const trafficSignDataPL: SignType[] = [
  ..._information,
  ..._mandatory,
  ..._panels,
  ..._prohibitory,
  ..._tram,
  ..._warning,
]
