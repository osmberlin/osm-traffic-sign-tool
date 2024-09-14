import { clsx } from 'clsx'

// We use NextJS font integration
// Docs https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#google-fonts
// Docs https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css

// FIRA MONO
//   Preview https://fonts.google.com/specimen/Fira+Code

import { Fira_Code } from 'next/font/google'
const fontFiraCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

// FIRA SANS SERIF
//   Preview https://fonts.google.com/specimen/Fira+Sans
// TW FontWeights: https://tailwindcss.com/docs/font-weight
// `font-thin`       `font-weight: 100`
// `font-extralight` `font-weight: 200`
// `font-light`      `font-weight: 300` // ACTIVE
// `font-normal`     `font-weight: 400` // ACTIVE
// `font-medium`     `font-weight: 500`
// `font-semibold`   `font-weight: 600` // ACTIVE
// `font-bold`       `font-weight: 700` // ACTIVE
// `font-extrabold`  `font-weight: 800`
// `font-black`      `font-weight: 900`

import { Fira_Sans } from 'next/font/google'
const fontFiraSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], // REMINDER: Also update the tailwind config
  style: ['normal'], // 'italic'
  variable: '--font-fira-sans',
})

// FIRA SANS EXTRA CONDENCED
//   Preview https://fonts.google.com/specimen/Fira+Sans+Extra+Condensed
//   Alternative https://fonts.google.com/specimen/Fira+Sans+Condensed

import { Fira_Sans_Extra_Condensed } from 'next/font/google'
const fontFiraCondensed = Fira_Sans_Extra_Condensed({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'], // 'italic'
  variable: '--font-fira-condensed',
})

// NOTO SERIF
//   Preview https://fonts.google.com/noto/specimen/Noto+Serif

import { Noto_Serif } from 'next/font/google'
const fontNotoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['300', '600'], // Was slightly to bold, so used one weight lower
  style: ['normal', 'italic'],
  variable: '--font-noto-serif',
})

// INTEGRATION

export const fontClasses = clsx(
  fontFiraCode.variable,
  fontFiraSans.variable,
  fontFiraCondensed.variable,
  fontNotoSerif.variable,
)
