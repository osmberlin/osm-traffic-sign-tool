import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import * as m from '@app/paraglide/messages'
import {
  CheckCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'
import { SignStateType, SignType } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { PackageSvgTrafficSign } from '../../PackageSvgTrafficSign'
import { hasSignQuestions } from '../selectedSigns/SelectedSignQuestions'

type Props = {
  sign: SignStateType | SignType
}

export const Sign = ({ sign }: Props) => {
  const { paramSigns, toggleOsmValuePart } = useParamSigns()
  const catalogueLang = useCatalogueHtmlLang()

  const active = paramSigns.map((s) => s.signId).includes(sign.signId)
  const isSecondarySign = sign.kind !== 'traffic_sign'

  if ('recodgnizedSign' in sign && sign.recodgnizedSign === false) return null

  const toggleSignPart = (osmValuePart: string) => {
    toggleOsmValuePart(osmValuePart)
  }

  return (
    <div className="relative">
      <button
        type="button"
        lang={catalogueLang}
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
            'absolute top-0 right-0 rounded-full',
            active ? '' : 'text-white/0 transition-colors group-hover/item:text-stone-900',
          )}
        >
          {active ? <CheckCircleIcon className="size-6" /> : <PlusCircleIcon className="size-6" />}
        </span>

        <PackageSvgTrafficSign
          key={sign.osmValuePart}
          sign={sign}
          className={clsx(
            'pointer-events-none h-auto max-h-full w-full',
            isSecondarySign ? 'md:max-w-21 2xl:max-w-19' : '',
          )}
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
        <div className="absolute right-1 bottom-1 rounded-full bg-stone-800 p-1 text-stone-50">
          <PencilSquareIcon className="size-3" />
        </div>
      )}

      {hasSignQuestions(sign) && (
        <div
          className={clsx(
            'absolute bottom-1 rounded-full bg-stone-800 p-1 text-stone-50',
            sign.valuePrompt ? 'right-7' : 'right-1',
          )}
          title={m.question_badge_label()}
        >
          <ChatBubbleLeftEllipsisIcon className="size-3" aria-label={m.question_badge_label()} />
        </div>
      )}
    </div>
  )
}
