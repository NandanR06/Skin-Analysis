---
name: mobile-testing
description: >-
  Use this skill to configure, write, and execute unit, component, and hook tests for Expo
  and React Native applications using Jest and React Native Testing Library.
---

# Mobile Testing & Test-Driven Skill

This skill guides the implementation and execution of reliable unit and component tests for React Native and Expo applications.

## 1. Testing Stack & Setup

- **Runner**: `jest` with `jest-expo` preset.
- **Component Testing**: `@testing-library/react-native`.
- **User Interactions**: `@testing-library/react-native` `userEvent` or `fireEvent`.

### Typical `package.json` Test Configuration:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
  }
}
```

## 2. Component Testing Patterns

Focus on testing component behavior from the user's perspective, avoiding testing internal implementation details.

### Example: Testing a Button Component

```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders title correctly and triggers onPress', () => {
    const handlePress = jest.fn();
    render(<Button title="Submit" onPress={handlePress} />);

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeTruthy();

    fireEvent.press(buttonElement);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('disables press events when disabled prop is true', () => {
    const handlePress = jest.fn();
    render(<Button title="Disabled" onPress={handlePress} disabled />);

    const buttonElement = screen.getByText('Disabled');
    fireEvent.press(buttonElement);
    expect(handlePress).not.toHaveBeenCalled();
  });
});
```

## 3. Testing Custom Hooks

Use `renderHook` and `act` from `@testing-library/react-native`:

```tsx
import { renderHook, act } from '@testing-library/react-native';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('increments counter value', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

## 4. Best Practices Checklist

- [ ] Query elements using user-facing roles and labels (`getByRole`, `getByLabelText`, `getByText`) before fallback test IDs.
- [ ] Mock native modules (`expo-router`, `react-native-reanimated`, safe area insets) properly in setup files.
- [ ] Ensure all asynchronous updates are wrapped in `act()` or handled with `waitFor`.
- [ ] Run `npm test` before committing to ensure regression-free code.
