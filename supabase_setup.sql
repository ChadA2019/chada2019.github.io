-- Run this once in Supabase SQL Editor
create table if not exists public.finance_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  encrypted_state jsonb not null,
  client_modified_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.finance_state enable row level security;
drop policy if exists "Users can read their finance state" on public.finance_state;
create policy "Users can read their finance state" on public.finance_state for select using (auth.uid() = user_id);
drop policy if exists "Users can insert their finance state" on public.finance_state;
create policy "Users can insert their finance state" on public.finance_state for insert with check (auth.uid() = user_id);
drop policy if exists "Users can update their finance state" on public.finance_state;
create policy "Users can update their finance state" on public.finance_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
revoke all on public.finance_state from anon;
grant select, insert, update on public.finance_state to authenticated;
