import * as m from '@app/paraglide/messages'
import { ResultColumn } from './PageApp/ResultColumn'
import { SelectedSignsColumn } from './PageApp/SelectedSignsColumn'
import { FocusFilterRow } from './PageApp/signGroups/FocusFilterRow'
import { SignSelectionColumn } from './PageApp/SignSelectionColumn'
import { PageProps } from './types'

const columnSectionPadding = 'px-4 py-4 md:px-3'
const resultSectionPadding = 'px-4 py-3 md:px-3 md:py-4'

export const PageApp = ({ trafficSignData }: PageProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <FocusFilterRow />
      <article className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_12rem_18rem] md:items-stretch md:gap-2 lg:grid-cols-[minmax(0,1fr)_15rem_24rem] xl:gap-4">
        <section
          className={`@container/sign-selection relative order-3 min-w-0 rounded-sm bg-stone-300 md:order-1 ${columnSectionPadding}`}
        >
          <SignSelectionColumn trafficSignData={trafficSignData} />
        </section>
        <section className="relative order-2 min-w-0 rounded-sm bg-stone-300 py-4 md:order-2">
          <h2 className="mb-4 text-center text-lg font-light uppercase">
            <span className="max-md:inline md:hidden lg:inline">{m.page_selected_signs()}</span>
            <span className="hidden md:inline lg:hidden">{m.page_selected_signs_short()}</span>
          </h2>
          <SelectedSignsColumn />
        </section>
        <section
          className={`relative order-1 min-w-0 rounded-sm border border-stone-500/50 bg-stone-900 text-stone-100 max-md:min-h-0 max-md:self-start md:order-3 md:self-stretch md:border-0 ${resultSectionPadding}`}
        >
          <ResultColumn />
        </section>
      </article>
    </div>
  )
}
