---
name: component-architecture
description: >-
  Use this skill when structuring, refactoring, or decomposing code into clean, modular,
  reusable multi-component architectures in Expo and React Native. Enforces atomic design,
  screen vs component separation, custom hooks, and prop contracts.
---

# Multi-Component Architecture & Modularity Skill

This skill enforces strict component decomposition and architectural separation of concerns for React Native / Expo projects.

## 1. Architectural Directory Layout

Ensure application code is modularized into distinct layers:

```text
src/
├── app/                  # Expo Router route definitions ONLY
│   ├── (tabs)/
│   │   ├── _layout.tsx   # Tab navigation configuration
│   │   ├── index.tsx     # Route screen (thin orchestrator)
│   │   └── profile.tsx   # Route screen (thin orchestrator)
│   └── _layout.tsx       # Root stack navigation
├── components/           # Reusable UI components
│   ├── ui/               # Atomic primitives (Button, Card, Input, Text, Badge, Avatar)
│   └── composite/        # Domain/feature components composed from primitives
├── hooks/                # Custom business logic & data hooks (useProfile, useTheme)
├── constants/            # Theme tokens, layout constants, API config
├── types/                # Shared TypeScript types and interfaces
└── utils/                # Pure helper functions and formatters
```

## 2. Separation of Concerns (The Thin Screen Rule)

Route files under `src/app/` must **never** contain hundreds of lines of inline UI, business logic, or complex state.

- **Route Screen Responsibility**:
  1. Retrieve route parameters (`useLocalSearchParams`).
  2. Invoke domain hooks for data and actions.
  3. Orchestrate composite components.
  4. Wire navigation handlers (`router.push`, `router.back`).
- **Target Size**: Screens should ideally be under **100 lines of code**.

## 3. Atomic & Reusable Component Standards

Every component in `src/components/` must adhere to these rules:

1. **Explicit TypeScript Interface**:
   ```tsx
   export interface ButtonProps {
     title: string;
     onPress: () => void;
     variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     loading?: boolean;
     icon?: React.ReactNode;
   }
   ```
2. **Single Responsibility**: One component per file (with small private sub-primitives allowed if tightly coupled).
3. **Pure Presentational Where Possible**: Components should receive data and callbacks via props rather than directly coupling to global route state or raw network calls.
4. **Extract Custom Hooks**: If a screen has multiple `useState`, `useEffect`, or complex calculations, extract them to a dedicated hook:
   - Example: `src/hooks/useUserProfile.ts` instead of embedding fetching and state logic in `Profile.tsx`.

## 4. Decomposition Checklist for Refactoring Large Files

When refactoring a large or monolithic screen:

1. **Identify Primitives**: Extract reusable elements (Cards, Headers, List Items, Buttons) into `src/components/ui/` or `src/components/<feature>/`.
2. **Extract Business Logic**: Move state management, validation, and async operations into `src/hooks/`.
3. **Move Theme Values**: Extract hardcoded colors, padding, and font sizes into `src/constants/theme.ts`.
4. **Define Types**: Place interfaces for data models and component props into `src/types/`.
5. **Re-assemble Screen**: Replace monolithic code in `src/app/` with clean composition of your modular components.
