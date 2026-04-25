# DB Schema — current state

> **Single source of truth** for the current Postgres schema + RLS. Always reflects what is live after the latest migration in `supabase/migrations/`.
>
> **Update rule:** every new migration MUST update this file in the same commit. Migrations are forward-only; this file is the rolled-up view so future work doesn't need to re-read the migration history.
>
> If this file disagrees with the SQL files, the SQL files win — but the disagreement is a bug, fix it.

---

## Migration log

| File | Summary |
| --- | --- |
| `0001_init.sql` | initial tables: crews, profiles, posts, comments, post_likes + triggers |
| `0002_rls.sql` | RLS enabled on all tables + base policies |
| `0003_profiles_optional_fields.sql` | drop NOT NULL on `profiles.name` and `profiles.phone` (minimal-signup model) |

---

## Enums

- `public.post_scope` — `'crew' | 'public'`

---

## Tables

### `public.crews`
| col | type | notes |
| --- | --- | --- |
| `id` | uuid PK | `default gen_random_uuid()` |
| `name` | text | NOT NULL, UNIQUE |
| `description` | text | nullable |
| `leader_id` | uuid | NOT NULL → `profiles(id)` ON DELETE RESTRICT *(constraint added after `profiles` exists)* |
| `member_count` | int | NOT NULL default 0 — maintained by `sync_crew_member_count` trigger |
| `created_at` | timestamptz | NOT NULL default now() |

- Indexes: `crews_leader_idx (leader_id)`
- RLS: **ON**
  - `SELECT` — `to authenticated`, all rows
- *(no INSERT/UPDATE/DELETE policies yet — server-side only via service role)*

### `public.profiles` *(1:1 with `auth.users`)*
| col | type | notes |
| --- | --- | --- |
| `id` | uuid PK | → `auth.users(id)` ON DELETE CASCADE |
| `nickname` | text | NOT NULL, UNIQUE |
| `name` | text | nullable — populated post-signup |
| `email` | text | NOT NULL |
| `phone` | text | nullable — populated when feature requires (e.g., race signup) |
| `avatar_url` | text | nullable |
| `crew_id` | uuid | nullable → `crews(id)` ON DELETE SET NULL |
| `is_crew_leader` | bool | NOT NULL default false |
| `created_at` | timestamptz | NOT NULL default now() |
| `updated_at` | timestamptz | NOT NULL default now() — auto via `set_updated_at` trigger |

- Indexes: `profiles_crew_idx (crew_id)`, `profiles_nickname_idx (nickname)`
- RLS: **ON**
  - `SELECT` — `to authenticated`, all rows
  - `UPDATE` — `to authenticated`, `auth.uid() = id` (own profile only)

### `public.posts`
| col | type | notes |
| --- | --- | --- |
| `id` | uuid PK | `default gen_random_uuid()` |
| `author_id` | uuid | NOT NULL → `profiles(id)` ON DELETE CASCADE |
| `crew_id` | uuid | nullable → `crews(id)` ON DELETE SET NULL |
| `scope` | post_scope | NOT NULL default `'public'` |
| `title` | text | NOT NULL |
| `content` | text | NOT NULL |
| `image_urls` | text[] | NOT NULL default `'{}'` |
| `like_count` | int | NOT NULL default 0 |
| `comment_count` | int | NOT NULL default 0 |
| `created_at` | timestamptz | NOT NULL default now() |
| `updated_at` | timestamptz | NOT NULL default now() — auto via `set_updated_at` trigger |

- Indexes: `posts_author_idx (author_id)`, `posts_crew_idx (crew_id)`, `posts_scope_created_idx (scope, created_at desc)`
- RLS: **ON**
  - `SELECT` — `to authenticated`, `scope = 'public'` OR (`scope = 'crew'` AND user is in that crew)
  - `INSERT` — `to authenticated`, `auth.uid() = author_id`
  - `UPDATE` — `to authenticated`, `auth.uid() = author_id`
  - `DELETE` — `to authenticated`, `auth.uid() = author_id`

### `public.comments`
| col | type | notes |
| --- | --- | --- |
| `id` | uuid PK | `default gen_random_uuid()` |
| `post_id` | uuid | NOT NULL → `posts(id)` ON DELETE CASCADE |
| `author_id` | uuid | NOT NULL → `profiles(id)` ON DELETE CASCADE |
| `content` | text | NOT NULL |
| `created_at` | timestamptz | NOT NULL default now() |

- Indexes: `comments_post_idx (post_id, created_at)`
- RLS: **ON**
  - `SELECT` — `to authenticated`, all rows
  - `INSERT` — `to authenticated`, `auth.uid() = author_id`
  - `DELETE` — `to authenticated`, `auth.uid() = author_id`
- *(no UPDATE policy — comments are immutable)*

### `public.post_likes` *(composite PK)*
| col | type | notes |
| --- | --- | --- |
| `post_id` | uuid | NOT NULL → `posts(id)` ON DELETE CASCADE |
| `user_id` | uuid | NOT NULL → `profiles(id)` ON DELETE CASCADE |
| `created_at` | timestamptz | NOT NULL default now() |

- PK: `(post_id, user_id)`
- RLS: **ON**
  - `SELECT` — `to authenticated`, all rows
  - `INSERT` — `to authenticated`, `auth.uid() = user_id`
  - `DELETE` — `to authenticated`, `auth.uid() = user_id`

---

## Functions / Triggers

### `public.set_updated_at()` *(plpgsql)*
Sets `NEW.updated_at = now()` on row update.

Attached to:
- `profiles` — `BEFORE UPDATE` per row → `profiles_set_updated_at`
- `posts` — `BEFORE UPDATE` per row → `posts_set_updated_at`

### `public.sync_crew_member_count()` *(plpgsql)*
Keeps `crews.member_count` in sync as profiles join/leave/swap crews.

Attached to:
- `profiles` — `AFTER INSERT OR UPDATE OR DELETE` per row → `profiles_sync_crew_count`

---

## Auth integration

- `profiles.id` = `auth.users.id` (1:1, cascading delete from auth).
- All RLS policies use `auth.uid()` from Supabase Auth JWT.
- **Server-side (NestJS API)** uses the service role key and bypasses RLS — see `apps/api/src/supabase/supabase.service.ts`.
- **Client-side (web/mobile)** uses the anon key and is bound by RLS.
