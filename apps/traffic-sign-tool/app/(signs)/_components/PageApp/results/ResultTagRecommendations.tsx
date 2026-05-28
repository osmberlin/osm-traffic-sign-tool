import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import * as m from '@app/paraglide/messages'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import {
  GEOMETRY_TYPES,
  signsToApplicability,
  signsToComments,
  signsToTags,
  type GeometryType,
} from '@osm-traffic-signs/converter'
import { useCountryPrefixWithFallback } from '../../store/CountryPrefixContext'
import { GeometryIcon } from './assets/geometry-icons/GeometryIcon'
import { ApplicabilityInfo } from './ResultTagRecommendations/ApplicabilityInfo'
import { CommentsMap } from './ResultTagRecommendations/CommentsMap'
import { ExplicitNoneTaggingNote } from './ResultTagRecommendations/ExplicitNoneTaggingNote'
import { TagList } from './ResultTagRecommendations/TagList'
import { tagsToString } from './ResultTagRecommendations/tagsToString'

export const ResultTagRecommendations = () => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const { paramSigns } = useParamSigns()

  const geometrySections = GEOMETRY_TYPES.map((geometry) => {
    const tags = signsToTags(paramSigns, countryPrefix, geometry)
    const { applicable, notApplicable } = signsToApplicability(paramSigns, geometry)
    const comments = signsToComments(paramSigns, geometry)
    return { geometry, tags, applicable, notApplicable, comments }
  })

  const relevantSections = geometrySections.filter(
    (section) => section.tags.size > 0 || section.comments.size > 0,
  )

  const showDetailedWayLabels = relevantSections.some(
    (section) => section.geometry === 'way_centerline',
  )
  const geometryLabels = {
    node: 'Nodes',
    way: showDetailedWayLabels ? 'Ways (separate)' : 'Ways',
    way_centerline: 'Ways (centerline)',
    area: 'Areas',
    relation: 'Relations',
  } as const satisfies Record<GeometryType, string>

  if (relevantSections.length === 0) {
    return null
  }

  return (
    <>
      <h2 className="mt-10 mb-4 text-lg font-light uppercase">{m.recommended_tags_heading()}</h2>

      <ExplicitNoneTaggingNote paramSigns={paramSigns} />

      {relevantSections.map(({ geometry, tags, applicable, notApplicable, comments }, index) => {
        const copyAllTags = tagsToString(tags)
        return (
          <div key={geometry} className="mt-10 first:mt-0">
            {index > 0 && <hr className="mb-10 border-stone-100" />}

            <div className="group/section">
              <ApplicabilityInfo
                geometry={geometry}
                tags={tags}
                applicable={applicable}
                notApplicable={notApplicable}
                copyButton={
                  <CopyButton text={copyAllTags}>
                    <ClipboardDocumentIcon className="size-4" />
                  </CopyButton>
                }
              >
                <h3 className="flex items-center gap-2 text-lg font-light uppercase">
                  <GeometryIcon geometry={geometry} />
                  {geometryLabels[geometry]}
                </h3>
              </ApplicabilityInfo>

              <TagList tags={tags} className="-mx-2" />

              {comments.size > 0 && (
                <div className="mt-6 opacity-60 transition-opacity group-hover/section:opacity-100">
                  <h4 className="mb-3 text-sm font-light text-stone-300">
                    {m.notes_heading()} ({geometryLabels[geometry]})
                  </h4>
                  <CommentsMap comments={comments} />
                </div>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
