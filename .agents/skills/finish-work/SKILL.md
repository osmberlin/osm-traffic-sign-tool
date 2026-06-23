---
name: finish-work
description: >-
  Run FMC pre-commit verification (bun run check, bun run format), fix failures,
  and draft commit messages. Use when finishing a task, wrapping up changes,
  preparing to commit, running checks/tests/lint/typecheck/e2e, or when the user
  asks to "finish work", "run checks", or "create a commit message".
---

# Finish work

Standard FMC workflow before committing. Run commands in the **project root** (or the package that owns the changed code in a monorepo).

## Checklist

```
- [ ] Step 1: bun run check
- [ ] Fix any failures; re-run until green
- [ ] Step 2: bun run format
- [ ] Re-run check if format changed files that affect lint/types/tests
- [ ] Draft commit message (see below)
- [ ] Commit only when the user explicitly asks
```

## Step 1: `bun run check`

Runs the project's aggregate verification script. In FMC apps this typically includes:

- **Typecheck** (`tsc --noEmit`, `tsgo`, or project equivalent)
- **Lint** (oxlint with `--deny-warnings`)
- **Unit tests** (`vitest run`, `test-run`, etc.)
- **Format check** (some repos use read-only `format-check` / `check-format` inside `check`)

`check` is defined per repo in `package.json` — read it if unsure what runs.

**E2E:** If Playwright/e2e is **not** part of `check` but the repo has a `e2e` script and the change touches UI, routes, or auth flows, run `bun run e2e` before finishing. Skill `playwright-skill` for setup and patterns.

On failure: fix the root cause, then re-run `bun run check`. Do not skip failing steps.

## Step 2: `bun run format`

Applies oxfmt (or project formatter) with write mode. Fixes import/class sorting and style.

- Run **after** `check` so lint/type fixes are in place first.
- If `check` already runs `format` in write mode, still run `bun run format` as the final pass — it catches anything check missed or that edits introduced mid-fix.

Stage formatting-only changes together with the functional changes they belong to.

## Commit message

Draft when checks pass. **Do not commit** unless the user explicitly requests it.

### Subject

```
<Topic>: <Desc>
```

- **Topic** — area or scope (`Map`, `Auth`, `Processing`, `Deps`, …). Match repo conventions when obvious from the diff.
- **Desc** — imperative, concise summary of the outcome (not a list of files).

### Body

Bullet list of meaningful changes (behavior, not file names):

```
- Add viewport clamping for region bounds
- Fix stale loader cache after logout
- Update oxlint config for compat plugin
```

### PR / issue ping

If the user mentioned a GitHub PR or issue in the conversation, add a **Ping** line in the body with the full URL:

```
Ping https://github.com/FixMyBerlin/tilda-geo/pull/1234
```

Use the exact URL from context (PR or issue). One Ping line per referenced item.

### Example

```
Region map: clamp initial viewport to bounds

- Derive max bounds from region GeoJSON before fitBounds
- Skip clamp when URL already has explicit zoom
Ping https://github.com/FixMyBerlin/tilda-geo/issues/5678
```

## Monorepos

Run `check` / `format` in each package you changed (`app/`, `processing/`, etc.) when scripts live per package. Prefer the same order: check → format per package.

## Related

- Oxlint/oxfmt setup: skill `tech-stack` → [oxc-config.md](../tech-stack/references/oxc-config.md)
- E2E: skill `playwright-skill`
- Dependabot merge follow-up: skill `babysit`
