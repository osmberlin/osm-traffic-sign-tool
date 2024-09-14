# OSM Traffic Sign Tool 2 – Beta

- A webapp to match traffic signs to OpenStreetMap tags
- PLANNED: An npm package to display validations and images based on tags and traffic_sign tag

https://trafficsigns.osm-verkehrswende.org

### Project status

- See https://github.com/osmberlin/osm-traffic-sign-tool/issues/40

## Development

```bash
nvm use
npm install
npm run dev
```

- Framework: [NexJS](https://nextjs.org/)
- Internal States: [Zustand](https://github.com/pmndrs/zustand)
- External States (URL): [NUQS](https://nuqs.47ng.com/)
- Testing: [Vitest](https://vitest.dev)
- CSS: [Tailwind CSS](https://tailwindcss.com/)
- Components: [Tailwind UI](https://tailwindui.com/), [Tailwind UI Catalyst](https://tailwindui.com/templates/catalyst), [Headless UI](https://headlessui.com/)
- Icons: [Heroicons](https://heroicons.com/)
- Prettier, ESLint, Editorconfig for code formatting based on Svelte standards
- [Husky](https://github.com/typicode/husky) runs our checks on push. Use `git push --no-verify` to force-skip them.

Test your work: Use `check` and `build`

```bash
npm run check
npm run build # and npm run preview
```

## Deployment

Our custom script will automatically increase the `prepatch` version.

Remember to update the [CHANGELOG](./CHANGELOG.md).

```bash
npm run deploy
```

## Licence & Thanks

Huge thank you to https://osmtools.de/traffic_signs/ for his great tool. The initial data structure, logic and design is heavily inspired by it.

- Application code: [MIT License](./LICENSE)
- SVG Traffic Signs: See [data/trafficSigns](./src/data/trafficSigns.ts)
