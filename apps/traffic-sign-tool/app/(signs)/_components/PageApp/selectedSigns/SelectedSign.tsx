import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { TrashIcon } from '@heroicons/react/16/solid'
import { Bars4Icon } from '@heroicons/react/20/solid'
import { SignStateType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { useState, type PointerEvent } from 'react'
import { SelectedSignGraphic, SelectedSignLabels } from './SelectedSignImage'
import { SelectedSignValuePrompt } from './SelectedSignValuePrompt'
import { useRaisedShadow } from './utils/useRaisedShadow'

type Props = {
  sign: SignStateType
}

const dragSurfaceHighlight = (isDragging: boolean) => (isDragging ? 'cursor-move bg-stone-100' : '')

export const SelectedSign = ({ sign }: Props) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const controls = useDragControls()

  const { toggleOsmValuePart } = useParamSigns()

  const [isDragging, setIsDragging] = useState(false)

  const startDrag = (event: PointerEvent) => {
    setIsDragging(true)
    controls.start(event)
  }

  const startDragFromSignArea = (event: PointerEvent) => {
    const target = event.target
    if (target instanceof Element && target.closest('input, textarea, select')) {
      return
    }
    startDrag(event)
  }

  return (
    <Reorder.Item
      value={sign.osmValuePart}
      id={sign.osmValuePart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ boxShadow, y }}
      className="relative w-full select-none"
      dragListener={false}
      dragControls={controls}
      onDragEnd={() => setIsDragging(false)}
    >
      <div className="group/sign flex w-full min-w-0 items-start has-[[data-drag-surface]:focus-visible]:**:data-drag-surface:cursor-move has-[[data-drag-surface]:focus-visible]:**:data-drag-surface:bg-stone-100 has-[[data-drag-surface]:hover]:**:data-drag-surface:cursor-move has-[[data-drag-surface]:hover]:**:data-drag-surface:bg-stone-100">
        <div className="flex shrink-0 flex-col">
          <button
            type="button"
            data-drag-surface
            onPointerDown={startDrag}
            className={clsx(
              'flex touch-none items-center justify-center py-3 text-stone-400 group-hover/sign:text-stone-900 max-md:px-0 md:px-1',
              dragSurfaceHighlight(isDragging),
            )}
          >
            <Bars4Icon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleOsmValuePart(sign.osmValuePart)}
            className={clsx(
              'flex items-center justify-center py-3 text-stone-400 group-hover/sign:text-stone-900 max-md:px-0 md:px-1',
              'hover:bg-stone-100',
            )}
          >
            <TrashIcon className="size-4" />
          </button>
        </div>

        <div
          data-drag-surface
          onPointerDown={startDragFromSignArea}
          className={clsx(
            'flex min-w-0 flex-1 items-start gap-3 py-2 md:flex-col md:items-center',
            dragSurfaceHighlight(isDragging),
          )}
        >
          <figure className="relative flex h-20 w-20 shrink-0 items-center justify-center max-md:pl-3 md:h-auto md:w-full md:max-w-none md:p-0 md:pl-0">
            <div className="h-full w-full md:hidden">
              <SelectedSignGraphic sign={sign} compact />
            </div>
            <div className="hidden w-full px-1 md:block">
              <SelectedSignGraphic sign={sign} />
            </div>
          </figure>

          <div className="min-w-0 flex-1 leading-tight max-md:text-left md:w-full md:text-center">
            <SelectedSignLabels sign={sign} />
            <SelectedSignValuePrompt sign={sign} />
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}
