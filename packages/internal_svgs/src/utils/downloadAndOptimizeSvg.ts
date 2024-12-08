import {
  createSvgFilename,
  createSvgImportname,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import path from 'node:path'
import { getFileUrlFromWikiApi } from './getFileUrlFromWikiApi.js'
import { optimizeSvg } from './optimizeSvg.js'
import { prepareDirectorySvgs } from './prepareDirectorySvgs.js'

export const downloadAndOptimizeSvg = async (countryPrefix: CountryPrefixType, sign: SignType) => {
  const importName = createSvgImportname(countryPrefix, sign)
  const fileName = createSvgFilename(countryPrefix, sign)
  const directorySvgs = prepareDirectorySvgs(countryPrefix)
  const filePath = path.join(directorySvgs, fileName)

  if (!sign.image.sourceUrl) {
    return { success: false, error: '`sourceUrl` missing', sign } as const
  }

  const downloadUrlResp = await getFileUrlFromWikiApi(sign.image.sourceUrl)

  if (downloadUrlResp.success === false) {
    return downloadUrlResp
  }

  try {
    const rawSvg = await (await fetch(downloadUrlResp.url)).text()

    const optimized = optimizeSvg({
      svgString: rawSvg,
      signId: sign.osmValuePart,
      signTitle: sign.descriptiveName,
    })

    Bun.write(filePath, optimized)

    return { success: true, fileName, importName } as const
  } catch (error) {
    return { success: false, error: 'Fetch or Optimize or Write failed', sign } as const
  }
}
