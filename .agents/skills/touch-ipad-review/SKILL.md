---
name: touch-ipad-review
description: >-
  Reviews React web apps for iPad and touchscreen usability with Tailwind CSS
  fixes. Audits touch targets, hover failures, touch-over list highlighting
  (Headless UI data-focus, Radix data-highlighted, inline rows), Safari/iPadOS
  quirks, layout fluidity, and FMC cursor conventions. Use when the user asks to
  review an app for touch, iPad, tablet, or touchscreen-optimized usage.
---

# Touch & iPad review

Audit React + Tailwind apps for **finger-first** interaction on iPad and touch screens. Skip generic advice (use semantic HTML, be responsive, etc.) — only flag non-obvious gaps.

**Checklist:** [references/tailwind-touch-checklist.md](references/tailwind-touch-checklist.md)

## When to run

User prompt like: _"review app for touch/iPad usage"_ or _"review app for this use case"_ with touch/tablet context.

## Review workflow

1. **Scan interactive UI** — buttons, links, icon buttons, tabs, map controls, **dropdowns / menus / Listbox**, **inline selectable sidebar rows**, drag handles, form controls, custom click targets (`onClick` on non-button elements).
2. **Walk the checklist** — classify lists as **Bucket A** (Headless UI / Radix) vs **Bucket B** (custom `<button>` rows); grep helps (`hover:`, `data-focus:`, `focus &&`, `MenuItem`, `ListboxOption`, `onClick`, `cursor-`, `group-hover`).
3. **Test mentally for iPad** — Split View width changes, sticky hover, **touch-over highlight** (press-drag-release in open menus and inline lists), double-tap zoom, keyboard covering inputs, thumb reach for primary actions.
4. **Emit the report** using the template below — every finding must have **location**, **issue**, and **concrete Tailwind/React fix**.

Do **not** list passing generic practices. Group duplicates (e.g. "12 icon buttons missing `min size`") into one finding with representative files.

## Report template

Copy this structure into the response:

```markdown
# Touch / iPad review — [app or scope]

## Summary

[2–3 sentences: overall risk, top themes]

## Findings

### Critical

| #   | File / component | Issue | Suggested fix                   |
| --- | ---------------- | ----- | ------------------------------- |
| 1   | `path:line`      | …     | Tailwind classes or code change |

### Warning

| #   | File / component | Issue | Suggested fix |
| --- | ---------------- | ----- | ------------- |

### Nice to have

| #   | File / component | Issue | Suggested fix |
| --- | ---------------- | ----- | ------------- |

## FMC conventions verified

- [ ] All `<a>` and `<button>` (and tappable custom controls) use `cursor-pointer` on desktop
- [ ] Interactive controls use `select-none` where text selection would flash on iPad
- [ ] Hover-only affordances gated with fine-pointer media (see checklist)
- [ ] Menu/list rows: touch-over via `data-focus:` / `focus` (Headless UI) or `data-[highlighted]:` (Radix) — not `hover:` alone
- [ ] Inline sidebar pickers flagged if hover-only (Bucket B)

## Passed (non-obvious)

[Only items you explicitly checked and that are correct — keep short]
```

**Severity**

| Level        | When                                                                                   |
| ------------ | -------------------------------------------------------------------------------------- |
| Critical     | Broken on touch, inaccessible tap, hidden functionality, mis-tap risk on primary flows |
| Warning      | Substandard but usable; sticky hover; targets slightly small; missing feedback         |
| Nice to have | Consistency, thumb-zone polish, haptics N/A on web                                     |

## FMC defaults (always check)

Apply on **every** review:

| Rule                                    | Tailwind / code                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop pointer on links & buttons      | `cursor-pointer` on `<a>`, `<button>`, and tappable custom controls                                                                    |
| No iOS text-selection flash on controls | `select-none` on buttons, icon buttons, tabs, chips used as controls                                                                   |
| Fine-pointer-only hover                 | Do not use bare `hover:` for essential UI; use `[@media(hover:hover)_and_(pointer:fine)]:hover:…` (or project variant — see checklist) |

## Quick grep hints

```bash
# Hover without fine-pointer guard (manual triage)
rg 'hover:' --glob '*.{tsx,jsx}'

# Small tap targets
rg '<(button|a)[^>]*(size-[0-9]|h-[0-9]|w-[0-9])' --glob '*.tsx'

# Div click traps
rg 'onClick' --glob '*.tsx' | rg -v '<button|<a '

# Missing cursor on interactives (heuristic)
rg '<(button|a) ' --glob '*.tsx' | rg -v 'cursor-pointer'

# Headless UI menus: hover without touch-over styling
rg 'MenuItem|ListboxOption|menuItemClasses' --glob '*.tsx'
rg 'hover:bg' --glob '*Menu*.tsx' --glob '*Listbox*.tsx' --glob '*Dropdown*.tsx'

# Inline sidebar rows: hover-only selection feedback
rg "hover:bg.*onClick|onClick.*hover:bg" --glob '*.tsx'
```

## External references

- [Apple HIG — Accessibility (44×44 pt targets)](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Apple HIG — Designing for iPadOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados)
- [WCAG 2.2 — Target Size (2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Touch target practices (Capi Product)](https://www.capiproduct.com/post/10-best-practices-for-designing-effective-touch-targets-in-mobile-ui)
- [Design for Touch (Design+Code / iOS handbook)](https://designcode.io/ios-design-handbook-design-for-touch)
- [Mobile app design best practices (RapidNative)](https://www.rapidnative.com/blogs/mobile-app-design-best-practices)
