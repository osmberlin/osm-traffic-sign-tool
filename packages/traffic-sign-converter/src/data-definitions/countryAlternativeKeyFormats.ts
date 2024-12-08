import type { CountryPrefixType } from './countryDefinitions.js'

// Manual test case: http://127.0.0.1:3000/DE?signs=DE:274-30 will "redirect" to http://127.0.0.1:3000/DE?signs=DE:274[30]
export const countryAlternativeKeyFormats: Record<CountryPrefixType, Map<string, string>> = {
  DE: new Map([
    // OLD => NEW
    // maxspeed start
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
    // maxspeed zone start
    ['274.1:30', '274.1[30]'],
    // maxspeed end
    ['278-5', '278[5]'],
    ['278-10', '278[10]'],
    ['278-20', '278[20]'],
    ['278-30', '278[30]'],
    ['278-40', '278[40]'],
    ['278-50', '278[50]'],
    ['278-60', '278[60]'],
    ['278-70', '278[70]'],
    ['278-80', '278[80]'],
    ['278-90', '278[90]'],
    ['278-100', '278[100]'],
    ['278-110', '278[110]'],
    ['278-120', '278[120]'],
    ['278-130', '278[130]'],
    // minspeed
    ['275-30', '275[30]'],
    ['275-80', '275[80]'],
    // Always use "Beginn…" version
    ['244', '244.1'],
    ['242', '242.1'],
    ['325', '325.1'],
    // Make more specific
    ['241', '241-30'], // https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:241
    ['394', '394-50'], // https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:394-50
    // Msic
    ['no', 'none'], // 1k vs. 12k usage
  ]),
}
