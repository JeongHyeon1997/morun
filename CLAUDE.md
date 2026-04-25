# morun

**MO:RUN** — 러닝 커뮤니티 플랫폼 (web + mobile + api). Bun + Turborepo monorepo.

Per-workspace details live in each app's own `CLAUDE.md` — this root doc holds **cross-cutting** rules only. Load order is hierarchical: the file you're editing pulls in the nearest `CLAUDE.md` in its path, so `apps/api/CLAUDE.md` only appears in context when you're touching `apps/api/**`. Don't copy app-specific rules back into this file.

## Git workflow

- Solo development on `main` — commit and push directly to `main` without asking.
- Commit autonomously in logical units as work completes; user pre-authorized this.
- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat(scope):`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- Push to `origin main` after each commit (or batch).
- Remote: `git@github.com:JeongHyeon1997/morun.git`
- Confirm before destructive ops (`--force`, `reset --hard`, branch deletion).

## Stack

- Bun 1.3 + Turborepo 2 · Node ≥ 20 · TypeScript everywhere.
- Supabase (Postgres + RLS) for auth/DB/storage.
- Zod for validation — schemas live **only** in `packages/shared`.
- Deploy: Vercel (web + api) · Expo/EAS (mobile).

## Repo layout

```
morun/
├── apps/
│   ├── api/        NestJS API     → apps/api/CLAUDE.md
│   ├── web/        Next.js 15     → apps/web/CLAUDE.md
│   └── mobile/     Expo + RN      → apps/mobile/CLAUDE.md
├── packages/
│   ├── shared/     Zod schemas (crew/post/user) — single source of truth
│   └── tokens/     Design tokens (colors/spacing/typography)
├── supabase/       migrations · RLS · seed · config.toml
└── .claude/skills/ Claude Code skills (see below)
```

## Root scripts

```sh
bun run dev        # all apps (turbo)
bun run web        # next dev
bun run mobile     # expo start
bun run api        # nest dev
bun run build
bun run lint
bun run typecheck
bun run format     # prettier --write .
```

## Atomic components

Both web and mobile hold components under `src/components/{atoms,molecules,organisms,templates}/`. User strongly prefers **many small, reusable components**:

- **atom** — primitive wrapping a native element + tokens.
- **molecule** — 2–5 atoms composed (FormField, SearchBar).
- **organism** — standalone meaningful section (Header, PostList).
- **template** — page-level layout shell with slots.

Rules:

- One-file-per-component until a folder is warranted. Add to the level's `index.ts` barrel.
- Cross-level imports go **downward only** (atoms → nothing app-internal · molecules → atoms · organisms → atoms + molecules · templates → all three). Never upward.
- Use `@morun/tokens` for colors / spacing / typography. No hard-coded UI values.
- Web and mobile keep **separate implementations** — different primitives. Only tokens and schemas cross the platform boundary.
- Repeating JSX = a smell. Extract.

Scaffold via the `atomic-component` skill.

## Skills (`.claude/skills/`)

| Skill | Use when |
| --- | --- |
| `atomic-component` | creating/organizing web or mobile UI components |
| `shared-schema` | adding a Zod schema to `packages/shared` |
| `api-module` | scaffolding a NestJS feature module |
| `rls-migration` | adding a Supabase migration + RLS |

Prefer invoking a skill over ad-hoc scaffolding when the task matches one.

## Cross-cutting conventions

- **Shared types/validators:** `packages/shared` only. Never duplicate Zod schemas across apps.
- **Design tokens:** `packages/tokens` only. No hard-coded UI values.
- **Supabase access** from the API goes through `SupabaseService` (apps/api). Never instantiate raw clients in controllers.
- **Env:** each app has `.env.example`. Actual `.env*` files are gitignored — never commit secrets.
- **RLS-first:** when touching DB schema, add the RLS policy in the same (or immediately next) migration. Never leave a public table with RLS off.
- **DB state lookup:** read `supabase/SCHEMA.md` for the current schema/RLS — it is the rolled-up source of truth. Don't grep through every migration to reconstruct state. Every new migration MUST update `SCHEMA.md` in the same commit (enforced by the `rls-migration` skill).

## Working in a specific app

When a task is clearly scoped to one app, stay inside that app's tree — don't scan other apps. The nearest `CLAUDE.md` will tell you the local rules; this root doc covers only what's shared.
