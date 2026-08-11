-- Share specific sections: allow restricting what an invitee can see
-- Run in Supabase SQL Editor after 002_shares_invite_tracking.sql

alter table public.shares
  add column if not exists allowed_categories text[];

comment on column public.shares.allowed_categories is 'If null or empty, invitee sees full plan. Otherwise only questions in these categories (e.g. {''Practical'', ''People''}).';

-- RPC: get plan for invite token (for view-invite page). Returns plan filtered by share's allowed_categories.
-- Anon can call with valid token only; returns plan rows for that share's user.
create or replace function public.get_plan_for_invite(token text)
returns json as $$
declare
  rec record;
  uid uuid;
  cats text[];
  result json;
begin
  select user_id, allowed_categories into rec from public.shares where invite_token = token limit 1;
  if not found then
    return null;
  end if;
  uid := rec.user_id;
  cats := rec.allowed_categories;

  if cats is null or array_length(cats, 1) is null then
    -- full plan
    select json_build_object(
      'plan', (
        select json_agg(json_build_object(
          'question_id', a.question_id,
          'title', q.title,
          'value', a.value
        ) order by q."order")
        from public.answers a
        join public.questions q on q.id = a.question_id
        where a.user_id = uid and a.value is not null and a.value != ''
      )
    ) into result;
  else
    -- filtered by category
    select json_build_object(
      'plan', (
        select json_agg(json_build_object(
          'question_id', a.question_id,
          'title', q.title,
          'value', a.value
        ) order by q."order")
        from public.answers a
        join public.questions q on q.id = a.question_id
        where a.user_id = uid and a.value is not null and a.value != ''
          and q.category = any(cats)
      )
    ) into result;
  end if;
  return result;
end;
$$ language plpgsql security definer;

grant execute on function public.get_plan_for_invite(text) to anon;
grant execute on function public.get_plan_for_invite(text) to authenticated;
