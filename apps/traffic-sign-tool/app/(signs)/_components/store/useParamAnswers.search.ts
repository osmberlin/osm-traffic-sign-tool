import { serializeAnswersParam } from '@app/src/features/searchParams/answersParam'
import {
  mergeAnswersFromCache,
  resolveMergedAnswers,
  writeAnswersCache,
} from '@app/src/features/searchParams/answersStorage'
import { parseSignsParam } from '@app/src/features/searchParams/deSearch'
import type { QuestionAnswersBySign } from '@osm-traffic-signs/converter'
import {
  dedupeEquivalentAnswersForUrl,
  syncEquivalentQuestionAnswers,
} from '@osm-traffic-signs/converter'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCountryPrefix } from './CountryPrefixContext'

export const useParamAnswers = () => {
  const { countryPrefix } = useCountryPrefix()
  const navigate = useNavigate({ from: '/$lang' })
  const search = useSearch({ from: '/$lang' })
  const paramSigns = parseSignsParam(search.signs, countryPrefix)
  const paramAnswers = resolveMergedAnswers(countryPrefix, paramSigns, search.answers)

  const setParamAnswers = (
    value: QuestionAnswersBySign | ((prevValue: QuestionAnswersBySign) => QuestionAnswersBySign),
  ) => {
    void navigate({
      replace: true,
      resetScroll: false,
      search: (prev) => {
        const prevSigns = parseSignsParam(prev.signs, countryPrefix)
        const prevAnswers = resolveMergedAnswers(countryPrefix, prevSigns, prev.answers)
        const nextAnswers = typeof value === 'function' ? value(prevAnswers) : value
        const synced = syncEquivalentQuestionAnswers(nextAnswers, prevSigns)
        const pruned = dedupeEquivalentAnswersForUrl(
          mergeAnswersFromCache(synced, prevSigns, {}),
          prevSigns,
        )

        writeAnswersCache(countryPrefix, pruned)

        return {
          ...prev,
          answers: serializeAnswersParam(pruned),
        }
      },
    })
  }

  const updateAnswer = (
    signOsmValueParts: string | string[],
    questionId: string,
    answerId: string,
  ) => {
    const signKeys = Array.isArray(signOsmValueParts) ? signOsmValueParts : [signOsmValueParts]

    setParamAnswers((prevAnswers) => {
      const nextAnswers = { ...prevAnswers }

      for (const signOsmValuePart of signKeys) {
        nextAnswers[signOsmValuePart] = {
          ...(nextAnswers[signOsmValuePart] ?? {}),
          [questionId]: answerId,
        }
      }

      return nextAnswers
    })
  }

  return {
    paramAnswers,
    setParamAnswers,
    updateAnswer,
  }
}
