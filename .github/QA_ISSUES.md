# QA pages → GitHub issues → agent session

The maintainer QA pages of the Traffic Sign Tool open pre-filled GitHub issues. Nothing runs
automatically when an issue is opened. A maintainer starts an agent session (e.g. Claude Code)
in this repo and asks it to work on the open QA issues; the session opens one PR per issue.

## Flow

1. Review signs on a QA page and click **Create GitHub issue**. The tool fills in title and body.
2. Start an agent session in this repo and ask it to "work on the open QA issues" (in Claude Code:
   `/work-qa-issues`). It follows [work-qa-issues](../.agents/skills/work-qa-issues/SKILL.md):
   find the issues, apply the tasks with the skill for the kind, run `bun run check`, open a PR
   with `Closes #<issue>`.
3. Review and merge the PR. Merging closes the issue.

## Issue kinds

Issues are found by their **title prefix**. The labels are for filtering in the GitHub UI.

| QA page              | Route                                | Title prefix and label | Skill                                                                     |
| -------------------- | ------------------------------------ | ---------------------- | ------------------------------------------------------------------------- |
| Tagging QA           | `/{country}/signs-qa`                | `[tagging-qa]`         | [add-traffic-sign](../.agents/skills/add-traffic-sign/SKILL.md)           |
| Sign combinations QA | `/{country}/check-sign-combinations` | `[combination-qa]`     | [fix-sign-combination](../.agents/skills/fix-sign-combination/SKILL.md)   |
| Sign questions QA    | `/{country}/questions-qa`            | `[question-qa]`        | [update-sign-questions](../.agents/skills/update-sign-questions/SKILL.md) |
| Taginfo comparison   | `/{country}/taginfo`                 | `[taginfo-qa]`         | [add-traffic-sign](../.agents/skills/add-traffic-sign/SKILL.md)           |
| Wiki comparison      | `/{country}/wiki`                    | `[wiki-qa]`            | [add-traffic-sign](../.agents/skills/add-traffic-sign/SKILL.md)           |

All QA issues also get the label `qa-catalogue`. The kinds, title prefixes and issue header are
defined in [qaIssue.ts](<../apps/traffic-sign-tool/app/(signs)/_components/qaIssue.ts>).

## Issue body

Every issue starts with the same header, then the tasks:

- **Source** — link to the QA page; on Netlify previews also `**Source branch:**`, the branch the
  agent starts from (else `main`).
- **For the agent** — kind, catalogue folder, skill, and when the issue is done.
- **Tasks** / **Feedback** — one heading per sign or combination with the reviewer notes and the
  current converter output or config.

The how-to is in the skills, not in the issue: the issue is passed to GitHub in the URL, which
limits its length.

## Labels

GitHub only applies the labels of an issue template when they exist in the repository. Create
them once:

```bash
for label in qa-catalogue tagging-qa combination-qa question-qa taginfo-qa wiki-qa; do
  gh label create "$label" --repo osmberlin/osm-traffic-sign-tool --color 5319E7 --description "Issue from a QA page of the Traffic Sign Tool" --force
done
```

## Why no automatic PR?

A workflow could apply an issue without an agent if the issue was a list of machine-readable
changes to a data file. Here most tasks are reviewer notes ("these tags are wrong, the wiki says
…") for hand-written TypeScript sign definitions, and need research and judgement. The former
setup started a Cursor cloud agent from GitHub Actions for this; that workflow was removed.
