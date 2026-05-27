import { FloatingLanguageSwitcher } from '@app/app/_components/i18n/FloatingLanguageSwitcher'
import { useUiLocale } from '@app/app/_components/i18n/useUiLocale'
import { Footer } from '@app/app/_components/layout/Footer'
import { Header } from '@app/app/_components/layout/Header'
import { TailwindResponsiveHelper } from '@app/app/_components/layout/TailwindResponsiveHelper'
import NotFound from '@app/app/not-found'
import * as m from '@app/paraglide/messages'
import { buildPageHead } from '@app/src/features/seo/seoHead'
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import '../../app/globals.css'

const RootLayout = () => {
  const uiLocale = useUiLocale()

  return (
    <>
      <HeadContent />
      <div
        // Remount app shell so Paraglide `m.xxx()` re-runs (Compiler + external locale store).
        key={uiLocale}
        lang={uiLocale}
        className="flex min-h-screen w-full flex-none flex-col items-center bg-stone-800 text-base text-slate-800"
      >
        <FloatingLanguageSwitcher />
        <Header />
        <main className="w-full min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
        <TailwindResponsiveHelper />
      </div>
    </>
  )
}

export const Route = createRootRoute({
  head: () => buildPageHead({ title: m.header_title() }),
  component: RootLayout,
  notFoundComponent: NotFound,
})
