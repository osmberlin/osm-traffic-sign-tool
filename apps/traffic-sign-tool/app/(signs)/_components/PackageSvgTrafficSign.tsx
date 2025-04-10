'use client'
import { isDev } from '@app/app/_components/utils/isDev'
import {
  CountryPrefixType,
  createSvgImportname,
  SignStateType,
  SignType,
} from '@osm-traffic-signs/converter'
import { SvgsDE } from '@osm-traffic-signs/converter/data-svgs'
import Image from 'next/image'
import { useCountryPrefixWithFallback } from './store/CountryPrefixContext'

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

// @ts-expect-error TODO this error as to do with the bun types package which interferes with types in NextJS (and Astro)
const countrySvgs: Record<CountryPrefixType, Record<string, SVG>> = { DE: SvgsDE } as const

export const PackageSvgTrafficSign = ({ sign, className }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()

  const svgs = countrySvgs[countryPrefix]
  const filename =
    'svgName' in sign && !!sign.svgName
      ? sign.svgName
      : createSvgImportname(countryPrefix, sign.osmValuePart)

  const file = svgs[filename]

  if (!file) {
    if (isDev) {
      console.warn('SVG MISSING', countryPrefix, sign)
    }
    return null
  }

  return (
    <Image src={file} height={100} width={100} alt={sign.descriptiveName} className={className} />
  )
}
