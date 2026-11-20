---
name: tdd
description: Test-driven development for Expo/React Native. Write failing tests first, then implement, then refactor. Covers unit, hook, and component tests with jest-expo.
---

# TDD (Test-Driven Development) Skill

## TDD Cycle for This Project

```
RED   → Write a failing test that describes desired behavior
GREEN → Write the minimum code to make it pass
BLUE  → Refactor — clean up without breaking tests
```

## Test Stack

- **Runner**: `jest-expo` (pre-configured for Expo)
- **Components**: `@testing-library/react-native`
- **Mocks**: `jest.mock()` for native modules

## Project Test File Conventions

- Unit tests: `src/features/<domain>/__tests__/<file>.test.ts`
- Hook tests: `src/hooks/__tests__/<hook>.test.ts`
- Component tests: `src/components/<dir>/__tests__/<Component>.test.tsx`

## Running Tests

```bash
npx jest                        # Run all tests
npx jest --watch                # Watch mode
npx jest src/features           # Run specific folder
npx jest --coverage             # Coverage report
```

## Writing Unit Tests — Feature Logic

```ts
// src/features/analysis/__tests__/cosmeticHeuristics.test.ts
import { analyzeShine } from '../cosmeticHeuristics';

describe('analyzeShine', () => {
  it('returns "High" when luminance exceeds threshold', () => {
    const result = analyzeShine({ luminance: 0.85, zone: 'tZone' });
    expect(result.level).toBe('High');
    expect(result.score).toBeGreaterThan(70);
  });

  it('returns "Low" for matte skin luminance', () => {
    const result = analyzeShine({ luminance: 0.2, zone: 'cheek' });
    expect(result.level).toBe('Low');
  });
});
```

## Writing Hook Tests

```ts
// src/hooks/__tests__/use-theme.test.ts
import { renderHook } from '@testing-library/react-native';
import { useTheme } from '../use-theme';

describe('useTheme', () => {
  it('returns light colors by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.colors.background).toBeDefined();
  });
});
```

## Writing Component Tests

```tsx
// src/components/ui/__tests__/AppButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppButton } from '../app-button';

describe('AppButton', () => {
  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<AppButton title="Start Scan" onPress={onPress} />);
    fireEvent.press(getByText('Start Scan'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(<AppButton title="Disabled" onPress={onPress} disabled />);
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

## Mocking Native Modules

```ts
// In jest.setup.ts or at top of test file
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-camera', () => ({
  Camera: { requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }) },
}));
```

## TDD Priority for This Project

1. **High value**: `src/features/analysis/cosmeticHeuristics.ts` — pure functions, deterministic
2. **High value**: `src/features/recommendations/routineBuilder.ts` — business logic
3. **Medium**: `src/store/useScanStore.ts` — test actions and state transitions
4. **Medium**: `src/components/ui/AppButton`, `AppCard` — render + interaction
5. **Lower**: Screen files — integration tests are more valuable here

## Coverage Goals

- Feature logic (`src/features/`): **80%+**
- Store actions (`src/store/`): **70%+**
- UI primitives (`src/components/ui/`): **60%+**
- Routes (`src/app/`): **integration tests preferred over unit tests**
