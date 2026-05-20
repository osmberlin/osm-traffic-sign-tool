'use client'
import { isDev } from '@app/app/_components/utils/isDev'
import {
  CountryPrefixType,
  createSvgImportname,
  SignStateType,
  SignType,
} from '@osm-traffic-signs/converter'
import { SvgLoadersDE } from '@osm-traffic-signs/converter/data-svgs'
import Image from 'next/image'
import { useEffect, useState } from 'react'
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
  blurWidth?: number
  blurHeight?: number
  blurDataURL?: string
}

type SvgLoaderModule = { default: SVG }
type SvgLoader = () => Promise<SvgLoaderModule>

const countrySvgLoaders: Record<CountryPrefixType, Record<string, SvgLoader>> = {
  DE: SvgLoadersDE,
} as const

const loadedSvgCache = new Map<string, SVG>()
const loadingSvgCache = new Map<string, Promise<SVG | undefined>>()

const loadSvgForSign = async (countryPrefix: CountryPrefixType, svgName: string) => {
  const cacheKey = `${countryPrefix}:${svgName}`
  const cachedSvg = loadedSvgCache.get(cacheKey)
  if (cachedSvg) return cachedSvg

  const activeLoad = loadingSvgCache.get(cacheKey)
  if (activeLoad) return activeLoad

  const countryLoaders = countrySvgLoaders[countryPrefix]
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
  const { countryPrefix } = useCountryPrefixWithFallback()
  const filename =
    'svgName' in sign && !!sign.svgName
      ? sign.svgName
      : createSvgImportname(countryPrefix, sign.osmValuePart)
  const cacheKey = `${countryPrefix}:${filename}`
  const cachedFile = loadedSvgCache.get(cacheKey)
  const hasLoader = Boolean(countrySvgLoaders[countryPrefix]?.[filename])
  const [loadedFileState, setLoadedFileState] = useState<{ cacheKey: string; file?: SVG }>({
    cacheKey,
    file: cachedFile,
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
        setLoadedFileState({ cacheKey, file: loadedSvg })
      }
    })

    return () => {
      isCancelled = true
    }
  }, [cachedFile, cacheKey, countryPrefix, filename])

  const file =
    cachedFile ?? (loadedFileState.cacheKey === cacheKey ? loadedFileState.file : undefined)

  if (!file && !hasLoader) {
    if (isDev) {
      console.warn('SVG MISSING', countryPrefix, sign)
    }
    return null
  }

  if (!file) {
    return null
  }

  return (
    <Image src={file} height={100} width={100} alt={sign.descriptiveName} className={className} />
  )
}
