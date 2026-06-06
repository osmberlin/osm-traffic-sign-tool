import type { SignType } from '../TrafficSignDataTypes.js'
import { _Outro_Placas } from './data/Outro_Placas.js'
import { _Placas_de_Advertencia } from './data/Placas_de_Advertencia.js'
import { _Placas_de_Regulamentacao } from './data/Placas_de_Regulamentacao.js'
export const trafficSignDataBR: SignType[] = [
  ..._Placas_de_Regulamentacao,
  ..._Placas_de_Advertencia,
  ..._Outro_Placas,
]
