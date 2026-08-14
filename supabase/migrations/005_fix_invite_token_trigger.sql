-- Fix: the invite-token trigger from 002 depends on pgcrypto's gen_random_bytes.
-- If that migration was interrupted before the trigger was created (or pgcrypto
-- wasn't enabled yet), shares end up with a null invite_token. This re-creates
-- everything idempotently and backfills any existing null tokens.

create extension if not exists pgcrypto;

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

update public.shares
set invite_token = encode(gen_random_bytes(12), 'base64url'),
    invite_sent_at = coalesce(invite_sent_at, invited_at, now())
where invite_token is null;
