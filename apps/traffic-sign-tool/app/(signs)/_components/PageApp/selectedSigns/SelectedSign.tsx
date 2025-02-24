'use client'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { TrashIcon } from '@heroicons/react/16/solid'
import { Bars4Icon } from '@heroicons/react/20/solid'
import { SignStateType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { useState } from 'react'
import { SelectedSignImage } from './SelectedSignImage'
import { SelectedSignValuePrompt } from './SelectedSignValuePrompt'
import { useRaisedShadow } from './utils/useRaisedShadow'

type Props = {
  sign: SignStateType
}

// Docs for Frame Motion Reorder https://www.framer.com/motion/reorder/
// Example https://codesandbox.io/p/sandbox/framer-motion-5-drag-to-reorder-lists-uonye?file=%2Fsrc%2FApp.tsx%3A12%2C1-13%2C1&from-embed
export const SelectedSign = ({ sign }: Props) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const controls = useDragControls()

  const { toggleOsmValuePart } = useParamSigns()

  const [moveHover, setMoveHover] = useState(false)

  return (
    <Reorder.Item
      key={sign.osmValuePart}
      value={sign.osmValuePart}
      id={sign.osmValuePart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ boxShadow, y }}
      className="group/sign flex h-full w-full select-none items-start justify-start"
      dragListener={false}
      dragControls={controls}
    >
      <div className="flex flex-col">
        <button
          onPointerDown={(event) => controls.start(event)}
          onMouseOver={() => setMoveHover(true)}
          onFocus={() => setMoveHover(true)}
          onMouseOut={() => setMoveHover(false)}
          onBlur={() => setMoveHover(false)}
          className={clsx(
            'flex items-center justify-center px-1 py-3 text-stone-400 group-hover/sign:text-stone-900',
            moveHover ? 'cursor-move bg-stone-100' : '',
          )}
        >
          <Bars4Icon className="size-4" />
        </button>
        <button
          onClick={() => toggleOsmValuePart(sign.osmValuePart)}
          className={clsx(
            'flex items-center justify-center px-1 py-3 text-stone-400 group-hover/sign:text-stone-900',
            'hover:bg-stone-100',
          )}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
      <figure
        onPointerDown={(event) => controls.start(event)}
        onMouseOver={() => setMoveHover(true)}
        onFocus={() => setMoveHover(true)}
        onMouseOut={() => setMoveHover(false)}
        onBlur={() => setMoveHover(false)}
        className={clsx(
          'flex w-full flex-col items-center justify-center py-2',
          moveHover ? 'cursor-move bg-stone-100' : '',
        )}
      >
        <div className="text-center leading-tight">
          <SelectedSignImage sign={sign} />

          <SelectedSignValuePrompt sign={sign} />
        </div>
      </figure>
    </Reorder.Item>
  )
}
