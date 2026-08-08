# AGENTS.md

Single-app Angular 22 workspace (no monorepo). Entrypoint: `src/main.ts` → `bootstrapApplication(App, appConfig)`. No NgModules; everything is standalone components.

## Commands

- Dev server: `ng serve` (defaults to `development` config, serves `http://localhost:4200/`)
- Build/typecheck: `ng build` (`ng build`) — defaults to `production` config
- Tests: `ng test` — **runs Vitest via the `@angular/build:unit-test` builder, NOT Karma/Jasmine**

## Code style

- Code comments and JSDoc must be written in **English**.
- JSDoc (adapted to TypeScript) should document unclear or hard-to-read logic.

## Commits

Use only the following commit keywords

- `feat` : for new features
- `fix` : for bugfixes 
- `chore` : for non-functional changes (documentation, configuration, tooling, maintenance, etc.)
- `refactor`: for code changes that are not bugfixes or new features
- `test`: for unit/integration tests

Use the following template to commit : 

```
keyword: short description
```

Examples

feat: add user login endpoint  
fix: resolve null pointer in service layer  
refactor: simplify authentication logic

Reference: https://www.conventionalcommits.org/en/v1.0.0/
