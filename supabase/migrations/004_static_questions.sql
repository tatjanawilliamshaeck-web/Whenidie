-- Move question content out of the database: it now lives in lib/questions.ts as static
-- editorial content (title, body, field type, suggestions), not user data. The old
-- `questions` table had drifted out of sync with the real question set anyway.
-- Run after 001-003.

-- answers.question_id no longer needs to reference a DB table of questions.
alter table public.answers drop constraint if exists answers_question_id_fkey;

drop table if exists public.questions cascade;

-- Sharing by section used to filter by category via a join to `questions`. Replace with
-- an explicit list of question ids (computed client-side from the static question list
-- at invite time), so no DB-side question metadata is needed at all.
alter table public.shares
  add column if not exists allowed_question_ids text[];

alter table public.shares drop column if exists allowed_categories;

comment on column public.shares.allowed_question_ids is 'If null or empty, invitee sees the full plan. Otherwise only these question ids.';

create or replace function public.get_plan_for_invite(token text)
returns json as $$
declare
  rec record;
  uid uuid;
  ids text[];
  result json;
begin
  select user_id, allowed_question_ids into rec from public.shares where invite_token = token limit 1;
  if not found then
    return null;
  end if;
  uid := rec.user_id;
  ids := rec.allowed_question_ids;

  select json_build_object(
    'plan', (
      select json_agg(json_build_object(
        'question_id', a.question_id,
        'value', a.value
      ))
      from public.answers a
      where a.user_id = uid and a.value is not null and a.value != ''
        and (ids is null or array_length(ids, 1) is null or a.question_id = any(ids))
    )
  ) into result;

  return result;
end;
$$ language plpgsql security definer;

grant execute on function public.get_plan_for_invite(text) to anon;
grant execute on function public.get_plan_for_invite(text) to authenticated;
