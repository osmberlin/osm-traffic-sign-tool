import {
  createSvgFilename,
  createSvgImportname,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import fs from 'node:fs'
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

  // Step 1: Fetch raw SVG
  let rawSvg: string
  try {
    const response = await fetch(downloadUrlResp.url, {
      headers: {
        'User-Agent':
          'osm-traffic-sign-tools (https://github.com/FixMyBerlin/osm-traffic-sign-tools)',
      },
    })
    rawSvg = await response.text()
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'Fetch failed',
        detail: error instanceof Error ? error.message : String(error),
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
        url: downloadUrlResp.url,
      },
      sign,
    } as const
  }

  // Step 2: Optimize SVG
  let optimized: string
  try {
    optimized = optimizeSvg({
      svgString: rawSvg,
      signId: sign.osmValuePart,
      signTitle: sign.descriptiveName,
    })
  } catch (error) {
    // Save raw content for debugging
    const debugDir = path.join(__dirname, '../download-errors/failed-svgs', countryPrefix)
    const debugFilePath = path.join(debugDir, fileName)
    try {
      await Bun.write(debugFilePath, rawSvg)
    } catch {
      // Create directory and try again
      fs.mkdirSync(debugDir, { recursive: true })
      try {
        await Bun.write(debugFilePath, rawSvg)
      } catch {
        // Ignore write errors for debug files
      }
    }

    return {
      success: false,
      error: {
        message: 'Optimize failed',
        detail: error instanceof Error ? error.message : String(error),
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
        debugFilePath,
        url: downloadUrlResp.url,
      },
      sign,
    } as const
  }

  // Step 3: Write optimized SVG
  try {
    await Bun.write(filePath, optimized)
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'Write failed',
        detail: error instanceof Error ? error.message : String(error),
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
        filePath,
      },
      sign,
    } as const
  }

  return { success: true, fileName, importName } as const
}
