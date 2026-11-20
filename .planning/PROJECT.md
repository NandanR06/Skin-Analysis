# Project Specification: fskin

## Vision

A high-performance, modular Expo / React Native mobile application built with Expo SDK 58, Expo Router, TypeScript, and clean atomic component architecture.

## Tech Stack

- **Framework**: Expo ~58.0.26 / React Native 0.88.1
- **Router**: Expo Router ~58.0.32
- **Language**: TypeScript ~6.0.3 (Strict Mode)
- **Styling**: Design tokens in `src/constants/theme.ts`, `StyleSheet` & safe area insets
- **Quality & Hygiene**: Prettier, Husky (pre-commit hooks), lint-staged
- **Methodology**: GSD (Spec-Driven Development)

## Architecture Principles

1. **Thin Screens**: `src/app/` holds route orchestrators only (< 100 LOC).
2. **Modular Components**: Reusable atomic UI in `src/components/ui/`.
3. **Dedicated Hooks**: Business logic and data in `src/hooks/`.
4. **Verified Execution**: Automated typecheck and formatting on every commit.
