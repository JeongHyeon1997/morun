-- 0004_test_schema.sql
-- Mirrors public-schema DDL into a `test` schema in the SAME Supabase project.
-- Apps switch via SUPABASE_DB_SCHEMA env var (default 'public').
--
-- Maintenance rule: every future public-schema migration MUST include a
-- matching test-schema block (or a follow-up migration that mirrors it).
-- See .claude/skills/rls-migration/SKILL.md.

create schema if not exists test;

grant usage on schema test to anon, authenticated, service_role;
alter default privileges in schema test grant all on tables to anon, authenticated, service_role;
alter default privileges in schema test grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema test grant all on functions to anon, authenticated, service_role;

-- ============================================================
-- ENUMS (per-schema)
-- ============================================================
do $$ begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace
                  where n.nspname = 'test' and t.typname = 'post_scope') then
    create type test.post_scope as enum ('crew', 'public');
  end if;
end $$;

-- ============================================================
-- CREWS
-- ============================================================
create table if not exists test.crews (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  leader_id uuid not null,
  member_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists test_crews_leader_idx on test.crews (leader_id);

-- ============================================================
-- PROFILES (1:1 with auth.users — auth.users itself is shared per project)
-- ============================================================
create table if not exists test.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique,
  name text,
  email text not null,
  phone text,
  avatar_url text,
  crew_id uuid references test.crews(id) on delete set null,
  is_crew_leader boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists test_profiles_crew_idx on test.profiles (crew_id);
create index if not exists test_profiles_nickname_idx on test.profiles (nickname);

alter table test.crews
  drop constraint if exists test_crews_leader_fk,
  add constraint test_crews_leader_fk
  foreign key (leader_id) references test.profiles(id) on delete restrict;

-- ============================================================
-- POSTS / COMMENTS / POST_LIKES
-- ============================================================
create table if not exists test.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references test.profiles(id) on delete cascade,
  crew_id uuid references test.crews(id) on delete set null,
  scope test.post_scope not null default 'public',
  title text not null,
  content text not null,
  image_urls text[] not null default '{}',
  like_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists test_posts_author_idx on test.posts (author_id);
create index if not exists test_posts_crew_idx on test.posts (crew_id);
create index if not exists test_posts_scope_created_idx on test.posts (scope, created_at desc);

create table if not exists test.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references test.posts(id) on delete cascade,
  author_id uuid not null references test.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists test_comments_post_idx on test.comments (post_id, created_at);

create table if not exists test.post_likes (
  post_id uuid not null references test.posts(id) on delete cascade,
  user_id uuid not null references test.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- ============================================================
-- FUNCTIONS / TRIGGERS — schema-local (test.* references)
-- ============================================================
create or replace function test.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function test.sync_crew_member_count()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' and new.crew_id is not null then
    update test.crews set member_count = member_count + 1 where id = new.crew_id;
  elsif tg_op = 'DELETE' and old.crew_id is not null then
    update test.crews set member_count = greatest(member_count - 1, 0) where id = old.crew_id;
  elsif tg_op = 'UPDATE' and new.crew_id is distinct from old.crew_id then
    if old.crew_id is not null then
      update test.crews set member_count = greatest(member_count - 1, 0) where id = old.crew_id;
    end if;
    if new.crew_id is not null then
      update test.crews set member_count = member_count + 1 where id = new.crew_id;
    end if;
  end if;
  return null;
end;
$$;

drop trigger if exists profiles_set_updated_at on test.profiles;
create trigger profiles_set_updated_at
  before update on test.profiles
  for each row execute function test.set_updated_at();

drop trigger if exists posts_set_updated_at on test.posts;
create trigger posts_set_updated_at
  before update on test.posts
  for each row execute function test.set_updated_at();

drop trigger if exists profiles_sync_crew_count on test.profiles;
create trigger profiles_sync_crew_count
  after insert or update or delete on test.profiles
  for each row execute function test.sync_crew_member_count();

-- ============================================================
-- RLS — same policies as public (0002), targeting test.* tables
-- ============================================================
alter table test.profiles enable row level security;
alter table test.crews enable row level security;
alter table test.posts enable row level security;
alter table test.comments enable row level security;
alter table test.post_likes enable row level security;

drop policy if exists "test_profiles_select" on test.profiles;
create policy "test_profiles_select"
  on test.profiles for select to authenticated using (true);

drop policy if exists "test_profiles_update_own" on test.profiles;
create policy "test_profiles_update_own"
  on test.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "test_crews_select" on test.crews;
create policy "test_crews_select"
  on test.crews for select to authenticated using (true);

drop policy if exists "test_posts_select" on test.posts;
create policy "test_posts_select"
  on test.posts for select to authenticated
  using (
    scope = 'public'
    or (scope = 'crew' and crew_id in (
      select crew_id from test.profiles where id = auth.uid()
    ))
  );

drop policy if exists "test_posts_insert_own" on test.posts;
create policy "test_posts_insert_own"
  on test.posts for insert to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "test_posts_update_own" on test.posts;
create policy "test_posts_update_own"
  on test.posts for update to authenticated
  using (auth.uid() = author_id);

drop policy if exists "test_posts_delete_own" on test.posts;
create policy "test_posts_delete_own"
  on test.posts for delete to authenticated
  using (auth.uid() = author_id);

drop policy if exists "test_comments_select" on test.comments;
create policy "test_comments_select"
  on test.comments for select to authenticated using (true);

drop policy if exists "test_comments_insert_own" on test.comments;
create policy "test_comments_insert_own"
  on test.comments for insert to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "test_comments_delete_own" on test.comments;
create policy "test_comments_delete_own"
  on test.comments for delete to authenticated
  using (auth.uid() = author_id);

drop policy if exists "test_post_likes_select" on test.post_likes;
create policy "test_post_likes_select"
  on test.post_likes for select to authenticated using (true);

drop policy if exists "test_post_likes_insert_own" on test.post_likes;
create policy "test_post_likes_insert_own"
  on test.post_likes for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "test_post_likes_delete_own" on test.post_likes;
create policy "test_post_likes_delete_own"
  on test.post_likes for delete to authenticated
  using (auth.uid() = user_id);

-- ============================================================
-- Final grants for table-level access (post-creation)
-- ============================================================
grant all on all tables in schema test to anon, authenticated, service_role;
grant all on all sequences in schema test to anon, authenticated, service_role;
grant all on all functions in schema test to anon, authenticated, service_role;
