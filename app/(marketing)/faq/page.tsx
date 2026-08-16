import type { Metadata } from "next";
import Link from "next/link";
import { StartCtaLink } from "@/components/StartCtaLink";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about When I Die™: joining, pricing, how it works, sharing your plan, and more.",
};

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "How do I join?",
    answer: (
      <p>
        Click <strong>Start</strong> and get going. You could die tomorrow—or
        live to 103 out of pure spite. Either way, you might as well have a
        plan.
      </p>
    ),
  },
  {
    question: "Is it really free?",
    answer: (
      <p>
        Yes. Having an account will always be free. We believe everyone should
        be able to give their loved ones the gift of a plan—not just people
        willing to pay for another subscription. Peace of mind should not come
        with a paywall.
      </p>
    ),
  },
  {
    question: "How does it work?",
    answer: (
      <>
        <p>
          Once you join, you&rsquo;ll land on your dashboard. That&rsquo;s where
          you can see your progress, answer upcoming questions, and manage who
          you&rsquo;ve shared your plan with.
        </p>
        <p>
          We ask small, manageable questions about your funeral, memorial,
          legacy, and the things your people may need to know. Start with
          something easy—like your entrance song or preferred dress code—and
          little by little, your plan comes together.
        </p>
        <p>
          No giant questionnaire. No three-ring binder. No need to solve your
          entire death in one sitting.
        </p>
      </>
    ),
  },
  {
    question: "Do I need to download an app?",
    answer: (
      <>
        <p>
          Nope. Everything happens inside your private portal on our website.
          There&rsquo;s no app to download, and you won&rsquo;t answer questions
          by text or email.
        </p>
        <p>
          Just sign in whenever you&rsquo;re ready. Your questions, answers, and
          progress will be there waiting for you—quietly, like a polite little
          ghost.
        </p>
      </>
    ),
  },
  {
    question: "Do I have to answer questions every week?",
    answer: (
      <>
        <p>
          Absolutely not. Answer one question, answer ten, or disappear for
          three months because life got busy. Your progress is saved, and your
          unanswered questions will wait patiently.
        </p>
        <p>
          If it&rsquo;s been a while, we may send you a gentle reminder. We
          nudge; you decide when to deal with your mortality. Death may be
          inevitable, but this does not need to be finished by Friday.
        </p>
      </>
    ),
  },
  {
    question: "Can I change my answers?",
    answer: (
      <>
        <p>Of course. You can update any answer whenever you want.</p>
        <p>
          Change the flowers. Replace the playlist. Uninvite that one cousin.
          Invite them again. Your plan is living, not laminated.
        </p>
      </>
    ),
  },
  {
    question: "How will my people get my plan?",
    answer: (
      <>
        <p>
          You share it with them while you&rsquo;re still very much
          alive—that&rsquo;s the whole point. They&rsquo;ll receive a
          notification, and you decide whether they can see your entire plan or
          only selected parts.
        </p>
        <p>
          Nobody reports your death to us, and nothing is automatically released
          after you&rsquo;re gone. Your plan is only useful if the right people
          know it exists, so choose people you trust to act on your wishes.
        </p>
        <p>
          We can help you record and share your plan, but we can&rsquo;t make
          anyone follow it. Our powers are impressive, but not legally or
          supernaturally binding.
        </p>
        <p>
          And don&rsquo;t choose just one person. Even your most reliable friend
          could lose their phone, move to a monastery, or panic under pressure.
          Backups: not just for hard drives.
        </p>
      </>
    ),
  },
  {
    question: "Can I download or print my plan?",
    answer: (
      <p>
        Absolutely. Prefer good old-fashioned paper? Download and print your
        plan, then keep it somewhere your people will actually find it—not
        beneath a mysterious pile of appliance manuals.
      </p>
    ),
  },
  {
    question: "Is this a legally binding will?",
    answer: (
      <>
        <p>
          No. Your plan helps you record and communicate your wishes, but it
          doesn&rsquo;t replace a legal will or other official documents.
        </p>
        <p>
          Think of us as the extremely helpful instructions—not the legal
          paperwork.
        </p>
      </>
    ),
  },
  {
    question: "Can I delete my account and information?",
    answer: (
      <>
        <p>
          Absolutely. You can permanently delete your account and information
          whenever you want.
        </p>
        <p>No guilt, no awkward breakup, and no haunting emails from us.</p>
      </>
    ),
  },
  {
    question: "What makes this different from other end-of-life tools?",
    answer: (
      <>
        <p>
          We&rsquo;re deathly serious about making planning feel human—and even
          fun—so you&rsquo;ll actually do it.
        </p>
        <p>
          Instead of handing you a mountain of paperwork and wishing you luck,
          we help you build your plan one small question at a time. And
          we&rsquo;re not stopping at documentation. Over time, you&rsquo;ll be
          able to connect your wishes with funeral, memorial, and legacy
          services—so your people can follow your plan instead of standing
          around asking, &ldquo;What do you think they would have wanted?&rdquo;
        </p>
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main id="main-content" className="page-faq">
      <section className="section muted page-hero-section" id="faq">
        <div className="container">
          <div className="page-hero-inner">
            <div className="page-hero-nav">
              <Link href="/" className="back-link">
                ← Back to home
              </Link>
              <nav aria-label="Breadcrumb" className="breadcrumb">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-current="page">FAQ</li>
                </ol>
              </nav>
            </div>
            <p className="eyebrow">FAQ</p>
            <h1 className="page-title">Quick questions, plain answers</h1>
            <p className="page-hero-tagline">
              We&rsquo;ve got answers. (And no legalese.)
            </p>
          </div>

          <div className="faq-flat-list">
            {FAQ_ITEMS.map((item) => (
              <article className="faq-flat-item" key={item.question}>
                <h2>{item.question}</h2>
                <div className="faq-flat-answer">{item.answer}</div>
              </article>
            ))}
          </div>

          <div className="faq-cta">
            <p className="faq-cta-text">Ready?</p>
            <StartCtaLink
              className="btn primary-btn faq-cta-btn wid-cta-start"
              loggedOutText="Start your plan (free)"
              loggedInText="Go to your plan"
            />
          </div>
        </div>
      </section>

      <SubpageStickyCta text="Get your death stuff together. Free." />
    </main>
  );
}
