---
name: task-execution
description: >-
  Use this skill to break down complex tasks, manage step-by-step execution, and verify
  each milestone through automated command gates and rollback safeguards.
---

# Task Execution & Verification Skill

This skill provides a structured execution loop for executing tasks deterministically.

## Execution Rules

1. **Granular Slices**: Never attempt multi-file large changes in a single untracked step. Break work down into 1-2 file edits at a time.
2. **Pre-Flight Validation**:
   - Inspect the current file before editing.
   - Verify dependencies and imports.
3. **Execution Gate**:
   - Write or update code.
   - Run verification immediately (`npm run typecheck` and `npm run format:check`).
   - If tests are present, run `npm test`.
4. **Self-Correction & Rollback**:
   - If a step introduces a regression or broken build, halt and fix the error before touching other files.
   - Never pile new changes on top of a failing build.
5. **State Tracking**:
   - Keep `.planning/STATE.md` updated as tasks transition from pending to in-progress to completed.
