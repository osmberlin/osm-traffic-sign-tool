import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SaxesParser } from 'saxes'
import { describe, expect, test } from 'vitest'
import { countries } from './data-definitions/countryDefinitions.js'

const dataSvgsDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data-svgs')

const readXmlError = (xml: string) => {
  try {
    new SaxesParser().write(xml).close()
    return undefined
  } catch (error) {
    return (error as Error).message
  }
}

describe('bundled SVGs', () => {
  test.each(countries)('%s SVGs are well-formed XML', (countryPrefix) => {
    const svgsDirectory = path.join(dataSvgsDirectory, countryPrefix, 'svgs')
    const fileNames = readdirSync(svgsDirectory).filter((fileName) => fileName.endsWith('.svg'))
    expect(fileNames.length).toBeGreaterThan(0)

    // Browsers refuse to render an SVG image that is not valid XML (e.g. a raw `<` in the <title>)
    const errors = fileNames.flatMap((fileName) => {
      const error = readXmlError(readFileSync(path.join(svgsDirectory, fileName), 'utf8'))
      return error ? [`${fileName}: ${error}`] : []
    })
    expect(errors).toEqual([])
  })
})
