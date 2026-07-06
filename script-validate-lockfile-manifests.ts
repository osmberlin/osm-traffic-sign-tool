import { validateLockfileManifests } from './.github/scripts/validateLockfileManifests.ts'

await validateLockfileManifests(import.meta.dir)
