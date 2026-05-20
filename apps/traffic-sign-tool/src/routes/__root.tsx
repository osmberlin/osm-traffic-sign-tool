import { Footer } from '@app/app/_components/layout/Footer'
import { Header } from '@app/app/_components/layout/Header'
import { TailwindResponsiveHelper } from '@app/app/_components/layout/TailwindResponsiveHelper'
import NotFound from '@app/app/not-found'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../../app/globals.css'

const RootLayout = () => {
  return (
    <div className="flex min-h-full w-full flex-none flex-col items-center bg-stone-800 text-base text-slate-800">
      <Header />
      <main className="w-full max-w-6xl px-2 md:mx-0 xl:mx-0">
        <Outlet />
      </main>
      <Footer />
      <TailwindResponsiveHelper />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})
