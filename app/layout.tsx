import { clsx } from 'clsx'
import type { Metadata } from 'next'
import { Overpass, Overpass_Mono } from 'next/font/google'
import { Footer } from './_components/layout/Footer'
import { Header } from './_components/layout/Header'
import { TailwindResponsiveHelper } from './_components/layout/TailwindResponsiveHelper'
import './globals.css'

const overpass = Overpass({ subsets: ['latin'], display: 'swap', variable: '--font-overpass' })
const overpassMono = Overpass_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-overpass-mono',
})

export const metadata: Metadata = {
  title: 'OSM Traffic Sign Tool 2.1',
  description: 'Generate OpenStreetMap tagging recommendations based from traffic signs.',
}

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(overpass.variable, overpassMono.variable, 'h-full')}>
      <body className="flex min-h-full w-full flex-none flex-col bg-stone-800 text-slate-800">
        <Header />
        <div className="mx-4 max-w-6xl self-center xl:mx-0">{children}</div>
        <Footer />

        <TailwindResponsiveHelper />
      </body>
    </html>
  )
}
