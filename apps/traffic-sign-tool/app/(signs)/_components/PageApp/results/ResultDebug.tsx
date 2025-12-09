'use client'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { BugAntIcon } from '@heroicons/react/16/solid'

export const ResultDebug = () => {
  const { paramSigns } = useParamSigns()

  return (
    <details className="group mt-40 space-y-2">
      <summary className="flex cursor-pointer items-center gap-2 text-lg font-light text-stone-500 uppercase underline-offset-2 group-open:text-white hover:text-white hover:underline">
        <BugAntIcon className="size-3" /> Source data
      </summary>
      <p>This section is to help debug the tool.</p>
      <div className="rounded-sm bg-white/20">
        {paramSigns.map((sign) => {
          return (
            <details key={sign.signId} className="rounded-sm p-5">
              <summary className="flex cursor-pointer items-center gap-2 underline-offset-2 hover:underline">
                Raw data for <code>{sign.signId}</code>
              </summary>
              <div className="rounded-sm bg-white/20 p-2">
                <p>
                  <strong>{sign.osmValuePart}</strong>
                </p>
                <p>{sign.descriptiveName}</p>
                <pre className="mt-5 text-xs leading-snug tracking-tight">
                  <code>{JSON.stringify(sign, undefined, 2)}</code>
                </pre>
              </div>
            </details>
          )
        })}
      </div>
    </details>
  )
}
