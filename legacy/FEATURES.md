# When I Die™ – Feature ideas and roadmap

Use this list to prioritise what to build next. Everything below would make the experience richer; order by impact and effort for you.

---

## Already in place

- **Invites:** Send plan access to one or more people by email; see who you’ve sent it to.
- **Invite link & open tracking:** Each invite has a unique link; you can see if someone has opened it (“Opened” vs “Not opened yet”).
- **Print / Save as PDF:** Branded printable plan from the dashboard (Print / Save as PDF button).
- **Monthly cadence:** UI callout that “We send one question per month” so the pace is clear.
- **More questions:** Expanded set (ashes/remains, digital legacy, one thing to remember, favourite memory, letter to someone special).
- **Milestone messages:** At 3, 5, and 10 answers, a short positive toast with a nudge to share or print.
- **Questions grouped by category:** Dashboard shows questions under headings (Vibe & music, People, Practical, Personal).
- **Next question / Coming up:** "Coming up" block shows the first unanswered question and an "Answer this one" button.
- **Export:** Download plan as .txt or .md (Markdown) from the dashboard.
- **Who can see what:** Summary line and "Recent activity" list of who opened the link.
- **Revoke & Resend:** Per invite: Revoke (remove access) and Resend (copy link again).
- **Skipped reminder:** Callout showing how many questions are not answered yet.
- **Share specific sections:** When inviting, choose "Full plan" or select categories; invite link shows only those sections.
- **Letter-to-someone question:** "A letter to someone special" with space for who and what to say.

---

## Suggested features to add

### High impact, relatively contained

1. **Email digest for the next question**  
   Once a month (or on a schedule you choose), send one email: “This month’s question: [title]” with a link straight to answer it. Reinforces the monthly cadence and brings people back.

2. **Reminders for skipped questions**  
   Optional reminder: “You skipped [question]. Want to answer it now?” (in-app and/or email). Gentle nudge without pressure.

3. **Milestone messages**  
   When they hit 3, 5, or 10 answers, show a short positive message (“You’re building something really useful”) and maybe a prompt to share or print.

4. **Filter or group questions by category**  
   In the dashboard, group or filter by category (Vibe & music, People, Practical, Personal) so it’s easier to focus on one theme.

### Deeper experience

5. **Share specific sections**  
   Let the user choose which parts of the plan to share with which person (e.g. “Practical” only for the executor, “Personal” for family).

6. **Letter-to-someone question type**  
   Dedicated question(s) like “A letter to [name]” or “What you want [person] to know,” with optional delivery instructions (e.g. “Give to my daughter when she’s 18”).

7. **“Next question” / upcoming preview**  
   Show “Next month’s question” or “Coming up” (title only) so the monthly push feels visible and builds anticipation.

8. **Export options**  
   Besides print/PDF: export as a single text file or Markdown for backup or use elsewhere.

### Trust and polish

9. **Clear “who can see what”**  
   Simple summary: “You’ve shared your full plan with X people” and “Y person has opened the link.”

10. **Notification when someone opens the link**  
    Optional email or in-app note: “[Name] opened your plan” (first open only), so the user knows their invite was seen.

11. **Revoke or resend invite**  
    Revoke access (invalidate link) and/or “Resend invite” so they get a fresh email with the same or new link.

12. **Optional due date or “answer by”**  
    Soft deadline per question (e.g. “Answer by [date]”) for people who like structure; don’t block if they miss it.

---

## Technical notes

- **Run migration 002** in the Supabase SQL editor so invite tokens and `opened_at` work (`supabase/migrations/002_shares_invite_tracking.sql`).
- **Run migration 003** for share-specific sections: `allowed_categories` on shares and `get_plan_for_invite(token)` RPC (`supabase/migrations/003_share_specific_sections.sql`).
- New questions in `data/questions.json` are used by the app; if you use a `questions` table in Supabase, seed it with the same list so ordering and counts stay in sync.
- For monthly emails, you’d add a cron (e.g. Supabase Edge Function or external scheduler) that picks “this month’s question” and sends via your email provider (Resend, SendGrid, etc.).

Pick one or two items from the list and we can design and implement them next.
