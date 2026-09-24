-- Adds the per-user AI generation counter (free plan is limited to 5 requests).
-- Safe to run repeatedly; existing users are kept.

alter table public.users
  add column if not exists ai_count integer not null default 0 check (ai_count >= 0);
