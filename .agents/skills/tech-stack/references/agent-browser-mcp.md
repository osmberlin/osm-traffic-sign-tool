# MCP — agent-browser

[Vercel agent-browser](https://github.com/vercel-labs/agent-browser) is FMC’s browser MCP for agent-driven exploration and debugging. Use the official CLI’s built-in MCP (`agent-browser mcp`).

Template: [examples/mcp.json.template](../examples/mcp.json.template)

Committed E2E and CI stay in **`@playwright/test`** (see skill `playwright-skill`). agent-browser covers interactive exploration — hydration, React tree, UI flows, and debugging.

---

## Install (macOS, once per machine)

```bash
brew install agent-browser          # or: npm install -g agent-browser@^0.27
agent-browser install               # Chrome for Testing (first time)
agent-browser doctor                # verify daemon + browser launch
```

---

## Setup (user only)

User-level config only — never commit MCP config to a repo ([cursor-mcp.md](cursor-mcp.md)).

Use the same `agent-browser` server block in both clients (from [mcp.json.template](../examples/mcp.json.template)):

```json
"agent-browser": {
  "command": "/opt/homebrew/bin/agent-browser",
  "args": ["mcp", "--tools", "core,react,debug"],
  "env": {
    "AGENT_BROWSER_ENABLE": "react-devtools",
    "AGENT_BROWSER_HEADED": "true"
  }
}
```

| Setting                               | Why                                                                  |
| ------------------------------------- | -------------------------------------------------------------------- |
| `--tools core,react,debug`            | Navigation, React introspection, console/errors                      |
| `AGENT_BROWSER_ENABLE=react-devtools` | React hook on every launch (`react tree`, `react inspect`, Suspense) |
| `AGENT_BROWSER_HEADED=true`           | Visible browser while debugging (useful for maps)                    |

If `agent-browser` is not on PATH:

```json
"command": "npx",
"args": ["-y", "agent-browser@^0.27", "mcp", "--tools", "core,react,debug"]
```

Add `state` to `--tools` when you need saved login cookies often (`restore` / storage-state tools).

### Cursor

1. Merge the `agent-browser` entry into `~/.cursor/mcp.json` under `mcpServers`.
2. Restart Cursor.
3. Confirm **Cursor Settings → MCP** shows `agent-browser` connected.

Postgres MCP setup for Cursor: [cursor-mcp.md](cursor-mcp.md).

### Claude Desktop

Claude uses a **different config file** than Cursor. Setup steps (paths, `Edit Config`, restart): [Connect to local MCP servers](https://modelcontextprotocol.io/docs/develop/connect-local-servers) (MCP docs).

1. Open **Claude menu → Settings → Developer → Edit Config** (creates the file if missing).
2. Merge the same `agent-browser` entry into `mcpServers` in `claude_desktop_config.json`:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3. Fully quit and restart Claude Desktop.

---

## Prerequisites

Before browser prompts, the app dev server must be running (e.g. `cd app && bun run dev` → `http://127.0.0.1:5173`). See the project’s `tests/README.md` or docker docs for DB/tiles.

For auth-gated pages: log in through the browser session, or use `restore` / state tools (add `state` to `--tools`).

---

## How agents use it

Prompt naturally once MCP is connected:

- “Open `http://127.0.0.1:5173/regions/bb` and run vitals — is hydration clean?”
- “Snapshot the map page, toggle a layer, take an annotated screenshot.”
- “Inspect the React tree around `SourcesLayersAtlasGeo` and list Suspense boundaries.”
- “Click through the contact profile modal and capture console errors.”

The model calls MCP tools (`agent_browser_open`, `agent_browser_snapshot`, `agent_browser_react_tree`, etc.).

**Workflow:** `agent_browser_open` → `agent_browser_snapshot` (stable `@eN` refs) → `agent_browser_click` / `agent_browser_fill` → assert via `agent_browser_vitals`, `agent_browser_console`, `agent_browser_errors`, or screenshots.

Call `agent_browser_tools_profiles` to see other tool profiles if the default set is insufficient.

---

## Roles alongside Playwright E2E

| Need                             | agent-browser MCP                               | `@playwright/test`                             |
| -------------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| SSR / hydration timing           | `vitals`, `react suspense`                      | Console helpers in test utils                  |
| React refactors / component tree | `react tree`, `react inspect`, render profiling | —                                              |
| Map / WebGL visual checks        | Annotated screenshots + `eval`                  | Screenshots + helpers in `tests/utils/maps.ts` |
| Committed regression / CI        | — findings → specs                              | `tests/*.spec.ts`                              |
| Stubbed auth fixtures            | Manual login or `restore` state                 | `tests/fixtures/auth.ts`                       |

---

## Map work

For layer-order bugs:

- **Annotated screenshots** (`agent_browser_screenshot` with annotate options), or
- **`agent_browser_eval`** against debug hooks you expose in the app

---

## Other MCP tools

| Task                     | Tool                                          |
| ------------------------ | --------------------------------------------- |
| Repeatable regression    | `@playwright/test` — skill `playwright-skill` |
| Schema / DB inspection   | Postgres MCP — [cursor-mcp.md](cursor-mcp.md) |
| App-specific admin tools | Project MCP (e.g. `tilda-geo-admin--DEV`)     |
