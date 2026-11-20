---
name: mobile-testing
description: Testing strategy for this Expo app using jest-expo and React Native Testing Library. Unit tests for features, hook tests, component render tests, and store tests.
---

# Mobile Testing Skill

## Test Stack

- **jest-expo**: Pre-configured Jest preset for Expo (already in devDependencies)
- **@testing-library/react-native**: Component testing
- **@testing-library/jest-native**: Custom matchers (`.toBeVisible()`, `.toHaveTextContent()`)

## Running Tests

```bash
npx jest                    # All tests
npx jest --watch            # Watch mode
npx jest src/features       # Specific folder
npx jest --coverage         # Coverage report
npx jest -t "analyzeShine"  # Specific test name
```

## Test File Locations

```
src/
  features/
    analysis/__tests__/cosmeticHeuristics.test.ts
    recommendations/__tests__/routineBuilder.test.ts
  hooks/__tests__/use-theme.test.ts
  components/ui/__tests__/AppButton.test.tsx
  store/__tests__/useScanStore.test.ts
```

## Unit Tests — Feature Logic (Highest Priority)

Feature files in `src/features/` are pure TypeScript functions — test them thoroughly:

```ts
import { buildRoutine } from '../routineBuilder';

describe('buildRoutine', () => {
  const mockProfile = {
    skinType: 'oily',
    concerns: ['shine', 'redness'],
    sensitivities: [],
  };

  it('includes niacinamide for oily skin', () => {
    const routine = buildRoutine(mockProfile, { overallScore: 65 });
    const ingredients = routine.morning.map(step => step.ingredient);
    expect(ingredients).toContain('Niacinamide');
  });

  it('excludes potential irritants for sensitive skin', () => {
    const sensitiveProfile = { ...mockProfile, sensitivities: ['fragrance'] };
    const routine = buildRoutine(sensitiveProfile, { overallScore: 65 });
    routine.morning.forEach(step => {
      expect(step.ingredient).not.toBe('Fragrance');
    });
  });
});
```

## Store Tests

```ts
import { renderHook, act } from '@testing-library/react-native';
import { useScanStore } from '../useScanStore';

describe('useScanStore', () => {
  beforeEach(() => {
    useScanStore.getState().reset?.();
  });

  it('sets currentReport after scan', () => {
    const { result } = renderHook(() => useScanStore());
    act(() => {
      result.current.setCurrentReport(mockReport);
    });
    expect(result.current.currentReport?.overallScore).toBe(mockReport.overallScore);
  });
});
```

## Component Tests

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { AppButton } from '../app-button';

it('calls onPress when tapped', () => {
  const handler = jest.fn();
  const { getByText } = render(<AppButton title="Scan" onPress={handler} />);
  fireEvent.press(getByText('Scan'));
  expect(handler).toHaveBeenCalledOnce();
});
```

## Mock Setup — `jest.setup.ts`

```ts
// Mock AsyncStorage (not available in Expo Go / test env)
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock expo-camera
jest.mock('expo-camera', () => ({
  CameraView: 'CameraView',
  useCameraPermissions: () => [{ granted: true }, jest.fn()],
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  useLocalSearchParams: () => ({}),
}));
```

## Coverage Targets

| Layer                | Target                       |
| -------------------- | ---------------------------- |
| `src/features/`      | 80%+                         |
| `src/store/`         | 70%+                         |
| `src/components/ui/` | 60%+                         |
| `src/hooks/`         | 60%+                         |
| `src/app/`           | 30%+ (integration preferred) |
