# Sign questions QA → Cursor automation

The Sign questions QA page (`/DE/questions-qa`) can open GitHub issues using the **Sign questions QA catalogue update** template. Those issues are labeled `question-qa`.

## Who speaks on GitHub

| Surface | GitHub identity | How we mark it |
|--------|-----------------|----------------|
| Issue body | Human submitter (your avatar) | Blockquote banner in issue body: human vs machine-generated vs agent |
| Workflow trigger comment | `github-actions[bot]` | `> **GitHub Actions (automation)** — …` in [cursor-question-qa-automation.yml](workflows/cursor-question-qa-automation.yml) |
| Agent PR and comments | **`cursor`** app when Team Owned; else connected user | Agent must prefix text with `**[Cursor Agent]**` (see [github-agent-attribution](../.cursor/rules/github-agent-attribution.mdc)) |

GitHub always attributes the **issue opener** to whoever clicks Create issue; the QA tool only pre-fills the body.

## What runs automatically

1. User submits an issue from the template (body pre-filled from the QA tool when opened via **Open Question QA issue**).
2. GitHub Actions workflow [`.github/workflows/cursor-question-qa-automation.yml`](workflows/cursor-question-qa-automation.yml) runs on `issues: opened` or when label `question-qa` is added.
3. If repository secrets are set (see below), the workflow `POST`s the issue to a Cursor **webhook** automation; on success it skips the `@cursor` comment.
4. Otherwise the workflow posts an `@cursor` comment with repo, branch, and instructions.
5. A cloud agent reads the **issue body** (agent brief + tasks), follows [`.cursor/skills/update-sign-questions/SKILL.md`](../.cursor/skills/update-sign-questions/SKILL.md), updates sign `questions` config under `packages/traffic-sign-converter/src/data-definitions/DE/`, and **opens a PR**.

## Repository requirements

- [Cursor GitHub integration](https://cursor.com/docs/integrations/github) installed on `osmberlin/osm-traffic-sign-tool` with access to issues.
- GitHub Actions enabled for the repository (default for public repos).

## Cursor team setup (for `cursor` avatar on PRs)

Per [Cursor Automations – Identity](https://cursor.com/docs/cloud-agent/automations#identity):

- **Team Owned** automations open PRs as the **`cursor`** GitHub app; private automations open PRs as the connected user.
- Automation **comments** on PRs run as **`cursor`** regardless of scope.

Recommended setup:

1. At [cursor.com/automations](https://cursor.com/automations), create a **Team Owned** automation with a **Webhook** trigger and repository `osmberlin/osm-traffic-sign-tool`.
2. Enable tools: **Open pull request** (and **Comment on pull request** if needed).
3. Prompt the agent to read the webhook JSON (`issueUrl`, `title`, `body`, `issueNumber`), follow `.cursor/skills/update-sign-questions/SKILL.md`, use `**[Cursor Agent]**` on all GitHub text, and open a PR whose description includes `Closes #<issueNumber>` (auto-closes the issue on merge).
4. Save the automation, copy the webhook URL and API key (`Authorization: Bearer crsr_…`).
5. Add GitHub repository secrets:
   - `CURSOR_QUESTION_QA_WEBHOOK_URL` — webhook URL from the dashboard
   - `CURSOR_QUESTION_QA_WEBHOOK_API_KEY` — token only (no `Bearer ` prefix)
6. After promoting to Team Owned, **regenerate the webhook API key** (required by Cursor).

## Why not a native “issue opened” automation trigger?

[Cursor Automations](https://cursor.com/docs/cloud-agent/automations) support GitHub **pull request** events, not **issue opened**. There is no issue-template frontmatter that starts an agent directly. Webhook + optional `@cursor` comment is the integration path.

## Fallback: `@cursor` comment only

If webhook secrets are not configured, the workflow posts `@cursor` on the issue. The [Cursor GitHub app](https://cursor.com/docs/integrations/github) starts a cloud agent from that comment. PR authorship may still use a team member’s OAuth unless you use Team Owned webhook runs.
