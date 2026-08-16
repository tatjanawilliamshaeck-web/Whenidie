import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung für When I Die™. Wie wir deine Daten erfassen, nutzen und schützen.",
};

export default function PrivacyPageDe() {
  return (
    <LegalPage crumb="Datenschutz" title="Datenschutz" updated="März 2025" locale="de">
      <p>
        Uns ist deine Privatsphäre wichtig. Diese Seite erklärt in einfacher Sprache, was wir
        erfassen, wie wir es nutzen und wie wir es schützen.
      </p>

      <h2>Was wir erfassen</h2>
      <p>
        <strong>Warteliste und Kontakt.</strong> Wenn du der Warteliste beitrittst, erfassen wir
        deine E-Mail-Adresse. Wir nutzen sie nur, um dich beim Start der App zu benachrichtigen
        und gelegentliche Updates zu senden (z. B. früher Zugang, Produktneuigkeiten). Wir
        verkaufen deine E-Mail-Adresse an niemanden.
      </p>
      <p>
        <strong>Wenn du die App nutzt.</strong> Wenn du ein Konto erstellst, erfassen wir deine
        E-Mail-Adresse und (optional) einen Anzeigenamen. Wir speichern deine Antworten auf
        Fragen und, falls du Menschen einlädst, deren E-Mail-Adressen und Zugriffsrechte. Wir
        nutzen das nur, um den Dienst zu betreiben.
      </p>

      <h2>Wie wir deine Daten nutzen</h2>
      <ul>
        <li>Um dir Start- und Produkt-Updates zu schicken (Warteliste)</li>
        <li>Um die App zu betreiben: deinen Plan speichern, deinen Fortschritt anzeigen und Teilen mit von dir gewählten Menschen ermöglichen</li>
        <li>Um den Dienst zu betreiben und zu verbessern (z. B. Fehler beheben, Funktionen hinzufügen)</li>
        <li>Um auf deine Nachrichten zu antworten (z. B. hello@whenidie.us)</li>
      </ul>

      <h2>Wie wir deine Daten schützen</h2>
      <p>
        Wir nutzen branchenübliche Standards: Verschlüsselung bei der Übertragung (HTTPS),
        sichere Speicherung und minimale Datenerhebung — nur das, was wir brauchen. Wir geben
        deine persönlichen Daten nicht zu Marketingzwecken an Dritte weiter.
      </p>

      <h2>Deine Wahlmöglichkeiten</h2>
      <p>
        Du kannst dich jederzeit von E-Mails abmelden (Link in jeder E-Mail). In der App kannst
        du deine Antworten jederzeit ändern oder löschen. Du kannst uns bitten, dein Konto und
        deine Daten zu löschen — über die App-Einstellungen oder per E-Mail an{" "}
        <a href="mailto:hello@whenidie.us">hello@whenidie.us</a>. Wir bestätigen und entfernen
        sie.
      </p>

      <h2>Cookies und Tracking</h2>
      <p>
        Diese Seite nutzt minimales oder kein Tracking. Wir verwenden möglicherweise einfache
        Analysen, um zu verstehen, wie die Seite genutzt wird (z. B. Seitenaufrufe), ohne dich
        persönlich zu identifizieren.
      </p>

      <h2>Änderungen</h2>
      <p>
        Wir aktualisieren diese Richtlinie gelegentlich. Wir veröffentlichen die neue Version
        hier und benachrichtigen dich bei größeren Änderungen, wo möglich, per E-Mail.
      </p>

      <h2>Kontakt</h2>
      <p>
        Fragen? Schreib uns an <a href="mailto:hello@whenidie.us">hello@whenidie.us</a>.
      </p>
    </LegalPage>
  );
}
