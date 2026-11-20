---
name: react-native-expo
description: Expo SDK best practices, Expo Go vs dev build distinctions, native module linking, EAS Build, performance patterns, and platform-specific code for this project.
---

# React Native / Expo Skill

> Always fetch versioned docs before writing Expo/EAS code:
> `https://docs.expo.dev/versions/v58.0.0/`

## This Project's Stack

- **Expo SDK**: 58
- **React Native**: 0.88.1
- **Package manager**: npm (`npm install`, NOT yarn/pnpm/bun)
- **Navigation**: Expo Router (file-based, `src/app/`)
- **State**: Zustand + SafeStorage
- **Camera**: SafeCamera wrapper (`src/components/camera/SafeCamera.tsx`)

## Expo Go vs Dev Build

| Capability              | Expo Go          | Dev Build        |
| ----------------------- | ---------------- | ---------------- |
| Hot reload              | ✅               | ✅               |
| AsyncStorage            | ❌ (null)        | ✅               |
| expo-camera (hardware)  | ❌               | ✅               |
| SafeStorage (in-memory) | ✅               | ✅               |
| SafeCamera (UI only)    | ✅               | ✅               |
| New native packages     | ❌ Needs rebuild | ✅ after rebuild |

**When a new native package is added**: User must run `npx expo run:android` to rebuild and link it.

## Package Installation Rule

```bash
# ALWAYS use npx expo install — it resolves SDK-compatible versions
npx expo install <package-name>

# NOT:
npm install <package>   # ❌ May install incompatible version
```

## Expo Router Patterns

### Route Parameters

```tsx
// Passing params
router.push({ pathname: '/scan/results', params: { scanId: id } });

// Reading params (always strings)
const { scanId } = useLocalSearchParams<{ scanId: string }>();
```

### Programmatic Navigation

```tsx
import { router } from 'expo-router';
router.push('/scan/camera');
router.replace('/'); // Replace history
router.back(); // Go back
```

### Tab Layout

```tsx
// src/app/(tabs)/_layout.tsx
<Tabs>
  <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ... }} />
  <Tabs.Screen name="routine" options={{ title: 'Routine' }} />
  <Tabs.Screen name="Profile" options={{ title: 'Profile' }} />
</Tabs>
```

## Performance Best Practices

### Lists

```tsx
// Use FlashList for large lists (install: npx expo install @shopify/flash-list)
import { FlashList } from '@shopify/flash-list';
<FlashList data={items} renderItem={renderItem} estimatedItemSize={80} />;

// NOT FlatList for lists > 50 items
```

### Images

```tsx
// expo-image has caching and progressive loading built in
import { Image } from 'expo-image';
<Image source={{ uri }} contentFit="cover" transition={200} />;
```

### Animations

```tsx
// expo-reanimated for 60fps (runs on UI thread)
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
```

## Platform-Specific Code

```tsx
import { Platform } from 'react-native';

// Platform check
const isIOS = Platform.OS === 'ios';

// Platform-specific styles
const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
    android: { elevation: 4 },
  }),
});

// Platform-specific files (auto-selected by Metro):
// component.ios.tsx  → used on iOS
// component.android.tsx → used on Android
```

## Useful Expo CLI Commands

```bash
npx expo start              # Start dev server
npx expo start -c           # Clear Metro cache and start
npx expo run:android        # Build and run on Android (required for native modules)
npx expo export --platform android  # Test production bundle
npx expo-doctor             # Diagnose version issues
npx expo install --fix      # Fix incompatible package versions
npx tsc --noEmit            # TypeScript check
npx expo lint               # ESLint check
```

## Common Pitfalls

- ❌ Using `baseUrl` in `tsconfig.json` → deprecated in TypeScript 6, use `tsconfigPaths: true` in `app.json`
- ❌ Direct `AsyncStorage` import → use `src/utils/safeStorage.ts`
- ❌ Using `require('expo-camera')` directly → use `SafeCamera` wrapper
- ❌ Putting routes outside `src/app/` → Expo Router won't pick them up
- ❌ Creating `ios/` or `android/` directories manually → use Continuous Native Generation via `app.json`
