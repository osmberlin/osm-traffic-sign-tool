import { useLoadedSvg } from '@app/app/(signs)/_components/useLoadedSvg'
import { isDev } from '@app/app/_components/utils/isDev'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { createSvgImportname, SignStateType, SignType } from '@osm-traffic-signs/converter'
import { useCountryPrefix } from './store/CountryPrefixContext'

type Props = {
  sign: SignType | SignStateType
  className?: string
}

export const PackageSvgTrafficSign = ({ sign, className }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const filename =
    'svgName' in sign && !!sign.svgName
      ? sign.svgName
      : createSvgImportname(countryPrefix, sign.osmValuePart)
  const { file, loadAttempted } = useLoadedSvg(countryPrefix, filename)

  if (!file && loadAttempted) {
    if (isDev) {
      console.warn('SVG MISSING', countryPrefix, sign)
    }
    return null
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
