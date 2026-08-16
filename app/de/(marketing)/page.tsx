import type { Metadata } from "next";
import { StartCtaLink } from "@/components/StartCtaLink";
import { StickyCta } from "@/components/StickyCta";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: { absolute: "When I Die™ – Erleichtere das Leben der Menschen, die du liebst" },
  description:
    "In 10 Minuten startklar. Halte das Wichtigste fest — wen man anrufen soll, wo alles ist — damit deine Familie nie raten muss. Privat. When I Die™.",
};

const HOME_FAQ = [
  {
    question: "Was für Fragen stellt ihr?",
    answer:
      "Praktisches (wen man anrufen soll, wo alles ist) und Persönliches (Stimmung beim Abschied, Lieder, Geschichten). Also: Beerdigungs-Vibe, Snacks, Unterlagen, Ratschläge, die du hinterlassen würdest. Warmer Ton, ein bisschen Humor.",
  },
  {
    question: "Wer kann meinen Plan sehen?",
    answer: "Nur Menschen, die du einlädst. Standardmäßig privat. Du entscheidest, was jede Person sehen kann.",
  },
  {
    question: "Ist es kostenlos?",
    answer: "Ja, aktuell schon. Kostenpflichtige Pläne kommen später dazu — transparent, jederzeit kündbar.",
  },
  {
    question: "Was macht das anders als andere Tools?",
    answer:
      "Wir machen es menschlich und ein bisschen witzig, damit du es wirklich machst. Eine Frage nach der anderen, in deinen Worten, keine deprimierenden Checklisten. Dein Plan ist teilbar und druckbar, wenn du bereit bist.",
  },
  {
    question: "Wie fange ich an?",
    answer:
      "Registrieren, erste Frage in unter einer Minute beantworten. Dein Plan wächst mit der Zeit. Überspring, was du willst, und komm später zurück.",
  },
  {
    question: "Kann ich meine Daten löschen?",
    answer: "Ja. Lade deinen Plan jederzeit herunter oder lösche ihn.",
  },
];

