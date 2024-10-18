import type { CountryPrefixesType } from './countryPrefixes.js'

// Manual test case: http://localhost:5173/?signs=DE:274-30 will "redirect" to http://localhost:5173/?signs=DE:274[30]
export const alternativeKeyFormats: Record<CountryPrefixesType, Map<string, string>> = {
  DE: new Map([
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
  ]),
}
