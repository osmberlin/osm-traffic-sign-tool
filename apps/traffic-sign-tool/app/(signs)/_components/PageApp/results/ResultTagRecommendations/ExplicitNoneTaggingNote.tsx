import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { classifyTaggingSuggestionsQa, type SignStateType } from '@osm-traffic-signs/converter'

type Props = {
  paramSigns: SignStateType[]
}

const renderSignKeys = (keys: string[], catalogueLang: string) =>
  keys.map((key, index) => {
    const isLast = index === keys.length - 1
    const isSecondLast = index === keys.length - 2
    const separator = index === 0 ? '' : isLast ? ' and ' : isSecondLast ? ', and ' : ', '

    return (
      <span key={key}>
        {separator}
        <code lang={catalogueLang}>{key}</code>
      </span>
    )
  })

export const ExplicitNoneTaggingNote = ({ paramSigns }: Props) => {
  const catalogueLang = useCatalogueHtmlLang()
  const hasMultipleSelectedSigns = paramSigns.length > 1
  const trafficSignKey = 'traffic_sign'

  const explicitNoneSignKeys = paramSigns
    .filter((sign) => sign.recodgnizedSign)
    .filter((sign) => classifyTaggingSuggestionsQa(sign) === 'explicitNoSuggestions')
    .map((sign) => sign.osmValuePart)

  if (explicitNoneSignKeys.length === 0) {
    return null
  }

  return (
    <p className="mb-3 flex items-start gap-1 text-sm font-light text-stone-400">
      <InformationCircleIcon className="mt-0.5 size-4 shrink-0" />
      <span>
        {explicitNoneSignKeys.length === 1 && !hasMultipleSelectedSigns ? (
          <>
            {m.explicit_none_single_home_prefix()}
            <code lang={catalogueLang}>{explicitNoneSignKeys[0]}</code>
            {m.explicit_none_single_home_suffix({ trafficSignKey })}
          </>
        ) : explicitNoneSignKeys.length === 1 ? (
          <>
            {m.explicit_none_single_prefix()}
            <code lang={catalogueLang}>{explicitNoneSignKeys[0]}</code>
            {m.explicit_none_single_suffix({ trafficSignKey })}
          </>
        ) : (
          <>
            {m.explicit_none_multiple_prefix()}
            {renderSignKeys(explicitNoneSignKeys, catalogueLang)}{' '}
            {m.explicit_none_multiple_suffix({ trafficSignKey })}
          </>
        )}
      </span>
    </p>
  )
}
