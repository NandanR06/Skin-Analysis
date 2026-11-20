---
name: mobile-ui-design
description: >-
  Use this skill whenever designing, building, or styling mobile UI components or screens
  in Expo and React Native. Guides modern visual hierarchy, design tokens, responsive layouts,
  accessible typography, color themes, and smooth animations.
---

# Mobile UI Design System & Styling Skill

This skill provides guidelines and patterns for creating polished, modern, production-grade user interfaces for Expo and React Native applications.

## 1. Visual Hierarchy & Design Tokens

Establish consistent design tokens instead of hardcoding random magic numbers or inline colors.

### Token Definitions (`src/constants/theme.ts`)

Always separate tokens into:

- **Colors**: Semantic tokens for background, surface, card, primary, secondary, text, borders, and status colors (success, error, warning, info). Support both Light and Dark modes.
- **Spacing**: Multiples of 4/8pt grid:
  - `xs`: 4
  - `sm`: 8
  - `md`: 16
  - `lg`: 24
  - `xl`: 32
  - `2xl`: 48
- **Typography Scale**:
  - `display`: font size 32, bold, line height 40
  - `h1`: font size 24, semi-bold, line height 30
  - `h2`: font size 20, semi-bold, line height 26
  - `bodyLarge`: font size 16, regular/medium, line height 22
  - `body`: font size 14, regular, line height 20
  - `caption`: font size 12, regular, line height 16
- **Radii**:
  - `sm`: 6
  - `md`: 12
  - `lg`: 16
  - `pill`: 9999

## 2. Layout & SafeArea Rules

1. **Safe Area Handling**:
   - Always wrap root screens with `SafeAreaView` from `react-native-safe-area-context` or use `useSafeAreaInsets()`.
   - Never let content clip under notches, status bars, or home indicator bars.
2. **Platform Consistency**:
   - Use `Platform.select()` for OS-specific nuances (e.g. elevation on Android vs shadowColor/shadowOffset on iOS).
   - Use standard OS font families or custom loaded fonts with `expo-font`.
3. **Touch Targets**:
   - Every interactive element (buttons, icons, chips) must have a minimum touch target size of **44x44 pt** (iOS) / **48x48 dp** (Android). Use `hitSlop` when visual size is smaller.

## 3. Component Styling Standards

- **No Inline Styles in Render**: Avoid `<View style={{ margin: 10, ... }}>` in production components. Use `StyleSheet.create({ ... })` or typed token style factories.
- **Pressable States**: Prefer `Pressable` over `TouchableOpacity`. Implement visual feedback on press:
  ```tsx
  <Pressable
    style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed,
    ]}
  >
  ```
- **Image Handling**: Use `expo-image` (`Image` from `'expo-image'`) for automatic caching, blurhash placeholders, and superior memory performance.

## 4. Micro-interactions & Animations

- Use `react-native-reanimated` for 60/120fps fluid UI animations running on the UI thread.
- For glassmorphism or blur effects, use `expo-glass-effect` or blur views.
- Provide subtle haptic feedback for user actions using `expo-haptics` when applicable.

## 5. Verification Checklist

- [ ] Does the UI adapt gracefully to dark and light modes?
- [ ] Are touch targets at least 44x44pt?
- [ ] Is content protected by safe area insets?
- [ ] Are all colors and spacings derived from design tokens?
- [ ] Is `expo-image` used for raster images?
