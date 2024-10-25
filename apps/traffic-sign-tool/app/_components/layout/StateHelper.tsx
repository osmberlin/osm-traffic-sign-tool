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
    <div className="border-xl absolute right-1 top-1 z-10 max-h-screen max-w-lg rounded bg-pink-300 px-1 py-0.5 text-xs shadow-xl open:top-1 open:overflow-scroll print:hidden">
      {Object.entries(state).map(([nameKey, stateValues]) => {
        return (
          <details key={nameKey} className="group">
            <summary className="cursor-pointer hover:underline">
              State<code className="group hidden group-open:inline"> {nameKey}</code>
            </summary>
            <pre>
              <code>{JSON.stringify(stateValues, undefined, 2)}</code>
            </pre>
          </details>
        )
      })}
    </div>
  )
}
