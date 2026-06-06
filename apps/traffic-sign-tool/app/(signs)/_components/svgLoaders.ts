import type { CountryPrefixType } from '@osm-traffic-signs/converter'

type SVG = string

type SvgLoaderModule = { default: SVG }
type SvgLoader = () => Promise<SvgLoaderModule>
export type CountrySvgLoaderMap = Record<string, SvgLoader>

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
  BR: () =>
    import('@osm-traffic-signs/converter/data-svgs/BR/loaders').then((module) => ({
      default: module.SvgLoadersBR as CountrySvgLoaderMap,
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

export const loadSvgForSign = async (countryPrefix: CountryPrefixType, svgName: string) => {
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

export const getCachedSvg = (countryPrefix: CountryPrefixType, svgName: string) =>
  loadedSvgCache.get(`${countryPrefix}:${svgName}`)
