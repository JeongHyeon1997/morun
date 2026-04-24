# morun

## Git workflow

- Solo development on `main` — commit and push directly to `main` without asking.
- Commit autonomously in logical units as work completes; the user has pre-authorized this.
- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, etc., with optional scope like `feat(api):`).
- Push to `origin main` after each commit (or batch of related commits).
- Remote: `git@github.com:JeongHyeon1997/morun.git`
- Still confirm before destructive ops (`--force`, `reset --hard`, branch deletion, etc.).

## Stack

- Monorepo managed by Turborepo + Bun workspaces.
- `apps/api` — NestJS API (Supabase, Zod)
- `apps/web` — Next.js
- `apps/mobile` — Expo / React Native
- `packages/shared` — shared Zod schemas
- `packages/tokens` — design tokens
- `supabase/` — migrations, RLS, seed
