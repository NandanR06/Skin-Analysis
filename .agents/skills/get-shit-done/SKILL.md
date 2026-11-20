---
name: get-shit-done
description: GSD spec-driven execution framework. Use when planning and implementing a complete feature from scratch. Covers Discuss → Plan → Execute → Verify → Ship.
---

# Get Shit Done (GSD) Skill

A spec-driven execution framework for shipping complete, working features in this Expo project.

## The GSD Cycle

### Phase 1 — DISCUSS

Before writing any code, answer:

1. **What is the user trying to accomplish?** (the job-to-be-done)
2. **What are the acceptance criteria?** (how will we know it's done?)
3. **What data does this feature need?** (types, store, API)
4. **Which existing files does this touch?** (routes, components, features, store)
5. **What could go wrong?** (native modules, Expo Go compat, state race conditions)

Document answers as a short spec block before proceeding.

### Phase 2 — PLAN

Create a step-by-step implementation plan:

```
1. Add TypeScript types to src/types/
2. Create feature logic in src/features/<domain>/
3. Update or create Zustand store slice in src/store/
4. Build UI components in src/components/<feature>/
5. Wire up the route in src/app/
6. Add barrel exports to index.ts files
7. Verify: tsc --noEmit, format:check, expo export
```

Always plan the **smallest possible change** that delivers the feature.

### Phase 3 — EXECUTE

Execute the plan step by step. After each file is written:

- Confirm it compiles (no red squiggles / tsc errors)
- Confirm imports resolve (no Metro errors)

Do NOT write all files blindly before checking — catch errors early.

### Phase 4 — VERIFY

Run the full verification checklist (see `verification-before-completion` skill):

```bash
npx tsc --noEmit
npm run format:check
npx expo lint
set EXPO_NO_TELEMETRY=1 && npx expo export --platform android --output-dir dist-verify
```

All checks must pass. Zero tolerance for `tsc` errors.

### Phase 5 — SHIP

Report completion with:

- List of files created/modified
- Verification results (all pass)
- Any known limitations (e.g., "requires dev build for camera")
- Next steps for the user (e.g., "run `npx expo run:android` to test native camera")

## GSD Rules

- ✅ One feature at a time — don't scope creep mid-implementation
- ✅ Commit to relative imports until `@/` aliases are confirmed working
- ✅ Always use `safeStorage.ts` instead of direct `AsyncStorage`
- ✅ Use `SafeCamera` for any camera functionality
- ❌ Never mark done without running verification
- ❌ Never introduce `any` types without a comment
- ❌ Never put business logic in `src/app/` route files
