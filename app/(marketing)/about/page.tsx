import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why When I Die™ exists: clarity is love, small steps beat overwhelm, and it's okay to make it you. A kinder way to plan.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="page-about">
      <PageHero
        crumb="About"
        eyebrow="Why this matters"
        title="Clarity is love. Fun is allowed."
        tagline="Your people deserve a map, not a scavenger hunt."
      >
        <p className="section-copy" style={{ maxWidth: "36rem", marginTop: "1rem" }}>
          When I Die™ isn&rsquo;t just estate planning or a digital vault. It&rsquo;s{" "}
          <strong>life closure planning with personality</strong>—the first thing that
          doesn&rsquo;t feel like it was designed by a law firm or a hospice pamphlet. We built
          it after seeing how chaotic things get when someone dies and no one knows what they
          wanted. This removes the guesswork and makes the process surprisingly enjoyable.
        </p>
        <p className="section-copy" style={{ maxWidth: "36rem", marginTop: "0.75rem" }}>
          You get a real account and dashboard: answer prompts at your own pace, see your
          progress, and when you&rsquo;re ready, invite the people you trust to view your plan.
          We&rsquo;re starting with a simple list of questions you can load and answer; later we
          may add a more personalized, conversational flow (e.g. AI-guided) so the experience
          can adapt even more to you.
        </p>
        <div className="section-copy why-grid">
          <div className="why-item">
            <h3>Clarity is love</h3>
            <p>
              Your people won&rsquo;t have to guess or argue. They&rsquo;ll know how to show up
              for you—and each other. When the time comes, a clear plan is one of the kindest
              things you can leave.
            </p>
          </div>
          <div className="why-item">
            <h3>Less overwhelm</h3>
            <p>
              Small steps beat big intentions. Two minutes a week is how this gets done. No giant
              checklist, no &ldquo;someday&rdquo;—just one tiny prompt at a time. Come back
              whenever; your plan never loses progress.
            </p>
          </div>
          <div className="why-item">
            <h3>Make it you</h3>
            <p>
              From playlists to boundaries, it&rsquo;s okay to be specific. &ldquo;No speeches
              before snacks&rdquo; is valid. You bring the stories and the vibe; we bring the
              structure (and the confetti playlist).
            </p>
          </div>
        </div>
      </PageHero>

      <section className="section founder-story">
        <div className="container">
          <p className="eyebrow">Why I built this</p>
          <h2>When I lost my dad, I was grateful for one simple thing.</h2>
          <div className="founder-story-content">
            <p>
              He had told me how he wanted to be buried. In one of the hardest moments of my
              life, that small detail gave me relief. I didn&rsquo;t have to guess. I knew I was
              doing right by him.
            </p>
            <p>
              I realized how powerful that feeling is—and how rare it is. Most families are left
              guessing about everything. So I wanted to build something that makes it easier for
              people to share what they want before they&rsquo;re gone.
            </p>
            <p>
              The weird part? Planning for ourselves is something almost nobody wants to talk
              about. Funeral homes are dark, brown, quiet, and sad. My generation doesn&rsquo;t
              want to plan life&rsquo;s final moment in a room that feels like a waiting area for
              grief.
            </p>
            <p>
              We plan vacations down to the minute. Flights. Hotels. Restaurants. Activities. But
              somehow we don&rsquo;t plan the one trip we&rsquo;re <strong>all guaranteed to take</strong>.
            </p>
            <p>
              As far as anyone knows, nobody really knows what happens after we die. So why does
              everything around it have to feel so depressing? Maybe the end of life isn&rsquo;t
              just something to fear. Maybe it&rsquo;s something we can prepare for with honesty,
              curiosity—and even a little humor.
            </p>
            <p>
              When I Die™ exists to make that conversation easier. It&rsquo;s a place to capture
              your wishes, your stories, and the details the people you love shouldn&rsquo;t have
              to guess. And to do it in a way that feels human, bright, and maybe even a little
              fun.
            </p>
            <p className="founder-bio">
              <strong>Tatjana</strong> founded When I Die™ after realizing how much easier grief
              becomes when people leave clear wishes behind.
            </p>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <p className="section-fun">Think &ldquo;party planner,&rdquo; but the party is your legacy.</p>
          <p className="eyebrow">What is When I Die™?</p>
          <h2>A kinder way to plan the weirdest party you&rsquo;ll never attend.</h2>
          <p className="section-copy section-intro">
            Most tools stop at &ldquo;write down your wishes.&rdquo; We&rsquo;re going
            further—eventually you&rsquo;ll be able to lock in your wishes and connect with
            services so your people can follow the plan instead of guessing.
          </p>
          <div className="feature-grid">
            <article className="feature">
              <h3>A kinder way to plan</h3>
              <p>
                Instead of a giant, dusty checklist, you&rsquo;ll answer one friendly question a
                week. Two minutes, max. Your answers grow into a clear, human plan. No doom, no
                guilt—just tiny steps that add up.
              </p>
            </article>
            <article className="feature">
              <h3>Practical + emotional</h3>
              <p>
                Mix the concrete (where things are, how to access accounts) with the softer parts
                (letters, context, stories, &ldquo;please don&rsquo;t use that one photo of me at
                my funeral&rdquo;). One place for the stuff that actually matters.
              </p>
            </article>
            <article className="feature">
              <h3>Private by default</h3>
              <p>
                Share only what you want, when you want. Invite trusted people later—or not yet.
                It&rsquo;s your plan. You choose who sees what, and you can change it anytime.
              </p>
            </article>
          </div>
        </div>
      </section>

      <SectionCta />
      <SubpageStickyCta text="Get your death stuff together. Free." />
    </main>
  );
}
