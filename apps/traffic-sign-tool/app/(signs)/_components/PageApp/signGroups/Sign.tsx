import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { CheckCircleIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import { SignStateType, SignType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { PackageSvgTrafficSign } from '../../PackageSvgTrafficSign'

type Props = {
  sign: SignStateType | SignType
}

export const Sign = ({ sign }: Props) => {
  const { paramSigns, toggleOsmValuePart } = useParamSigns()

  const active = paramSigns.map((s) => s.signId).includes(sign.signId)

  if ('recodgnizedSign' in sign && sign.recodgnizedSign === false) return null

  const toggleSignPart = (osmValuePart: string) => {
    toggleOsmValuePart(osmValuePart)
  }

  return (
    <div className="relative">
      <button
        onClick={() => toggleSignPart(sign.osmValuePart)}
        className={clsx(
          'group/item relative flex h-20 w-full cursor-pointer items-center justify-center rounded-sm border border-stone-200 p-2 hover:bg-stone-200',
          active ? 'bg-stone-100 shadow-sm' : '',
        )}
      >
        <h3 className="sr-only">
          {sign.osmValuePart}
          {sign.name} – {sign.descriptiveName}
        </h3>
        <span
          className={clsx(
            'absolute right-0 top-0 rounded-full',
            active ? '' : 'text-white/0 transition-colors group-hover/item:text-stone-900',
          )}
        >
          {active ? <CheckCircleIcon className="size-6" /> : <PlusCircleIcon className="size-6" />}
        </span>

        <PackageSvgTrafficSign
          key={sign.osmValuePart}
          sign={sign}
          className="pointer-events-none h-auto max-h-full w-full"
        />
        {/* // <div>
          //   <code className="whitespace-nowrap tracking-tighter">
          //     {sign.osmValuePart.replaceAll('DE:', '')}
          //   </code>
          //   <br />
          //   <p className="text-[0.6rem] leading-tight">{sign.descriptiveName ?? '–'}</p>
          // </div> */}

        <div className="absolute top-14 z-10 hidden min-w-32 rounded-sm bg-stone-800 px-2 py-1 text-xs/4 text-stone-50 group-hover/item:block">
          <strong>{sign.osmValuePart}</strong>
          <br />
          {sign.descriptiveName ?? ''}
        </div>
      </button>

      {sign.valuePrompt && (
        <div className="absolute bottom-1 right-1 rounded-full bg-stone-800 p-1 text-stone-50">
          <PencilSquareIcon className="size-3" />
        </div>
      )}
    </div>
  )
}
