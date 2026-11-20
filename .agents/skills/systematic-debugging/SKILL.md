---
name: systematic-debugging
description: Root cause analysis for React Native/Expo errors. Use when facing red screens, Metro bundler failures, native module errors, or unexpected runtime behavior.
---

# Systematic Debugging Skill

## Debugging Protocol — Always Follow In Order

### Level 1 — Metro / Bundler Errors

**Symptom**: `Unable to resolve "..."`, `Module not found`

Diagnosis steps:

1. Check the import path is correct (relative vs alias)
2. Check the target file exists: `Get-ChildItem src\components\ui -Name`
3. Check `src/components/ui/index.ts` exports the named symbol
4. If using `@/` alias: verify `"tsconfigPaths": true` is in `app.json` experiments
5. Clear Metro cache: `npx expo start -c`

### Level 2 — Native Module Errors

**Symptom**: `NativeModule: X is null`, `Cannot find native module 'X'`

Diagnosis steps:

1. Check if the module requires a **dev build** (not Expo Go)
2. If using SafeCamera/SafeStorage wrappers → these handle Expo Go gracefully
3. If a new native package was added → must rebuild: `npx expo run:android`
4. Verify package is in `package.json` (not just `node_modules`): check `npm ls <package>`
5. Run `npx expo-doctor` to check for version mismatches

### Level 3 — Runtime Errors (Red Screen)

**Symptom**: JavaScript error, component crash, hook violation

Diagnosis steps:

1. Read the full error + call stack carefully
2. Check for Rules of Hooks violations (hooks inside conditions/loops)
3. Check for undefined access on possibly-null data: add optional chaining `?.`
4. Add `console.log` at the top of the failing function to confirm it's being called
5. Temporarily wrap the suspect component in `try/catch` or `ErrorBoundary`

### Level 4 — Logic / Behavior Errors

**Symptom**: Wrong data displayed, state not updating, navigation not working

Diagnosis steps:

1. Add `console.log` before and after the suspect state update
2. Check Zustand store state with: `const state = useXxxStore.getState(); console.log(state)`
3. Verify the action is being called: add log inside the action function
4. Check if SafeStorage is returning the expected data (in Expo Go it's in-memory and resets)

## Error Quick Reference

| Error                                                | Root Cause                         | Fix                                   |
| ---------------------------------------------------- | ---------------------------------- | ------------------------------------- |
| `NativeModule: AsyncStorage is null`                 | Using Expo Go without native build | Use `safeStorage.ts` wrapper          |
| `Cannot find native module 'ExpoCamera'`             | Expo Go limitation                 | Use `SafeCamera` wrapper              |
| `Route is missing default export`                    | Module evaluation crash upstream   | Fix the crash in the imported module  |
| `Unable to resolve "@/components/..."`               | Missing `tsconfigPaths: true`      | Add to `app.json` experiments         |
| `Unable to resolve "../../components/ui/app-button"` | Metro cache stale                  | Run `npx expo start -c`               |
| `baseUrl is deprecated`                              | TypeScript 6.0                     | Remove `baseUrl` from `tsconfig.json` |

## Expo-Specific Debug Commands

```bash
# Clear all caches and restart
npx expo start -c

# Check dependency compatibility
npx expo-doctor

# Fix incompatible versions
npx expo install --fix

# Full type check
npx tsc --noEmit

# Test bundle without device
set EXPO_NO_TELEMETRY=1 && npx expo export --platform android --output-dir dist-check
```

## This Project's Known Issues & Workarounds

- **AsyncStorage** → use `src/utils/safeStorage.ts` (in-memory fallback for Expo Go)
- **Camera** → use `src/components/camera/SafeCamera.tsx` (requires dev build for real camera)
- **Path aliases `@/`** → use relative imports until `npx expo run:android` rebuilds the APK
- **Git hooks (lint-staged)** → must run with BypassSandbox in agent context
