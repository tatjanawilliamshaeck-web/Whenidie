import type { Metadata } from "next";
import { StartCtaLink } from "@/components/StartCtaLink";
import { StickyCta } from "@/components/StickyCta";

export const metadata: Metadata = {
  title: { absolute: "When I Die™ – Bring deinen letzten Willen in Bestform" },
  description:
    "In zehn Minuten ist das Wichtigste geklärt: Wer muss Bescheid wissen? Wo liegt der ganze Kram? Und soll bei deiner Beerdigung wirklich Coldplay laufen? When I Die™.",
};

export default function HomePageDe() {
  return (
    <main id="top" className="page-home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Für später. Also hoffentlich viel später.</p>
            <h1>
              Bring deinen letzten Willen in Bestform. Solange du noch mitreden
              kannst.
            </h1>
            <p className="hero-subtitle">
              In zehn Minuten ist das Wichtigste geklärt: Wer muss Bescheid
              wissen? Wo liegt der ganze Kram? Und soll bei deiner Beerdigung
              wirklich Coldplay laufen? Deine Familie wird dir dankbar sein.
              Später.
            </p>
            <div className="hero-actions">
              <StartCtaLink
                className="btn primary-btn hero-cta-main wid-cta-start"
                loggedOutText="Meinen Plan anfangen"
                loggedInText="Zu deinem Plan"
              />
              <a href="#how-it-works" className="btn secondary-btn">
                So funktioniert&rsquo;s
              </a>
            </div>
            <p className="hero-trust-line">
              Privat bis ins Grab. Geteilt wird nur, was du freigibst.
            </p>
            <p className="hero-secondary-line">
              Heute eine Frage. Morgen vielleicht noch eine.
            </p>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="card-header">
                <span className="pill pill-yellow">
                  Eine kleine Frage für den Anfang
                </span>
              </div>
              <div className="prompt-blocks">
                <div className="prompt-block prompt-block--green">
                  <p className="prompt-question">
                    Wie soll dein großer Abgang aussehen?
                  </p>
                  <p className="prompt-example-inline">
                    &bdquo;Draußen, entspannt, gute Snacks. Wer
                    &sbquo;Trauerfeier&lsquo; sagt, muss einen ausgeben.&ldquo;
                  </p>
                </div>
                <div className="prompt-block prompt-block--blue">
                  <p className="prompt-question">
                    Welcher Song soll nur über deine Leiche gespielt werden?
                  </p>
                  <p className="prompt-example-inline">
                    &bdquo;Coldplay. Selbst dann nicht.&ldquo;
                  </p>
                </div>
              </div>
              <p className="card-footer-text">
                Dein Plan nimmt langsam Gestalt an.
              </p>
              <div className="hero-bloom-teaser">
                <p className="hero-bloom-teaser-count">
                  Du hast 3 Fragen beantwortet.
                </p>
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
                <p className="hero-bloom-teaser-caption">
                  Sieht schon ziemlich lebendig aus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <p className="eyebrow">So funktioniert&rsquo;s</p>
          <h2>Drei Schritte. Kein Notar. Kein Weihrauch. Kein Drama.</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Regel erst mal den wichtigen Kram</h3>
                <p className="step-subcopy">
                  Das Wichtigste schaffen die meisten in etwa zehn Minuten.
                </p>
                <p>
                  Ein paar Antworten – und deine Familie muss später nicht dein
                  gesamtes Leben archäologisch ausgraben.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Plane deinen Abgang mit Stil</h3>
                <p>
                  Musik, Stimmung, Geschichten und die Frage, wer definitiv kein
                  Mikrofon bekommen sollte. Ernst, albern oder irgendwo
                  dazwischen – Hauptsache, es klingt nach dir. Deine Antworten
                  werden automatisch zu einem klaren, druckbaren Plan.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Weih jemanden ein</h3>
                <p>
                  Teile deinen Plan mit einer Person, der du vertraust. Sie
                  sieht erst etwas, wenn du ihn freigibst. Keine Sorge: Für die
                  Nachricht &sbquo;Hallo, hier ist mein Todesplan&lsquo; liefern
                  wir eine weniger seltsame Formulierung mit.
                </p>
              </div>
            </li>
          </ol>
          <div className="section-cta section-cta--mid">
            <StartCtaLink
              className="btn primary-btn wid-cta-start"
              loggedOutText="Okay, erste Frage"
              loggedInText="Zu deinem Plan"
            />
          </div>
        </div>
      </section>

      <section className="section muted" id="what-you-get">
        <div className="container">
          <p className="eyebrow">Das bekommst du</p>
          <h2>Kleine Fragen. Klare Antworten. Kein posthumes Chaos.</h2>
          <div className="benefits-grid benefits-grid--three">
            <article className="benefit">
              <h3>Fragen, die nicht nach Amt klingen</h3>
              <p>
                Kurz, konkret und manchmal ein bisschen unverschämt. Damit du
                tatsächlich antwortest, statt das Thema weitere sieben Jahre zu
                verdrängen.
              </p>
            </article>
            <article className="benefit">
              <h3>Ein Plan mit deiner Handschrift</h3>
              <p>
                Deine Antworten werden zu einem übersichtlichen Plan. Nur besser
                lesbar als der Zettel neben deinem Router.
              </p>
            </article>
            <article className="benefit">
              <h3>Teilen ohne Todesfall-Newsletter</h3>
              <p>
                Du entscheidest, wer was sehen darf. Niemand wird automatisch
                informiert, erschreckt oder vorsorglich zur Beerdigung
                eingeladen.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="why">
        <div className="container">
          <p className="eyebrow">Warum wir das gebaut haben</p>
          <h2>
            Sterben ist menschlich. Danach herrscht häufig Zettelwirtschaft.
          </h2>
          <p className="section-copy section-intro">
            Wenn jemand stirbt, müssen Angehörige plötzlich Antworten auf Fragen
            finden, die vorher niemand stellen wollte. Wo liegen die Unterlagen?
            Was war gewünscht? Und warum gibt es drei Ordner mit der Aufschrift
            &sbquo;Wichtig&lsquo;? When I Die™ sorgt dafür, dass deine Liebsten
            später einen Plan haben – statt nur Rätselraten.
          </p>
          <blockquote className="founder-quote founder-quote--highlight">
            <p>
              &bdquo;Als mein Vater starb, war ich dankbar, dass er mir gesagt
              hatte, wie er beerdigt werden wollte. Mitten in der Trauer gab mir
              dieses eine Detail echte Erleichterung.&ldquo;
            </p>
            <cite>— Tatjana, Gründerin</cite>
          </blockquote>
          <p className="testimonial-fun testimonial-fun--small">
            &bdquo;Es fing als Witz an. Dann fiel mir auf: Meine Familie hat
            wirklich keine Ahnung, wo irgendwas liegt.&ldquo;
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section" id="stay-in-touch">
        <div className="container">
          <div className="faq-cta">
            <StartCtaLink
              className="btn primary-btn faq-cta-btn wid-cta-start"
              loggedOutText="Meinen Plan anfangen"
              loggedInText="Zu deinem Plan"
            />
            <a href="/de/faq" className="small-link-a">
              Alle FAQs ansehen →
            </a>
          </div>
        </div>
      </section>

      <StickyCta watchSectionId="stay-in-touch" locale="de" />
    </main>
  );
}
