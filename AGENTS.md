# AGENTS.md

Single-app Angular 22 workspace (no monorepo). Entrypoint: `src/main.ts` → `bootstrapApplication(App, appConfig)`. No NgModules; everything is standalone components.

## Commands

- Dev server: `ng serve` (defaults to `development` config, serves `http://localhost:4200/`)
- Build/typecheck: `ng build` (`ng build`) — defaults to `production` config
- Tests: `ng test` — **runs Vitest via the `@angular/build:unit-test` builder, NOT Karma/Jasmine**

## Code style

- Code comments and JSDoc must be written in **English**.
- JSDoc (adapted to TypeScript) should document unclear or hard-to-read logic.
