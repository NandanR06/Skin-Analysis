---
name: browser-preview
description: >-
  Use this skill to visually test, inspect, and interact with the Expo application in a browser
  using Antigravity's built-in browser subagent and Chrome DevTools.
---

# Browser UI Preview & Verification Skill

This skill integrates Antigravity's built-in `browser` subagent to perform live browser-driven verification of Expo web screens and responsive layouts.

## When to Use

- Visually inspecting rendered UI components and theme transitions (dark/light mode).
- Testing user interaction flows (clicking buttons, opening cards, navigating between tabs).
- Auditing browser console logs for warnings, unhandled errors, or missing assets.
- Checking responsiveness across mobile viewport presets (e.g. 390x844 for iPhone, 412x915 for Pixel).

## Workflow

### 1. Launch Expo Web Dev Server

Start the local server if it is not already running:

```powershell
npx expo start --web
```

Or start in the background:

```powershell
npm run web
```

### 2. Delegate to the Built-in `browser` Subagent

Use the `invoke_subagent` tool with `TypeName: "browser"`:

- **Role**: `Expo Web UI Verifier`
- **Prompt**: Direct the agent to `http://localhost:8081` (or your active Expo port). Instruct it to:
  - Take a screenshot of the Home and Profile tabs.
  - Test button clicks (e.g., "Get Started", "Edit Profile").
  - Verify that colors match design tokens and no red/yellow error screens appear.

### 3. Analyze Findings & Auto-Fix

- Review visual output and console messages returned by the browser subagent.
- Immediately fix any layout shifts, broken margins, or failing click handlers.
