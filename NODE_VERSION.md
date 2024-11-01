# How the node version is set up

It looks like there is no standard on how to define the node version on pnpm + github action.
This is the setup we use for now

**Node version is specified in…**

- `./package.json` as `engines` for ??
- `./.npmrc` as `use-node-version` for pnpm
- `./.nvmrc` for github actions

**Node version is inverred in…**

- Github actions

**Which value …**

It looks like pnpm requires a explict version.
So no way to just say `lts/Jod` ([Node version names](https://nodejs.org/en/about/previous-releases)).

> The correct syntax for stable release is strictly X.Y.Z or release/X.Y.Z

The best way to get the version string is to use `node -v` and remove the `v`.

**A few links…**

- pnpm does not read `nvmrc` https://github.com/pnpm/pnpm/issues/4471
  - docs https://pnpm.io/npmrc#use-node-version
- github actions does not read `pnpmrc` https://github.com/actions/setup-node/issues/1130
  - and seems to not cache things https://github.com/pnpm/action-setup/issues/70
