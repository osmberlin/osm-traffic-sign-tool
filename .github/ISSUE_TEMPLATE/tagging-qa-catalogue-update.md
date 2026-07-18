---
name: Tagging QA catalogue update
about: Apply tagging QA tasks from the signs-qa page to the converter catalogue (triggers Cursor)
title: '[Tagging QA] '
labels:
  - cursor-qa
  - tagging-qa
assignees: ''
---

<!--
  Opened from the Tagging QA page or filled manually.

  Issues with the `tagging-qa` or `cursor-qa` label trigger `.github/workflows/cursor-qa-automation.yml`,
  which starts a Cursor cloud agent via the Cloud Agents API (`CURSOR_API_KEY`).
-->

## Tagging QA tasks

> **You** — submitted feedback from the QA page (see Tasks below).
> **Traffic Sign Tool** — generated this issue body from your selections.
> **Cursor agent** — will implement catalogue changes in a separate PR.

_Submit to trigger a Cursor cloud agent (see issue body after opening from the tool). The agent opens a PR with `Closes #<issue-number>` in the description (auto-closes this issue on merge). Follow `.cursor/skills/add-traffic-sign/SKILL.md`._

_Paste task results from [/DE/signs-qa](https://trafficsigns.osm-verkehrswende.org/DE/signs-qa) below, or use the pre-filled body when opening from the tool._
