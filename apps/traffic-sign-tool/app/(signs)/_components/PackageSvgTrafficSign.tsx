import { getCachedSvg, loadSvgForSign } from '@app/app/(signs)/_components/svgLoaders'
import { isDev } from '@app/app/_components/utils/isDev'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { createSvgImportname, SignStateType, SignType } from '@osm-traffic-signs/converter'
import { useEffect, useState } from 'react'
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
  const cacheKey = `${countryPrefix}:${filename}`
  const cachedFile = getCachedSvg(countryPrefix, filename)
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

    void loadSvgForSign(countryPrefix, filename).then((loadedSvg) => {
      if (!isCancelled) {
        setLoadedFileState({ cacheKey, file: loadedSvg, loadAttempted: true })
      }
    })

    return () => {
      isCancelled = true
    }
  }, [cachedFile, cacheKey, countryPrefix, filename])

  const file =
    cachedFile ?? (loadedFileState.cacheKey === cacheKey ? loadedFileState.file : undefined)
  const loadAttempted =
    loadedFileState.cacheKey === cacheKey ? loadedFileState.loadAttempted : false

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
