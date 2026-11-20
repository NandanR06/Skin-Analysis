---
name: code-review
description: Code review rubric for this Expo/React Native project. Checks TypeScript safety, mobile performance, Expo ecosystem compliance, clean architecture, and formatting.
---

# Code Review Skill

## Review Rubric — Check All Categories

### 1. TypeScript Safety

- [ ] No `any` types (flag and ask for the proper type)
- [ ] All props interfaces fully typed with no optional fields unless truly optional
- [ ] `useLocalSearchParams` result validated (always a string)
- [ ] Zustand store state shape matches TypeScript interface
- [ ] No type assertions (`as SomeType`) without a comment explaining why

### 2. Expo / React Native Compliance

- [ ] Native modules accessed through safe wrappers (SafeCamera, safeStorage)
- [ ] No direct `AsyncStorage` imports — use `safeStorage.ts`
- [ ] No direct `Camera` imports without null check — use `SafeCamera`
- [ ] All screens have `export default function ScreenName()` (Expo Router requirement)
- [ ] No `ios/` or `android/` directory modifications
- [ ] New packages installed via `npx expo install` (not `npm install`)

### 3. Clean Architecture

- [ ] `src/app/` files are thin orchestrators only (< ~100 lines of JSX)
- [ ] No business logic in route files (move to `src/features/`)
- [ ] No `router.push` calls inside shared components
- [ ] No store access inside `src/components/ui/` primitives
- [ ] Feature logic in `src/features/` has no React imports

### 4. Mobile Performance

- [ ] `useCallback` on event handlers passed to `FlatList` / `FlashList` items
- [ ] `StyleSheet.create()` used for all static styles (not inline objects)
- [ ] No heavy computation in component render body — moved to useMemo/useCallback
- [ ] Images use `expo-image` (not `Image` from React Native) where caching matters
- [ ] Long lists use `FlashList` not `FlatList`

### 5. Formatting & Linting

- [ ] File passes `npm run format:check`
- [ ] File passes `npx expo lint`
- [ ] No unused imports
- [ ] No `console.log` in production code (use a logger or remove)
- [ ] No `TODO` / `FIXME` without a tracking issue reference

### 6. Component Quality

- [ ] Component renders correctly with empty / undefined / null data
- [ ] Touch targets meet 44pt minimum
- [ ] Colors sourced from `useTheme()`, not hardcoded
- [ ] Spacing from `Spacing.*` constants, not raw numbers
- [ ] Barrel export updated in `index.ts` after adding new component

### 7. State Management

- [ ] Zustand actions use `set()` correctly (not direct mutation)
- [ ] Persistence calls wrapped in try/catch
- [ ] Store slices own exactly one domain (no cross-domain logic)

## Review Output Format

Report as:

```
BLOCKING   — Must be fixed before merge
SUGGESTION — Recommend but not blocking
NITPICK    — Minor style/naming preference
PRAISE     — Good pattern worth calling out
```

Example:

```
BLOCKING: src/features/analysis/cosmeticHeuristics.ts:42 — `any` type on `pixelData` parameter. Use `PixelData` interface from src/types/scan.ts.
SUGGESTION: src/app/scan/results.tsx — Extract the 60-line result card JSX into src/components/scan/ScanResultCard.tsx.
NITPICK: src/components/ui/app-button.tsx:15 — Prefer `variant === 'primary'` over nested ternary for readability.
PRAISE: src/utils/safeStorage.ts — Excellent fallback pattern for Expo Go compatibility.
```
