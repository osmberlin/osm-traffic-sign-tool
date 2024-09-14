# Selecting a font (2024-09-14)

- I am looking for a font that looks like the font on traffic signs.
- Overpass is something like this, but it has a weird line height which makes it look of whenever I center text vertically.

- Roadgeek 2014, https://github.com/sammdot/roadgeek-fonts looks promising.

  - Download is at https://github.com/sammdot/roadgeek-fonts/releases
  - But it's not maintained anymore
  - Licence is not very clear
  - One can create a web font with https://www.fontsquirrel.com/tools/webfont-generator
  - But who knows how well that font was created by todays standards

- Fonts for signs per Country…

  - A good intro is at https://github.com/sammdot/roadgeek-fonts?tab=readme-ov-file#typefaces
    > **FHWA Series (aka Highway Gothic)** - used in the United States, Canada, Mexico, Australia, New Zealand, Malaysia and Taiwan. Available in 7 series: B, C, D, E, EM (E modified), EEM (Enhanced E modified), F. EM is E but with looser spacing and thicker strokes to accommodate reflective buttons; because the buttons are no longer widely used EEM undoes the thicker strokes but keeps the looser spacing.
    > **Clearview** - used in some parts of the United States and Indonesia, designed as a replacement of the FHWA Series typefaces. Available in 13 series: 1B through 6B for negative contrast (dark on light) signs, 1W through 6W and 5WR for positive contrast (light on dark) signs. 5WR is just 5W with tighter spacing.
    > **DIN 1451** - German sign typeface. Available in 2 series: Engschrift and Mittelschrift
    > **Transport** - UK sign typeface. Available in 2 weights: Medium for positive contrast signs and Heavy for negative contrast signs
    > **Motorway** - UK sign typeface, but only for route numbers on motorway signs. Available in 2 weights: Permanent for positive contrast signs and Temporary for negative contrast signs.
    > **Clarendon** - used by the US National Park Service
    > **Rawlinson** - a replacement for Clarendon

- DIN 1451 is the reference for Germany

  - https://de.wikipedia.org/wiki/DIN_1451
  - There are multipe other type faces based on that but they are all commercial.

- Noto Sans and Fira Sans

  - Similar to DIN…
    https://fonts.google.com/?query=DIN shows two fonts that show promise:
    Noto Sans and Fira Sans
  - They are current type faces with many features, which makes them a good pick

- Noto Sans

  - https://fontsource.org/?query=noto
  - `+` Noto Sans has a good Sign-like look
  - `+` Noto Serif looks great for quotes and comment style text
  - `+` They are Variable fonts, so very customizable

- Fira Sans

  - https://fontsource.org/?query=fira
  - `+` Fira Sans has a lot more character
  - `+` Fira Mono looks great – but I take Fira Code which seems to be an exteded Fira Mono
  - `+` Fira Sans Extra Condensed looks great and might be very usefull for when there is litte room in the UI
  - `-` No Serif

- Note on Fontsource
  I like this project, but on https://fontsource.org/docs/guides/nextjs they say to use the build in NextJS feature unless something else is needed…
