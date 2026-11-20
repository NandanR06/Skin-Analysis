---
name: component-architecture
description: Multi-component modular structure for Expo/React Native. Use when creating new features, splitting large screens, or designing reusable UI components.
---

# Component Architecture Skill

## Component Classification

### Level 1 — Primitive UI Components (`src/components/ui/`)

- Pure, stateless, fully controlled via props
- No store access, no navigation
- Fully typed with strict TypeScript props interface
- Documented with JSDoc
- Exported via barrel `src/components/ui/index.ts`

```tsx
interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({ title, onPress, variant = 'primary', ... }: AppButtonProps) {
  // ...
}
```

### Level 2 — Feature Components (`src/components/<feature>/`)

- Domain-specific, composed of Level 1 primitives
- May receive complex typed data objects as props
- Example: `src/components/scan/ScanResultCard.tsx`
- Still no store access — data passed from screen

### Level 3 — Screen Components (`src/app/`)

- Expo Router routes — coordinate Level 2 components
- Access stores with `useXxxStore()`
- Handle navigation with `router.push()`
- Keep JSX lean — delegate rendering to Level 2

## File Naming Convention

- `kebab-case.tsx` for component files
- `PascalCase` for the exported component function
- `kebab-case/index.ts` for barrel exports
- `use-kebab-case.ts` for custom hooks

## Creating a New Feature Component

### Step 1 — Define the TypeScript interface

```ts
// src/types/scan.ts (or inline in component for small components)
export interface ScanResultCardProps {
  report: SkinAnalysisReport;
  onViewDetails: () => void;
}
```

### Step 2 — Create the component file

```
src/components/scan/scan-result-card.tsx
```

### Step 3 — Compose from primitives

```tsx
import { AppCard, AppText, AppButton, AppProgressBar } from '../ui';

export function ScanResultCard({ report, onViewDetails }: ScanResultCardProps) {
  return (
    <AppCard elevated>
      <AppText variant="h2">{report.summaryObservations.primaryFocus}</AppText>
      <AppProgressBar value={report.overallScore} max={100} />
      <AppButton title="View Details" onPress={onViewDetails} variant="outline" size="sm" />
    </AppCard>
  );
}
```

### Step 4 — Export from feature barrel

```ts
// src/components/scan/index.ts
export * from './scan-result-card';
```

### Step 5 — Use in screen

```tsx
// src/app/scan/results.tsx
import { ScanResultCard } from '../../components/scan';
```

## Component Composition Rules

- Max **3 props** passed more than 2 levels deep → use context or store
- Component renders only what it receives — no internal data fetching
- Error states: show fallback UI, never crash
- Loading states: use skeleton or placeholder, never undefined renders

## This Project's Component Inventory

```
src/components/
  ui/
    app-text.tsx        ← Typography
    app-button.tsx      ← Interactive button
    app-card.tsx        ← Card container
    app-badge.tsx       ← Status chip
    app-progress.tsx    ← Progress bar
    metric-card.tsx     ← Single metric display
    face-guide-overlay.tsx ← Camera overlay
    index.ts            ← Barrel export
  camera/
    SafeCamera.tsx      ← Native module safe wrapper
```
