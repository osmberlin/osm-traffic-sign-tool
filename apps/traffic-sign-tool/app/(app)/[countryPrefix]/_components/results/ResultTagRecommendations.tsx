'use client'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signToTags, toTag } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { CopyButton } from '../../../../_components/links/CopyButton'
import { Tag } from '../../../../_components/wiki/Tag'

export const ResultTagRecommendations = () => {
  const countryPrefix = useCountryPrefix()
  const { paramSigns } = useParamSigns()

  const aggregatedTagsMap = signToTags(paramSigns, countryPrefix)
  const copyAllTags = Array.from(aggregatedTagsMap)
    .map(([key, value]) => toTag({ key, value: Array.isArray(value) ? value.join(';') : value }))
    .join('\n')

  return (
    <>
      <div className="mb-4 mt-10 flex items-center justify-between">
        <h2 className="text-lg font-light uppercase">
          Recommended {/* <code>highway</code> */}
          tags
        </h2>

        {copyAllTags && (
          <div>
            <CopyButton text={copyAllTags}>
              <ClipboardDocumentIcon className="size-4" />
            </CopyButton>
          </div>
        )}
      </div>

      <ul className="-mx-2">
        {Array.from(aggregatedTagsMap).map(([key, value]) => {
          return (
            <li
              key={key}
              className={clsx(
                'rounded px-2 py-0.5 leading-tight hover:bg-white/5',
                key === 'traffic_sign' ? 'break-all' : 'break-words',
              )}
            >
              <Tag tagKey={key} tagValue={value} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
