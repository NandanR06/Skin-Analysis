---
name: mobile-ui-design
description: Mobile-first UI design principles for this Expo app. Covers design tokens, touch targets, safe areas, typography, color palette, and spacing system from theme.ts.
---

# Mobile UI Design Skill

## Design System — `src/constants/theme.ts`

Always use these tokens. Never hardcode values:

### Spacing

```ts
import { Spacing } from '../../constants/theme';
// Spacing.xs = 4, sm = 8, md = 12, lg = 16, xl = 24, xxl = 32
```

### Radii

```ts
import { Radii } from '../../constants/theme';
// Radii.sm = 6, md = 10, lg = 16, xl = 24, full = 999
```

### Typography

```ts
import { Typography } from '../../constants/theme';
// Typography.display, h1, h2, h3, body, caption
```

### Colors

Access via the theme hook — supports dark/light mode:

```ts
const { colors } = useTheme();
// colors.background, text, muted, primary, primaryForeground
// colors.secondary, border, card, error, warning, success
```

## Touch Target Rules

- Minimum touch target: **44×44 pt** (Apple HIG / Material guidelines)
- Use `minHeight: 44` and `minWidth: 44` on all interactive elements
- Add `hitSlop` for small icons: `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`

## Safe Area Handling

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
// ALWAYS wrap screen content in SafeAreaView, not the native SafeAreaView
<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
```

## Component Hierarchy (Shared UI Primitives)

All shared components live in `src/components/ui/` and are exported via `index.ts`:

| Component          | Usage                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| `AppText`          | All text — use variant prop: `display`, `h1`, `h2`, `h3`, `body`, `caption` |
| `AppButton`        | All buttons — variant: `primary`, `secondary`, `outline`, `ghost`           |
| `AppCard`          | Elevated card containers with optional `elevated` prop                      |
| `AppBadge`         | Status chips — variant: `info`, `warning`, `success`, `error`               |
| `AppProgressBar`   | Metric progress (0–100) with color variants                                 |
| `MetricCard`       | Single metric display with label, value, and optional icon                  |
| `FaceGuideOverlay` | Face positioning oval overlay for camera screens                            |

## Layout Patterns

### Standard Screen Layout

```tsx
<SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
  <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
    {/* content */}
  </ScrollView>
</SafeAreaView>;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: Spacing.lg, gap: Spacing.lg },
});
```

### Card Grid

```tsx
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
  {items.map(item => (
    <MetricCard key={item.id} {...item} style={{ flex: 1, minWidth: 140 }} />
  ))}
</View>
```

## Color Palette — Botanical Skincare Theme

- Primary: Sage green `#6B8F71`
- Secondary: Warm cream `#F5EFE7`
- Accent: Terracotta `#C17F5A`
- Background: Off-white `#FAFAF8`
- Text: Charcoal `#2C2C2C`

## UI Anti-Patterns

- ❌ Hardcoded hex colors not from `theme.ts`
- ❌ Hardcoded px values for spacing/radius — use tokens
- ❌ Touch targets smaller than 44pt
- ❌ Missing `safe-area-context` wrapper
- ❌ Using `Text` directly instead of `AppText`
- ❌ Inline styles for anything other than dynamic values
