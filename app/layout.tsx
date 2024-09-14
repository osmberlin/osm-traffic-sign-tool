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
      <body className="flex min-h-full w-full flex-none flex-col bg-stone-800 text-slate-800">
        <Header />
        <div className="mx-4 max-w-6xl self-center xl:mx-0">{children}</div>
        <Footer />

        <TailwindResponsiveHelper />
      </body>
    </html>
  )
}
