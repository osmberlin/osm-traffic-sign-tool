import { getCachedSvg, loadSvgForSign } from '@app/app/(signs)/_components/svgLoaders'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import { useEffect, useState } from 'react'

/** Loads a country SVG by import name, with module-level cache deduplication. */
export const useLoadedSvg = (countryPrefix: CountryPrefixType, svgName: string) => {
  const cacheKey = `${countryPrefix}:${svgName}`
  const cachedFile = getCachedSvg(countryPrefix, svgName)
  const [loadedFileState, setLoadedFileState] = useState(() => ({
    cacheKey,
    file: cachedFile,
    loadAttempted: false,
  }))

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
  const loadAttempted =
    loadedFileState.cacheKey === cacheKey ? loadedFileState.loadAttempted : false

  return { file, loadAttempted }
}
