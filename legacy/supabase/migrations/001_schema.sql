-- When I Die™ – Supabase schema
-- IMPORTANT: In Supabase Dashboard → SQL Editor, paste the *contents* of this file
-- (all the SQL below), then click Run. Do NOT paste the file path (e.g. supabase/migrations/...).

-- Profiles: extended user info (Supabase Auth gives us auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  updated_at timestamptz default now()
);

-- Questions: the prompts users answer (can also be loaded from JSON; this allows DB-driven questions later)
create table if not exists public.questions (
  id text primary key,
  "order" int not null,
  category text not null,
  title text not null,
  body text,
  placeholder text,
  input_type text default 'textarea',
  created_at timestamptz default now()
);

-- Answers: one per user per question
create table if not exists public.answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  value text not null default '',
  updated_at timestamptz default now(),
  unique(user_id, question_id)
);

-- Shares: who the user has invited to view their plan
create table if not exists public.shares (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'viewer',
  invited_at timestamptz default now(),
  unique(user_id, email)
);

-- RLS: users can only see their own data
alter table public.profiles enable row level security;
alter table public.answers enable row level security;
alter table public.shares enable row level security;
alter table public.questions enable row level security;

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can read own answers" on public.answers for select using (auth.uid() = user_id);
create policy "Users can insert own answers" on public.answers for insert with check (auth.uid() = user_id);
create policy "Users can update own answers" on public.answers for update using (auth.uid() = user_id);
create policy "Users can delete own answers" on public.answers for delete using (auth.uid() = user_id);

create policy "Users can read own shares" on public.shares for select using (auth.uid() = user_id);
create policy "Users can insert own shares" on public.shares for insert with check (auth.uid() = user_id);
create policy "Users can update own shares" on public.shares for update using (auth.uid() = user_id);
create policy "Users can delete own shares" on public.shares for delete using (auth.uid() = user_id);

create policy "Anyone can read questions" on public.questions for select using (true);

-- Seed questions (same as data/questions.json)
insert into public.questions (id, "order", category, title, body, placeholder, input_type) values
  ('entrance-song', 1, 'Vibe & music', 'What song should play when people walk in?', 'If your memorial or celebration had an entrance song—the one that plays as people arrive—what would it be? No wrong answers. Silly, serious, or somewhere in between.', 'e.g. "Here Comes the Sun," something that makes people smile', 'textarea'),
  ('vibe', 2, 'Vibe & music', 'If your funeral had a vibe, what would it be?', 'Casual backyard? Fancy and short? No service at all? Describe the mood you''d want.', 'e.g. "Backyard BBQ, no suits. Or: 20 minutes max, then cake."', 'textarea'),
  ('do-not-play', 3, 'Vibe & music', 'What song should definitely NOT be played?', 'We all have that one song. Name it so no one has to guess.', 'e.g. "My Heart Will Go On. I''m serious."', 'textarea'),
  ('who-should-speak', 4, 'People', 'Who should speak—and who should probably not?', 'Optional. If there are speeches or stories, who do you want up there? Anyone you''d rather keep off the mic?', 'e.g. "My sister. Not my cousin Dave."', 'textarea'),
  ('who-to-call', 5, 'People', 'Who should be called first?', 'When the time comes, who needs to hear it from someone who cares—and in what order?', 'e.g. "My partner, then my kids, then my brother."', 'textarea'),
  ('documents-where', 6, 'Practical', 'Where should someone look first for important documents?', 'Will, insurance, passwords, keys—where''s the starting point so your people aren''t lost?', 'e.g. "Filing cabinet in the office, top drawer."', 'textarea'),
  ('snacks-and-vibes', 7, 'Vibe & music', 'Snacks, drinks, or food?', 'If there''s a gathering, what should be on the table? Or explicitly not?', 'e.g. "Tacos and margaritas. No sad sandwiches."', 'textarea'),
  ('one-photo', 8, 'Personal', 'Is there one photo you really don''t want used?', 'We all have that photo. Save your people the guesswork.', 'e.g. "The one from the 90s with the perm. Please no."', 'textarea'),
  ('letter-or-message', 9, 'Personal', 'Anything you want to say to specific people?', 'A short note, a thank-you, or something you''ve always wanted them to know.', 'e.g. "Tell Mom I''m sorry we didn''t visit more."', 'textarea'),
  ('pet-or-plant', 10, 'Practical', 'Who takes care of your pet (or plant)?', 'Make it clear so no one has to figure it out in a crisis.', 'e.g. "My neighbor Sarah has agreed to take the dog."', 'textarea')
on conflict (id) do nothing;

-- Create profile on signup (optional trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
