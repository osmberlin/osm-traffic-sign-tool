import { buildWikiComparisonRowId } from '@app/app/(signs)/_components/PageWikiComparison/wikiComparisonLinks'
import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {
  hasQaCapability,
  isSignSvgMissing,
  isSignSvgUnavailable,
  type SignStateType,
  type SignType,
} from '@osm-traffic-signs/converter'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

type Props = {
  sign: SignType | SignStateType
  className?: string
  variant?: 'default' | 'compact'
  /** When false, omits the wiki link (e.g. already on the wiki comparison page). */
  showWikiLink?: boolean
}

const wikiLinkClassName =
  'font-medium underline underline-offset-2 text-blue-700 decoration-blue-600/40 hover:text-blue-800'

const wikiLinkActiveClassName = 'font-normal no-underline text-blue-800'

export const MissingSvgNotice = ({
  sign,
  className,
  variant = 'default',
  showWikiLink = true,
}: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const lang = useCurrentLang()

  if (!isSignSvgUnavailable(countryPrefix, sign)) {
    return null
  }

  const wikiSvgMissing = isSignSvgMissing(sign)
  const canLinkToWiki = hasQaCapability(countryPrefix, 'wikiComparison')
  const renderWikiLink = canLinkToWiki && showWikiLink
  const wikiRowHash = buildWikiComparisonRowId(`${countryPrefix}:${sign.osmValuePart}`)

  const isCompact = variant === 'compact'

  return (
    <div
      className={clsx(
        'rounded-md bg-blue-50 outline outline-blue-600/15',
        isCompact ? 'p-3' : 'p-4',
        className,
      )}
    >
      <div className="flex gap-3">
        <div
          className={clsx(
            'flex shrink-0 items-center justify-center rounded-md bg-blue-600',
            isCompact ? 'size-7' : 'size-9',
          )}
        >
          <InformationCircleIcon
            aria-hidden="true"
            className={clsx('text-white', isCompact ? 'size-4' : 'size-5')}
          />
        </div>
        <p
          className={clsx(
            'min-w-0 flex-1 text-blue-950',
            isCompact ? 'text-xs leading-snug' : 'text-sm leading-snug',
          )}
        >
          {!wikiSvgMissing ? (
            m.missing_svg_notice_no_preview({
              countryPrefix,
              osmValuePart: sign.osmValuePart,
            })
          ) : !canLinkToWiki ? (
            m.missing_svg_notice_no_wiki({
              countryPrefix,
              osmValuePart: sign.osmValuePart,
            })
          ) : renderWikiLink ? (
            <>
              {m.missing_svg_notice_prefix({
                countryPrefix,
                osmValuePart: sign.osmValuePart,
              })}{' '}
              <Link
                to="/$lang/wiki"
                params={{ lang }}
                hash={wikiRowHash}
                activeOptions={{ includeHash: true }}
                className={wikiLinkClassName}
                activeProps={{
                  className: wikiLinkActiveClassName,
                  'aria-current': 'location',
                }}
              >
                {m.missing_svg_wiki_qa_link()}
              </Link>
              {m.missing_svg_notice_suffix()}
            </>
          ) : (
            m.missing_svg_notice_on_wiki_page({
              countryPrefix,
              osmValuePart: sign.osmValuePart,
            })
          )}
        </p>
      </div>
    </div>
  )
}
