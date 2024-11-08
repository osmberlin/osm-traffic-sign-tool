'use client'
import { SignStateType } from '@osm-traffic-signs/converter'

type Props = { sign: SignStateType }

export const SelectedSignImage = ({ sign }: Props) => {
  return (
    <div className="mx-2 px-3">
      {'image' in sign && sign.image?.svgPath ? (
        <div className="relative mx-auto max-w-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sign.image.svgPath}
            alt={sign.name}
            className="pointer-events-none inline h-auto max-h-24 w-full max-w-24"
          />

          {sign.signValue &&
            sign.valuePrompt &&
            sign.signValue !== sign.valuePrompt.defaultValue && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-condensed w-full -rotate-12 rounded bg-amber-100/95 px-3 pt-1 text-center text-4xl font-normal text-amber-900 shadow-sm">
                  {sign.signValue}
                </div>
              </div>
            )}
        </div>
      ) : (
        <div className="mx-auto flex size-20 items-center justify-center rounded border border-stone-800 bg-stone-600 pt-1 text-stone-50">
          <code className="whitespace-nowrap tracking-tighter">{sign.signId}</code>
          <br />
        </div>
      )}

      {'name' in sign && sign.name && <h3 className="mt-1 w-full font-light">{sign.name}</h3>}

      {'descriptiveName' in sign && sign.descriptiveName && (
        <div>
          <>{sign.descriptiveName}</>
        </div>
      )}
    </div>
  )
}
