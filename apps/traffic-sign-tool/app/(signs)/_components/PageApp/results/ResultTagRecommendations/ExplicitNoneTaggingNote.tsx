import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { classifyTaggingSuggestionsQa, type SignStateType } from '@osm-traffic-signs/converter'

type Props = {
  paramSigns: SignStateType[]
}

const renderSignKeys = (keys: string[]) =>
  keys.map((key, index) => {
    const isLast = index === keys.length - 1
    const isSecondLast = index === keys.length - 2
    const separator = index === 0 ? '' : isLast ? ' and ' : isSecondLast ? ', and ' : ', '

    return (
      <span key={key}>
        {separator}
        <code>{key}</code>
      </span>
    )
  })

export const ExplicitNoneTaggingNote = ({ paramSigns }: Props) => {
  const hasMultipleSelectedSigns = paramSigns.length > 1

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
            This sign (<code>{explicitNoneSignKeys[0]}</code>) is marked to have no tagging
            recommendations apart from the <code>traffic_sign</code> key.
          </>
        ) : explicitNoneSignKeys.length === 1 ? (
          <>
            Sign <code>{explicitNoneSignKeys[0]}</code> is marked to have no tagging recommendations
            apart from the <code>traffic_sign</code> key.
          </>
        ) : (
          <>
            Signs {renderSignKeys(explicitNoneSignKeys)} are marked to have no tagging
            recommendations apart from the <code>traffic_sign</code> key.
          </>
        )}
      </span>
    </p>
  )
}
