'use client'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { ResultComments } from './results/ResultComments'
import { ResultTagRecommendations } from './results/ResultTagRecommendations'
import { ResultTrafficSignTag } from './results/ResultTrafficSignTag'

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
