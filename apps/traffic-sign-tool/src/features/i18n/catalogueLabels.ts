import * as m from '@app/paraglide/messages'
import { getCatalogueDisplayName, type CountryPrefixType } from '@osm-traffic-signs/converter'

export const getCatalogueLabel = (countryPrefix: CountryPrefixType) =>
  countryPrefix === 'DE'
    ? m.lang_switcher_sign_catalogue_de_name()
    : getCatalogueDisplayName(countryPrefix)
