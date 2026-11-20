---
name: task-execution
description: Atomic task execution with command gates. Use to ensure each implementation step is verified before the next begins. Prevents silent failures and cascading errors.
---

# Task Execution Skill

## Atomic Execution Principle

Every implementation step must be **verified before the next step begins**.
Never write 5 files blindly and hope they all work — verify at each checkpoint.

## Execution Gate Protocol

### Gate 1 — After Writing Types

```bash
npx tsc --noEmit
```

Expected: 0 errors. If errors → fix before creating any more files.

### Gate 2 — After Writing Feature Logic

```bash
npx tsc --noEmit
```

Expected: 0 errors. Feature functions must compile.

### Gate 3 — After Writing Components

```bash
npx tsc --noEmit && npx expo lint
```

Expected: 0 TypeScript errors, 0 lint errors.

### Gate 4 — After Wiring Screens

```bash
set EXPO_NO_TELEMETRY=1 && npx expo export --platform android --output-dir dist-verify
```

Expected: Exit code 0, module count printed.

### Gate 5 — Before Declaring Done

```bash
npx tsc --noEmit
npm run format:check
npx expo lint
```

Expected: All pass. See `verification-before-completion` skill for full checklist.

## Execution Template

For each task:

```
TASK: [Name of the task]
PLAN:
  1. Create types in src/types/
  2. Implement feature logic in src/features/
  3. Update store in src/store/
  4. Create components in src/components/
  5. Wire route in src/app/
  6. Run all gates

GATE RESULTS:
  ✅ Gate 1 (types): tsc passed
  ✅ Gate 2 (features): tsc passed
  ✅ Gate 3 (components): tsc + lint passed
  ✅ Gate 4 (screens): expo export passed
  ✅ Gate 5 (final): all checks passed

STATUS: COMPLETE
```

## Failure Handling

If any gate fails:

1. Stop immediately — do not proceed to the next file
2. Read the full error message
3. Identify the root cause (see `systematic-debugging` skill)
4. Fix the specific error
5. Re-run the gate
6. Only continue when the gate passes

## Common Failure Patterns in This Project

| Failure                                | Action                                                            |
| -------------------------------------- | ----------------------------------------------------------------- |
| `Cannot find module`                   | Check import path, check barrel export, run `expo start -c`       |
| TypeScript `Property X does not exist` | Update the interface in `src/types/`                              |
| `Missing default export`               | Caused by upstream crash — debug the imported module              |
| Prettier failure                       | Run `npm run format` to auto-fix                                  |
| ESLint error                           | Use `npx expo lint --fix` for auto-fixable, manually fix the rest |

## PowerShell Notes (Windows)

Use `;` not `&&` to chain commands in PowerShell:

```powershell
npx tsc --noEmit; npm run format:check; npx expo lint
```
