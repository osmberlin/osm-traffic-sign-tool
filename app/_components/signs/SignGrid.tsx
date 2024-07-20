import { TrafficSign } from '@/data/types'
import { useState } from 'react'
import { Sign } from './Sign'

type Props = {
  defaultOpen?: boolean
  attributes: string[] | null
  toggleSelection: (signId: string) => void
  headline: string
  signs: TrafficSign[]
}

const SignGrid = ({ defaultOpen = true, attributes, toggleSelection, headline, signs }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <details open={isOpen} className="group/details mb-8">
      <summary
        className="mb-0 cursor-pointer group-open/details:mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="inline-block text-lg font-thin uppercase text-black">
          {headline} ({signs.length})
        </h3>
      </summary>
      <div className="flex flex-wrap gap-4">
        {signs.map((sign) => (
          <Sign
            key={sign.urlKey}
            sign={sign}
            toggleSelection={toggleSelection}
            active={attributes?.includes(sign.urlKey) ?? false}
          />
        ))}
      </div>
    </details>
  )
}

export default SignGrid
