'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { SignStateType, SignType } from '@osm-traffic-signs/converter'
import { Sign } from './Sign'

type Props = {
  defaultOpen?: boolean
  headline: string
  signs: (SignStateType | SignType)[]
}

export const SignGrid = ({ defaultOpen = true, headline, signs }: Props) => {
  return (
    <Disclosure as="section" className="group mb-8" defaultOpen={defaultOpen}>
      <DisclosureButton className="mb-0 flex w-full cursor-pointer items-center justify-start gap-1 group-data-[open]:mb-4">
        <ChevronRightIcon className="fill-stone/60 group-data-[hover]:fill-stone/50 size-5 group-data-[open]:rotate-90" />
        <h2 id={`sign-grid-${headline}`}>
          {headline} ({signs.length})
        </h2>
      </DisclosureButton>
      <DisclosurePanel className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {signs.map((sign) => {
          return <Sign key={sign.osmValuePart} sign={sign} />
        })}
      </DisclosurePanel>
    </Disclosure>
  )
}
