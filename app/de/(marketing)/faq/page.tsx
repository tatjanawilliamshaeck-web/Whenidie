import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartCtaLink } from "@/components/StartCtaLink";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";
import {
  FaqCategoryAccordion,
  type FaqCategory,
} from "@/components/FaqCategoryAccordion";

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
          "Klick auf Start oder Kostenlos beitreten, gib deinen Namen ein — den, unter dem du auf Einladungen und im Nachruf stehen möchtest — und schon bist du dabei. Dauert unter einer Minute. Snacks optional, aber empfohlen.",
      },
      {
        question: "Was passiert nach der Anmeldung?",
        answer:
          "Du landest direkt in deinem Dashboard: Fortschritt, kommende Fragen und ein Bereich „Mit wem du geteilt hast“. Beantworte deine erste Frage, wann immer du bereit bist — niemand verlangt, dass du gleich dein ganzes Leben aufarbeitest.",
      },
      {
        question: "Was passiert zuerst?",
        answer:
          "Wir schicken dir eine erste kleine Frage — etwas Entspanntes wie das Einzugslied oder die Kleiderordnung. Zwei Minuten, eine Antwort, und dein Plan hat offiziell begonnen.",
      },
      {
        question: "Was, wenn ich eine Woche aussetze?",
        answer:
          "Kein schlechtes Gewissen nötig. Die Fragen laufen dir nicht davon. Komm zurück, wann immer du willst — dein Fortschritt bleibt genau da, wo du ihn gelassen hast.",
      },
      {
        question: "Was, wenn ich (oft) meine Meinung ändere?",
        answer:
          "Damit rechnen wir fest. Ändere jede Antwort, so oft du willst. Dein Plan ist lebendig, nicht einlaminiert.",
      },
      {
        question: "Was unterscheidet das von anderen End-of-Life-Tools?",
        answer:
          "Wir nehmen es todernst, das Thema unterhaltsam zu machen — damit du es wirklich durchziehst. Und wir hören nicht bei der Dokumentation auf: Perspektivisch kannst du deine Wünsche verbindlich festlegen und mit Anbietern verknüpfen (Bestattung, Gedenkfeier, Vermächtnis), damit deine Liebsten einem Plan folgen können, statt zu raten.",
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
            Zum Beispiel: Wie soll dein großer Abgang aussehen? Welcher Song
            soll <em>nur über deine Leiche</em> gespielt werden? Wo sollten
            Menschen zuerst nach wichtigen Unterlagen suchen? Eine Mischung aus
            Persönlichem und Praktischem, mit gerade genug Humor, damit du
            nachdenkst und dabei lächelst.
          </>
        ),
      },
      {
        question: "Wie lange dauern die Fragen?",
        answer:
          "Etwa ein bis drei Minuten. Wenn du mehr zu sagen hast, ist auch dafür Platz.",
      },
      {
        question: "Kann ich pausieren oder überspringen?",
        answer:
          "Klar. Klick auf „Überspringen“ oder „Später erinnern“. Keine Serien zum Verteidigen, kein schlechtes Gewissen.",
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
          "Standardmäßig privat. Du entscheidest, wen du einlädst und genau, was diese Person sehen darf — alles oder nur das Wichtigste.",
      },
      {
        question: "Welche Rollen kann ich vergeben?",
        answer:
          "Eigentümer:in (du): bearbeitet, teilt, exportiert und löscht alles. Vertraute Person: sieht nur, was du freigibst. „Im Notfall“-Kontakt: wird bei Bedarf benachrichtigt (optional). Zugriff kannst du jederzeit hinzufügen, entfernen oder ändern.",
      },
      {
        question: "Muss ich sofort Menschen einladen?",
        answer:
          "Nein. Er bleibt privat, bis du so weit bist. Dein Plan gehört dir — geteilt wird erst, wenn du es entscheidest.",
      },
      {
        question: "Wie lade ich jemanden ein, meinen Plan zu sehen?",
        answer:
          "Geh in deinem Dashboard zu „Mit wem du geteilt hast“ und füge die E-Mail-Adresse hinzu. Wir verschicken eine Einladung; die Person sieht (oder bearbeitet, falls erlaubt) je nach zugewiesener Rolle. Zugriff kannst du jederzeit wieder entziehen.",
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
          "Verschlüsselung nach bewährten Standards bei Übertragung und Speicherung, starke Authentifizierung und minimale Datenerhebung — nur das, was für den Betrieb des Dienstes nötig ist.",
      },
      {
        question: "Kann ich meinen Plan löschen oder herunterladen?",
        answer:
          "Ja. Du kannst deinen Plan jederzeit herunterladen oder löschen. Es sind deine Daten.",
      },
    ],
  },
  {
    id: "faq-legal",
    label: "Recht und Daten",
    items: [
      {
        question: "Ist das ein rechtsgültiges Dokument?",
        answer:
          "Nein. When I Die™ ergänzt dein Testament oder deine Patientenverfügung, indem es die menschlichen Teile klar und teilbar macht. Wir geben keine medizinische oder rechtliche Beratung.",
      },
      {
        question: "Was speichert ihr?",
        answer:
          "Deine Antworten, deine Freigabe-Einstellungen und die Metadaten, die der Dienst braucht (zum Beispiel deine E-Mail-Adresse). Nichts, was du nicht erwarten würdest.",
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
          "Ja — die Beta ist kostenlos, während wir sie gemeinsam mit euch weiterentwickeln. Kostenpflichtige Pläne kommen später dazu: klein, transparent und jederzeit kündbar. Kompliziert machen wir höchstens den Tod — nicht die Preise.",
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
          "Teile einen Link, exportiere ein übersichtliches PDF oder drucke einzelne Abschnitte aus. Später kommen einfache druckbare Sets dazu — Ordner, aber mit Stil.",
      },
      {
        question: "Wie oft schreibt ihr mir?",
        answer:
          "Meist einmal pro Woche mit einer Frage. Du kannst pausieren oder auf monatliche Erinnerungen umstellen.",
      },
      {
        question: "Wie lösche ich mein Konto?",
        answer:
          "Einstellungen → Konto löschen. Wir bestätigen zweimal und entfernen anschließend deine Daten.",
      },
      {
        question: "Ist die Seite barrierefrei?",
        answer:
          "Wir achten auf sauberes Markup, Tastaturnavigation und lesbaren Kontrast. Fällt dir etwas auf, das wir übersehen haben? Sag uns Bescheid, wir beheben es.",
      },
      {
        question: "Funktioniert das auch für die Wahlfamilie?",
        answer:
          "Ja. Du entscheidest, wer wichtig ist — und was jede Person sehen darf.",
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
              <Image
                src="/assets/Logo.svg"
                alt="When I Die™"
                className="page-hero-logo"
                width={120}
                height={48}
              />
            </div>
            <p className="eyebrow">FAQ</p>
            <h1 className="page-title">
              Fragen, die du dich bisher nicht zu fragen getraut hast
            </h1>
            <p className="page-hero-tagline">
              Wir haben Antworten. Ganz ohne Juristendeutsch, Weihrauch oder
              betretenes Schweigen.
            </p>
            <p className="faq-intro">
              Wähl ein Thema, um Antworten zu sehen. Immer nur ein Abschnitt ist
              geöffnet, damit es übersichtlich bleibt.
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
