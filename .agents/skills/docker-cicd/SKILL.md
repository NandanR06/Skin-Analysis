---
name: docker-cicd
description: EAS Build configuration, CI/CD with GitHub Actions, running expo export and quality checks in CI, and secrets management via EAS for this Expo project.
---

# Docker & CI/CD Skill

> This project uses EAS (Expo Application Services) for cloud builds and CI/CD.
> No Docker or local Xcode/Android Studio required.

## EAS Build Basics

### Install EAS CLI

```bash
npm install -g eas-cli
# or for this project:
npx eas-cli@latest <command>
```

### Initialize EAS

```bash
npx eas-cli@latest build:configure
# Creates eas.json with build profiles
```

### Standard `eas.json` Configuration

```json
{
  "cli": { "version": ">= 14.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "distribution": "store",
      "android": { "buildType": "app-bundle" }
    }
  },
  "submit": {
    "production": {
      "android": { "serviceAccountKeyPath": "./path/to/key.json" }
    }
  }
}
```

### Build Commands

```bash
# Development build (enables native modules like AsyncStorage, Camera)
npx eas-cli@latest build --profile development --platform android

# Preview build (internal testing)
npx eas-cli@latest build --profile preview --platform android

# Production build
npx eas-cli@latest build --profile production --platform android

# Over-the-air update (JS-only changes, no rebuild needed)
npx eas-cli@latest update --channel production --message "Fix: skin analysis metrics"
```

## GitHub Actions CI Pipeline

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npx expo lint

      - name: Format check
        run: npm run format:check

      - name: Test
        run: npx jest --ci --coverage

      - name: Expo export (bundle check)
        run: EXPO_NO_TELEMETRY=1 npx expo export --platform android --output-dir dist
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

  build-preview:
    needs: quality
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      - name: Build preview APK
        run: eas build --profile preview --platform android --non-interactive
```

## Secrets Management with EAS

```bash
# Set a secret for all builds
npx eas-cli@latest secret:create --scope project --name SKIN_API_KEY --value "your-key"

# List secrets
npx eas-cli@latest secret:list

# Access in code via expo-constants (bundled at build time)
import Constants from 'expo-constants';
const apiKey = Constants.expoConfig?.extra?.skinApiKey;
```

In `app.json`:

```json
{
  "expo": {
    "extra": {
      "skinApiKey": "$SKIN_API_KEY"
    }
  }
}
```

## OTA Updates Strategy

- Use `eas update` for JS-only changes (logic, styling, text)
- Require a new `eas build` when: new native packages added, `app.json` native config changes, Expo SDK version bump
- Channels: `development` → `staging` → `production`

## Pre-commit Gates (Already Configured)

The `.husky/pre-commit` hook runs `lint-staged` which checks:

- Prettier formatting on staged files
- ESLint autofix on staged `.ts`/`.tsx` files

Add typecheck to CI — not pre-commit (too slow for interactive commits).
