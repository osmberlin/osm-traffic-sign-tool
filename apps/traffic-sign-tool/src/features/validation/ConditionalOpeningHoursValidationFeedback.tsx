'use client'
import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import {
  isOpeningHoursValuePromptFormat,
  type ValuePromptFormat,
} from '@osm-traffic-signs/converter'
import {
  validateConditionalOpeningHours,
  type ConditionalValidationResult,
} from './validateConditionalOpeningHours.js'

type Props = {
  format: ValuePromptFormat
  inputValue: string
}

const getRequestedLocale = (countryPrefix: string) => {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language
  }
  return countryPrefix.toLowerCase()
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
  const { countryPrefix } = useCountryPrefixWithFallback()

  const validation = validateConditionalOpeningHours(inputValue, {
    requestedLocale: getRequestedLocale(countryPrefix),
    countryCode: countryPrefix.toLowerCase(),
  })

  if (!isOpeningHoursValuePromptFormat(format)) {
    return null
  }

  return (
    <>
      <p className="mt-2 text-gray-500 group-hover:text-gray-800">
        Please use {/* TODO: Make URL translatable */}
        <ExternalLink href="https://wiki.openstreetmap.org/wiki/DE:Conditional_restrictions">
          the Wiki on conditional restrictions
        </ExternalLink>{' '}
        to check the correct format .
      </p>
      <ValidationMessageList validation={validation} />
    </>
  )
}
