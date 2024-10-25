'use client'
import { StateHelper } from '@app/app/_components/layout/StateHelper'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { Reorder } from 'framer-motion'
import { SelectedSign } from './selectedSigns/SelectedSign'

export const SelectedSignsColumn = () => {
  const { paramSigns, setParamSigns } = useParamSigns()

  const paramSignValueList = paramSigns.map((sign) => sign.osmValuePart)
  const updateParamSigns = (list: string[]) => {
    const newOrder = list
      .map((item) => paramSigns.find((sign) => sign.osmValuePart === item))
      .filter(Boolean)
    setParamSigns(newOrder)
  }

  return (
    <>
      <Reorder.Group
        axis="y"
        values={paramSignValueList}
        onReorder={updateParamSigns}
        className="text-base"
      >
        {paramSignValueList.map((item) => {
          const sign = paramSigns.find((sign) => sign.osmValuePart === item)!
          return <SelectedSign key={item} sign={sign} />
        })}
        {/*
        // Has weird side effects with changing the value of a sign which counts as delete+readd
        <AnimatePresence></AnimatePresence>
         */}
      </Reorder.Group>

      <StateHelper state={{ paramSigns }} />
    </>
  )
}
