---
name: browser-preview
description: Test the Expo web build in a browser using the browser subagent. Use to visually verify UI changes without a physical device or emulator.
---

# Browser Preview Skill

## When to Use

- Verify UI layout changes quickly without rebuilding the APK
- Check that routing works (tab navigation, screen transitions)
- Spot visual regressions in components
- Confirm the web platform renders correctly

> Note: Web platform has some differences from Android/iOS. Camera and native modules behave differently on web.

## Starting the Dev Server for Web

```bash
# Start with web support
set EXPO_NO_TELEMETRY=1 && npx expo start --web

# Or export a static build
set EXPO_NO_TELEMETRY=1 && npx expo export --platform web --output-dir dist-web
```

## Using the Browser Subagent

When you need to visually verify the app:

1. Start the Metro dev server on `localhost:8081`
2. Delegate to the browser subagent with:

```
Open http://localhost:8081 in the browser.
Navigate to [specific screen].
Verify: [describe what to check].
Report back: does the layout look correct? Any visual errors or console errors?
```

## Expo Web Limitations vs Native

| Feature        | Expo Go / Native       | Expo Web               |
| -------------- | ---------------------- | ---------------------- |
| Camera         | SafeCamera wrapper     | Not available          |
| AsyncStorage   | SafeStorage in-memory  | localStorage (native)  |
| SafeAreaView   | Hardware notch support | CSS padding simulation |
| Native shadows | `elevation` (Android)  | CSS box-shadow         |
| Expo Router    | File-based routing     | Same! Works great      |

## Component Check on Web

When a new component is added, verify on web:

- Text renders at correct size
- Buttons are clickable with correct size
- Cards render with correct shadows
- Colors match the design system

## Visual Regression Workflow

1. Start dev server: `npx expo start --web`
2. Open browser subagent → navigate to `localhost:8081`
3. Walk through tabs: Home → Routine → Profile
4. Navigate to scan flow: `/scan/camera` → `/scan/processing` → `/scan/results`
5. Report any layout issues
