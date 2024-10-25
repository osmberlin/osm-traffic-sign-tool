'use client'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { TrashIcon } from '@heroicons/react/16/solid'
import { Bars4Icon } from '@heroicons/react/20/solid'
import { TrafficSignState } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { animate, MotionValue, Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  sign: TrafficSignState
}

const inputFormats = {
  integer: { type: 'number', steps: undefined },
  float: { type: 'number', steps: '0.1' },
  opening_hours: { type: 'text', steps: undefined },
  time_restriction: { type: 'text', steps: undefined },
}

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)'

export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false
    const onChange = (latest: number) => {
      const wasActive = isActive
      if (latest === 0) {
        isActive = false
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow)
        }
      } else {
        isActive = true
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)')
        }
      }
    }
    const unsubscribeOnChange = value.on('change', onChange)

    return () => {
      unsubscribeOnChange()
    }
  }, [value, boxShadow])

  return boxShadow
}

// Docs for Frame Motion Reorder https://www.framer.com/motion/reorder/
// Example https://codesandbox.io/p/sandbox/framer-motion-5-drag-to-reorder-lists-uonye?file=%2Fsrc%2FApp.tsx%3A12%2C1-13%2C1&from-embed
export const SelectedSign = ({ sign }: Props) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const controls = useDragControls()

  const { toggleOsmValuePart, updateSignValue } = useParamSigns()

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
          onMouseOut={() => setMoveHover(false)}
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
        onMouseOut={() => setMoveHover(false)}
        className={clsx(
          'flex w-full flex-col items-center justify-center py-2',
          moveHover ? 'cursor-move bg-stone-100' : '',
        )}
      >
        <div className="text-center leading-tight">
          <div className="mx-2 px-3">
            {'image' in sign && sign.image?.svgPath ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sign.image.svgPath}
                  alt={sign.name}
                  className="pointer-events-none inline h-auto max-h-24 w-full max-w-24"
                />

                {'valuePrompt' in sign &&
                  sign.signValue &&
                  sign.signValue !== sign.valuePrompt.defaultValue && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full -rotate-12 rounded bg-amber-100/95 px-3 pt-1 font-condensed text-2xl font-normal text-amber-900 shadow-sm">
                        {sign.signValue}
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex size-20 items-center justify-center rounded border border-stone-800 bg-stone-600 pt-1 text-stone-50">
                <code className="whitespace-nowrap tracking-tighter">{sign.signId}</code>
                <br />
              </div>
            )}

            {'name' in sign && sign.name && <h3 className="mt-1 w-full font-light">{sign.name}</h3>}

            {'descriptiveName' in sign && sign.descriptiveName && (
              <p>
                <strong className="hyphens-auto break-all">{sign.descriptiveName}</strong>
              </p>
            )}
          </div>

          {'valuePrompt' in sign && (
            <div className="mx-2 mt-2 rounded border border-stone-400/50 p-1 text-sm leading-tight">
              <label htmlFor={sign.osmValuePart} className="break-word hyphens-auto">
                {sign.valuePrompt.prompt}:
              </label>
              <input
                onChange={(event) => updateSignValue(sign.osmValuePart, event.target.value)}
                name={sign.osmValuePart}
                type={inputFormats[sign.valuePrompt.format].type ?? 'text'}
                step={inputFormats[sign.valuePrompt.format].steps ?? undefined}
                value={sign.signValue ?? sign.valuePrompt.defaultValue}
                className="block w-full rounded-md border-0 px-1 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
            </div>
          )}
        </div>
      </figure>
    </Reorder.Item>
  )
}
