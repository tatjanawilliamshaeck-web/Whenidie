import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "So funktioniert’s",
  description:
    "So funktioniert When I Die™: eine kleine Frage, ein Plan, der entsteht, und Teilen, bevor es darauf ankommt.",
};

export default function HowItWorksPageDe() {
  return (
    <main id="main-content" className="page-how-it-works">
      <PageHero
        crumb="So funktioniert’s"
        eyebrow="So funktioniert’s"
        title="Deine Beerdigung planen. Ohne dass gleich die Stimmung stirbt."
        tagline="Du möchtest vermutlich nicht deinen ganzen Samstag damit verbringen, deine Beerdigung zu planen. Verständlich. Samstage sind für Ausschlafen, Kuchen und das Ignorieren der Wäsche da."
        locale="de"
      >
        <p className="section-copy section-intro">
          Deshalb macht When I Die™ das Ganze menschlich, leicht und erstaunlich
          unterhaltsam. Das Thema ist ernst. Aber du musst dabei weder
          bedrückende Musik hören noch bedeutungsvoll aus dem Fenster schauen.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          Vielleicht musst du lachen. Vielleicht erinnerst du dich an etwas
          Schönes. Vielleicht stellst du fest, dass du überraschend
          leidenschaftliche Meinungen über Trauerfeier-Kartoffelsalat hast.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          <strong>Auch das gehört zu deinem Vermächtnis.</strong>
        </p>
      </PageHero>

      <section className="section muted">
        <div className="container">
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Beantworte eine kleine Frage</h3>
                <p>
                  Neue Fragen kommen per E-Mail oder warten auf der Website auf
                  dich—du entscheidest. Beantworte eine, wenn es gerade passt.
                  Oder ignoriere uns erst einmal und geh ein Eis essen.
                </p>
                <p className="step-detail-lead">Wir fragen zum Beispiel:</p>
                <ul className="step-detail-list">
                  <li>
                    Welches Lied soll gespielt werden, wenn alle ankommen?
                  </li>
                  <li>Wer soll etwas sagen?</li>
                  <li>
                    Und wer sollte auf keinen Fall in die Nähe eines Mikrofons
                    gelassen werden?
                  </li>
                  <li>Welche Snacks müssen unbedingt auf den Tisch?</li>
                </ul>
                <p className="step-detail">
                  Zu jeder Frage gibt es Beispiele, damit du nicht zehn Minuten
                  lang auf ein leeres Feld starrst und plötzlich deine gesamte
                  Existenz hinterfragst.
                </p>
                <p className="step-detail">
                  Die meisten Antworten dauern nur ein paar Minuten. Schreib
                  einen Satz oder einen Roman. Überspringe Fragen. Ändere deine
                  Meinung. Komm später wieder.
                </p>
                <p className="step-detail">
                  Kein Druck. Keine Punktzahl. Keine vorwurfsvolle Eule. Keine
                  deprimierenden Broschüren mit Sonnenuntergang auf dem Cover.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Sieh zu, wie dein Plan entsteht</h3>
                <p>
                  Während du über Lieder, Snacks und das Mikrofonverbot für
                  Onkel Klaus nachdenkst, entsteht im Hintergrund etwas wirklich
                  Hilfreiches. Jede Antwort wird Teil eines klaren, persönlichen
                  Plans—von wichtigen Dokumenten und Kontakten bis zu
                  Geschichten, Wünschen und einem rechtskräftig wirkenden Verbot
                  für dieses eine schreckliche Foto.
                </p>
                <p className="step-detail-lead">
                  In deinem Dashboard findest du alles an einem Ort. Du siehst
                  sofort:
                </p>
                <ul className="step-detail-list">
                  <li>Was du schon beantwortet hast</li>
                  <li>Was als Nächstes kommt</li>
                  <li>Wie dein Plan wächst</li>
                  <li>Wen du eingeladen hast</li>
                </ul>
                <p className="step-detail">
                  Du kannst alles jederzeit ändern. Es ist dein Leben, dein Plan
                  und dein gutes Recht, das Einzugslied zwölfmal auszutauschen
                  und am Ende doch wieder das erste zu nehmen.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Teile deinen Plan, bevor er gebraucht wird</h3>
                <p>
                  Dein Plan kann privat bleiben, solange du daran arbeitest.
                  Aber irgendwann solltest du ihn mit mindestens einer Person
                  teilen, der du vertraust. Denn der beste Plan der Welt hilft
                  wenig, wenn er sich in einem Ordner namens
                  &bdquo;WICHTIG_FINAL_NEU_2&ldquo; auf deinem Laptop versteckt.
                </p>
                <p className="step-detail">
                  Du entscheidest, wer Zugriff bekommt und was die Person sehen
                  darf. Du kannst jederzeit jemanden hinzufügen, Rechte ändern
                  oder Menschen wieder entfernen—besonders, wenn sie anfangen,
                  deine Musikauswahl zu kritisieren.
                </p>
                <p className="step-detail">
                  Dein Plan muss nicht perfekt sein. Er muss nur jemanden
                  erreichen, bevor du für Rückfragen dauerhaft nicht mehr zur
                  Verfügung stehst.
                </p>
              </div>
            </li>
          </ol>

          <p className="section-closer">
            Ein paar überraschend unterhaltsame Fragen. Ein wirklich hilfreicher
            Plan. Und vielleicht sogar bessere Laune als vorher.
          </p>
        </div>
      </section>

      <SectionCta locale="de" />
      <SubpageStickyCta
        text="Regel deinen Kram. Deine Erben haben schon genug zu tun."
        loggedOutText="Kostenlos beitreten"
        loggedInText="Zu deinem Plan"
      />
    </main>
  );
}
