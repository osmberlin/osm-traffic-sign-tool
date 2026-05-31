import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { parseSignsParam } from '@app/src/features/searchParams/deSearch'
import { BugAntIcon } from '@heroicons/react/16/solid'
import { useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'

type Props = {
  linkClassName: string
}

export const ResultDebug = ({ linkClassName }: Props) => {
  const countryPrefix = useCurrentLang()
  const catalogueLang = useCatalogueHtmlLang()
  const search = useRouterState({ select: (state) => state.location.search })
  const paramSigns = parseSignsParam(
    typeof search === 'object' && search !== null && 'signs' in search
      ? (search as { signs?: string }).signs
      : undefined,
    countryPrefix,
  )

  if (paramSigns.length === 0) {
    return null
  }

  return (
    <div className="-mx-5 -my-2 flex flex-wrap justify-center">
      <div className="px-5 py-2">
        <details className="group">
          <summary
            className={clsx(
              linkClassName,
              'inline-flex cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden',
            )}
          >
            <BugAntIcon className="size-3 shrink-0" aria-hidden />
            {m.debug_source_data()}
          </summary>
          <div className="mt-4 max-w-3xl text-left text-base text-stone-400">
            <p className="mb-4 text-center">{m.debug_help()}</p>
            <div className="space-y-2">
              {paramSigns.map((sign) => (
                <details key={sign.signId} className="rounded-sm border border-stone-700/50">
                  <summary
                    className={clsx(
                      linkClassName,
                      'flex cursor-pointer list-none px-3 py-2 text-left [&::-webkit-details-marker]:hidden',
                    )}
                  >
                    {m.debug_raw_for()} <code>{sign.signId}</code>
                  </summary>
                  <div className="border-t border-stone-700/50 px-3 py-2" lang={catalogueLang}>
                    <p>
                      <strong>{sign.osmValuePart}</strong>
                    </p>
                    <p>{sign.descriptiveName}</p>
                    <pre className="mt-4 overflow-x-auto text-xs leading-snug tracking-tight text-stone-300">
                      <code>{JSON.stringify(sign, undefined, 2)}</code>
                    </pre>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
