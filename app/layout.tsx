import type { Metadata } from 'next'
import { Overpass } from 'next/font/google'
import './globals.css'
import { Header } from './_components/layout/Header'
import { Footer } from './_components/layout/Footer'
import { TailwindResponsiveHelper } from './_components/layout/TailwindResponsiveHelper'

const inter = Overpass({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OSM Traffic Sign Tool 2.1',
  description: 'Generate OpenStreetMap tagging recommendations based from traffic signs.',
}

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="mx-4 max-w-6xl self-center xl:mx-0">{children}</div>
        <Footer />

        <TailwindResponsiveHelper />
      </body>
    </html>
  )
}
