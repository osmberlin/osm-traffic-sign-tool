---
name: Tagging QA catalogue update
about: Apply tagging QA tasks from the signs-qa page to the converter catalogue (triggers Cursor)
title: '[Tagging QA] '
labels:
  - tagging-qa
assignees: ''
---

<!--
  Opened from the Tagging QA page or filled manually.

  Issues with the `tagging-qa` label trigger `.github/workflows/cursor-tagging-qa-automation.yml`,
  which comments `@cursor` so a cloud agent can apply catalogue updates and open a PR.

  Requires the Cursor GitHub app on this repository.
-->

## Tagging QA tasks

_Submit to trigger a Cursor cloud agent (see issue body after opening from the tool). The agent opens a PR updating sign config in `packages/traffic-sign-converter`. Follow `.cursor/skills/add-traffic-sign/SKILL.md`._

_Paste task results from [/DE/signs-qa](https://trafficsigns.osm-verkehrswende.org/DE/signs-qa) below, or use the pre-filled body when opening from the tool._
