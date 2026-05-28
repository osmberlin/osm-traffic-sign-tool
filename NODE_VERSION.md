# How the node and Bun versions are set up

**Node version is specified in…**

- `./.nvmrc` — used by GitHub Actions (`setup-node`) and local `nvm use`
- `./package.json` `engines.node` — documents the minimum Node version (>=22.21.1)

**Bun version is specified in…**

- `./package.json` `packageManager` — e.g. `bun@1.3.13`; used by `oven-sh/setup-bun` in CI

**Which value to use**

Use an explicit semver (e.g. `22.21.1`), not `lts/*` ([Node version names](https://nodejs.org/en/about/previous-releases)).

The best way to get the Node version string is `node -v` and remove the leading `v`.

**Links**

- [Bun install docs](https://bun.com/docs/pm/cli/install)
- [setup-node cache for Bun](https://github.com/actions/setup-node)
