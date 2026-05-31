import { CommentTranslateLink } from '@app/app/_components/i18n/CommentTranslateLink'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import {
  commentWithTranslateInlineClass,
  notesListClassName,
} from '@app/app/_components/layout/proseClasses'
import { MoreLinkButton } from '@app/app/_components/links/MoreLinkButton'
import * as m from '@app/paraglide/messages'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  getCountryCatalogueMeta,
  type OptionalTagGuidance,
  type OptionalTagsBySignEntry,
} from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { useCountryPrefix } from '../../../store/CountryPrefixContext'
import { Tag } from '../../../wiki/Tag'
import { WikiLinkify } from '../../../wiki/WikiLinkify'

type Props = {
  optionalTagsBySign: Map<string, OptionalTagsBySignEntry>
}

const OptionalTagGuidancePanel = ({
  guidance,
  guidanceLang,
  uiLocale,
}: {
  guidance: OptionalTagGuidance
  guidanceLang: string
  uiLocale: string
}) => (
  <div className="flex items-start justify-between gap-3 pb-2">
    <div
      className={commentWithTranslateInlineClass}
      lang={guidanceLang !== uiLocale ? guidanceLang : undefined}
    >
      <WikiLinkify text={guidance.comment} />
      <CommentTranslateLink commentText={guidance.comment} commentLang={guidanceLang} />
    </div>
    {guidance.link && <MoreLinkButton href={guidance.link} />}
  </div>
)

export const OptionalTagsMap = ({ optionalTagsBySign }: Props) => {
  const uiLocale = useUiLocale()
  const { countryPrefix } = useCountryPrefix()
  const { defaultCommentLang } = getCountryCatalogueMeta(countryPrefix)

  return (
    <>
      {Array.from(optionalTagsBySign).map(([signKey, { tags, guidance }]) => {
        const guidanceLang = guidance?.lang ?? defaultCommentLang

        return (
          <div key={signKey} className="mb-4 space-y-2">
            <h4 className="text-sm font-light text-stone-300">
              {m.optional_tags_heading()}{' '}
              <code className="rounded-sm bg-stone-700 px-2 py-1 text-stone-50">{signKey}</code>
            </h4>

            <ul className={clsx(notesListClassName, 'list-none')}>
              {Array.from(tags.entries()).map(([tagKey, tagValue]) => (
                <li key={tagKey}>
                  {guidance ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-start gap-2 hover:bg-white/5 [&::-webkit-details-marker]:hidden">
                        <ChevronRightIcon className="mt-1 size-4 shrink-0 text-stone-400 transition-transform group-open:rotate-90" />
                        <Tag tagKey={tagKey} tagValue={tagValue} />
                      </summary>
                      <div className="mt-2 pl-6">
                        <OptionalTagGuidancePanel
                          guidance={guidance}
                          guidanceLang={guidanceLang}
                          uiLocale={uiLocale}
                        />
                      </div>
                    </details>
                  ) : (
                    <Tag tagKey={tagKey} tagValue={tagValue} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}
