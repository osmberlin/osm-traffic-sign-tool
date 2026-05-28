import type { GeometryType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import MfArea from './Mf_area.svg'
import MfNode from './Mf_node.svg'
import MfRelation from './Mf_Relation.svg'
import MfWay from './Mf_way.svg'

type Props = {
  geometry: GeometryType
  className?: string
}

export const GeometryIcon = ({ geometry, className }: Props) => {
  let icon: string

  switch (geometry) {
    case 'node':
      icon = MfNode
      break
    case 'way':
    case 'way_centerline':
      icon = MfWay
      break
    case 'area':
      icon = MfArea
      break
    case 'relation':
      icon = MfRelation
      break
  }

  return (
    <img
      src={icon}
      alt=""
      className={clsx('size-5 rounded bg-white', className)}
      aria-hidden="true"
    />
  )
}
