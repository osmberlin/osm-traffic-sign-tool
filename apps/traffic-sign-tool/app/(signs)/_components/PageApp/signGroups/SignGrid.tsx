'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { SignStateType, SignType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { Sign } from './Sign'

type Props = {
  headline: string
  defaultOpen?: boolean
  signs: (SignStateType | SignType)[]
}

export const SignGrid = ({ headline, defaultOpen = true, signs }: Props) => {
  return (
    <Disclosure as="section" className="group mb-8" defaultOpen={defaultOpen}>
      <DisclosureButton className="mb-0 flex w-full cursor-pointer items-start justify-start gap-1 group-data-open:mb-4">
        <ChevronRightIcon className="fill-stone/60 group-data-hover:fill-stone/50 mt-0.5 size-5 shrink-0 group-data-open:rotate-90" />
        <h2 id={`sign-grid-${headline}`} className="min-w-0 flex-1 text-left leading-tight">
          {headline}&nbsp;({signs.length})
        </h2>
      </DisclosureButton>
      <DisclosurePanel
        className={clsx(
          signs.length === 0
            ? ''
            : 'grid grid-cols-1 gap-3 @xs/sign-selection:grid-cols-2 @sm/sign-selection:grid-cols-3 @md/sign-selection:grid-cols-4 @lg/sign-selection:grid-cols-5',
        )}
      >
        {signs.length === 0 && (
          <p className="text-center text-sm text-gray-500 uppercase">No results</p>
        )}

        {signs.map((sign) => {
          return <Sign key={sign.osmValuePart} sign={sign} />
        })}
      </DisclosurePanel>
    </Disclosure>
  )
}
