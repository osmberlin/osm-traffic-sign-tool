import { isDev } from '@app/app/_components/utils/isDev'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import {
  CountryPrefixType,
  createSvgImportname,
  SignStateType,
  SignType,
} from '@osm-traffic-signs/converter'
import { useEffect, useState } from 'react'
import { useCountryPrefix } from './store/CountryPrefixContext'

type Props = {
  sign: SignType | SignStateType
  className?: string
}

type SVG = string

type SvgLoaderModule = { default: SVG }
type SvgLoader = () => Promise<SvgLoaderModule>
type CountrySvgLoaderMap = Record<string, SvgLoader>

const countrySvgLoaderCache = new Map<CountryPrefixType, Promise<CountrySvgLoaderMap | undefined>>()

const loadCountrySvgLoaders = (
  countryPrefix: CountryPrefixType,
): Promise<CountrySvgLoaderMap | undefined> => {
  const activeLoad = countrySvgLoaderCache.get(countryPrefix)
  if (activeLoad) return activeLoad

  let loadPromise: Promise<CountrySvgLoaderMap | undefined>
  switch (countryPrefix) {
    case 'DE':
      loadPromise = import('@osm-traffic-signs/converter/data-svgs/DE/loaders').then(
        (module) => module.SvgLoadersDE as CountrySvgLoaderMap,
      )
      break
  }

  countrySvgLoaderCache.set(countryPrefix, loadPromise)
  return loadPromise
}

const loadedSvgCache = new Map<string, SVG>()
const loadingSvgCache = new Map<string, Promise<SVG | undefined>>()

const loadSvgForSign = async (countryPrefix: CountryPrefixType, svgName: string) => {
  const cacheKey = `${countryPrefix}:${svgName}`
  const cachedSvg = loadedSvgCache.get(cacheKey)
  if (cachedSvg) return cachedSvg

  const activeLoad = loadingSvgCache.get(cacheKey)
  if (activeLoad) return activeLoad

  const countryLoaders = await loadCountrySvgLoaders(countryPrefix)
  const loader = countryLoaders?.[svgName]
  if (!loader) return undefined

  const loadPromise = loader()
    .then((module) => {
      loadedSvgCache.set(cacheKey, module.default)
      return module.default
    })
    .finally(() => {
      loadingSvgCache.delete(cacheKey)
    })

  loadingSvgCache.set(cacheKey, loadPromise)
  return loadPromise
}

export const PackageSvgTrafficSign = ({ sign, className }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const filename =
    'svgName' in sign && !!sign.svgName
      ? sign.svgName
      : createSvgImportname(countryPrefix, sign.osmValuePart)
  const cacheKey = `${countryPrefix}:${filename}`
  const cachedFile = loadedSvgCache.get(cacheKey)
  const [loadedFileState, setLoadedFileState] = useState<{
    cacheKey: string
    file?: SVG
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
