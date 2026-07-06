# Cursor MCP — Postgres

[`@yawlabs/postgres-mcp`](https://www.npmjs.com/package/@yawlabs/postgres-mcp) via `bunx` — lets agents inspect schemas and run queries on your local DB.

Template: [examples/mcp.json.template](../examples/mcp.json.template)

Browser exploration: [agent-browser-mcp.md](agent-browser-mcp.md)

## Setup (user only)

**`~/.cursor/mcp.json` only.** Never add Postgres MCP to `.cursor/mcp.json` in a repo — credentials must not be committed.

1. Merge template entries into `~/.cursor/mcp.json`.
2. Set `DATABASE_URL` from the app’s local `.env`.
3. Restart Cursor.

If `bunx` is missing from PATH, use the full path (e.g. `/opt/homebrew/bin/bunx`).

## Naming

One server per DB: `postgres-{app}-{env}` (e.g. `postgres-tilda-dev`, `postgres-tilda-staging`).

## Agent rules

- Use the MCP server that matches the environment the user means.
- Read-only by default — no writes unless the user explicitly asks on dev.
