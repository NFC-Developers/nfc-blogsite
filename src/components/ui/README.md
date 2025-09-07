# UI primitives

This folder contains UI primitives used across the app.

Usage:

- Import primitives from the barrel:

  import { Button, Input, ThemeToggle } from "@/components/ui";

Theme toggle:

- `ThemeToggle` toggles the `dark` class on `<html>` and persists the choice to `localStorage` under `site-theme`.

Keep primitives small and composable. Export everything from `index.ts` for consistent imports.
