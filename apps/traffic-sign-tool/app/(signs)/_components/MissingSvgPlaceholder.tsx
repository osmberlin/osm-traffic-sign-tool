import { PhotoOffIcon } from '@app/app/(signs)/_components/icons/PhotoOffIcon'
import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import type { SignStateType, SignType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'

type Props = {
  sign: Pick<SignType | SignStateType, 'osmValuePart'>
  className?: string
  /** Off for small corner previews (e.g. wiki comparison table). */
  showSignKey?: boolean
}

export const MissingSvgPlaceholder = ({ sign, className, showSignKey = true }: Props) => {
  const catalogueLang = useCatalogueHtmlLang()

  return (
    <div
      className={clsx(
        'flex shrink-0 flex-col items-center justify-center rounded-sm border border-dashed border-stone-400 bg-stone-100 text-stone-500',
        showSignKey ? 'aspect-square gap-1' : 'gap-0',
        className,
      )}
      aria-label={m.missing_svg_placeholder_label({ osmValuePart: sign.osmValuePart })}
    >
      <PhotoOffIcon className={clsx('shrink-0', showSignKey ? 'size-8' : 'size-10')} />
      {showSignKey ? (
        <code lang={catalogueLang} className="text-[0.6rem] leading-tight">
          {sign.osmValuePart}
        </code>
      ) : null}
    </div>
  )
}
