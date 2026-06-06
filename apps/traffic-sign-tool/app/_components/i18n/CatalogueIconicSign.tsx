import { useLoadedSvg } from '@app/app/(signs)/_components/useLoadedSvg'
import { isDev } from '@app/app/_components/utils/isDev'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import {
  CountryPrefixType,
  createSvgImportname,
  getCatalogueIconicSignOsmValuePart,
} from '@osm-traffic-signs/converter'

type Props = {
  countryPrefix: CountryPrefixType
  className?: string
}

export const CatalogueIconicSign = ({ countryPrefix, className }: Props) => {
  const svgName = createSvgImportname(
    countryPrefix,
    getCatalogueIconicSignOsmValuePart(countryPrefix),
  )
  const { file, loadAttempted } = useLoadedSvg(countryPrefix, svgName)

  if (!file) {
    if (loadAttempted && isDev) {
      console.warn('ICONIC SVG MISSING', countryPrefix, svgName)
    }

    return (
      <span aria-hidden="true" className="text-xs font-bold text-stone-200 uppercase">
        {countryPrefix}
      </span>
    )
  }

  return (
    <img
      src={file}
      height={36}
      width={36}
      alt=""
      className={className}
      lang={catalogueHtmlLang(countryPrefix)}
    />
  )
}
