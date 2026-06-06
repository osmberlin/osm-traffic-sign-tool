import { WikiLinkValue } from '@app/app/(signs)/_components/wiki/WikiLinkValue'

type Props = {
  osmValue: string
  inline?: boolean
  linkLabel?: string
}

export const WikiLinkTrafficSignValueItem = ({ osmValue, inline, linkLabel }: Props) => {
  return (
    <li className={inline ? 'inline' : undefined}>
      <WikiLinkValue osmKey="traffic_sign" osmValue={osmValue} linkLabel={linkLabel} />
    </li>
  )
}
