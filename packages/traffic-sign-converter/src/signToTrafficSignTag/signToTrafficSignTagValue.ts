// https://wiki.openstreetmap.org/wiki/DE:Key:traffic_sign#Werte
// > Mehrere Verkehrszeichen können mit unterschiedlichen Trennzeichen markiert werden. Verkehrszeichen, die nicht miteinander in Verbindung stehen (wie z. B. Zulässige Höchstgeschwindigkeit und eingeschränktes Haltverbot), werden durch ein Semikolon `;` getrennt. In Verbindung stehende Verkehrszeichen (wie z. B. Verbot der Einfahrt plus Linienbusse frei) werden durch ein Komma `,` getrennt.
// Ergänzend:
// Der Länderprefix wird dann nur einmalig vor den gesamten String geschrieben. Damit kann das Semikolon in einem `traffic_sign` value unterschiedliche Bedeutungen haben, da der Key auch named values wie `city_limit` haben kann.
// Beispiel
// - traffic_sign=city_limit;DE:310 sind zwei Werte die das gleiche Ausdrücken
// - traffic_sign=DE:310;city_limit hier ist das Semikolon aufgrund de Bedeutung von `city_limit` als named value anders zu bewerten als …
// - traffic_sign=DE:310;city_limit hier ist das Semikolon aufgrund de Bedeutung von `city_limit` als named value anders zu bewerten als …
// - traffic_sign=DE:244.1,"Kfz-Verkehr frei" … wo ein Freitext verwendet wird https://github.com/osmberlin/osm-traffic-sign-tool/issues/51#issuecomment-2389663867 (TODO: dieses Beispiel hinkt, da der Freitext hier ein Zusatzzeichen ist; ich muss prüfen, ob es auch Freitext-Verkehrszeichen gibt)

import type { CountryPrefixType } from '../data-definitions/countryDefinitions.js'
import { namedTrafficSignValues } from '../data-definitions/namedTrafficSignValues.js'
import type { SignStateType } from '../data-definitions/TrafficSignDataTypes.js'

export const signToTrafficSignTagValue = (
  signs: SignStateType[],
  countryPrefix: CountryPrefixType | undefined,
) => {
  if (!countryPrefix) return ''
  let countryPrefixSet: boolean = false

  const signStrings = signs.map((sign, index) => {
    // Handle Contry Prefix with special treatment for named signs
    const isNamedValue = namedTrafficSignValues.includes(sign.osmValuePart)
    let countryPrefixString = ''
    if (countryPrefixSet === false && !isNamedValue) {
      countryPrefixString = `${countryPrefix}:`
      countryPrefixSet = true
    }

    // Handle Sign Separation with special treatment for named signs
    const isFirstSignInList = index === 0
    const isPrevSignNamedValue = isFirstSignInList
      ? false
      : namedTrafficSignValues.includes(signs[index - 1]?.osmValuePart || '')
    const separatorPrefix = isFirstSignInList
      ? ''
      : sign.kind === 'traffic_sign' || isPrevSignNamedValue
        ? `;`
        : ','

    return `${separatorPrefix}${countryPrefixString}${sign.osmValuePart}`
  })

  return signStrings.join('')
}
