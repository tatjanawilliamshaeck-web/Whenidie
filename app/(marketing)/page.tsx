import { StartCtaLink } from "@/components/StartCtaLink";
import { StickyCta } from "@/components/StickyCta";
import { FaqAccordion } from "@/components/FaqAccordion";

const HOME_FAQ = [
  {
    question: "What kind of questions do you ask?",
    answer:
      "Practical stuff (who to call, where things are) and personal stuff (send-off vibe, songs, stories). Think: funeral vibe, snacks, documents, advice you’d leave behind. Warm tone, a little humor.",
  },
  {
    question: "Who can see my plan?",
    answer: "Only people you invite. Private by default. You choose what each person can view.",
  },
  {
    question: "Is it free?",
    answer: "Yes for now. We’ll add paid plans later—transparent, cancel anytime.",
  },
];

export default function HomePage() {
  return (
    <main id="top" className="page-home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">A gift to the people you love.</p>
            <h1>Make life easier for the people who care about you.</h1>
            <p className="hero-subtitle">
              Start in 10 minutes. Capture the essentials—who to call, where things are—so
              your family never has to guess.
            </p>
            <div className="hero-actions">
              <StartCtaLink
                className="btn primary-btn hero-cta-main wid-cta-start"
                loggedOutText="Start your plan"
                loggedInText="Go to your plan"
              />
              <a href="#how-it-works" className="btn secondary-btn">
                See how it works
              </a>
            </div>
            <p className="hero-trust-line">Private. Only shared with people you choose.</p>
            <p className="hero-secondary-line">
              Keep adding tiny prompts over time—your plan grows as you go.
            </p>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="card-header">
                <span className="pill pill-yellow">Try a tiny prompt</span>
              </div>
              <div className="prompt-blocks">
                <div className="prompt-block prompt-block--green">
                  <p className="prompt-question">If your funeral had a vibe, what would it be?</p>
                  <p className="prompt-example-inline">&ldquo;Outdoor, casual. Snacks required.&rdquo;</p>
                </div>
                <div className="prompt-block prompt-block--blue">
                  <p className="prompt-question">
                    What song should <em>not</em> be played?
                  </p>
                  <p className="prompt-example-inline">&ldquo;Anything by Coldplay.&rdquo;</p>
                </div>
              </div>
              <p className="card-footer-text">Your plan grows as you go.</p>
              <div className="hero-bloom-teaser">
                <p className="hero-bloom-teaser-count">You&rsquo;ve answered 3 questions</p>
                <div className="hero-bloom-petals" aria-hidden="true">
                  <span className="hero-bloom-petal hero-bloom-petal--filled" />
                  <span className="hero-bloom-petal hero-bloom-petal--filled" />
                  <span className="hero-bloom-petal hero-bloom-petal--filled" />
                  <span className="hero-bloom-petal" />
                  <span className="hero-bloom-petal" />
                  <span className="hero-bloom-petal" />
                  <span className="hero-bloom-petal" />
                  <span className="hero-bloom-petal" />
                </div>
                <p className="hero-bloom-teaser-caption">Your plan is blooming.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--manifesto manifesto-block">
        <div className="container">
          <p className="manifesto-brand">When I Die™</p>
          <p className="manifesto-line">
            Not a will.
            <br />
            Not a vault.
            <br />
            Not a depressing checklist.
          </p>
          <p className="manifesto-punch">
            It&rsquo;s a human way to leave clarity, personality, and less chaos behind.
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="how-it-works">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2>Three steps. You&rsquo;re in control.</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Start with the essentials</h3>
                <p className="step-subcopy">Most people finish the essentials in about 10 minutes.</p>
                <p>Who to call, where things are, what you want—so your family never has to guess.</p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Shape your plan with prompts that sound like you</h3>
                <p>
                  Each answer becomes part of a clear, printable plan. Add as much or as little as you
                  want. Change anything anytime.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Share it with someone you trust</h3>
                <p>
                  Add a partner, sibling, or close friend. They won&rsquo;t see anything until you
                  share. We&rsquo;ll give you a message you can send so it doesn&rsquo;t feel awkward.
                </p>
              </div>
            </li>
          </ol>
          <div className="section-cta section-cta--mid">
            <StartCtaLink
              className="btn primary-btn wid-cta-start"
              loggedOutText="See your first question"
              loggedInText="Go to your plan"
            />
          </div>
        </div>
      </section>

      <section className="section muted" id="what-you-get">
        <div className="container">
          <p className="eyebrow">What you get</p>
          <h2>Prompts, a clear plan, simple sharing.</h2>
          <div className="benefits-grid benefits-grid--three">
            <article className="benefit">
              <h3>Short prompts with examples</h3>
              <p>Warm questions so you&rsquo;re never stuck. Add as much or as little as you want.</p>
            </article>
            <article className="benefit">
              <h3>A plan that sounds like you</h3>
              <p>Your answers become a human-readable plan your people can actually use.</p>
            </article>
            <article className="benefit">
              <h3>Share when you&rsquo;re ready</h3>
              <p>Private by default. Invite who you want and control what they see.</p>
            </article>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="why">
        <div className="container">
          <p className="eyebrow">Why we built this</p>
          <h2>Things get chaotic when someone dies and no one knows what they wanted.</h2>
          <p className="section-copy section-intro">
            People are left guessing about funeral plans, documents, wishes, and personal messages. We
            built When I Die™ to remove that uncertainty—and to make getting it down surprisingly
            enjoyable.
          </p>
          <blockquote className="founder-quote founder-quote--highlight">
            <p>
              &ldquo;When my dad died, I was grateful he had told me how he wanted to be buried. In the
              middle of grief, knowing that one detail gave me real relief.&rdquo;
            </p>
            <cite>— Tatjana, founder</cite>
          </blockquote>
          <p className="testimonial-fun testimonial-fun--small">
            &ldquo;I started it as a joke and then realized… wow, my family would actually need all
            this.&rdquo;
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section muted" id="faq">
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h2>A few questions</h2>
          <FaqAccordion items={HOME_FAQ} />
          <div className="faq-cta" id="stay-in-touch">
            <StartCtaLink
              className="btn primary-btn faq-cta-btn wid-cta-start"
              loggedOutText="Start your plan"
              loggedInText="Go to your plan"
            />
            <a href="/faq" className="small-link-a">
              See all FAQs →
            </a>
          </div>
        </div>
      </section>

      <StickyCta watchSectionId="stay-in-touch" />
    </main>
  );
}
