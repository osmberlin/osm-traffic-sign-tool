import { isDev } from '../utils/isDev'

type Props = {
  state: any
}

export const StateHelper = ({ state }: Props) => {
  if (!isDev) {
    return null
  }

  return (
    <details className="border-xl fixed bottom-1 right-1 top-auto z-10 max-h-screen max-w-lg rounded bg-pink-300 px-1 py-2 text-xs shadow-xl open:top-1 open:overflow-scroll print:hidden">
      <summary className="cursor-pointer hover:underline">State</summary>
      <pre>
        <code>{JSON.stringify(state, undefined, 2)}</code>
      </pre>
    </details>
  )
}
