# Command palette

## TW UI Solution

- https://tailwindui.com/components/application-ui/navigation/command-palettes
- We could re-build this in svelte with https://svelte-headlessui.goss.io/docs/listbox
  - However the libraray is more or less unmaintained, see https://github.com/rgossiaux/svelte-headlessui/pull/126#issuecomment-1276546606
  - So we need to use https://github.com/rgossiaux/svelte-headlessui/pull/126#issuecomment-1372811941

## Svelte Command Palent

- https://github.com/rohitpotato/svelte-command-palette/tree/main
- Preview/Docs https://svelte-command-palette.vercel.app/

## Skeleton

- Maybe use https://www.skeleton.dev/components/autocomplete with https://www.skeleton.dev/utilities/modals

# UI Library

- https://svelte-headlessui.goss.io/docs/listbox
- https://www.skeleton.dev
- to check out: https://github.com/steeze-ui/components, https://www.steeze-ui.com/docs

# Icon Library

- It looks like https://github.com/steeze-ui/icons#icon-components is the easiest way to get Heroicons into Svelte
  - Or rather https://github.com/JustinVoitel/svelte-hero-icons which is the predecessor but still active and just svelte and heroicons

# Github Stories

## Popups mit Skeleton

CONTEXT: Tried to follow the docs, but that did not work. Maybe because I used a Wrapper Component and that did not have dynamic IDs. Maybe the Skeleton setup was not finished.

NEXT: Try to install a blank Skeleton with a dynamic tooltip component. Then copy the settings over here.

- https://www.skeleton.dev/utilities/popups
- https://github.com/skeletonlabs/skeleton/blob/master/src/routes/(inner)/utilities/popups/%2Bpage.svelte

## Get `conditional` restrictions working

Eg. `"value": "wet", "conditional": true,` for "Zusatzzeichen 1053-35"
