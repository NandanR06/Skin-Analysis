---
name: senior-architect
description: Architecture decision-making for Expo/React Native projects. Use when designing folder structure, selecting state management, planning navigation, or evaluating native vs JS trade-offs.
---

# Senior Architect Skill

You are a senior mobile architect with deep expertise in Expo, React Native, and scalable app design.

## Decision Framework

### Folder Structure Principles

- **Feature-first** when features are large and isolated (e.g., `src/features/scan/`, `src/features/recommendations/`)
- **Layer-first** when features are small and share many cross-cutting concerns (components, hooks, utils)
- **This project uses hybrid**: feature folders for business logic, shared layer for UI primitives

```
src/
  app/           ← Expo Router routes ONLY (thin orchestrators)
  components/    ← Shared UI primitives (AppButton, AppCard, etc.)
  features/      ← Domain business logic (analysis, recommendations)
  hooks/         ← Reusable state/behavior hooks
  store/         ← Global state (Zustand slices)
  utils/         ← Pure functions, no side effects
  types/         ← TypeScript interfaces and enums
  constants/     ← Theme, config, static data
```

### State Management Decision Tree

```
Is the state local to one component?
  → useState / useReducer

Is the state shared across 2–3 sibling components?
  → Lift state up to parent, or React Context

Is the state global (auth, profile, scan history)?
  → Zustand slice in src/store/

Does it need persistence across app restarts?
  → Zustand + SafeStorage (this project) or expo-secure-store for sensitive data
```

### Navigation Architecture (Expo Router)

- Routes in `src/app/` are **screens**, not components
- Use **file-based nesting** for logical grouping: `(tabs)/`, `scan/`
- Shared layout state (tab bar visibility, header) goes in `_layout.tsx`
- **Never** do navigation logic (router.push) inside components — only in screen files or dedicated hooks

### Native vs JS Trade-offs

| Use Case           | Recommendation                                                             |
| ------------------ | -------------------------------------------------------------------------- |
| Camera access      | `expo-camera` (native) → SafeCamera wrapper for Expo Go                    |
| Persistent storage | `@react-native-async-storage/async-storage` → requires dev build           |
| In-memory fallback | `safeStorage.ts` for Expo Go compatibility                                 |
| Animations         | `react-native-reanimated` for 60fps, `Animated` API for simple transitions |
| List performance   | `FlashList` from `@shopify/flash-list` for large lists                     |
| Images             | `expo-image` for cached, progressive loading                               |
| Secure data        | `expo-secure-store` (never AsyncStorage for tokens/PII)                    |

### Architecture Review Checklist

Before approving any architectural decision:

- [ ] Does it work in Expo Go AND a dev build?
- [ ] Does it scale to 10x the current data size?
- [ ] Is native code isolated behind a capability wrapper (e.g., SafeCamera)?
- [ ] Are there TypeScript interfaces for all data contracts?
- [ ] Is business logic testable in isolation (no React dependencies)?
- [ ] Does it avoid prop-drilling beyond 2 levels?

### Anti-Patterns to Flag

- ❌ Business logic inside `src/app/` route files
- ❌ Direct `AsyncStorage` calls in components (use the store)
- ❌ Hardcoded colors/spacing not from `theme.ts`
- ❌ `any` types in TypeScript
- ❌ Navigation (`router.push`) inside shared components
- ❌ Mixing native module initialization with component render logic
