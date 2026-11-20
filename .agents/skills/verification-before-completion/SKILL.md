---
name: verification-before-completion
description: Mandatory quality gate checklist before marking any task done. Run typecheck, format check, bundle test, and confirm no runtime errors. Never skip this.
---

# Verification Before Completion Skill

## ⛔ NEVER mark a task as done without running this checklist.

## Mandatory Verification Steps

### Step 1 — TypeScript Type Check

```bash
npx tsc --noEmit
```

**Pass criteria**: Exit code 0, zero errors printed.
If errors exist → fix ALL of them before proceeding.

### Step 2 — Prettier Format Check

```bash
npm run format:check
```

**Pass criteria**: All files pass, no "would reformat" output.
If failures → run `npm run format` to auto-fix, then re-check.

### Step 3 — ESLint Check

```bash
npx expo lint
```

**Pass criteria**: No errors (warnings are acceptable if pre-existing).
If errors → fix them or use `npx expo lint --fix` for auto-fixable issues.

### Step 4 — Metro Bundle Test (Android)

```bash
set EXPO_NO_TELEMETRY=1 && npx expo export --platform android --output-dir dist-verify
```

**Pass criteria**: Command exits with code 0, prints module count (expect ~1400+ modules).
If failures → resolve all `Unable to resolve` and import errors.

### Step 5 — Confirm No Console Errors in Screens

Review each modified screen/component for:

- [ ] No `console.error(...)` calls left in production code
- [ ] No `TODO` or `FIXME` comments introduced without a ticket
- [ ] No `any` type escapes introduced without a comment explaining why

### Step 6 — Route Resolution Check

For any new screen file added to `src/app/`:

- [ ] File has a valid `export default function ScreenName()`
- [ ] The route is reachable via `router.push('/path')` or tab navigation
- [ ] `_layout.tsx` includes the new screen if it needs a tab or modal

### Step 7 — Verify Affected Stores

If a Zustand store was modified:

- [ ] State shape matches the TypeScript interface
- [ ] Actions do not mutate state directly (use Zustand `set()`)
- [ ] SafeStorage reads/writes use correct keys (no typos)

### Step 8 — UI Component Props Check

If a shared component was modified:

- [ ] All existing callers still compile (no prop renames without updating all usages)
- [ ] New required props have sensible defaults or are added to all callers
- [ ] Component renders correctly without crashing on empty/undefined data

---

## Completion Sign-Off Template

When reporting task complete, always include:

```
✅ Verification Passed:
- tsc --noEmit: 0 errors
- format:check: all files pass
- expo lint: 0 errors
- expo export android: success (N modules)
- Routes resolve: confirmed
- No console.error in modified files
```

If any step was skipped, explain why and what manual verification was done instead.

---

## Quick Commands

```bash
# Run all checks in sequence
npx tsc --noEmit && npm run format:check && npx expo lint
```

```bash
# Full bundle test
set EXPO_NO_TELEMETRY=1 && npx expo export --platform android --output-dir dist-verify
```
