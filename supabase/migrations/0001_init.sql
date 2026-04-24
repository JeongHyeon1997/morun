-- MO:RUN 초기 스키마
-- Supabase Auth(auth.users)와 연동되는 public.profiles 기반

set check_function_bodies = off;

-- ============================================================
-- CREWS
-- ============================================================
create table if not exists public.crews (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  leader_id uuid not null,
  member_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists crews_leader_idx on public.crews (leader_id);

-- ============================================================
-- PROFILES (auth.users 1:1)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique,
  name text not null,
  email text not null,
  phone text not null,
  avatar_url text,
  crew_id uuid references public.crews(id) on delete set null,
  is_crew_leader boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_crew_idx on public.profiles (crew_id);
create index if not exists profiles_nickname_idx on public.profiles (nickname);

-- crews.leader_id FK (profiles가 생성된 후 추가)
alter table public.crews
  add constraint crews_leader_fk
  foreign key (leader_id) references public.profiles(id) on delete restrict;

-- ============================================================
-- POSTS (게시판)
-- ============================================================
create type public.post_scope as enum ('crew', 'public');

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  crew_id uuid references public.crews(id) on delete set null,
  scope public.post_scope not null default 'public',
  title text not null,
  content text not null,
  image_urls text[] not null default '{}',
  like_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_author_idx on public.posts (author_id);
create index if not exists posts_crew_idx on public.posts (crew_id);
create index if not exists posts_scope_created_idx on public.posts (scope, created_at desc);

-- ============================================================
-- COMMENTS
-- ============================================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_post_idx on public.comments (post_id, created_at);

-- ============================================================
-- POST_LIKES
-- ============================================================
create table if not exists public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- ============================================================
-- updated_at 자동 갱신 트리거
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ============================================================
-- 크루 인원 수 카운트 유지
-- ============================================================
create or replace function public.sync_crew_member_count()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' and new.crew_id is not null then
    update public.crews set member_count = member_count + 1 where id = new.crew_id;
  elsif tg_op = 'DELETE' and old.crew_id is not null then
    update public.crews set member_count = greatest(member_count - 1, 0) where id = old.crew_id;
  elsif tg_op = 'UPDATE' and new.crew_id is distinct from old.crew_id then
    if old.crew_id is not null then
      update public.crews set member_count = greatest(member_count - 1, 0) where id = old.crew_id;
    end if;
    if new.crew_id is not null then
      update public.crews set member_count = member_count + 1 where id = new.crew_id;
    end if;
  end if;
  return null;
end;
$$;

create trigger profiles_sync_crew_count
  after insert or update or delete on public.profiles
  for each row execute function public.sync_crew_member_count();
