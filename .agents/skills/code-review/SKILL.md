---
name: code-review
description: >-
  Use this skill to perform automated or manual code reviews, auditing React Native and
  Expo code for performance, architecture, TypeScript safety, security, and adherence to clean
  code standards.
---

# Code Review & Quality Assurance Skill

This skill provides a systematic review rubric for checking pull requests and code modifications in Expo and React Native codebases.

## 1. Review Dimensions

### A. Mobile Performance & Re-render Optimization

- **Inline Objects & Functions**: Ensure inline functions and objects are not passed directly to high-frequency list items (use `useCallback`, `useMemo`).
- **Lists**: Verify that large data sets use `FlashList` or `FlatList` with `keyExtractor` and `getItemLayout` (or estimated size), not `.map()` inside a `ScrollView`.
- **Images**: Verify `expo-image` is used instead of default `react-native` Image, with explicit dimensions or aspect ratio.
- **Heavy Computations**: Complex calculations or filtering should be memoized with `useMemo`.

### B. Architectural Hygiene & Multi-Component Modularity

- **Separation of Concerns**: Check that route files (`src/app/`) do not contain raw SQL, direct API fetching loops, or massive style sheets.
- **Component File Size**: Flag any single component file exceeding 150-200 lines. Recommend extracting sub-components into `src/components/`.
- **Reusable Primitives**: Check if buttons, inputs, or typography are duplicated across screens rather than using shared UI primitives.

### C. TypeScript Safety & Typing Rigor

- **No `any`**: Flag any implicit or explicit `any` usage. Require precise interface or generic types.
- **Strict Null Checks**: Guard against `undefined` or `null` property access on API payloads and route params.
- **Props Typing**: Every component must declare explicit prop types with clear optionality (`?`).

### D. Expo & Native Ecosystem Rules

- **Expo Version Compatibility**: Cross-check packages with Expo SDK compatibility (`npx expo-doctor`, `npx expo install <pkg>`).
- **Routing**: Ensure Expo Router navigation rules are followed (`Link`, `router.push`, `useLocalSearchParams`).
- **SafeArea**: Check that screens handle safe areas and status bar overlaps on devices with dynamic islands or notches.

### E. Code Style, Linting & Formatting

- Code passes Prettier formatting check: `npx prettier --check .`
- Code passes TypeScript typecheck: `npx tsc --noEmit`
- Code passes ESLint: `npx expo lint`

## 2. Review Output Format

When conducting a code review, report findings organized by severity:

1. 🚨 **Blockers (Critical)**: Crashes, memory leaks, missing error handling, type violations.
2. ⚠️ **Warnings (Important)**: Performance bottlenecks, missing modularization, un-memoized callbacks in lists.
3. 💡 **Suggestions (Nice to Have)**: Readability improvements, minor stylistic consistency, micro-interaction polish.
4. ✅ **Positive Notes**: Highlights of well-structured code, clean decomposition, or excellent typing.
