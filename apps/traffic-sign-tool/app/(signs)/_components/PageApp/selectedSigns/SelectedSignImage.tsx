import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import { SignStateType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { MissingSvgNotice } from '../../MissingSvgNotice'
import { PackageSvgTrafficSign } from '../../PackageSvgTrafficSign'

type Props = { sign: SignStateType; compact?: boolean }

const getBanderoleTextClass = (value: string) => {
  const length = value.length
  if (length <= 4) return 'text-4xl px-3'
  if (length <= 8) return 'text-2xl px-2'
  if (length <= 12) return 'text-lg px-2'
  if (length <= 16) return 'text-base px-1.5'
  return 'text-sm px-1'
}

export const SelectedSignGraphic = ({ sign, compact = false }: Props) => {
  const showBanderole =
    'valuePrompt' in sign
      ? sign.valuePrompt &&
        (sign.valuePrompt.defaultValue === '47' || sign.signValue !== sign.valuePrompt.defaultValue)
      : false

  if (!sign.recodgnizedSign) {
    return (
      <div
        className={clsx(
          'mx-auto flex items-center justify-center rounded-sm border border-stone-800 bg-stone-600 text-stone-50',
          compact ? 'size-full min-h-0 pt-1' : 'size-20 pt-1',
        )}
      >
        <code className="tracking-tighter whitespace-nowrap">?</code>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'relative mx-auto',
        compact ? 'h-full w-full' : 'aspect-square w-full max-w-24',
      )}
    >
      <PackageSvgTrafficSign
        sign={sign}
        className={clsx(
          'pointer-events-none block h-full w-full',
          compact ? 'max-h-full max-w-full' : 'max-h-24 max-w-24',
        )}
      />

      {showBanderole && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={clsx(
              'font-condensed w-full -rotate-12 rounded-sm bg-amber-100/95 pt-1 text-center font-normal text-amber-900 shadow-xs',
              getBanderoleTextClass(String(sign.signValue)),
              compact && 'px-1 text-sm',
            )}
          >
            {sign.signValue}
          </div>
        </div>
      )}
    </div>
  )
}

export const SelectedSignLabels = ({ sign }: Pick<Props, 'sign'>) => {
  const catalogueLang = useCatalogueHtmlLang()

  return (
    <>
      <h3 className="w-full font-light">
        {sign.recodgnizedSign ? <span lang={catalogueLang}>{sign.name}</span> : m.unknown_sign()}
      </h3>

      {'descriptiveName' in sign && sign.descriptiveName && (
        <div lang={catalogueLang}>{sign.descriptiveName}</div>
      )}
    </>
  )
}

/** Used by taginfo and other stacked sign previews. */
export const SelectedSignImage = ({ sign }: Pick<Props, 'sign'>) => {
  return (
    <div className="px-1">
      <SelectedSignGraphic sign={sign} />
      <div className="mt-1 w-full text-center leading-tight">
        <SelectedSignLabels sign={sign} />
        <MissingSvgNotice sign={sign} className="mt-1" variant="compact" />
      </div>
    </div>
  )
}
