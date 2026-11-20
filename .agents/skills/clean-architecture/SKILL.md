---
name: clean-architecture
description: Enforce clean separation of concerns in Expo/React Native. Use when reviewing file placement, ensuring routes stay thin, or separating UI from business logic.
---

# Clean Architecture Skill

You enforce clean separation of concerns across the `d:\fskin` project.

## Layer Responsibilities

### `src/app/` — Routes (Screens Only)

Routes are **thin orchestrators**. They may:

- Read from stores with `useXxxStore()`
- Call navigation with `router.push()`
- Pass data down to feature components
- Call side-effect hooks like `useEffect(() => { loadData(); }, [])`

Routes must NOT:

- Contain business logic or data transformations
- Have more than ~100 lines of JSX
- Import from `src/features/` deeply (import the public API)

### `src/components/` — Shared UI Primitives

- Fully dumb, data-driven components
- Accept props, emit events via callbacks
- No store access, no navigation, no business logic
- Fully typed props interface with JSDoc comments

### `src/features/` — Domain Business Logic

- Pure TypeScript functions with no React dependencies
- Input → transform → output, fully testable
- Subdirectories: `analysis/`, `recommendations/`
- Example: `cosmeticHeuristics.ts` takes a pixel sample and returns a `SkinMetrics` object

### `src/hooks/` — Reusable Stateful Behavior

- Custom hooks that can be shared across screens
- May access stores
- Must start with `use` prefix
- Example: `useTheme()`, `useCameraPermission()`

### `src/store/` — Global State Slices

- One Zustand slice per domain: `useScanStore`, `useProfileStore`
- Each slice owns: state shape + actions + persistence calls
- NO UI logic, NO styling

### `src/utils/` — Pure Utility Functions

- No React, no Zustand, no side effects
- Example: `safeStorage.ts`, date formatters, validators

## Dependency Rules (The Golden Rule)

```
app → store → features → utils → types
app → components (UI only)
components → utils, constants (never store, never features directly)
```

No lower layer may import from a higher layer.

## Violation Checklist

When reviewing code, flag:

- [ ] Store import inside `src/components/`?
- [ ] `router.push` inside `src/components/` or `src/features/`?
- [ ] Business logic (conditionals, transformations) in a route file?
- [ ] `StyleSheet.create` inside `src/features/`?
- [ ] More than 2 levels of prop drilling without lifting to store?

## Refactoring Pattern

When a screen file grows beyond ~120 lines:

1. Extract the JSX section into `src/components/<feature>/FeatureCard.tsx`
2. Extract data transformations into `src/features/<domain>/helpers.ts`
3. Extract complex useEffect logic into `src/hooks/use<Feature>.ts`
4. Keep the route file as a 20–40 line orchestrator
