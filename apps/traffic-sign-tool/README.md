# OSM Traffic Sign Tool 2 – Beta

- A webapp to match traffic signs to OpenStreetMap tags
  [trafficsigns.osm-verkehrswende.org](https://trafficsigns.osm-verkehrswende.org)

- A npm package transform OSM traffic sign values to traffic sign object (and more)
  [npmjs.com/package/@osm-traffic-signs/converter](https://www.npmjs.com/package/@osm-traffic-signs/converter)

### Project status

- See https://github.com/osmberlin/osm-traffic-sign-tool/issues/40

### Design decisions

- The tool gives recommendations; mappers still have to verify.
- If a sign has multiple values / spellings recommend one and rewrite the result accordingly.
- The tool recommends the official ID for most signs that are listed in the law.
- The tool recommends the ID plus bracked notation for less common signs that are mentioned in the law with an undefined list IDs.
  See [countryAlternativeKeyFormats.ts](./packages/traffic-sign-converter/src/data-definitions/countryAlternativeKeyFormats.ts) for more.
- Unknown signs are listed in the UI and `traffic_sign` value but they are not part of the tagging recommendations.
- To generate tag recommendations signs are first split in groups of primary and modifier signs. Modifications are applied per group.
- Only the latest ID of a sign is knows. Signs IDs that where reassigned in the past are not handled in a special way.

Limitations:

- Using more than one modifying sign will result in imprecise tagging recommendations.
- See Github Issues for more.

## Development

```bash
nvm use
bun install
bun run dev
```

- Bun workspaces (monorepo orchestration via `bun run --filter`)
- Framework: [Vite](https://vite.dev/) + [TanStack Router](https://tanstack.com/router)
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
bun run check
bun run build # and bun run preview
```

## Deployment

Collect changes below `## Unreleased` in the [CHANGELOG](./CHANGELOG.md). The release script bumps the version, moves these entries to the new version, commits and tags; pushing the tag deploys the app.

```bash
bun run release                               # interactive
bun run release --app --patch --yes --push    # no prompts
bun run release --package --minor --dry-run   # build, check and `npm publish --dry-run`, then undo
```

The package releases (`--package` for the converter, `--id-field` for the iD field) publish to npm and need `npm login` first. With 2FA, npm asks for the one-time password, or pass `--otp=<code>`. Release the converter first when the iD field needs its changes.

## Licence & Thanks

Huge thank you to https://osmtools.de/traffic_signs/ for his great tool. The initial data structure, logic and design is heavily inspired by it.

- Application code: [MIT License](./LICENSE)
- SVG Traffic Signs: See [data/trafficSigns](./src/data/trafficSigns.ts)
