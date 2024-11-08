# About

This folder is managed by `@changesets/cli`

Run `pnpm changeset` to add changes.

Learn more

- https://github.com/changesets/changesets
- https://github.com/changesets/changesets/blob/main/docs/common-questions.md

Thanks to See https://www.totaltypescript.com/how-to-create-an-npm-package#9-publishing-with-changesets

## Status quo

This only handles this one package.

[The app Changelog](apps/traffic-sign-tool/CHANGELOG.md) is managed manually, due to issues while setting up the changeset tooling as part of the Monorepo.

The issue is … which might relate to https://github.com/changesets/changesets/discussions/1158 but might also be a missconfiguration.

> 🦋 error The package "osm-traffic-sign-tool" depends on the skipped package "@internal/taginfo" (either by `ignore` option or by `privatePackages.version`), but "osm-traffic-sign-tool" is not being skipped. Please pass "osm-traffic-sign-tool" to the `--ignore` flag.
