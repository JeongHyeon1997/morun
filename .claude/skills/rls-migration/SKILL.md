---
name: rls-migration
description: Use this skill when creating, editing, or reviewing a Supabase migration under supabase/migrations. Covers both schema DDL and matching Row Level Security policies. Trigger on "add migration", "새 테이블", "DB 스키마 수정", "RLS policy", "add column to <table>", or any file add/edit under supabase/migrations.
---

# rls-migration

Schema changes and RLS policies are versioned together in `supabase/migrations/NNNN_<name>.sql`. Migrations are **forward-only** — never edit a migration that has been applied to any environment; write a new one.

## Conventions

- File name: zero-padded 4-digit sequence, e.g. `0003_add_events.sql`. Check the current highest number before creating.
- One logical change per file (one table, or one cross-cutting policy update). Don't pile unrelated DDL into one migration.
- Every new table ships with RLS **on the same migration or the immediately following one** — do not leave a table with RLS disabled between migrations.
- Default to `uuid` primary keys: `id uuid primary key default gen_random_uuid()`.
- Always include `created_at timestamptz not null default now()` and `updated_at timestamptz` where relevant.
- FKs: `references <table>(id) on delete cascade` (or `set null` if the child should survive).

## Steps when asked to add a new table

1. Read the latest numbered migration under `supabase/migrations/` to pick the next number.
2. Create `supabase/migrations/NNNN_<descriptive_name>.sql`.
3. Use the template below — DDL first, then `alter table ... enable row level security`, then policies.
4. If the API will read/write the new table, also check `apps/api/src/supabase/supabase.service.ts` — confirm the service role key is used on the server side so RLS isn't the one doing the auth for trusted server calls; client-side reads from web/mobile still go through anon key + RLS.
5. Update `supabase/seed.sql` only if the new table needs example rows for local dev.

## Migration template (new table + RLS)

```sql
-- 0003_add_events.sql

create table public.events (
  id          uuid primary key default gen_random_uuid(),
  crew_id     uuid not null references public.crews(id) on delete cascade,
  title       text not null,
  starts_at   timestamptz not null,
  created_by  uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);

create index events_crew_id_idx  on public.events (crew_id);
create index events_starts_at_idx on public.events (starts_at);

alter table public.events enable row level security;

-- Anyone in the crew can read crew events.
create policy "events_select_crew_members"
  on public.events for select
  using (
    exists (
      select 1
      from public.crew_members cm
      where cm.crew_id = events.crew_id
        and cm.user_id = auth.uid()
    )
  );

-- Only crew admins can insert.
create policy "events_insert_crew_admin"
  on public.events for insert
  with check (
    exists (
      select 1
      from public.crew_members cm
      where cm.crew_id = events.crew_id
        and cm.user_id = auth.uid()
        and cm.role = 'admin'
    )
  );

-- Only the creator can update / delete.
create policy "events_update_creator"
  on public.events for update
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

create policy "events_delete_creator"
  on public.events for delete
  using (created_by = auth.uid());
```

## Altering an existing table

Use a new migration. Pattern:

```sql
-- 0004_events_add_location.sql
alter table public.events add column location text;
```

If the change affects what anonymous/authenticated users can see, **also** drop and recreate the relevant policy in the same file — don't let policies drift from the column set.

## Rules

- Never `drop table` or destructive changes without the user explicitly confirming.
- Never disable RLS on a public-facing table, even temporarily.
- If a policy references a column, that column must exist in the same migration or earlier.
- Prefer `security invoker` view/function defaults — avoid `security definer` unless the user explicitly needs superuser behavior.
- Do not put secrets, env-specific values, or hardcoded UUIDs in migrations. Seeding belongs in `supabase/seed.sql`.
