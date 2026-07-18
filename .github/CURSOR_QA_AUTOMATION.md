# QA pages → Cursor automation

QA pages open GitHub issues with pre-filled agent instructions. One workflow starts a Cursor cloud agent via the [Cloud Agents API](https://cursor.com/docs/cloud-agent/api/endpoints).

## Supported QA pages

| Page                 | Route                                | Issue label                      | Skill                                                                     |
| -------------------- | ------------------------------------ | -------------------------------- | ------------------------------------------------------------------------- |
| Tagging QA           | `/{country}/signs-qa`                | `tagging-qa` (+ `cursor-qa`)     | [add-traffic-sign](../.cursor/skills/add-traffic-sign/SKILL.md)           |
| Sign combinations QA | `/{country}/check-sign-combinations` | `combination-qa` (+ `cursor-qa`) | [fix-sign-combination](../.cursor/skills/fix-sign-combination/SKILL.md)   |
| Sign questions QA    | `/{country}/questions-qa`            | `question-qa` (+ `cursor-qa`)    | [update-sign-questions](../.cursor/skills/update-sign-questions/SKILL.md) |
| Taginfo comparison   | `/{country}/taginfo`                 | `cursor-qa`                      | [add-traffic-sign](../.cursor/skills/add-traffic-sign/SKILL.md)           |
| Wiki comparison      | `/{country}/wiki`                    | `cursor-qa`                      | [add-traffic-sign](../.cursor/skills/add-traffic-sign/SKILL.md)           |

New QA flows only need `cursor-qa` and a skill path in the issue body.

## Who speaks on GitHub

| Surface                 | GitHub identity                                       | How we mark it                                                                                                                                                              |
| ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Issue body              | Human submitter (your avatar)                         | Blockquote banner in issue body: human vs machine-generated vs agent                                                                                                        |
| Workflow status comment | `github-actions[bot]`                                 | `> **GitHub Actions (automation)** — …` in [cursorQaAutomation.ts](scripts/cursorQaAutomation.ts) (run from [cursor-qa-automation.yml](workflows/cursor-qa-automation.yml)) |
| Agent PR and comments   | **`cursor`** app when Team Owned; else connected user | Agent must prefix text with `**[Cursor Agent]**` (see [github-agent-attribution](../.cursor/rules/github-agent-attribution.mdc))                                            |

GitHub attributes the issue opener to whoever clicks Create issue; the tool only pre-fills the body.

## Flow

1. User submits an issue from a QA page.
2. [cursor-qa-automation.yml](workflows/cursor-qa-automation.yml) runs on `issues: opened` or when a trigger label is added (`cursor-qa`, `tagging-qa`, `combination-qa`, `question-qa`).
3. The workflow calls `POST https://api.cursor.com/v1/agents` with `CURSOR_API_KEY` (skips if an agent link comment already exists). The agent starts from `<source>` branch parsed from `**Source branch:** \`…\``in the issue body (Netlify previews only), else`main`.
4. The workflow posts a status comment with the agent URL.
5. The agent reads the issue body, follows the skill, updates `packages/traffic-sign-converter/src/data-definitions/`, and opens a PR with `Closes #<issue-number>`.

**Netlify PR previews:** issue bodies embed branch, preview URL, and `blob/<branch>/` skill links. Netlify `BRANCH` and `DEPLOY_PRIME_URL` are mapped to `VITE_*` at build time in [netlify.toml](../netlify.toml); GitHub Pages production uses `main` in [app-traffic-sign-tool-deploy.yml](workflows/app-traffic-sign-tool-deploy.yml). Branch parsing in the workflow only applies once that workflow file is on the default branch.

## Repository requirements

- [Cursor GitHub integration](https://cursor.com/docs/integrations/github) on `osmberlin/osm-traffic-sign-tool` with issue access (agent needs repo access to open PRs).
- GitHub Actions enabled (default for public repos).
- Repository secret `CURSOR_API_KEY` — user API key or [service account](https://cursor.com/docs/account/enterprise/service-accounts) key from Cursor Dashboard → Integrations → API Keys.

## Why GitHub Actions + Cloud Agents API?

[Cursor Automations](https://cursor.com/docs/cloud-agent/automations) support pull request events, not issue opened. The Cloud Agents API lets the workflow start an agent directly when a QA issue is opened, without posting an `@cursor` comment.
