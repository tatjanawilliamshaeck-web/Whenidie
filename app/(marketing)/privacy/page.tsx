import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for When I Die™. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage crumb="Privacy" title="Privacy" updated="March 2025">
      <p>
        We care about your privacy. This page explains what we collect, how we use it, and how
        we protect it—in plain language.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Waitlist and contact.</strong> If you join the waitlist, we collect your email
        address. We use it only to notify you when the app launches and to send occasional
        updates (e.g. early access, product news). We don&rsquo;t sell your email to anyone.
      </p>
      <p>
        <strong>If you use the app.</strong> When you create an account, we collect your email
        and (optionally) a display name. We store your answers to prompts and, if you invite
        people, their emails and access levels. We use this only to run the service.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To send you launch and product updates (waitlist)</li>
        <li>To run the app: store your plan, show your progress, and let you share with people you choose</li>
        <li>To run and improve the service (e.g. fixing bugs, adding features)</li>
        <li>To respond to your messages (e.g. hello@whenidie.us)</li>
      </ul>

      <h2>How we protect it</h2>
      <p>
        We use industry-standard practices: encryption in transit (HTTPS), secure storage, and
        minimal data—only what we need. We don&rsquo;t share your personal information with
        third parties for their marketing.
      </p>

      <h2>Your choices</h2>
      <p>
        You can unsubscribe from emails at any time (link in every email). In the app you can
        update or delete your answers anytime. You can ask us to delete your account and
        data—via app settings or email <a href="mailto:hello@whenidie.us">hello@whenidie.us</a>.
        We&rsquo;ll confirm and remove it.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        This site uses minimal or no tracking. We may use basic analytics to understand how the
        site is used (e.g. page views), without identifying you personally.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. We&rsquo;ll post the new version here and,
        for big changes, we&rsquo;ll notify you by email where we can.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email us at <a href="mailto:hello@whenidie.us">hello@whenidie.us</a>.
      </p>
    </LegalPage>
  );
}
