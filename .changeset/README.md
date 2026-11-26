# Changesets

Agents write the changeset of a change. Do not use the interactive `bunx changeset`.

Add `.changeset/<descriptive-name>.md` in the same commit as the code:

```md
---
"@osm-traffic-signs/<package>": patch
---

What people who use the package get, not which files changed.
```

- `patch` for fixes, `minor` for new features, `major` for breaking changes. A `major` names every removed export and its replacement.
- Write the text as plain sentences, without a leading `- `: the changelog already makes each changeset one list item.
- List every changed package, one line each, in quotes.
- A change without anything to release, such as tests or docs, gets an empty changeset: only the two `---` lines.

The pre-push hook runs `bunx changeset status --since=origin/main` and stops a push without a changeset.

Changesets add up on `main` until the next release. See [Release](../README.md#release).
