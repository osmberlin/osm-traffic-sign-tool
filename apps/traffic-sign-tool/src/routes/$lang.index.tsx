import { PageApp } from '@app/app/(signs)/_components/PageApp'
import * as m from '@app/paraglide/messages'
import {
  answersSearchEqual,
  parseAnswersParam,
  serializeAnswersParam,
} from '@app/src/features/searchParams/answersParam'
import {
  mergeAnswersFromCache,
  readAnswersCache,
} from '@app/src/features/searchParams/answersStorage'
import { deSearchSchema, parseSignsParam } from '@app/src/features/searchParams/deSearch'
import { buildPageHead, catalogueHomeUrl, hasDeSearchParams } from '@app/src/features/seo/seoHead'
import { type CountryPrefixType, countryDefinitions } from '@osm-traffic-signs/converter'
import { createFileRoute, redirect } from '@tanstack/react-router'

function LangIndexRouteComponent() {
  const trafficSignData = Route.useLoaderData()
  const { countryPrefix } = Route.useRouteContext()
  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-2">
      <PageApp countryPrefix={countryPrefix} trafficSignData={trafficSignData} />
    </div>
  )
}

export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ search, context }) => {
    const signs = parseSignsParam(search.signs, context.countryPrefix)
    if (signs.length === 0) {
      return
    }

    const urlAnswers = parseAnswersParam(search.answers)
    const merged = mergeAnswersFromCache(urlAnswers, signs, readAnswersCache())
    const serialized = serializeAnswersParam(merged)

    if (!answersSearchEqual(serialized, search.answers)) {
      throw redirect({
        to: '.',
        replace: true,
        search: {
          ...search,
          answers: serialized,
        },
      })
    }
  },
  loader: ({ context }) => countryDefinitions[context.countryPrefix],
  validateSearch: deSearchSchema,
  head: ({ match }) => {
    const head = buildPageHead({ title: m.header_title() })
    if (hasDeSearchParams(match.search)) {
      return {
        ...head,
        links: [
          {
            rel: 'canonical',
            href: catalogueHomeUrl(match.params.lang as CountryPrefixType),
          },
        ],
      }
    }
    return head
  },
  component: LangIndexRouteComponent,
})
