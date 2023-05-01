# OSM Traffic Sign Tool 2.0 – Alpha version

- A webapp to match traffic signs to OpenStreetMap tags
- PLANNED: An npm package to display validations and images based on tags and traffic_sign tag

https://trafficsigns.osm-verkehrswende.org

## Aplpha version & Roadmap

Have a look at the github projects board and github issues for a roadmap.

This project is in alpha stage. The main goal is to provide modern version of http://osmtools.de/traffic_signs/. The first focus will be on German traffic signs. Follow up milestones might include an NPM package so other apps can rely on the data and a refactoring to support other countries. But first, there are quite a few features for the original app that are still missing.

## Development

This is a [Svelte Kit App](https://kit.svelte.dev/) run as [an SPA](https://kit.svelte.dev/docs/glossary#spa).

```bash
nvm use
npm install
npm run dev -- --open
```

- Svelte Kit handles routing; we use Typesript with `<script lang="ts">`
- TODO: [Vitest](https://vitest.dev),
  and [Playwright](https://playwright.dev) are ready to be used for tests
- Tailwind CSS and Heroicon for styling – TODO: UI Library
- Prettier, ESLint, Editorconfig for code formatting based on Svelte standards
- Husky runs our checks on push. Use `git push --no-verify` to force-skip them.
- Deployment using Github pages
- Run `npm run` to see a list of available helper scripts

Test your work: Use `check` and `build`

```bash
npm run check
npm run build # and npm run preview
```

## Licence & Thanks

Huge thank you to http://osmtools.de/traffic_signs/ for his great tool. The initial data structure, logic and design is heavily inspired by it.

- Application code: [MIT License](./LICENSE)
- SVG Traffic Signs: See [data/trafficSigns](./src/data/trafficSigns.ts)
