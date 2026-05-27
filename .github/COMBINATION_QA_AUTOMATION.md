# Sign combination QA → Cursor automation

The Sign combinations QA page (`/DE/check-sign-combinations`) can open GitHub issues using the **Sign combination QA update** template. Those issues are labeled `combination-qa`.

## What runs automatically

1. User submits an issue from the template (body pre-filled from the QA tool when opened via **Open Combination QA issue**).
2. GitHub Actions workflow [`.github/workflows/cursor-combination-qa-automation.yml`](workflows/cursor-combination-qa-automation.yml) runs on `issues: opened` or when label `combination-qa` is added.
3. The workflow posts an `@cursor` comment with repo, branch, and instructions.
4. The [Cursor GitHub app](https://cursor.com/docs/integrations/github) picks up the comment and starts a cloud agent. The agent reads the **issue body** (agent brief + tasks), follows [`.cursor/skills/fix-sign-combination/SKILL.md`](../.cursor/skills/fix-sign-combination/SKILL.md), updates sign config under `packages/traffic-sign-converter/src/data-definitions/DE/`, and **opens a PR**.

## Repository requirements

- [Cursor GitHub integration](https://cursor.com/docs/integrations/github) installed on `osmberlin/osm-traffic-sign-tool` with access to issues.
- GitHub Actions enabled for the repository (default for public repos).

## Why not a Cursor Automation trigger?

[Cursor Automations](https://cursor.com/docs/cloud-agent/automations) support GitHub **pull request** events, not **issue opened**. There is no issue-template frontmatter that starts an agent directly. The `@cursor` issue comment plus this workflow is the documented integration path.

## Optional: webhook automation

For teams that prefer Cursor Automations UI over `@cursor` comments, create a **Webhook** automation at [cursor.com/automations](https://cursor.com/automations) and extend the GitHub workflow to `POST` issue title/body/URL to that endpoint instead of (or in addition to) commenting.
