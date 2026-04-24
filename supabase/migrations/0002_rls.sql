-- Row Level Security 정책
-- NestJS API가 service role key로 호출할 것이지만,
-- 클라이언트가 직접 읽기를 허용하는 경로도 열어둔다.

alter table public.profiles enable row level security;
alter table public.crews enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;

-- PROFILES
create policy "profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- CREWS
create policy "crews are viewable by all authenticated users"
  on public.crews for select
  to authenticated
  using (true);

-- POSTS
create policy "public posts viewable by all authenticated"
  on public.posts for select
  to authenticated
  using (
    scope = 'public'
    or (scope = 'crew' and crew_id in (
      select crew_id from public.profiles where id = auth.uid()
    ))
  );

create policy "users can create own posts"
  on public.posts for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "users can update own posts"
  on public.posts for update
  to authenticated
  using (auth.uid() = author_id);

create policy "users can delete own posts"
  on public.posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- COMMENTS
create policy "comments viewable by authenticated"
  on public.comments for select
  to authenticated
  using (true);

create policy "users can create own comments"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "users can delete own comments"
  on public.comments for delete
  to authenticated
  using (auth.uid() = author_id);

-- POST_LIKES
create policy "likes viewable by authenticated"
  on public.post_likes for select
  to authenticated
  using (true);

create policy "users can like"
  on public.post_likes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users can unlike"
  on public.post_likes for delete
  to authenticated
  using (auth.uid() = user_id);
