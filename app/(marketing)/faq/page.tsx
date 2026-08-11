import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartCtaLink } from "@/components/StartCtaLink";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";
import { FaqCategoryAccordion, type FaqCategory } from "@/components/FaqCategoryAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about When I Die™: getting started, prompts, sharing, privacy, pricing, and more.",
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "faq-getting-started",
    label: "Getting started",
    items: [
      {
        question: "How do I join?",
        answer:
          "Click Start or Join the free beta, add your name (the one you want on invites/obits), and you’re in. Under a minute. Snacks optional.",
      },
      {
        question: "What happens after I sign up?",
        answer:
          "You land in your dashboard. You’ll see your progress (how many questions you’ve answered), upcoming questions, and a “Who you’ve shared with” section. Answer your first prompt whenever you’re ready; there’s no pressure to do it all at once.",
      },
      {
        question: "What happens first?",
        answer:
          "We send your first tiny question—something friendly like the entrance song or dress code. You answer in ~2 minutes, and boom: your plan has begun.",
      },
      {
        question: "What if I skip a week?",
        answer: "No guilt. Prompts wait patiently. Come back whenever—your plan never loses progress.",
      },
      {
        question: "What if I change my mind (often)?",
        answer: "We expect it. Update any answer anytime. Your plan is living, not laminated.",
      },
      {
        question: "What makes this different from other end-of-life tools?",
        answer:
          "We're death serious about making it fun—so you actually do it. And we're not stopping at documentation. Eventually you'll be able to lock in your wishes and connect with services (funeral, memorial, legacy) so your people can follow the plan instead of guessing.",
      },
    ],
  },
  {
    id: "faq-prompts",
    label: "Prompts",
    items: [
      {
        question: "What do the prompts ask?",
        answer: (
          <>
            Things like: If your funeral had a vibe, what would it be? What song should{" "}
            <em>not</em> be played? Where should people look first for important documents? A
            mix of personal and practical, with a little humor—so you reflect while smiling a
            little.
          </>
        ),
      },
      {
        question: "How long do prompts take?",
        answer: "About 1–3 minutes. You can also write a longer note if you’re feeling it.",
      },
      {
        question: "Can I snooze or skip?",
        answer: "Absolutely. Hit “Skip” or “Remind me later.” No streaks, no shame.",
      },
    ],
  },
  {
    id: "faq-sharing",
    label: "Sharing",
    items: [
      {
        question: "Who can see my plan?",
        answer:
          "It’s private by default. You decide who to invite and exactly what they can view (everything vs. essentials).",
      },
      {
        question: "What roles can I assign?",
        answer:
          "Owner (you): edit all, share, export, delete. Trusted person: sees only what you share. “In case of…” contact: notified if something happens (optional). You can add, remove, or change access anytime.",
      },
      {
        question: "Do I have to invite people right away?",
        answer: "Nope. Keep it private until you’re ready. Your plan is yours until you choose to share it.",
      },
      {
        question: "How do I invite someone to see my plan?",
        answer:
          "In your dashboard, go to “Who you’ve shared with” and add their email. We’ll send them an invite; they can view (or edit, if you allow it) based on the role you set. You can revoke access anytime.",
      },
    ],
  },
  {
    id: "faq-privacy",
    label: "Privacy",
    items: [
      {
        question: "How is my data protected?",
        answer:
          "Best-practice encryption in transit and at rest, strong auth, and minimal data collection—only what’s needed to make this work well.",
      },
      {
        question: "Can I delete or download my plan?",
        answer: "Yes. Download or delete anytime, no drama. It’s your data.",
      },
    ],
  },
  {
    id: "faq-legal",
    label: "Legal & data",
    items: [
      {
        question: "Is this a legal document?",
        answer:
          "No. When I Die™ complements your will/advance directive by keeping the human parts clear and shareable. We don’t give medical or legal advice.",
      },
      {
        question: "What do you store?",
        answer:
          "Your answers, sharing settings, and the metadata needed to run the service (e.g., email). No weird extras.",
      },
    ],
  },
  {
    id: "faq-pricing",
    label: "Pricing",
    items: [
      {
        question: "Is there a free version?",
        answer:
          "Yes—the beta is free while we shape this with you. Paid plans will be small and transparent; you can cancel anytime. We won’t make it weird.",
      },
    ],
  },
  {
    id: "faq-more",
    label: "More",
    items: [
      {
        question: "How do exports work?",
        answer:
          "Share a link, export a tidy PDF, or print sections. We’ll also offer simple printable kits (think “binder, but delightful”).",
      },
      {
        question: "How often do you email me?",
        answer: "Usually once a week with a prompt. You can snooze or switch to monthly check-ins.",
      },
      {
        question: "How do I delete my account?",
        answer: "Settings → Delete account. We’ll confirm (twice) and remove your data.",
      },
      {
        question: "Is the site accessible?",
        answer:
          "We aim for clean markup, keyboard nav, and readable contrast. If we miss something, tell us and we’ll fix it.",
      },
      {
        question: "Does this work for chosen family?",
        answer: "Yes. You choose who matters and what each person can see.",
      },
    ],
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
            <div className="page-hero-brand">
              <Image src="/assets/Logo.svg" alt="When I Die™" className="page-hero-logo" width={120} height={48} />
            </div>
            <p className="eyebrow">FAQ</p>
            <h1 className="page-title">Quick questions, plain answers</h1>
            <p className="page-hero-tagline">We&rsquo;ve got answers. (And no legalese.)</p>
            <p className="faq-intro">
              Pick a topic to see answers. Only one section is open at a time so it stays easy to
              scan.
            </p>
          </div>

          <FaqCategoryAccordion categories={FAQ_CATEGORIES} />

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
