import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartCtaLink } from "@/components/StartCtaLink";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";
import { FaqCategoryAccordion, type FaqCategory } from "@/components/FaqCategoryAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufig gestellte Fragen zu When I Die™: loslegen, Fragen, Teilen, Datenschutz, Preise und mehr.",
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "faq-getting-started",
    label: "Loslegen",
    items: [
      {
        question: "Wie mache ich mit?",
        answer:
          "Klick auf Start oder Kostenlos beitreten, gib deinen Namen ein (den, den du auf Einladungen/Nachrufen haben möchtest), und du bist dabei. Unter einer Minute. Snacks optional.",
      },
      {
        question: "Was passiert nach der Anmeldung?",
        answer:
          "Du landest in deinem Dashboard. Du siehst deinen Fortschritt (wie viele Fragen du beantwortet hast), kommende Fragen und einen Bereich „Mit wem du geteilt hast“. Beantworte deine erste Frage, wann immer du bereit bist; du musst nicht alles auf einmal machen.",
      },
      {
        question: "Was passiert zuerst?",
        answer:
          "Wir schicken dir deine erste kleine Frage — etwas Freundliches wie das Einzugslied oder die Kleiderordnung. Du beantwortest sie in ~2 Minuten, und schon hat dein Plan begonnen.",
      },
      {
        question: "Was, wenn ich eine Woche aussetze?",
        answer: "Kein schlechtes Gewissen. Fragen warten geduldig. Komm zurück, wann immer du willst — dein Plan verliert nie den Fortschritt.",
      },
      {
        question: "Was, wenn ich (oft) meine Meinung ändere?",
        answer: "Damit rechnen wir. Ändere jede Antwort jederzeit. Dein Plan lebt, er ist nicht einlaminiert.",
      },
      {
        question: "Was unterscheidet das von anderen End-of-Life-Tools?",
        answer:
          "Wir nehmen es todernst, das Ganze witzig zu machen — damit du es wirklich machst. Und wir hören nicht bei der Dokumentation auf. Irgendwann kannst du deine Wünsche verbindlich festlegen und mit Dienstleistern (Beerdigung, Gedenkfeier, Vermächtnis) verknüpfen, damit deine Liebsten dem Plan folgen können, statt zu raten.",
      },
    ],
  },
  {
    id: "faq-prompts",
    label: "Fragen",
    items: [
      {
        question: "Was wird gefragt?",
        answer: (
          <>
            Zum Beispiel: Wenn deine Beerdigung eine Stimmung hätte — welche wäre das? Welches
            Lied sollte <em>auf keinen Fall</em> laufen? Wo sollten Menschen zuerst nach wichtigen
            Unterlagen suchen? Eine Mischung aus Persönlichem und Praktischem, mit ein bisschen
            Humor — damit du nachdenkst und dabei lächelst.
          </>
        ),
      },
      {
        question: "Wie lange dauern die Fragen?",
        answer: "Etwa 1–3 Minuten. Du kannst auch mehr schreiben, wenn dir danach ist.",
      },
      {
        question: "Kann ich pausieren oder überspringen?",
        answer: "Klar. Klick auf „Überspringen“ oder „Später erinnern“. Keine Serien, kein schlechtes Gewissen.",
      },
    ],
  },
  {
    id: "faq-sharing",
    label: "Teilen",
    items: [
      {
        question: "Wer kann meinen Plan sehen?",
        answer:
          "Standardmäßig privat. Du entscheidest, wen du einlädst und genau, was sie sehen können (alles oder nur das Wichtigste).",
      },
      {
        question: "Welche Rollen kann ich vergeben?",
        answer:
          "Eigentümer:in (du): bearbeitet alles, teilt, exportiert, löscht. Vertraute Person: sieht nur, was du teilst. „Im Notfall“-Kontakt: wird benachrichtigt, falls etwas passiert (optional). Du kannst Zugriff jederzeit hinzufügen, entfernen oder ändern.",
      },
      {
        question: "Muss ich sofort Menschen einladen?",
        answer: "Nein. Halte es privat, bis du bereit bist. Dein Plan gehört dir, bis du dich entscheidest, ihn zu teilen.",
      },
      {
        question: "Wie lade ich jemanden ein, meinen Plan zu sehen?",
        answer:
          "Geh in deinem Dashboard zu „Mit wem du geteilt hast“ und füge die E-Mail-Adresse hinzu. Wir schicken eine Einladung; die Person kann ansehen (oder bearbeiten, falls erlaubt), je nach vergebener Rolle. Du kannst den Zugriff jederzeit entziehen.",
      },
    ],
  },
  {
    id: "faq-privacy",
    label: "Datenschutz",
    items: [
      {
        question: "Wie sind meine Daten geschützt?",
        answer:
          "Verschlüsselung nach bewährten Standards bei Übertragung und Speicherung, starke Authentifizierung und minimale Datenerhebung — nur das, was nötig ist, damit alles gut funktioniert.",
      },
      {
        question: "Kann ich meinen Plan löschen oder herunterladen?",
        answer: "Ja. Jederzeit herunterladen oder löschen, ganz ohne Drama. Es sind deine Daten.",
      },
    ],
  },
  {
    id: "faq-legal",
    label: "Recht & Daten",
    items: [
      {
        question: "Ist das ein rechtsgültiges Dokument?",
        answer:
          "Nein. When I Die™ ergänzt dein Testament/deine Patientenverfügung, indem es die menschlichen Teile klar und teilbar macht. Wir geben keine medizinische oder rechtliche Beratung.",
      },
      {
        question: "Was speichert ihr?",
        answer:
          "Deine Antworten, deine Freigabe-Einstellungen und die Metadaten, die der Dienst braucht (z. B. E-Mail-Adresse). Keine seltsamen Extras.",
      },
    ],
  },
  {
    id: "faq-pricing",
    label: "Preise",
    items: [
      {
        question: "Gibt es eine kostenlose Version?",
        answer:
          "Ja — die Beta ist kostenlos, während wir das gemeinsam mit euch gestalten. Kostenpflichtige Pläne werden klein und transparent sein; jederzeit kündbar. Wir machen es nicht kompliziert.",
      },
    ],
  },
  {
    id: "faq-more",
    label: "Mehr",
    items: [
      {
        question: "Wie funktioniert der Export?",
        answer:
          "Teile einen Link, exportiere ein übersichtliches PDF, oder drucke Abschnitte aus. Später bieten wir auch einfache druckbare Sets an (denk an „Ordner, aber mit Stil“).",
      },
      {
        question: "Wie oft schreibt ihr mir?",
        answer: "Meist einmal pro Woche mit einer Frage. Du kannst pausieren oder auf monatliche Erinnerungen umstellen.",
      },
      {
        question: "Wie lösche ich mein Konto?",
        answer: "Einstellungen → Konto löschen. Wir bestätigen (zweimal) und entfernen deine Daten.",
      },
      {
        question: "Ist die Seite barrierefrei?",
        answer:
          "Wir achten auf sauberes Markup, Tastaturnavigation und lesbaren Kontrast. Wenn wir etwas übersehen, sag uns Bescheid — wir beheben es.",
      },
      {
        question: "Funktioniert das auch für die Wahlfamilie?",
        answer: "Ja. Du entscheidest, wer wichtig ist und was jede Person sehen kann.",
      },
    ],
  },
];

