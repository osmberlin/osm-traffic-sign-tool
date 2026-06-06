import { MissingSvgPlaceholder } from '@app/app/(signs)/_components/MissingSvgPlaceholder'
import { useLoadedSvg } from '@app/app/(signs)/_components/useLoadedSvg'
import { isDev } from '@app/app/_components/utils/isDev'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import {
  createSvgImportname,
  hasBundledSvg,
  isSignSvgMissing,
  SignStateType,
  SignType,
} from '@osm-traffic-signs/converter'
import { useCountryPrefix } from './store/CountryPrefixContext'

type Props = {
  sign: SignType | SignStateType
  className?: string
  showSignKey?: boolean
}

export const PackageSvgTrafficSign = ({ sign, className, showSignKey }: Props) => {
  const { countryPrefix } = useCountryPrefix()

  if (isSignSvgMissing(sign) || !hasBundledSvg(countryPrefix, sign)) {
    return <MissingSvgPlaceholder sign={sign} className={className} showSignKey={showSignKey} />
  }

  const filename =
    'svgName' in sign && !!sign.svgName
      ? sign.svgName
      : createSvgImportname(countryPrefix, sign.osmValuePart)
  const { file, loadAttempted } = useLoadedSvg(countryPrefix, filename)

  if (!file && loadAttempted) {
    if (isDev) {
      console.warn('SVG MISSING', countryPrefix, sign)
    }
    return <MissingSvgPlaceholder sign={sign} className={className} showSignKey={showSignKey} />
  }

  if (!file) {
    return null
  }

  return (
    <img
      src={file}
      height={100}
      width={100}
      alt={sign.descriptiveName}
      className={className}
      lang={catalogueHtmlLang(countryPrefix)}
    />
  )
}
