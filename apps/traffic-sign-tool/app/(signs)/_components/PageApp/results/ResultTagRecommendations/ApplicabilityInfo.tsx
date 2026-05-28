import {
  stonePillButton,
  stonePillFocus,
  stonePillWarningSurface,
} from '@app/app/_components/links/buttonStyles'
import * as m from '@app/paraglide/messages'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import type { GeometryType, SignStateType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { useState, type ReactNode } from 'react'

type Props = {
  geometry: GeometryType
  tags: Map<string, string | string[]>
  applicable: SignStateType[]
  notApplicable: SignStateType[]
  copyButton: ReactNode
  children: ReactNode
}

export const ApplicabilityInfo = ({
  geometry,
  tags,
  applicable,
  notApplicable,
  copyButton,
  children,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isNodeWithOnlyTrafficSign =
    geometry === 'node' && tags.size === 1 && tags.has('traffic_sign')
  const hasNotApplicable = notApplicable.length > 0 && !isNodeWithOnlyTrafficSign

  const applicableSigns = applicable.map((sign) => sign.osmValuePart).join(', ')
  const notApplicableSigns = notApplicable.map((sign) => sign.osmValuePart).join(', ')

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        {children}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            className={clsx(
              'cursor-pointer px-3 py-1.5 text-xs',
              hasNotApplicable
                ? clsx('inline-flex items-center', stonePillWarningSurface, stonePillFocus)
                : stonePillButton,
            )}
            aria-label={m.applicability_details()}
            aria-expanded={isExpanded}
          >
            <InformationCircleIcon
              className={clsx('size-4', hasNotApplicable ? 'text-orange-900' : 'text-stone-100')}
            />
          </button>
          {copyButton}
        </div>
      </div>

      {isExpanded && (
        <div className="mb-4 rounded bg-stone-800 px-3 py-2 text-sm text-stone-200">
          <div className="space-y-1">
            <div>
              <span className="font-medium">{m.applicability_based_on()}</span>{' '}
              {applicableSigns || m.notes_empty()}
            </div>
            {notApplicable.length > 0 && (
              <div>
                <span className="font-medium">{m.applicability_not_applicable()}</span>{' '}
                {notApplicableSigns}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
