import { rimraf } from 'rimraf'

/** @description Remove all files in this folder structure */
export const cleanupDirectories = (countryDirectory: string) => {
  rimraf.sync(`${countryDirectory}/*`)
}
