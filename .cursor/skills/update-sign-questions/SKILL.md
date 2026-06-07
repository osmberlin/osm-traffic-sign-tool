# Update Sign Questions (Question QA)

This skill teaches the agent how to apply feedback from the Sign questions QA page (`/DE/questions-qa`).

## When to use this skill

- GitHub issue labeled `question-qa`.
- User asks to add, change, or remove `questions` on a German sign definition.
- Keywords: "Sign questions QA", `SignQuestion`, `questionId`, `answerId`, `questionCatalog`, `sidepathQuestion`, `highwayClassQuestion`.

## Issue task format

Each task includes:

- Sign `osmValuePart`, `signId`, descriptive name
- **Current questions config** (JSON)
- **Questions and answers (catalogue)** — human-readable summary with ids
- **Suggestion** — reviewer notes (required intent; implement when concrete)

## Instructions

### Step 1: Read the issue and schema

1. Parse every task section in the issue body.
2. Schema: `packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts` — `SignQuestion`, `QuestionAnswer`, `QUESTION_NIL_ANSWER_ID` (`'nil'`).
3. Reuse factories from `packages/traffic-sign-converter/src/data-definitions/questionCatalog.ts` when they match the desired behaviour:
   - `sidepathQuestion()`, `surfaceColorQuestion()`, `guidanceModeQuestion()`, `highwayClassQuestion()`, `pathInfrastructureQuestions()`, `cycleInfrastructureQuestions()`.
4. Also read [`.cursor/skills/add-traffic-sign/SKILL.md`](../add-traffic-sign/SKILL.md) for DE `data/*.ts` file choice and OSM wiki research.

**Do not start the traffic-sign-tool dev server** unless you need to verify UI labels — converter tests are the main guard.

### Step 2: Edit sign config

1. Locate the sign in `packages/traffic-sign-converter/src/data-definitions/DE/data/`.
2. Set or update `questions: SignQuestion[]` on the sign object.
3. Every question needs:
   - `questionId`, `questionI18nKey` (e.g. `sidepath.prompt`)
   - `answers[]` with `answerId`, `answerI18nKey`, optional `tags`, `removeTags`, `highwayValue`, `geometries`
   - Include a **nil** answer (`answerId: 'nil'`) unless the issue specifies otherwise
4. For `highwayClassQuestion`, set `affectsHighway: true` and use `defaultAnswerId` when one highway should be pre-selected.
5. Prefer composing existing catalog factories over duplicating answer lists.

### Step 3: Update app i18n (when adding new keys)

If you add new `questionI18nKey` / `answerI18nKey` values:

1. Add strings to `apps/traffic-sign-tool/messages/en.json` and `de.json` (pattern: `question_<id>_title`, `question_<id>_answer_<answerId>`).
2. Map keys in `apps/traffic-sign-tool/src/features/i18n/questionLabels.ts`.
3. Run `bun run build:paraglide` from `apps/traffic-sign-tool`.

### Step 4: Verify

1. `cd packages/traffic-sign-converter && bun test` — especially `signsToTags.questions.test.ts`.
2. If behaviour is sign-specific, add or extend a test there with the sign’s `osmValuePart` and expected tags per answer.
3. Open a PR whose description starts with `**[Cursor Agent]**` and includes `Closes #<issue-number>`.

## Common changes

| Reviewer intent                     | Typical change                                                        |
| ----------------------------------- | --------------------------------------------------------------------- |
| Add questions to a sign without any | Import factories from `questionCatalog.ts`, assign `questions: [...]` |
| New answer option                   | Append to `answers` on the relevant `SignQuestion`; add i18n keys     |
| Change default highway              | Update `defaultAnswerId` on `highwayClassQuestion`                    |
| Remove a question                   | Delete from `questions` array or replace with narrower set            |
| Tag mapping fix                     | Update `tags` / `removeTags` / `highwayValue` on the answer object    |

## Attribution

Follow [github-agent-attribution](../../rules/github-agent-attribution.mdc): prefix all GitHub comments and PR descriptions with `**[Cursor Agent]**`. Refer to the human as **the submitter**.
