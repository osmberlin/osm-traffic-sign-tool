'use client'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import {
  CountryPrefixType,
  createSvgImportname,
  SignStateType,
  SignType,
} from '@osm-traffic-signs/converter'
import { SvgsDE } from '@osm-traffic-signs/converter/data-svgs'
import Image from 'next/image'

type Props = {
  sign: SignType | SignStateType
  className?: string
}

// Type comes from `JSON.stringify(DE103_20, undefined, 2)` with `import { DE103_20 } from '@internal/wiki'`
type SVG = {
  src: string
  height: number
  width: number
  blurWidth: number
  blurHeight: number
}

const countrySvgs: Record<CountryPrefixType, Record<string, SVG>> = { DE: SvgsDE } as const

export const PackageSvgTrafficSign = ({ sign, className }: Props) => {
  const countryPrefix = useCountryPrefix()
  const name = createSvgImportname(countryPrefix, sign.osmValuePart)
  const svgs = countrySvgs[countryPrefix]
  const file = svgs[name]

  if (!file) {
    console.warn('SVG MISSING', countryPrefix, sign)
    return null
  }

  return (
    <Image src={file} height={100} width={100} alt={sign.descriptiveName} className={className} />
  )
}