export default function HomePageDe() {
  return (
    <main id="top" className="page-home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Ein Geschenk für die Menschen, die du liebst.</p>
            <h1>Erleichtere das Leben der Menschen, die sich um dich sorgen.</h1>
            <p className="hero-subtitle">
              In 10 Minuten startklar. Halte das Wichtigste fest — wen man anrufen soll, wo alles
              ist — damit deine Familie nie raten muss.
            </p>
            <div className="hero-actions">
              <StartCtaLink
                className="btn primary-btn hero-cta-main wid-cta-start"
                loggedOutText="Plan starten"
                loggedInText="Zu deinem Plan"
              />
              <a href="#how-it-works" className="btn secondary-btn">
                So funktioniert&rsquo;s
              </a>
            </div>
            <p className="hero-trust-line">Privat. Nur mit Menschen geteilt, die du auswählst.</p>
            <p className="hero-secondary-line">
              Füge nach und nach kleine Antworten hinzu — dein Plan wächst mit der Zeit.
            </p>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="card-header">
                <span className="pill pill-yellow">Eine kleine Frage zum Ausprobieren</span>
              </div>
              <div className="prompt-blocks">
                <div className="prompt-block prompt-block--green">
                  <p className="prompt-question">Wenn deine Beerdigung eine Stimmung hätte — welche wäre das?</p>
                  <p className="prompt-example-inline">&ldquo;Draußen, locker. Snacks Pflicht.&rdquo;</p>
                </div>
                <div className="prompt-block prompt-block--blue">
                  <p className="prompt-question">Welches Lied sollte <em>auf keinen Fall</em> laufen?</p>
                  <p className="prompt-example-inline">&ldquo;Irgendwas von Coldplay.&rdquo;</p>
                </div>
              </div>
              <p className="card-footer-text">Dein Plan wächst mit der Zeit.</p>
              <div className="hero-bloom-teaser">
                <p className="hero-bloom-teaser-count">Du hast 3 Fragen beantwortet</p>
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
                <p className="hero-bloom-teaser-caption">Dein Plan blüht auf.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--manifesto manifesto-block">
        <div className="container">
          <p className="manifesto-brand">When I Die™</p>
          <p className="manifesto-line">
            Kein Testament.
            <br />
            Kein Tresor.
            <br />
            Keine deprimierende Checkliste.
          </p>
          <p className="manifesto-punch">
            Es ist eine menschliche Art, Klarheit, Persönlichkeit — und weniger Chaos — zu hinterlassen.
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="how-it-works">
        <div className="container">
          <p className="eyebrow">So funktioniert&rsquo;s</p>
          <h2>Drei Schritte. Du hast die Kontrolle.</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Starte mit dem Wichtigsten</h3>
                <p className="step-subcopy">Die meisten schaffen das Wichtigste in etwa 10 Minuten.</p>
                <p>Wen man anrufen soll, wo alles ist, was du dir wünschst — damit deine Familie nie raten muss.</p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Gestalte deinen Plan mit Fragen, die zu dir passen</h3>
                <p>
                  Jede Antwort wird Teil eines klaren, druckbaren Plans. Schreib so viel oder so wenig,
                  wie du willst. Ändere jederzeit alles.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Teile ihn mit jemandem, dem du vertraust</h3>
                <p>
                  Füge Partner:in, Geschwister oder eine enge Freundschaft hinzu. Sie sehen nichts, bis
                  du teilst. Wir geben dir eine Nachricht, die du verschicken kannst, damit es nicht
                  komisch wird.
                </p>
              </div>
            </li>
          </ol>
          <div className="section-cta section-cta--mid">
            <StartCtaLink
              className="btn primary-btn wid-cta-start"
              loggedOutText="Deine erste Frage ansehen"
              loggedInText="Zu deinem Plan"
            />
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="inside-your-plan">
        <div className="container">
          <p className="eyebrow">In deinem Plan</p>
          <h2>Echte Fragen. Echte Kategorien.</h2>
          <p className="section-copy section-intro">
            Dein Plan ist in Kapitel unterteilt. Hier ein kleiner Vorgeschmack, was wir fragen.
          </p>
          <div className="inside-plan-grid">
            <article className="inside-plan-category">
              <h3>Die Basics</h3>
              <ul className="inside-plan-prompts">
                <li>Wer sollte zuerst angerufen werden?</li>
                <li>Wo sind deine wichtigen Unterlagen?</li>
                <li>Was würde jemanden verwirren, der in dein Leben eintaucht?</li>
              </ul>
            </article>
            <article className="inside-plan-category">
              <h3>Dein legendärer Abschied</h3>
              <ul className="inside-plan-prompts">
                <li>Welches Lied soll bei deinem Abschied laufen?</li>
                <li>Welche Stimmung soll die Feier haben?</li>
                <li>
                  Was darf <em>auf keinen Fall</em> passieren?
                </li>
              </ul>
            </article>
            <article className="inside-plan-category">
              <h3>Die Geschichten, die zählen</h3>
              <ul className="inside-plan-prompts">
                <li>Welche Geschichte aus deinem Leben sollten sich die Menschen merken?</li>
                <li>Welchen Rat würdest du hinterlassen?</li>
                <li>Worüber hättest du gern öfter gesprochen?</li>
              </ul>
            </article>
          </div>
          <div className="section-cta">
            <StartCtaLink
              className="btn primary-btn wid-cta-start"
              loggedOutText="Mit dem Wichtigsten beginnen"
              loggedInText="Zu deinem Plan"
            />
          </div>
        </div>
      </section>

      <section className="section muted" id="what-you-get">
        <div className="container">
          <p className="eyebrow">Das bekommst du</p>
          <h2>Fragen, ein klarer Plan, einfaches Teilen.</h2>
          <div className="benefits-grid benefits-grid--three">
            <article className="benefit">
              <h3>Kurze Fragen mit Beispielen</h3>
              <p>Warmherzige Fragen, damit du nie feststeckst. Schreib so viel oder so wenig, wie du willst.</p>
            </article>
            <article className="benefit">
              <h3>Ein Plan, der klingt wie du</h3>
              <p>Deine Antworten werden zu einem verständlichen Plan, den deine Liebsten wirklich nutzen können.</p>
            </article>
            <article className="benefit">
              <h3>Teile, wenn du bereit bist</h3>
              <p>Standardmäßig privat. Lade ein, wen du möchtest, und bestimme, was sie sehen.</p>
            </article>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="why">
        <div className="container">
          <p className="eyebrow">Warum wir das gebaut haben</p>
          <h2>Es wird chaotisch, wenn jemand stirbt und niemand weiß, was er oder sie sich gewünscht hat.</h2>
          <p className="section-copy section-intro">
            Angehörige müssen bei Beerdigung, Unterlagen, Wünschen und persönlichen Botschaften oft
            raten. Wir haben When I Die™ gebaut, um diese Unsicherheit zu beseitigen — und das
            Festhalten überraschend angenehm zu machen.
          </p>
          <blockquote className="founder-quote founder-quote--highlight">
            <p>
              &ldquo;Als mein Vater starb, war ich dankbar, dass er mir gesagt hatte, wie er beerdigt
              werden wollte. Mitten in der Trauer gab mir dieses eine Detail echte
              Erleichterung.&rdquo;
            </p>
            <cite>— Tatjana, Gründerin</cite>
          </blockquote>
          <p className="testimonial-fun testimonial-fun--small">
            &ldquo;Ich hab&rsquo;s als Witz angefangen und dann gemerkt … wow, meine Familie würde
            das alles wirklich brauchen.&rdquo;
          </p>
        </div>
      </section>

      <section className="section muted section--compact" id="whats-next">
        <div className="container">
          <p className="eyebrow">Wohin die Reise geht</p>
          <h2>Nicht nur dokumentieren. Wirklich möglich machen.</h2>
          <p className="section-copy">
            Wir arbeiten darauf hin, dass du deine Wünsche verbindlich festlegen und mit
            Dienstleistern verknüpfen kannst — damit deine Liebsten dem Plan folgen können, statt zu
            raten. Aktuell konzentrieren wir uns darauf, dir zu helfen, das Wichtige festzuhalten.
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section muted" id="faq">
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h2>Ein paar Fragen</h2>
          <FaqAccordion items={HOME_FAQ} />
          <div className="faq-cta">
            <StartCtaLink
              className="btn primary-btn faq-cta-btn wid-cta-start"
              loggedOutText="Plan starten"
              loggedInText="Zu deinem Plan"
            />
          </div>
        </div>
      </section>

      <section className="section conversion-block" id="stay-in-touch">
        <div className="container conversion-inner">
          <div className="conversion-primary">
            <h2>Plan starten</h2>
            <p className="section-copy">Beantworte deine erste Frage in unter einer Minute. Privat, keine Kreditkarte nötig.</p>
            <StartCtaLink
              className="btn primary-btn conversion-cta wid-cta-start"
              loggedOutText="Plan starten"
              loggedInText="Zu deinem Plan"
            />
          </div>
          <div className="conversion-secondary">
            <p className="conversion-secondary-label">Produkt-Updates erhalten</p>
            <p className="section-copy conversion-secondary-text">
              Wir melden uns, wenn es neue Fragen oder Funktionen gibt.
            </p>
            <WaitlistForm locale="de" />
          </div>
        </div>
      </section>

      <StickyCta watchSectionId="stay-in-touch" locale="de" />
    </main>
  );
}
