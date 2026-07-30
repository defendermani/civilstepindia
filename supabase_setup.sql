-- Run this in Supabase SQL Editor (Supabase dashboard → SQL Editor → New query)

create table attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  score int not null,
  total int not null,
  answers jsonb not null,
  created_at timestamp with time zone default now()
);

alter table attempts enable row level security;

create policy "Users can view their own attempts"
  on attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own attempts"
  on attempts for insert
  with check (auth.uid() = user_id);
