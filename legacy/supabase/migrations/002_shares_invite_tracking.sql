-- Shares: invite link and open tracking
-- Run in Supabase SQL Editor after 001_schema.sql

-- Add columns to shares (if not exists - run once)
alter table public.shares
  add column if not exists invite_token text unique,
  add column if not exists invite_sent_at timestamptz,
  add column if not exists opened_at timestamptz;

-- Backfill token and invite_sent_at for existing rows that don't have them
update public.shares
set invite_token = encode(gen_random_bytes(12), 'base64url'),
    invite_sent_at = invited_at
where invite_token is null;

-- When inserting a new share, auto-set invite_token and invite_sent_at
create or replace function public.shares_set_invite_token()
returns trigger as $$
begin
  if new.invite_token is null then
    new.invite_token := encode(gen_random_bytes(12), 'base64url');
  end if;
  if new.invite_sent_at is null then
    new.invite_sent_at := now();
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists shares_invite_token_trigger on public.shares;
create trigger shares_invite_token_trigger
  before insert on public.shares
  for each row execute function public.shares_set_invite_token();

-- Allow anyone with the token to record an "open" (called from view-invite page)
create or replace function public.record_invite_open(token text)
returns void as $$
begin
  update public.shares
  set opened_at = coalesce(opened_at, now())
  where invite_token = token and opened_at is null;
end;
$$ language plpgsql security definer;

-- Anon can call this RPC (no auth required - we only set opened_at)
grant execute on function public.record_invite_open(text) to anon;
grant execute on function public.record_invite_open(text) to authenticated;
