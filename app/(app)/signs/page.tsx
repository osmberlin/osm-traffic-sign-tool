'use client'
import { ExternalLink } from '@/app/_components/links/ExternalLink'
import { useSignStoreSigns } from '@/app/_store/useSignStore.zustand'
import { clsx } from 'clsx'
import Image from 'next/image'
import trafficSignsWiki from '../../../data/wiki/parseWiki/trafficSignsWiki.json'

export default function SignsPage() {
  const signStore = useSignStoreSigns()

  return (
    <main className="rounded bg-stone-300 px-6 py-4">
      <h2 className="my-4 flex items-center gap-3 text-3xl font-light uppercase text-black">
        All signs {signStore.length}
      </h2>
      <p>
        This page is to understand, debug and improve the trafficSigns object that is the source of
        data for this app.{' '}
        <ExternalLink href="https://github.com/osmberlin/osm-traffic-sign-tool/issues/2" blank>
          Learn more…
        </ExternalLink>
      </p>

      <table className="mt-10 min-w-full">
        <thead className="border-b-2 border-violet-300">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900 sm:pl-6 md:pl-0"
            >
              Sign key
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
              Sign data from this app
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
              Sign data parsed from the wiki
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-violet-200">
          {signStore.map((sign) => {
            return (
              <tr key={sign.key} className={clsx(sign?.image?.svgPath ? '' : 'bg-amber-300')}>
                <th className="space-y-3 py-4 pl-4 pr-3 text-center text-sm text-stone-900 sm:pl-6 md:pl-0">
                  <code>{sign.urlKey}</code>
                  <br />

                  {sign?.image?.svgPath ? (
                    <Image
                      height={100}
                      width={100}
                      src={sign.image.svgPath}
                      alt={sign.name}
                      className="inline-block h-auto w-10"
                    />
                  ) : (
                    <span className="inline-block text-amber-700">Missing</span>
                  )}
                </th>
                <td className="px-3 py-4 text-xs text-stone-500">
                  <pre className="w-96 overflow-scroll">
                    {JSON.stringify(
                      sign,
                      (key, value) => {
                        if (key === 'wikiData') return undefined // Remove the key from the output
                        return value
                      },
                      2,
                    )}
                  </pre>
                </td>
                <td className="px-3 py-4 text-xs text-stone-500">
                  <pre className="w-96 overflow-scroll">
                    {JSON.stringify(
                      trafficSignsWiki.find((wikiSign) => wikiSign.sign === sign.urlKey),
                      undefined,
                      2,
                    )}
                  </pre>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
