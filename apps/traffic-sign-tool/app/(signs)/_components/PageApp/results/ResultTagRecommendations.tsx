'use client'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signsToTags, toTag } from '@osm-traffic-signs/converter'
import { useCountryPrefixWithFallback } from '../../store/CountryPrefixContext'
import { TagList } from './ResultTagRecommendations/TagList'

export const ResultTagRecommendations = () => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const { paramSigns } = useParamSigns()

  const aggregatedTagsMap = signsToTags(paramSigns, countryPrefix)
  const copyAllTags = Array.from(aggregatedTagsMap)
    .map(([key, value]) => toTag({ key, value: Array.isArray(value) ? value.join(';') : value }))
    .join('\n')

  return (
    <>
      <div className="mt-10 mb-4 flex items-center justify-between">
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
