# Supabase setup — applying migrations to the morun project

This project ships **forward-only migrations** under `supabase/migrations/`. The Supabase CLI is not required — every migration can be pasted into the project's SQL Editor in order.

The same Supabase project hosts **two schemas**, `public` (prod) and `test` (test data). Apps select between them with `SUPABASE_DB_SCHEMA` env var. `auth.users` itself is shared per project.

> Project: morun (`xufvgakqpqcvovbkxuao`, region `ap-northeast-1` / Tokyo)

---

## One-time setup

### 1. Apply migrations in order

Open Supabase Dashboard → **SQL Editor** → New query. For each file below, paste the entire contents and click **Run**:

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_rls.sql`
3. `supabase/migrations/0003_profiles_optional_fields.sql`
4. `supabase/migrations/0004_test_schema.sql`

Verify after #4: in the SQL Editor, run

```sql
select table_schema, table_name
from information_schema.tables
where table_schema in ('public', 'test')
order by 1, 2;
```

You should see the same set of tables in both schemas (`crews`, `profiles`, `posts`, `comments`, `post_likes`).

### 2. Expose the `test` schema to PostgREST

Dashboard → **Project Settings → API** → **Exposed schemas** — add `test` next to `public` and `graphql_public`. Save.

(Without this step, `db.schema('test')` from the JS client returns 404.)

### 3. Fill `.env` files locally

Each app expects credentials in its own `.env`. Templates are in `*.env.example`. The keys you need:

- `SUPABASE_URL` — `https://xufvgakqpqcvovbkxuao.supabase.co`
- `SUPABASE_ANON_KEY` — Dashboard → Settings → API → `anon public`
- `SUPABASE_SERVICE_ROLE_KEY` — Dashboard → Settings → API → `service_role secret` (api only, never to client apps)
- `SUPABASE_DB_SCHEMA` — `public` or `test`

Files (gitignored):

| App | Env file | Schema variable |
| --- | --- | --- |
| `apps/api` | `.env` | `SUPABASE_DB_SCHEMA` |
| `apps/web` | `.env.local` | `NEXT_PUBLIC_SUPABASE_DB_SCHEMA` |
| `apps/mobile` | `.env` | `EXPO_PUBLIC_SUPABASE_DB_SCHEMA` |

### 4. Smoke-test the connection

Start the api: `bun run api`. Hit `GET http://localhost:4000/api/health/db` — it should return `{ ok: true, schema: "public", ... }`. Switch the env to `SUPABASE_DB_SCHEMA=test`, restart, hit again — `schema: "test"`.

---

## When you change the schema later

Use the `rls-migration` skill. The skill enforces **two rules** that matter here:

1. **`SCHEMA.md` stays in sync** — update it in the same commit as the migration. Don't grep migrations to figure out current state; read `SCHEMA.md`.
2. **`public` and `test` stay in sync** — every public-schema DDL needs a parallel test-schema block in the same migration (or an immediately following one).

After writing the migration:

1. Paste the SQL into SQL Editor → Run.
2. If you added a new schema to the project, re-add it under **Exposed schemas**.
3. If you added a new env var, update `*.env.example` everywhere and bump the local `.env` files.

---

## Switching schemas during development

Just change `SUPABASE_DB_SCHEMA` in the relevant `.env` and restart the app. No code change needed — the Supabase clients all read the env var.

```bash
# api
echo 'SUPABASE_DB_SCHEMA=test' >> apps/api/.env
bun run api
```

---

## Key rotation

If a service-role key has been exposed (committed, pasted into chat, etc.), rotate it from Dashboard → Settings → API → **Reset service_role secret**. The anon key can stay — it's safe in the browser bundle.
