'use client'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { ResultComments } from './PageApp/results/ResultComments'
import { ResultTagRecommendations } from './PageApp/results/ResultTagRecommendations'
import { ResultTrafficSignTag } from './PageApp/results/ResultTrafficSignTag'

export const ResultColumn = () => {
  const { paramSigns } = useParamSigns()

  if (!paramSigns.length) {
    return (
      <>
        <h2 className="mb-4 text-lg font-light uppercase">Recommended Tags</h2>
        <p className="font-light text-stone-400">
          Select a traffic sign to display recommended tags …
        </p>
      </>
    )
  }

  return (
    <>
      <ResultTrafficSignTag />
      <ResultTagRecommendations />
      <ResultComments />
    </>
  )
}
