import type { SignType } from '../TrafficSignDataTypes.js'
import { _Fire_Danger } from './data/Fire_Danger.js'
import { _Regulatory } from './data/Regulatory.js'
import { _Road_Works } from './data/Road_Works.js'
import { _Traffic_Signals } from './data/Traffic_Signals.js'
import { _Warning } from './data/Warning.js'

export const trafficSignDataAU: SignType[] = [
  ..._Regulatory,
  ..._Warning,
  ..._Road_Works,
  ..._Fire_Danger,
  ..._Traffic_Signals,
]
