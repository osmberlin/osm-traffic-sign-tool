import { clsx } from 'clsx'
import { useState } from 'react'

type TrafficSign = {
  urlKey: string
  name: string
  descriptiveName: string
  image?: {
    svgPath: string
  }
}

type Props = {
  active: boolean
  toggleSelection: (signId: string) => void
  sign: TrafficSign
}

export const Sign = ({ active, toggleSelection, sign }: Props) => {
  const [debugOpen, setDebugOpen] = useState(false)

  return (
    <div className="relative w-20">
      <button
        onClick={() => toggleSelection(sign.urlKey)}
        className={clsx(
          'group/item relative flex h-20 w-full items-center justify-center rounded border border-stone-200 p-2 hover:bg-stone-200',
          active && 'bg-stone-100 shadow',
        )}
      >
        <h3 className="sr-only">
          {sign.urlKey}
          {sign.name} – {sign.descriptiveName}
        </h3>
        <span
          className={clsx(
            'absolute -right-1 -top-1 rounded-full',
            active
              ? 'group-hover/item:text-stone-700'
              : 'text-white/0 transition-colors group-hover/item:text-stone-900',
          )}
        >
          {active ? (
            <IconCircleCheck className="h-6 w-6" />
          ) : (
            <IconCirclePlus className="h-6 w-6" />
          )}
        </span>

        {sign?.image?.svgPath && (
          <img src={sign.image.svgPath} alt={sign.name} className="h-auto max-h-28 w-full" />
        )}
      </button>
    </div>
  )
}
