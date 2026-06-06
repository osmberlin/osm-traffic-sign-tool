import { getCachedSvg, loadSvgForSign } from '@app/app/(signs)/_components/svgLoaders'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import {
  CountryPrefixType,
  createSvgImportname,
  getCatalogueIconicSignOsmValuePart,
} from '@osm-traffic-signs/converter'
import { useEffect, useState } from 'react'

type Props = {
  countryPrefix: CountryPrefixType
  className?: string
}

export const CatalogueIconicSign = ({ countryPrefix, className }: Props) => {
  const svgName = createSvgImportname(
    countryPrefix,
    getCatalogueIconicSignOsmValuePart(countryPrefix),
  )
  const cacheKey = `${countryPrefix}:${svgName}`
  const cachedFile = getCachedSvg(countryPrefix, svgName)
  const [loadedFileState, setLoadedFileState] = useState<{
    cacheKey: string
    file?: string
    loadAttempted: boolean
  }>({
    cacheKey,
    file: cachedFile,
    loadAttempted: false,
  })

  useEffect(() => {
    let isCancelled = false

    if (cachedFile) {
      return () => {
        isCancelled = true
      }
    }

    void loadSvgForSign(countryPrefix, svgName).then((loadedSvg) => {
      if (!isCancelled) {
        setLoadedFileState({ cacheKey, file: loadedSvg, loadAttempted: true })
      }
    })

    return () => {
      isCancelled = true
    }
  }, [cachedFile, cacheKey, countryPrefix, svgName])

  const file =
    cachedFile ?? (loadedFileState.cacheKey === cacheKey ? loadedFileState.file : undefined)

  if (!file) {
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
