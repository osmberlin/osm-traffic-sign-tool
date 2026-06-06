# QA pages → Cursor automation

Several QA pages in the Traffic Sign Tool can open GitHub issues with pre-filled agent instructions. Those issues trigger a single GitHub Actions workflow that starts a Cursor cloud agent via an `@cursor` comment.

## Supported QA pages

| Page | Route | Issue label | Skill |
|------|-------|-------------|-------|
| Tagging QA | `/{country}/signs-qa` | `tagging-qa` (+ `cursor-qa`) | [add-traffic-sign](../.cursor/skills/add-traffic-sign/SKILL.md) |
| Sign combinations QA | `/{country}/check-sign-combinations` | `combination-qa` (+ `cursor-qa`) | [fix-sign-combination](../.cursor/skills/fix-sign-combination/SKILL.md) |
| Sign questions QA | `/{country}/questions-qa` | `question-qa` (+ `cursor-qa`) | [update-sign-questions](../.cursor/skills/update-sign-questions/SKILL.md) |
| Taginfo comparison | `/{country}/taginfo` | `cursor-qa` | [add-traffic-sign](../.cursor/skills/add-traffic-sign/SKILL.md) |
| Wiki comparison | `/{country}/wiki` | `cursor-qa` | [add-traffic-sign](../.cursor/skills/add-traffic-sign/SKILL.md) |

The general `cursor-qa` label is used for new QA flows (taginfo, wiki) and is also applied alongside page-specific labels on older templates. Future QA pages only need the `cursor-qa` label and an issue body that references the relevant skill path.

## Who speaks on GitHub

| Surface | GitHub identity | How we mark it |
|--------|-----------------|----------------|
| Issue body | Human submitter (your avatar) | Blockquote banner in issue body: human vs machine-generated vs agent |
| Workflow trigger comment | `github-actions[bot]` | `> **GitHub Actions (automation)** — …` in [cursor-qa-automation.yml](workflows/cursor-qa-automation.yml) |
| Agent PR and comments | **`cursor`** app when Team Owned; else connected user | Agent must prefix text with `**[Cursor Agent]**` (see [github-agent-attribution](../.cursor/rules/github-agent-attribution.mdc)) |

GitHub always attributes the **issue opener** to whoever clicks Create issue; the QA tool only pre-fills the body.

## What runs automatically

1. User submits an issue from a QA template (body pre-filled when opened from the tool).
2. GitHub Actions workflow [`.github/workflows/cursor-qa-automation.yml`](workflows/cursor-qa-automation.yml) runs on `issues: opened` or when a trigger label is added (`cursor-qa`, `tagging-qa`, `combination-qa`, or `question-qa`).
3. The workflow posts an `@cursor` comment with repo, branch, skill path, and instructions (skips if one already exists).
4. A cloud agent reads the **issue body** (agent brief + tasks), follows the referenced skill, updates sign config under `packages/traffic-sign-converter/src/data-definitions/`, and **opens a PR** whose description includes `Closes #<issue-number>`.

## Repository requirements

- [Cursor GitHub integration](https://cursor.com/docs/integrations/github) installed on `osmberlin/osm-traffic-sign-tool` with access to issues.
- GitHub Actions enabled for the repository (default for public repos).

## Why not a native “issue opened” automation trigger?

[Cursor Automations](https://cursor.com/docs/cloud-agent/automations) support GitHub **pull request** events, not **issue opened**. There is no issue-template frontmatter that starts an agent directly. The `@cursor` comment via GitHub Actions is the integration path.
