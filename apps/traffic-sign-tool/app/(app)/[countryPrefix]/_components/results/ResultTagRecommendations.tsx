'use client'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signToTags, toTag } from '@osm-traffic-signs/converter'
import { CopyButton } from '../../../../_components/links/CopyButton'
import { TagList } from './ResultTagRecommendations/TagList'

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

      <TagList tags={aggregatedTagsMap} className="-mx-2" />
    </>
  )
}
