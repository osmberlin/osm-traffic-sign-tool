import type { CountryPrefixType } from './countryPrefixes.js'

// Manual test case: http://127.0.0.1:3000/DE?signs=DE:274-30 will "redirect" to http://127.0.0.1:3000/DE?signs=DE:274[30]
export const alternativeKeyFormats: Record<CountryPrefixType, Map<string, string>> = {
  DE: new Map([
    // OLD => NEW
    // maxspeed
    ['274-5', '274[5]'],
    ['274-10', '274[10]'],
    ['274-20', '274[20]'],
    ['274-30', '274[30]'],
    ['274-40', '274[40]'],
    ['274-50', '274[50]'],
    ['274-60', '274[60]'],
    ['274-70', '274[70]'],
    ['274-80', '274[80]'],
    ['274-90', '274[90]'],
    ['274-100', '274[100]'],
    ['274-110', '274[110]'],
    ['274-120', '274[120]'],
    ['274-130', '274[130]'],
    // minspeed
    ['275-30', '275[30]'],
    ['275-80', '275[80]'],
    // Always use "Beginn…" version
    ['244', '244.1'],
    ['325', '325.1'],
    // Make more specific
    ['394', '394-50'], // https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:394-50
    // Msic
    ['no', 'none'], // 1k vs. 12k usage
  ]),
}
