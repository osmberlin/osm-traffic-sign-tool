# Agent notes

Catalogue and QA work: see the skills in `.agents/skills/` and [`.github/QA_ISSUES.md`](.github/QA_ISSUES.md).

## Releases and changesets

- Every commit that changes a package adds a changeset, see [.changeset/README.md](.changeset/README.md).
- Tobias asks for a release. Then run `bun run release` in a terminal tab, on a clean and pushed `main`. It stops for his npm 2FA, one approval covers the run.
- `bun run release --dry-run` shows what would be released and changes nothing.
- Never run `npm publish` in a package folder, and never remove packages from npm.
- `scripts/release.ts` is a copy. Change it in [osm-editor-kit/.github](https://github.com/osm-editor-kit/.github/tree/main/release) and copy it to every repository.
- The published SVGs of `@osm-traffic-signs/converter` live in `packages/internal_svgs/src/data-svgs`. A change there needs a changeset for `@osm-traffic-signs/converter`.
