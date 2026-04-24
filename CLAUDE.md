# morun

**MO:RUN** — 러닝 커뮤니티 플랫폼 (web + mobile + api)

## Git workflow

- Solo development on `main` — commit and push directly to `main` without asking.
- Commit autonomously in logical units as work completes; the user has pre-authorized this.
- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, etc., with optional scope like `feat(api):`).
- Push to `origin main` after each commit (or batch of related commits).
- Remote: `git@github.com:JeongHyeon1997/morun.git`
- Still confirm before destructive ops (`--force`, `reset --hard`, branch deletion, etc.).

## Stack

- **Package manager / workspaces:** Bun 1.3 + Turborepo 2
- **Node:** >= 20
- **Auth & DB:** Supabase (Postgres + RLS)
- **Validation:** Zod (schemas shared across web/mobile/api)
- **Language:** TypeScript everywhere
- **Deploy target:** Vercel for both `apps/web` (Next.js) and `apps/api` (NestJS as a serverless function). `apps/mobile` deploys through Expo.

## Repo layout

```
morun/
├── apps/
│   ├── api/        NestJS API (auth, crews, posts, users + supabase admin client)
│   ├── web/        Next.js 15 app router, Tailwind, Supabase SSR client
│   └── mobile/     Expo Router (file-based) + React Native, supabase-js client
├── packages/
│   ├── shared/     Zod schemas (crew, post, user) — imported by api/web/mobile
│   └── tokens/     Design tokens (colors, spacing, typography)
└── supabase/       migrations, RLS policies, seed, supabase/config.toml
```

### apps/api (NestJS)

- Entry: `src/main.ts` → `src/app.module.ts`.
- Modules: `auth/` (Supabase JWT guard + `@CurrentUser()` decorator), `crews/`, `posts/`, `users/`, `supabase/` (service wrapping `@supabase/supabase-js`), `common/` (shared utils incl. Zod validation pipe).
- Health check: `src/health.controller.ts`.
- **Vercel**: deploys as serverless functions. Keep module graphs lean, avoid long-lived state, don't rely on `SIGTERM` hooks. Read env at cold start; keep `apps/api/.env.example` in sync with every new var.

### apps/web (Next.js)

- App Router under `src/app/`.
- Components live in `src/components/{atoms,molecules,organisms,templates}/` — see **Atomic components** below.
- Supabase clients in `src/lib/supabase/` — `client.ts` (browser) and `server.ts` (server components / route handlers).
- Styling: Tailwind (`tailwind.config.ts`, `postcss.config.js`), global styles in `src/app/globals.css`.
- **Vercel**: deploys as a standard Next.js project. Edge/ISR decisions are per-route; default to server components with dynamic rendering only where needed.

### apps/mobile (Expo)

- Expo Router with route groups:
  - `app/(auth)/` — `login`, `signup`, `_layout`
  - `app/(tabs)/` — `main`, `board`, `crew`, `profile`, `_layout`
  - `app/index.tsx` — entry redirect
- Components live in `src/components/{atoms,molecules,organisms,templates}/` — see **Atomic components** below.
- `src/lib/supabase.ts` — supabase-js client.

### packages/shared

- Zod schemas: `schemas/crew.ts`, `schemas/post.ts`, `schemas/user.ts`.
- Exported via `src/index.ts` — keep it the single public entry point.

### packages/tokens

- Design tokens in plain TS: `colors.ts`, `spacing.ts`, `typography.ts`.
- Exported via `src/index.ts`.

### supabase

- Migrations: `migrations/0001_init.sql`, `migrations/0002_rls.sql` (keep migrations forward-only).
- `seed.sql` for local dev.

## Scripts (root)

```sh
bun run dev        # turbo run dev — all apps
bun run web        # next dev (apps/web)
bun run mobile     # expo start (apps/mobile)
bun run api        # nest start --watch (apps/api)
bun run build      # turbo run build
bun run lint       # turbo run lint
bun run typecheck  # turbo run typecheck
```

## Atomic components (UI)

User strongly prefers **many small, reusable components** organized with atomic design. Both web and mobile apps hold components under `src/components/{atoms,molecules,organisms,templates}/`.

- **atom** — primitive wrapping a native element + tokens (`Button`, `Input`, `Text`).
- **molecule** — 2–5 atoms composed into one labeled unit (`FormField`, `SearchBar`).
- **organism** — standalone meaningful section (`Header`, `PostList`).
- **template** — page-level layout shell with slots.

Rules:

- Start as a single `.tsx` file; promote to a folder only when tests/types/stories warrant it.
- Add every new component to the level's `index.ts` barrel so imports stay short.
- Cross-level imports go downward only: atoms import nothing app-internal; molecules → atoms; organisms → atoms + molecules; templates → all three. Never upward.
- Use `@morun/tokens` for all colors / spacing / typography. No hard-coded values once a token exists.
- Web and mobile keep separate implementations — different primitives (`<button>` vs `Pressable`). Only tokens and schemas cross the platform boundary.
- When in doubt about whether to extract, extract — repeating JSX is a smell here.

For scaffolding, invoke the `atomic-component` skill (in `.claude/skills/`).

## Skills

Project-scoped skills live under `.claude/skills/<name>/SKILL.md`:

- `atomic-component` — create/organize UI components under the atomic-design tree.
- `shared-schema` — add a Zod schema to `packages/shared` with exports wired.
- `api-module` — scaffold a NestJS feature module with Supabase + Zod wiring.
- `rls-migration` — add a Supabase migration with matching RLS policies.

Prefer invoking a skill over ad-hoc scaffolding when the task matches one.

## Conventions

- **Shared types/validators** go in `packages/shared`. Do not duplicate Zod schemas across apps.
- **Design tokens** go in `packages/tokens`. No hard-coded colors/spacing in app code once a token exists.
- **Supabase access** from the API goes through `SupabaseService` (apps/api/src/supabase) — not ad-hoc clients.
- **Env vars:** each app has `.env.example`. Actual `.env*` files are gitignored — never commit secrets.
- **RLS first:** when touching DB schema, add a matching `0002_rls.sql`-style policy migration before relying on the table from clients.

## Deployment

- `apps/web` → Vercel (Next.js project).
- `apps/api` → Vercel (NestJS on serverless functions). Favor cold-start-friendly imports; don't rely on persistent process state.
- `apps/mobile` → Expo (EAS builds / Expo Go for dev).
