# OSM Traffic Sign Tool 2.0 – Beta version

- A webapp to match traffic signs to OpenStreetMap tags
- PLANNED: An npm package to display validations and images based on tags and traffic_sign tag

https://trafficsigns.osm-verkehrswende.org

> [!IMPORTANT]
> **I consider this project "as is" and dormant for now**.
> Please read the **["Status of this project" issue](https://github.com/osmberlin/osm-traffic-sign-tool/issues/40)** to learn more …

## Development

This is a [Svelte Kit App](https://kit.svelte.dev/) run as [a SPA](https://kit.svelte.dev/docs/glossary#spa).

```bash
nvm use
npm install
npm run dev -- --open
```

- Svelte Kit handles routing; we use Typesript with `<script lang="ts">`
- [Vitest](https://vitest.dev),
  and [Playwright](https://playwright.dev) are ready to be used for tests
- Tailwind CSS for styling
- [tabler icons](https://github.com/tabler/tabler-icons#svelte) as icon library — [Icon Preview](https://tabler-icons.io/)
- Prettier, ESLint, Editorconfig for code formatting based on Svelte standards
- Husky runs our checks on push. Use `git push --no-verify` to force-skip them.
- Deployment using Github pages with `npm run deploy`
- Run `npm run` to see a list of available helper scripts

Test your work: Use `check` and `build`

```bash
npm run check
npm run build # and npm run preview
```

## Licence & Thanks

Huge thank you to https://osmtools.de/traffic_signs/ for his great tool. The initial data structure, logic and design is heavily inspired by it.

- Application code: [MIT License](./LICENSE)
- SVG Traffic Signs: See [data/trafficSigns](./src/data/trafficSigns.ts)
