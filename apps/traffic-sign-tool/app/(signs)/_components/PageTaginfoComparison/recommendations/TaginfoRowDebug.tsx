import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { contentPreClass } from '@app/app/_components/layout/ContentTable'
import { inlineCodeClass } from '@app/app/_components/layout/proseClasses'
import * as m from '@app/paraglide/messages'
import {
  getSignWithRedirects,
  trafficSignTagToSigns,
  type CountryPrefixType,
} from '@osm-traffic-signs/converter'
import clsx from 'clsx'

type Props = {
  value: string
  countryPrefix: CountryPrefixType
}

const summaryClassName =
  'block cursor-pointer list-none overflow-x-auto px-2 py-1.5 text-sm font-medium whitespace-nowrap text-stone-700 [&::-webkit-details-marker]:hidden'

const summaryCodeClassName = clsx(inlineCodeClass, 'whitespace-nowrap')

export const TaginfoRowDebug = ({ value, countryPrefix }: Props) => {
  const catalogueLang = useCatalogueHtmlLang()
  const signs = trafficSignTagToSigns(value, countryPrefix)

  if (signs.length === 0) {
    return null
  }

  return (
    <div className="space-y-2" lang={catalogueLang}>
      {signs.map((sign) => {
        const config = sign.recodgnizedSign
          ? getSignWithRedirects(sign.osmValuePart, countryPrefix)
          : sign
        const label = sign.signId ?? sign.osmValuePart

        return (
          <details
            key={`${label}-${sign.osmValuePart}`}
            className="rounded-sm outline -outline-offset-1 outline-stone-400/50"
          >
            <summary className={summaryClassName}>
              {sign.recodgnizedSign ? (
                <>
                  {m.debug_raw_for()} <code className={summaryCodeClassName}>{label}</code>
                </>
              ) : (
                <>
                  {m.taginfo_debug_unrecognized_sign()}{' '}
                  <code className={summaryCodeClassName}>{sign.osmValuePart}</code>
                </>
              )}
            </summary>
            <pre
              className={clsx(
                contentPreClass,
                'border-t border-stone-400/50 px-2 py-2 text-stone-800',
              )}
            >
              {JSON.stringify(config, undefined, 2)}
            </pre>
          </details>
        )
      })}
    </div>
  )
}
