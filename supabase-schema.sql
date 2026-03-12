-- =============================================
-- S&A NexTech AI — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES TABLE (extends auth.users)
-- =============================================
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'enterprise')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- SESSIONS TABLE (chat sessions)
-- =============================================
create table public.sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default 'New conversation',
  model text not null default 'llama3-8b-8192',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sessions_user_id_idx on public.sessions(user_id);
create index sessions_created_at_idx on public.sessions(created_at desc);

-- =============================================
-- MESSAGES TABLE
-- =============================================
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references public.sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  tokens_used integer,
  created_at timestamptz not null default now()
);

create index messages_session_id_idx on public.messages(session_id);
create index messages_created_at_idx on public.messages(created_at);

-- =============================================
-- USAGE STATS TABLE
-- =============================================
create table public.usage_stats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tokens_used integer not null default 0,
  requests_count integer not null default 0,
  date date not null default current_date,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

create index usage_stats_user_id_idx on public.usage_stats(user_id);
create index usage_stats_date_idx on public.usage_stats(date desc);

-- Upsert function for usage tracking
create or replace function public.increment_usage(
  p_user_id uuid,
  p_tokens integer,
  p_requests integer default 1
)
returns void as $$
begin
  insert into public.usage_stats (user_id, tokens_used, requests_count, date)
  values (p_user_id, p_tokens, p_requests, current_date)
  on conflict (user_id, date) do update set
    tokens_used = usage_stats.tokens_used + p_tokens,
    requests_count = usage_stats.requests_count + p_requests;
end;
$$ language plpgsql security definer;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.messages enable row level security;
alter table public.usage_stats enable row level security;

-- Profiles: users can only see and edit their own
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Sessions: users can only access their own
create policy "Users can manage own sessions" on public.sessions
  for all using (auth.uid() = user_id);

-- Messages: accessible through session ownership
create policy "Users can manage own messages" on public.messages
  for all using (
    exists (
      select 1 from public.sessions
      where sessions.id = messages.session_id
      and sessions.user_id = auth.uid()
    )
  );

-- Usage stats: users can only see their own
create policy "Users can view own usage" on public.usage_stats
  for select using (auth.uid() = user_id);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_sessions_updated
  before update on public.sessions
  for each row execute procedure public.handle_updated_at();
