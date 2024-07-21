import { useParamSigns } from '@/app/_store/useParamSigns.nuqs'
import { TrafficSign } from '@/data/types'
import { BugAntIcon, CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { useState } from 'react'
import { buttonStyleSecondary } from '../links/buttonStyles'

type Props = {
  sign: TrafficSign
}

export const Sign = ({ sign }: Props) => {
  const [debugOpen, setDebugOpen] = useState(false)
  const { paramSigns, toggleSignkey } = useParamSigns()

  const active = paramSigns.includes(sign.urlKey)

  return (
    <div className="relative w-20">
      <button
        onClick={() => toggleSignkey(sign.urlKey)}
        className={clsx(
          'group/item relative flex h-20 w-full items-center justify-center rounded border border-stone-200 p-2 hover:bg-stone-200',
          active ? 'bg-stone-100 shadow' : '',
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
          {active ? <CheckCircleIcon className="size-6" /> : <PlusCircleIcon className="size-6" />}
        </span>

        {sign?.image?.svgPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sign.image.svgPath} alt={sign.name} className="h-auto w-full" />
        ) : (
          <div>
            <code className="whitespace-nowrap tracking-tighter">
              {sign.signKey.replaceAll('DE:', '')}
            </code>
            <br />
            <p className="text-[0.6rem] leading-tight">{sign.descriptiveName ?? '–'}</p>
          </div>
        )}

        <div className="absolute -bottom-5 z-10 hidden rounded bg-stone-800 px-1 pb-0.5 pt-1 text-xs/4 text-stone-50 group-hover/item:block">
          <strong>{sign.urlKey}</strong>
          <br />
          {sign.descriptiveName ?? ''}
        </div>
      </button>

      <dialog open={debugOpen} className="absolute z-10 max-w-md overflow-auto rounded p-5">
        <form method="dialog" className="absolute right-3 top-3">
          <button className={buttonStyleSecondary}>&times;</button>
        </form>
        <div className="bg-gray-100 py-1 text-center">
          <p>
            <strong>{sign.urlKey}</strong>
          </p>
          <p>{sign.descriptiveName}</p>
        </div>
        <pre className="mt-5">
          <code>{JSON.stringify(sign, undefined, 2)}</code>
        </pre>
      </dialog>
      <p className="absolute -bottom-2 -right-1">
        <button
          className="rounded-full bg-stone-200 p-0.5 text-gray-400 hover:bg-violet-400 hover:text-violet-50"
          onClick={() => setDebugOpen(!debugOpen)}
        >
          <BugAntIcon className="size-3" />
        </button>
      </p>
    </div>
  )
}
