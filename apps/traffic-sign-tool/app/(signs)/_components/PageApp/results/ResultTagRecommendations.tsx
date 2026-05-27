import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import * as m from '@app/paraglide/messages'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { signsToTags, toTag } from '@osm-traffic-signs/converter'
import { useCountryPrefixWithFallback } from '../../store/CountryPrefixContext'
import { ExplicitNoneTaggingNote } from './ResultTagRecommendations/ExplicitNoneTaggingNote'
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
        <h2 className="text-lg font-light uppercase">{m.recommended_tags_heading()}</h2>

        {copyAllTags && (
          <div>
            <CopyButton text={copyAllTags}>
              <ClipboardDocumentIcon className="size-4" />
            </CopyButton>
          </div>
        )}
      </div>

      <ExplicitNoneTaggingNote paramSigns={paramSigns} />

      <TagList tags={aggregatedTagsMap} className="-mx-2" />
    </>
  )
}
