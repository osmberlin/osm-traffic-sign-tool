import { clsx } from 'clsx'
import type { Metadata } from 'next'
import { fontClasses } from './_components/layout/fonts/fonts'
import { Footer } from './_components/layout/Footer'
import { Header } from './_components/layout/Header'
import { TailwindResponsiveHelper } from './_components/layout/TailwindResponsiveHelper'
import './globals.css'

export const metadata: Metadata = {
  title: 'OSM Traffic Sign Tool 2',
  description: 'Generate OpenStreetMap tagging recommendations based from traffic signs.',
}

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(fontClasses, 'h-full')}>
      <body className="flex min-h-full w-full flex-none flex-col items-center bg-stone-800 text-base text-slate-800">
        <Header />
        <main className="w-full max-w-6xl px-2 md:mx-0 xl:mx-0">{children}</main>
        <Footer />

        <TailwindResponsiveHelper />
      </body>
    </html>
  )
}
