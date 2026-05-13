# Repository Guidelines

## Project Structure & Module Organization
`src/main.js` boots the Vue 3 app, Pinia store, and router. Keep route-level pages in `src/views`, shared UI in `src/components`, API calls in `src/api`, state in `src/store`, helpers in `src/utils`, and global Sass in `src/style/global.scss`. Static assets live in `public/ico` and `public/logo`; screenshots belong in `screenshots/`. Treat `dist/` as generated build output, not source.

## Build, Test, and Development Commands
Use `pnpm`, since the repo is locked with `pnpm-lock.yaml`.

- `pnpm install`: install dependencies.
- `pnpm dev`: start the Vite dev server on port `6699`.
- `pnpm build`: produce the production bundle in `dist/`.
- `pnpm preview`: serve the built bundle locally for a release smoke test.

There are currently no dedicated `lint` or `test` scripts in `package.json`; add them in the same change if you introduce new tooling.

## Coding Style & Naming Conventions
Follow the existing Vue single-file component style: 2-space indentation, semicolons, double-quoted JavaScript strings, and `script setup` where possible. Use PascalCase for components and views such as `HotList.vue` and `Setting.vue`, and camelCase for utility or module files such as `getTime.js` and `request.js`. Prefer `@/` imports for files under `src/`, and keep route names lowercase (`home`, `list`, `setting`).

## Testing Guidelines
No automated test framework is configured yet. For every change, run `pnpm build` and manually verify affected routes in `pnpm dev`, especially API-backed flows and settings persistence. If you add tests, keep them close to the feature (`src/**/__tests__` or `*.spec.js`) and document the new command in `package.json`.

## Commit & Pull Request Guidelines
The visible history uses short, action-first commit subjects, for example `init：初始化项目`. Keep commits focused and titles concise. Pull requests should explain user-visible changes, note any `.env` or API contract updates, link the related issue, and include screenshots for UI changes. List the verification steps you ran, such as `pnpm build` and manual page checks.

## Configuration Tips
Environment values are stored in `.env`. The current app reads `VITE_GLOBAL_API`, `VITE_ICP`, and `VITE_DIR`; keep environment-specific URLs and base paths there instead of hardcoding them in source.
