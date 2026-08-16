import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How When I Die™ works: one small question at a time, a plan that comes together, and sharing it before it needs to be useful.",
};

export default function HowItWorksPage() {
  return (
    <main id="main-content" className="page-how-it-works">
      <PageHero
        crumb="How it works"
        eyebrow="How it works"
        title="Simple steps, whenever you feel like it."
        tagline="You probably don&rsquo;t want to spend your Saturday planning your funeral. We get it."
      >
        <p className="section-copy section-intro">
          That&rsquo;s why When I Die™ makes the experience funny, human and
          surprisingly enjoyable. The subject may be serious, but answering the
          questions doesn&rsquo;t have to make you sad.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          You might laugh. You might remember something wonderful. You might
          develop a surprisingly strong opinion about funeral snacks.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          <strong>That&rsquo;s the point.</strong>
        </p>
      </PageHero>

      <section className="section muted">
        <div className="container">
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Answer one small question</h3>
                <p>
                  Prompts arrive by email or wait for you on the site—your
                  choice. Answer one when it fits, or ignore us because
                  you&rsquo;re busy living your life.
                </p>
                <p className="step-detail-lead">We might ask:</p>
                <ul className="step-detail-list">
                  <li>What song should play when people arrive?</li>
                  <li>Who should speak?</li>
                  <li>
                    Who should be kept several feet away from the microphone?
                  </li>
                  <li>What food would make the day feel more like you?</li>
                </ul>
                <p className="step-detail">
                  Each question comes with examples, so you&rsquo;re never left
                  staring at an empty box. Most take just a few minutes. Write
                  as much as you like, skip anything you&rsquo;re not ready for
                  and come back whenever you want.
                </p>
                <p className="step-detail">
                  No guilt. No streaks. No depressing pamphlets.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Watch your plan come together</h3>
                <p>
                  Behind the fun questions, something genuinely useful is taking
                  shape. Every answer becomes part of a clear, personal
                  plan—from important documents and contacts to stories, songs
                  and a firm ban on that one terrible photo.
                </p>
                <p className="step-detail-lead">
                  Your dashboard keeps everything in one place. At a glance, you
                  can see:
                </p>
                <ul className="step-detail-list">
                  <li>How many questions you&rsquo;ve answered</li>
                  <li>What&rsquo;s coming next</li>
                  <li>How your plan is taking shape</li>
                  <li>Who you&rsquo;ve invited to see it</li>
                </ul>
                <p className="step-detail">
                  Change anything whenever you like. It&rsquo;s your life, your
                  plan and your prerogative to replace the entrance song twelve
                  times.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Share it before it needs to be useful</h3>
                <p>
                  Keep your plan private while you&rsquo;re working on it. But
                  once it feels ready enough, share it with at least one person
                  you trust. Because a brilliant plan that nobody can find is
                  really just a very organized secret.
                </p>
                <p className="step-detail">
                  You decide who gets access and what they can see. Add people,
                  change their access or remove them whenever you like.
                </p>
                <p className="step-detail">
                  It doesn&rsquo;t have to be perfect. It just has to reach
                  someone before you become unavailable for follow-up questions.
                </p>
              </div>
            </li>
          </ol>

          <p className="section-closer">
            A few enjoyable questions. One very useful plan. And, with any luck,
            a slightly brighter day.
          </p>
        </div>
      </section>

      <SectionCta />
      <SubpageStickyCta text="Get your death stuff together. Free." />
    </main>
  );
}
