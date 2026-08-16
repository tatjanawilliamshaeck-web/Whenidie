import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How When I Die™ works: one tiny prompt at a time, a living plan, simple sharing. Join the free beta. No guilt.",
};

export default function HowItWorksPage() {
  return (
    <main id="main-content" className="page-how-it-works">
      <PageHero
        crumb="How it works"
        eyebrow="How it works"
        title="Simple steps, taken whenever you feel like it"
        tagline="I don't want to spend my Saturday planning my funeral. We get it. So we made it funny, human, and surprisingly enjoyable."
      >
        <p className="section-copy section-intro">
          Prompts arrive by email or on the site—your choice. Answer when it
          fits. Your plan updates as you go. No depressing pamphlets.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          You&rsquo;ll see your progress at a glance: how many questions
          you&rsquo;ve answered, what&rsquo;s coming up, and who (if anyone)
          you&rsquo;ve invited to view your plan. Everything lives in one
          place—your dashboard—so you&rsquo;re never lost.
        </p>
      </PageHero>

      <section className="section muted">
        <div className="container">
          <p className="eyebrow">The three pillars</p>
          <h2 className="section-title">Prompts → Plan → People</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Answer one tiny prompt at a time</h3>
                <p>
                  Entrance song, snacks, who should speak, who
                  shouldn&rsquo;t—gentle questions that open the door. Each
                  prompt comes with examples so you&rsquo;re never stuck staring
                  at a blank box. Most take one to three minutes. You can write
                  more if you&rsquo;re feeling it, or hit &ldquo;Skip&rdquo; and
                  come back later. No streaks, no shame.
                </p>
                <p className="step-detail">
                  Example prompts you&rsquo;ll see:{" "}
                  <em>
                    &ldquo;If your funeral had a vibe, what would it be?&rdquo;
                  </em>{" "}
                  ·{" "}
                  <em>
                    &ldquo;What song should definitely not be played?&rdquo;
                  </em>{" "}
                  ·{" "}
                  <em>
                    &ldquo;Where should someone look first for important
                    documents?&rdquo;
                  </em>{" "}
                  ·{" "}
                  <em>
                    &ldquo;Who should speak—and who should probably not?&rdquo;
                  </em>{" "}
                  Mix of personal and practical, with a little humor so you
                  reflect while smiling a little.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Watch a living plan take shape</h3>
                <p>
                  Each answer flows into a tidy, human-readable plan that sounds
                  like you. Mix the concrete (where things are, how to access
                  accounts) with the softer parts (letters, stories,
                  &ldquo;please don&rsquo;t use that one photo&rdquo;). Change
                  anything anytime—your plan is living, not laminated.
                </p>
                <p className="step-detail">
                  In your dashboard you&rsquo;ll see exactly where you are:
                  which questions you&rsquo;ve answered, which are upcoming, and
                  a simple &ldquo;Your plan so far&rdquo; view. Later
                  we&rsquo;ll add export (PDF, print) and the ability to lock in
                  wishes and connect with services so your people can follow the
                  plan instead of guessing.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Share when you&rsquo;re ready</h3>
                <p>
                  Invite your people and control what they see: all of it, or
                  just the essentials. You can assign view-only, edit, or
                  &ldquo;in case of…&rdquo; roles. Add or remove people anytime.
                  They&rsquo;ll thank you later.
                </p>
                <p className="step-detail">
                  In your dashboard you&rsquo;ll have a &ldquo;Who you&rsquo;ve
                  shared with&rdquo; section: see who has access, what role they
                  have, and when you invited them. Revoke access or add someone
                  new in a few clicks. No one sees your plan until you invite
                  them—and you can keep it 100% private as long as you want.
                </p>
              </div>
            </li>
          </ol>

          <div className="plan-mock" aria-hidden="true">
            <p className="plan-mock-title">Your plan so far</p>
            <ul className="plan-mock-list">
              <li>
                <span className="plan-check" aria-hidden="true">
                  ✓
                </span>{" "}
                Entrance song
              </li>
              <li>
                <span className="plan-check" aria-hidden="true">
                  ✓
                </span>{" "}
                Snacks &amp; vibes
              </li>
              <li>
                <span className="plan-check" aria-hidden="true">
                  ✓
                </span>{" "}
                Who should speak
              </li>
              <li>
                <span className="plan-dot" aria-hidden="true">
                  ○
                </span>{" "}
                Who to call
              </li>
              <li>
                <span className="plan-dot" aria-hidden="true">
                  ○
                </span>{" "}
                Where things live
              </li>
            </ul>
          </div>

          <hr className="section-divider" aria-hidden="true" />

          <p className="eyebrow">What you&rsquo;ll see on the site</p>
          <h2>
            Your dashboard: progress, questions, and who&rsquo;s in the loop
          </h2>
          <p className="section-copy section-intro">
            Once you have an account, you get a single place to see how
            you&rsquo;re doing and what&rsquo;s next.
          </p>
          <ul className="detail-list">
            <li>
              <strong>Progress</strong> — A clear &ldquo;X of Y answered&rdquo;
              so you know where you are in your journey. No guilt if you skip a
              week; the number just waits for you.
            </li>
            <li>
              <strong>Upcoming questions</strong> — The next prompts you
              haven&rsquo;t answered yet. Tap one to answer it now or leave it
              for later.
            </li>
            <li>
              <strong>Answered</strong> — Everything you&rsquo;ve already
              written. Tap to edit anytime. Your plan updates as you go.
            </li>
            <li>
              <strong>Who you&rsquo;ve shared with</strong> — People
              you&rsquo;ve invited to view (or help with) your plan. See who has
              access and change it whenever you want.
            </li>
          </ul>
          <p className="section-copy">
            We&rsquo;re building this to feel human and light—not like a
            spreadsheet or a legal form. One day we may add a more personalized,
            conversational flow (e.g. an AI-guided chat); for now, it&rsquo;s a
            clear list of questions you can tackle at your own pace.
          </p>
        </div>
      </section>

      <SectionCta />
      <SubpageStickyCta text="Get your death stuff together. Free." />
    </main>
  );
}
