'use client'
import { isDev } from '../utils/isDev'

type Props = {
  state: Record<string, any>
}

export const StateHelper = ({ state }: Props) => {
  if (!isDev) {
    return null
  }

  return (
    <details className="border-xl fixed bottom-1 right-1 top-auto z-10 max-h-screen max-w-lg rounded bg-pink-300 px-1 py-2 text-xs shadow-xl open:top-1 open:overflow-scroll print:hidden">
      <summary className="cursor-pointer font-bold hover:underline">State </summary>
      {Object.entries(state).map(([nameKey, stateValues]) => {
        return (
          <details key={nameKey}>
            <summary className="cursor-pointer hover:underline">State {nameKey}</summary>
            <pre>
              <code>{JSON.stringify(stateValues, undefined, 2)}</code>
            </pre>
          </details>
        )
      })}
    </details>
  )
}
