import { useParamAnswers } from '@app/app/(signs)/_components/store/useParamAnswers.search'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { CopyButton } from '@app/app/_components/links/CopyButton'
import * as m from '@app/paraglide/messages'
import { getGeometryLabel } from '@app/src/features/i18n/geometryLabels'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import {
  GEOMETRY_TYPES,
  signsToApplicability,
  signsToComments,
  signsToOptionalTagsBySign,
  signsToTags,
  type GeometryType,
} from '@osm-traffic-signs/converter'
import { useCountryPrefix } from '../../store/CountryPrefixContext'
import { GeometryIcon } from './assets/geometry-icons/GeometryIcon'
import { ResultQuestions } from './ResultQuestions'
import { ApplicabilityInfo } from './ResultTagRecommendations/ApplicabilityInfo'
import { CommentsMap } from './ResultTagRecommendations/CommentsMap'
import { ExplicitNoneTaggingNote } from './ResultTagRecommendations/ExplicitNoneTaggingNote'
import { OptionalTagsMap } from './ResultTagRecommendations/OptionalTagsMap'
import { TagList } from './ResultTagRecommendations/TagList'
import { tagsToString } from './ResultTagRecommendations/tagsToString'
import { TrafficSignTagReferenceLinks } from './ResultTagRecommendations/TrafficSignTagReferenceLinks'

export const ResultTagRecommendations = () => {
  const { countryPrefix } = useCountryPrefix()
  const { paramSigns } = useParamSigns()
  const { paramAnswers } = useParamAnswers()

  const geometrySections = GEOMETRY_TYPES.map((geometry) => {
    const tags = signsToTags(paramSigns, countryPrefix, geometry, paramAnswers)
    const optionalTagsBySign = signsToOptionalTagsBySign(paramSigns, geometry)
    const { applicable, notApplicable } = signsToApplicability(paramSigns, geometry)
    const comments = signsToComments(paramSigns, geometry)
    return { geometry, tags, optionalTagsBySign, applicable, notApplicable, comments }
  })

  const relevantSections = geometrySections.filter(
    (section) =>
      section.tags.size > 0 || section.optionalTagsBySign.size > 0 || section.comments.size > 0,
  )

  const showDetailedWayLabels = relevantSections.some(
    (section) => section.geometry === 'way_centerline',
  )
  const geometryLabel = (geometry: GeometryType) =>
    getGeometryLabel(geometry, { wayAsSeparate: showDetailedWayLabels })

  const hasQuestions = paramSigns.some(
    (sign) => sign.recodgnizedSign && (sign.questions?.length ?? 0) > 0,
  )

  if (relevantSections.length === 0 && !hasQuestions) {
    return null
  }

  return (
    <>
      <ResultQuestions />

      {relevantSections.length > 0 && (
        <>
          <h2
            className={
              hasQuestions
                ? 'mt-4 mb-3 text-lg font-light uppercase md:mt-6 md:mb-4'
                : 'mb-3 text-lg font-light uppercase md:mb-4'
            }
          >
            {m.recommended_tags_heading()}
          </h2>

          <ExplicitNoneTaggingNote paramSigns={paramSigns} />
        </>
      )}

      {relevantSections.map(
        ({ geometry, tags, optionalTagsBySign, applicable, notApplicable, comments }, index) => {
          const copyAllTags = tagsToString(tags)
          const trafficSignTagValue = tags.get('traffic_sign')
          const trafficSignTagString =
            trafficSignTagValue === undefined
              ? undefined
              : Array.isArray(trafficSignTagValue)
                ? trafficSignTagValue.join(';')
                : trafficSignTagValue

          return (
            <div
              key={geometry}
              className={
                index > 0 ? 'mt-4 border-t border-stone-500/50 pt-4 md:mt-6 md:pt-6' : undefined
              }
            >
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
                    {geometryLabel(geometry)}
                  </h3>
                </ApplicabilityInfo>

                <TagList tags={tags} className="-mx-2" />

                {optionalTagsBySign.size > 0 && (
                  <div className="mt-4 opacity-60 transition-opacity group-hover/section:opacity-100 md:mt-6">
                    <OptionalTagsMap optionalTagsBySign={optionalTagsBySign} />
                  </div>
                )}

                {geometry === 'node' && trafficSignTagString && (
                  <TrafficSignTagReferenceLinks tagValue={trafficSignTagString} />
                )}

                {comments.size > 0 && (
                  <div className="mt-4 opacity-60 transition-opacity group-hover/section:opacity-100 md:mt-6">
                    <CommentsMap comments={comments} />
                  </div>
                )}
              </div>
            </div>
          )
        },
      )}
    </>
  )
}
