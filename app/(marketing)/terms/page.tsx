import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the When I Die™ website and waitlist.",
};

export default function TermsPage() {
  return (
    <LegalPage crumb="Terms" title="Terms of Use" updated="March 2025">
      <p>
        Thanks for using When I Die™. These terms apply to the website and the waitlist. By
        using the site or signing up, you agree to them. We&rsquo;ve kept this short.
      </p>

      <h2>What When I Die™ is</h2>
      <p>
        When I Die™ is a website that helps you build a personal plan through small weekly
        prompts. The plan is for you and the people you choose to share it with. It is{" "}
        <strong>not</strong> a will, advance directive, or legal or medical advice. It
        complements those; it doesn&rsquo;t replace them. Talk to a lawyer or doctor for legal or
        medical decisions.
      </p>

      <h2>Accounts and your content</h2>
      <p>
        When you create an account, you&apos;re responsible for keeping your password secure and
        for the content you add (your answers). Don&apos;t upload anything that infringes
        others&apos; rights or is illegal or harassing. We can suspend or terminate accounts
        that violate these terms.
      </p>

      <h2>Using the website and waitlist</h2>
      <p>
        You may use this website for personal, non-commercial purposes. When you join the
        waitlist or create an account, you give us your email and we store your plan data so you can
        access it and share with others. You can unsubscribe from marketing emails anytime. Our{" "}
        <a href="/privacy">Privacy</a> policy explains how we handle your data.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&rsquo;t use the site to break laws, harass anyone, send spam, or try to compromise
        our systems or other users. We can suspend or block access if we believe you&rsquo;ve
        violated these terms.
      </p>

      <h2>No warranty</h2>
      <p>
        The site is provided &ldquo;as is.&rdquo; We do our best to keep
        things secure and working, but we don&rsquo;t guarantee uninterrupted or error-free
        service. Use at your own risk.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent allowed by law, When I Die™ and its operators are not liable for any
        indirect, incidental, or consequential damages arising from your use of the site or the
        service.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. We&rsquo;ll post the new version here. Continued use after
        changes means you accept them. For big changes, we&rsquo;ll try to notify you (e.g. by
        email where we have it).
      </p>

      <h2>Contact</h2>
      <p>
        Questions? <a href="mailto:hello@whenidie.us">hello@whenidie.us</a>.
      </p>
    </LegalPage>
  );
}
