---
name: refactoring
description: Split large files into focused modules. Extract components, hooks, and utilities. Apply to any file over 150 lines or with mixed concerns.
---

# Refactoring Skill

## When to Refactor

Trigger this skill when any file:

- Exceeds **150 lines**
- Mixes UI rendering with data transformation
- Contains inline `StyleSheet.create` with more than 10 styles
- Has deeply nested JSX (more than 4 levels)
- Duplicates logic found in another file

## Refactoring Playbook

### Step 1 — Identify what to extract

Read the file and label each section:

- UI structure → extract to component
- Data transform / computation → extract to feature util
- useState + useEffect logic → extract to custom hook
- Hardcoded values → move to `theme.ts` or `constants/`
- Inline styles → move to `StyleSheet.create` block at bottom

### Step 2 — Extract Sub-Components

```tsx
// Before: everything in HomeScreen
function HomeScreen() {
  return (
    <View>
      {/* 40 lines of hero card JSX */}
      {/* 50 lines of scan result JSX */}
    </View>
  );
}

// After: clean orchestrator
function HomeScreen() {
  return (
    <View>
      <HeroScanCard onPress={() => router.push('/scan/camera')} />
      <LatestScanCard report={currentReport} />
    </View>
  );
}
```

### Step 3 — Extract Custom Hooks

```ts
// Before: logic in component
const [permissionStatus, setPermissionStatus] = useState(null);
useEffect(() => {
  Camera.requestPermissionsAsync().then(r => setPermissionStatus(r.status));
}, []);

// After: hooks/use-camera-permission.ts
export function useCameraPermission() {
  const [status, setStatus] = useState<PermissionStatus | null>(null);
  useEffect(() => {
    Camera.requestPermissionsAsync().then(r => setStatus(r.status));
  }, []);
  return status;
}
```

### Step 4 — Create Barrel Exports

Every folder must have an `index.ts`:

```ts
// src/components/ui/index.ts
export * from './app-text';
export * from './app-button';
export * from './app-card';
```

### Step 5 — Move Styles

```ts
// Always use StyleSheet.create at the bottom of the file
const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg },
  // ...
});
```

### Step 6 — Verify After Refactoring

Run these after every refactoring session:

```bash
npx tsc --noEmit       # No type errors
npx expo lint          # No lint errors
```

Then verify the Metro bundler still resolves all imports:

```bash
set EXPO_NO_TELEMETRY=1 && npx expo export --platform android --output-dir dist-check
```

## This Project's Refactoring Targets

- `src/app/(tabs)/index.tsx` — if it grows beyond 120 lines, extract `HeroScanCard`, `QuestionnaireBanner`, `LatestScanCard`
- `src/features/analysis/cosmeticHeuristics.ts` — if logic grows, split into `shineAnalysis.ts`, `rednessAnalysis.ts`, `textureAnalysis.ts`
- `src/store/useScanStore.ts` — keep actions and state in the slice; move heavy computations to `src/features/`
