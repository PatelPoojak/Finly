-- ===========================================================================
-- Finly database schema (PostgreSQL / Supabase)
-- ===========================================================================
-- Paste this whole file into the Supabase SQL editor and run it once.
--
-- The app ships its question content in the front end bundle, so the database
-- only needs to store accounts and per user progress. topic_id and question_id
-- are stored as plain text that reference the bundled content (no foreign keys
-- to content tables, which keeps the database simple and decoupled).
--
--   profiles        one row per user, linked to Supabase auth.users
--   topic_progress  the adaptive state per user per topic
--   attempts        an append only log of every answer (powers the impact view)
--
-- Row Level Security keeps each learner's data private. A security definer
-- function exposes only aggregate impact numbers for the /admin dashboard.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null,
  email       text unique not null,
  country     text default 'Unknown',
  grade       text,
  streak_days integer not null default 0,
  last_active date,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Per user progress
-- ---------------------------------------------------------------------------
create table if not exists topic_progress (
  user_id     uuid not null references profiles (id) on delete cascade,
  topic_id    text not null,                 -- references bundled content, e.g. 'inv-stocks'
  tier        text not null default 'easy',
  streak      integer not null default 0,
  correct_ids text[] not null default '{}',
  seen_ids    text[] not null default '{}',
  updated_at  timestamptz not null default now(),
  primary key (user_id, topic_id)
);

create table if not exists attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references profiles (id) on delete cascade,
  question_id text not null,                 -- references bundled content, e.g. 'inv-stk-1'
  is_correct  boolean not null,
  answered_at timestamptz not null default now()
);

create index if not exists attempts_user_idx on attempts (user_id);

-- ===========================================================================
-- Row Level Security: each learner can read and write only their own rows.
-- ===========================================================================
alter table profiles       enable row level security;
alter table topic_progress enable row level security;
alter table attempts       enable row level security;

drop policy if exists "own profile read"   on profiles;
drop policy if exists "own profile update" on profiles;
drop policy if exists "own profile insert" on profiles;
create policy "own profile read"   on profiles for select using (auth.uid() = id);
create policy "own profile update" on profiles for update using (auth.uid() = id);
create policy "own profile insert" on profiles for insert with check (auth.uid() = id);

drop policy if exists "own progress" on topic_progress;
create policy "own progress" on topic_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own attempts" on attempts;
create policy "own attempts" on attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- Auto create a profile row when a new auth user signs up. Pulls name,
-- country, and grade from the sign up metadata the app sends.
-- ===========================================================================
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, country, grade)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', 'Learner'),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'country', 'Unknown'),
    coalesce(new.raw_user_meta_data ->> 'grade', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ===========================================================================
-- Impact reporting. This security definer function returns only aggregate
-- counts, never any individual's data, so it is safe to call from the app
-- with the public anon key. It powers the /admin dashboard.
-- ===========================================================================
create or replace function finly_impact()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'total_users',         (select count(*) from profiles),
    'countries',           (select count(distinct country) from profiles),
    'total_attempts',      (select count(*) from attempts),
    'total_correct',       (select count(*) from attempts where is_correct),
    'questions_completed', (select count(*) from (
                              select distinct user_id, question_id
                              from attempts where is_correct
                            ) t),
    'by_country',          coalesce(
                             (select json_object_agg(country, c)
                              from (select country, count(*) c
                                    from profiles group by country) s),
                             '{}'::json)
  );
$$;

grant execute on function finly_impact() to anon, authenticated;
