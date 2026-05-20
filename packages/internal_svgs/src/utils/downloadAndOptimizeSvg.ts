import fs from 'node:fs'
import path from 'node:path'
import {
  createSvgFilename,
  createSvgImportname,
  type CountryPrefixType,
  type SignType,
} from '@osm-traffic-signs/converter'
import { getFileUrlFromWikiApi } from './getFileUrlFromWikiApi.js'
import { optimizeSvg } from './optimizeSvg.js'
import { prepareDirectorySvgs } from './prepareDirectorySvgs.js'
import { fetchWithWikimediaPolicy } from './wikimediaHttp.js'

export const downloadAndOptimizeSvg = async (
  countryPrefix: CountryPrefixType,
  sign: SignType,
  skipExisting: boolean,
) => {
  const importName = createSvgImportname(countryPrefix, sign)
  const fileName = createSvgFilename(countryPrefix, sign)
  const directorySvgs = prepareDirectorySvgs(countryPrefix)
  const filePath = path.join(directorySvgs, fileName)

  // Skip if file exists and skipExisting is true
  if (skipExisting && (await Bun.file(filePath).exists())) {
    return { success: true, fileName, importName, skipped: true } as const
  }

  let rawSvg: string
  const sourceLabel =
    sign.image.kind === 'local' ? sign.image.sourceLocalPath : sign.image.sourceUrl

  if (sign.image.kind === 'local') {
    const sourceLocalPath = sign.image.sourceLocalPath
    const localSourcePath = path.join(__dirname, '..', sourceLocalPath)
    try {
      rawSvg = await Bun.file(localSourcePath).text()
    } catch (error) {
      return {
        success: false,
        error: {
          message: 'Read local SVG failed',
          detail: error instanceof Error ? error.message : String(error),
          createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
          filePath: localSourcePath,
        },
        sign,
      } as const
    }
  } else {
    const sourceUrl = sign.image.sourceUrl
    const downloadUrlResp = await getFileUrlFromWikiApi(sourceUrl)

    if (downloadUrlResp.success === false) {
      return downloadUrlResp
    }

    // Step 1: Fetch raw SVG
    try {
      const response = await fetchWithWikimediaPolicy(downloadUrlResp.url)
      if (!response.ok) {
        return {
          success: false,
          error: {
            message: `Fetch failed with status ${response.status}`,
            detail: await response.text(),
            createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
            url: downloadUrlResp.url,
          },
          sign,
        } as const
      }
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
        source: sourceLabel,
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
