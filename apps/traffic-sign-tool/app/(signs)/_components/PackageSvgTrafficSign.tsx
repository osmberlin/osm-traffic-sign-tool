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

const countrySvgLoaderImports: Record<
  CountryPrefixType,
  () => Promise<{ default: CountrySvgLoaderMap }>
> = {
  DE: () =>
    import('@osm-traffic-signs/converter/data-svgs/DE/loaders').then((module) => ({
      default: module.SvgLoadersDE as CountrySvgLoaderMap,
    })),
  BE: () =>
    import('@osm-traffic-signs/converter/data-svgs/BE/loaders').then((module) => ({
      default: module.SvgLoadersBE as CountrySvgLoaderMap,
    })),
  AT: () =>
    import('@osm-traffic-signs/converter/data-svgs/AT/loaders').then((module) => ({
      default: module.SvgLoadersAT as CountrySvgLoaderMap,
    })),
  CA: () =>
    import('@osm-traffic-signs/converter/data-svgs/CA/loaders').then((module) => ({
      default: module.SvgLoadersCA as CountrySvgLoaderMap,
    })),
  PL: () =>
    import('@osm-traffic-signs/converter/data-svgs/PL/loaders').then((module) => ({
      default: module.SvgLoadersPL as CountrySvgLoaderMap,
    })),
  FR: () =>
    import('@osm-traffic-signs/converter/data-svgs/FR/loaders').then((module) => ({
      default: module.SvgLoadersFR as CountrySvgLoaderMap,
    })),
  AU: () =>
    import('@osm-traffic-signs/converter/data-svgs/AU/loaders').then((module) => ({
      default: module.SvgLoadersAU as CountrySvgLoaderMap,
    })),
}
const loadCountrySvgLoaders = (
  countryPrefix: CountryPrefixType,
): Promise<CountrySvgLoaderMap | undefined> => {
  const activeLoad = countrySvgLoaderCache.get(countryPrefix)
  if (activeLoad) return activeLoad

  const importLoader = countrySvgLoaderImports[countryPrefix]
  const loadPromise = importLoader().then((module) => module.default)

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
