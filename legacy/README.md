# When I Die™ – website and app

Static marketing site plus a **working app**: sign up, dashboard, answer prompts, track progress, and invite people to view your plan.

## What’s here

- **Marketing site:** `index.html`, `how-it-works.html`, `about.html`, `faq.html`, `privacy.html`, `terms.html`, `styles.css`
- **App:** `app/signup.html`, `app/login.html`, `app/dashboard.html` — auth and dashboard with progress, questions, and “who you’ve shared with”
- **Data:** `data/questions.json` — prompts users answer (edit or add here; optional DB table in Supabase)
- **Supabase:** `supabase/migrations/001_schema.sql` — run once in your Supabase project to create tables and RLS

## Running locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
cd "/Users/tatjanahaeck/Desktop/cursor website"
npx serve .
# or: python3 -m http.server 8000
```

Then visit `http://localhost:3000` (or 8000). The marketing pages work immediately. The **app** (sign up, dashboard) needs Supabase (see below).

## App setup (Supabase)

To use sign up, log in, and the dashboard with real data:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is enough).
2. **Run the schema:** In the Supabase dashboard → SQL Editor, paste and run the contents of `supabase/migrations/001_schema.sql`. This creates `profiles`, `questions`, `answers`, `shares`, RLS policies, and seeds the default questions.
3. **Get your keys:** Project Settings → API → Project URL and `anon` public key.
4. **Configure the app:** Open `app/config.js` and set:
   - `supabaseUrl`: your Project URL  
   - `supabaseAnonKey`: your anon key  

After that, **Create account** and **Log in** will work, and the dashboard will load questions, save answers, and let you add/remove shared contacts.

## Questions

- **Default set:** `data/questions.json` has 10 prompts (vibe, music, who to call, documents, etc.). The dashboard loads these if the Supabase `questions` table is empty.
- **From DB:** If you run the migration, the same questions are seeded in `questions`. You can later add or edit questions in the database and they’ll show in the app.
- **Adding more:** Edit `data/questions.json` (and optionally add rows to `questions` in Supabase). Each item needs: `id`, `order`, `category`, `title`, `body`, `placeholder`, `inputType` (e.g. `"textarea"`).

## Waitlist form (marketing)

The “Join the waitlist” form on the homepage uses [Formspree](https://formspree.io). The form `action` in `index.html` is already set to a Formspree endpoint; replace it with your own form ID if you use a different Formspree form.

## Hosting

- **Static:** Any host (Netlify, Vercel, S3, etc.) can serve this folder. No build step.
- **App:** Because the app uses Supabase from the browser, ensure:
  - Your Supabase project allows requests from your site’s origin (e.g. `https://whenidie.us`).
  - In Supabase → Authentication → URL Configuration, set Site URL and redirect URLs if you use email confirmation or redirects.

## Optional: AI / personalized flow later

The product is built so questions come from a list (JSON or DB). A future “AI chatbot” or more personalized flow can be added (e.g. different questions per user, follow-ups) without changing the existing dashboard and progress model.