export default function FaqPageDe() {
  return (
    <main id="main-content" className="page-faq">
      <section className="section muted page-hero-section" id="faq">
        <div className="container">
          <div className="page-hero-inner">
            <div className="page-hero-nav">
              <Link href="/de" className="back-link">
                ← Zurück zur Startseite
              </Link>
              <nav aria-label="Breadcrumb" className="breadcrumb">
                <ol>
                  <li>
                    <Link href="/de">Start</Link>
                  </li>
                  <li aria-current="page">FAQ</li>
                </ol>
              </nav>
            </div>
            <div className="page-hero-brand">
              <Image src="/assets/Logo.svg" alt="When I Die™" className="page-hero-logo" width={120} height={48} />
            </div>
            <p className="eyebrow">FAQ</p>
            <h1 className="page-title">Kurze Fragen, klare Antworten</h1>
            <p className="page-hero-tagline">Wir haben Antworten. (Und kein Juristendeutsch.)</p>
            <p className="faq-intro">
              Wähl ein Thema, um Antworten zu sehen. Immer nur ein Abschnitt ist geöffnet, damit
              es übersichtlich bleibt.
            </p>
          </div>

          <FaqCategoryAccordion categories={FAQ_CATEGORIES} />

          <div className="faq-cta">
            <p className="faq-cta-text">Bereit?</p>
            <StartCtaLink
              className="btn primary-btn faq-cta-btn wid-cta-start"
              loggedOutText="Plan starten (kostenlos)"
              loggedInText="Zu deinem Plan"
            />
          </div>
        </div>
      </section>

      <SubpageStickyCta
        text="Bring deine Angelegenheiten in Ordnung. Kostenlos."
        loggedOutText="Kostenlos beitreten"
        loggedInText="Zu deinem Plan"
      />
    </main>
  );
}
