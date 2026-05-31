import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { ParaglideMessage } from '@inlang/paraglide-js-react'
import {
  validateConditionalOpeningHours,
  type ConditionalValidationResult,
  isOpeningHoursValuePromptFormat,
  type ValuePromptFormat,
} from '@osm-traffic-signs/converter'

type Props = {
  format: ValuePromptFormat
  inputValue: string
}

const ValidationMessageList = ({ validation }: { validation: ConditionalValidationResult }) => {
  if (validation.severity === 'none' || validation.messages.length === 0) {
    return null
  }

  const className =
    validation.severity === 'error' ? 'mt-2 text-sm text-red-600' : 'mt-2 text-sm text-amber-700'

  return (
    <div
      className={`${className} text-left`}
      role={validation.severity === 'error' ? 'alert' : 'status'}
    >
      <ul className="list-disc space-y-2 pl-4 text-left">
        {validation.messages.map((item) => (
          <li key={`${item.reference ?? ''}:${item.detail}`} className="text-left">
            {item.reference ? (
              <>
                <span className="font-medium">{item.reference}</span>
                <span className="mt-0.5 block">{item.detail}</span>
              </>
            ) : (
              <span>{item.detail}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ConditionalOpeningHoursValidationFeedback = ({ format, inputValue }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const uiLocale = useUiLocale()

  const validation = validateConditionalOpeningHours(inputValue, {
    requestedLocale: uiLocale,
    countryCode: countryPrefix.toLowerCase(),
  })

  if (!isOpeningHoursValuePromptFormat(format)) {
    return null
  }

  return (
    <>
      <p className="mt-2 text-gray-500 group-hover:text-gray-800">
        <ParaglideMessage
          message={m.opening_hours_wiki_block}
          markup={{
            link: ({ children, options }) => (
              <ExternalLink href={options.to} blank>
                {children}
              </ExternalLink>
            ),
          }}
        />
      </p>
      <ValidationMessageList validation={validation} />
    </>
  )
}
