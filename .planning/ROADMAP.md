# Roadmap & Milestones (GSD)

## Phase 1: Tooling, Architecture & Foundation [COMPLETED]

- [x] Configure Prettier, Husky, and lint-staged
- [x] Establish modular directory structure (`src/components/`, `src/features/`, `src/store/`, `src/types/`)
- [x] Attach skills: `get-shit-done`, `mobile-ui-design`, `component-architecture`, `mobile-testing`, `code-review`, `browser-preview`, `task-execution`

## Phase 2: Face Scan & Cosmetic Analysis Core [COMPLETED]

- [x] Install Expo SDK 58 modules: `expo-camera`, `zustand`, `@react-native-async-storage/async-storage`, `react-native-svg`, `expo-image-picker`
- [x] Define domain contracts: `scan.ts`, `profile.ts`, `recommendations.ts`
- [x] Implement UI primitives: `AppBadge`, `AppProgressBar`, `MetricCard`, `FaceGuideOverlay`, `AppButton`, `AppCard`, `AppText`
- [x] Implement on-device Image Quality Checker (`qualityChecker.ts`)
- [x] Implement Cosmetic Analysis Heuristics (`cosmeticHeuristics.ts`)
- [x] Build Sample Scan Presets for testing (`sampleScans.ts`)
- [x] Build Curated Ingredient Database & Personalized AM/PM Routine Generator (`ingredientDatabase.ts`, `routineBuilder.ts`)
- [x] Implement Offline-First Zustand Stores (`useScanStore.ts`, `useProfileStore.ts`)
- [x] Build Screens:
  - [x] Dashboard (`src/app/(tabs)/index.tsx`)
  - [x] Skincare Routine Planner (`src/app/(tabs)/routine.tsx`)
  - [x] Profile, History & Privacy Controls (`src/app/(tabs)/Profile.tsx`)
  - [x] Live Camera & Framing Screen (`src/app/scan/camera.tsx`)
  - [x] Multi-Stage Analysis Pipeline (`src/app/scan/processing.tsx`)
  - [x] Full Cosmetic Report (`src/app/scan/results.tsx`)
  - [x] Skin Context Questionnaire (`src/app/questionnaire.tsx`)

## Phase 3: Testing & External Sync [NEXT]

- [ ] Automated unit test suites with Jest & React Native Testing Library
- [ ] Connect optional Node.js/Express + MongoDB synchronization API
