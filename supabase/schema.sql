-- BirCV database. Paste the whole file into Supabase -> SQL Editor and Run.
-- Safe to run repeatedly: it drops and recreates the tables (all users and codes are deleted).

create extension if not exists pgcrypto;

drop table if exists public.otp_codes;
drop table if exists public.users;

create table public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  name          text,
  password_hash text,
  plan          text not null default 'free' check (plan in ('free','premium','admin')),
  cv_count      integer not null default 0 check (cv_count >= 0),
  created_at    timestamptz not null default now()
);

-- email is the primary key so upsert(..., { onConflict: 'email' }) replaces the old code
create table public.otp_codes (
  email      text primary key,
  code       text not null,
  expires_at timestamptz not null
);

-- The anon key is public (it ships to the browser), so lock both tables down.
-- No policies = anon/authenticated roles get no access; the service_role key bypasses RLS.
alter table public.users     enable row level security;
alter table public.otp_codes enable row level security;
