import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "So funktioniert’s",
  description:
    "So funktioniert When I Die™: eine kleine Frage nach der anderen, ein lebendiger Plan, einfaches Teilen. Kostenlos beitreten. Kein schlechtes Gewissen.",
};

export default function HowItWorksPageDe() {
  return (
    <main id="main-content" className="page-how-it-works">
      <PageHero
        crumb="So funktioniert’s"
        eyebrow="So funktioniert’s"
        title="Der Tod kommt früh genug. Dein Plan darf vorher fertig sein."
        tagline="Niemand möchte den Samstag mit der eigenen Beerdigung verbringen. Wir auch nicht. Deshalb bekommst du kleine Fragen statt großer Formulare – mit etwas Humor und ganz ohne Orgelmusik."
        locale="de"
      >
        <p className="section-copy section-intro">
          Die Fragen kommen per E-Mail oder warten auf der Website – du
          entscheidest. Antworte, wenn es gerade passt. Mit jeder Antwort nimmt
          dein Plan mehr Gestalt an. Ganz ohne Amtsflur-Gefühl und
          Beerdigungsbroschüre.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          Du siehst auf einen Blick, wie viele Fragen du beantwortet hast, was
          als Nächstes kommt und wen du bereits eingeweiht hast. Alles lebt an
          einem Ort – deinem Dashboard. Immerhin sollst du deinen Plan finden
          können, ohne dafür einen eigenen Plan zu brauchen.
        </p>
      </PageHero>

      <section className="section muted">
        <div className="container">
          <p className="eyebrow">Die drei Säulen</p>
          <h2 className="section-title">
            Fragen beantworten → Kram regeln → Ruhe haben
          </h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Eine kleine Frage nach der anderen</h3>
                <p>
                  Mal geht es darum, wer zuerst angerufen werden soll. Mal um
                  dein Einzugslied, die Snacks oder die Person, die wirklich
                  kein Mikrofon bekommen darf. Antworte kurz oder ausführlich,
                  überspring Fragen und komm später wieder. Kein Verhör, kein
                  Totenschein, kein Zeitdruck.
                </p>
                <p className="step-detail">
                  Beispielfragen, die dich erwarten:{" "}
                  <em>
                    &bdquo;Wenn deine Beerdigung eine Stimmung hätte — welche
                    wäre das?&ldquo;
                  </em>{" "}
                  ·{" "}
                  <em>
                    &bdquo;Welches Lied sollte auf keinen Fall laufen?&ldquo;
                  </em>{" "}
                  ·{" "}
                  <em>
                    &bdquo;Wo sollte jemand zuerst nach wichtigen Unterlagen
                    suchen?&ldquo;
                  </em>{" "}
                  ·{" "}
                  <em>
                    &bdquo;Wer sollte sprechen — und wer lieber nicht?&ldquo;
                  </em>{" "}
                  Eine Mischung aus Persönlichem und Praktischem, mit ein
                  bisschen Humor, damit du nachdenkst und dabei lächelst.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Sieh zu, wie dein Plan lebendig wird</h3>
                <p>
                  Jede Antwort landet automatisch an der richtigen Stelle. Nach
                  und nach entsteht ein klarer Plan, der nach dir klingt – und
                  den andere tatsächlich verstehen können.
                </p>
                <p className="step-detail">
                  In deinem Dashboard siehst du genau, wo du stehst: welche
                  Fragen du beantwortet hast, welche noch kommen, und eine
                  einfache &bdquo;Dein Plan bisher&ldquo;-Ansicht. Später kommen
                  Export (PDF, Druck) und die Möglichkeit dazu, Wünsche
                  verbindlich festzulegen und mit Dienstleistern zu verknüpfen,
                  damit deine Liebsten dem Plan folgen können, statt zu raten.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Teile ihn, wenn du bereit bist</h3>
                <p>
                  Lade einen Menschen ein, dem du vertraust. Dein Plan bleibt
                  privat, bis du ihn freigibst. Du entscheidest, wer was sehen
                  darf.
                </p>
                <p className="step-detail">
                  In deinem Dashboard gibt es einen Bereich &bdquo;Mit wem du
                  geteilt hast&ldquo;: sieh, wer Zugriff hat, welche Rolle sie
                  haben, und wann du sie eingeladen hast. Zugriff entziehen oder
                  jemand Neues hinzufügen — in wenigen Klicks. Niemand sieht
                  deinen Plan, bevor du ihn einlädst — und du kannst ihn so
                  lange privat halten, wie du möchtest.
                </p>
              </div>
            </li>
          </ol>

          <div className="plan-mock" aria-hidden="true">
            <p className="plan-mock-title">Dein Plan bisher</p>
            <ul className="plan-mock-list">
              <li>
                <span className="plan-check" aria-hidden="true">
                  ✓
                </span>{" "}
                Einzugslied
              </li>
              <li>
                <span className="plan-check" aria-hidden="true">
                  ✓
                </span>{" "}
                Snacks und Stimmung
              </li>
              <li>
                <span className="plan-check" aria-hidden="true">
                  ✓
                </span>{" "}
                Wer reden darf
              </li>
              <li>
                <span className="plan-dot" aria-hidden="true">
                  ○
                </span>{" "}
                Wer zuerst angerufen werden soll
              </li>
              <li>
                <span className="plan-dot" aria-hidden="true">
                  ○
                </span>{" "}
                Wo sich alles versteckt
              </li>
            </ul>
          </div>

          <p className="section-copy small-link" style={{ marginTop: "2rem" }}>
            <Link href="/de#what-you-get" className="small-link-a">
              Sieh, was du bekommst →
            </Link>
          </p>

          <hr className="section-divider" aria-hidden="true" />

          <p className="eyebrow">
            Das erwartet dich – ganz ohne düstere Überraschungen
          </p>
          <h2>
            Dein Dashboard: Fortschritt, Fragen und wer bereits eingeweiht ist
          </h2>
          <p className="section-copy section-intro">
            Sobald du ein Konto hast, bekommst du einen einzigen Ort, um zu
            sehen, wo du stehst und was als Nächstes kommt.
          </p>
          <ul className="detail-list">
            <li>
              <strong>Fortschritt</strong> — Ein klares &bdquo;X von Y
              beantwortet&ldquo;, damit du weißt, wo du stehst. Kein schlechtes
              Gewissen, wenn du eine Woche aussetzt — die Zahl wartet einfach
              auf dich.
            </li>
            <li>
              <strong>Kommende Fragen</strong> — Die nächsten Fragen, die du
              noch nicht beantwortet hast. Tippe auf eine, um sie jetzt zu
              beantworten, oder lass sie für später liegen.
            </li>
            <li>
              <strong>Beantwortet</strong> — Alles, was du bereits geschrieben
              hast. Jederzeit bearbeitbar. Dein Plan aktualisiert sich mit der
              Zeit.
            </li>
            <li>
              <strong>Mit wem du geteilt hast</strong> — Menschen, die du
              eingeladen hast, deinen Plan zu sehen (oder dir zu helfen). Sieh,
              wer Zugriff hat, und ändere es, wann immer du willst.
            </li>
          </ul>
          <p className="section-copy">
            Wir bauen das so, dass es sich menschlich und leicht anfühlt — nicht
            wie eine Tabellenkalkulation oder ein Formular. Eines Tages kommt
            vielleicht ein persönlicherer, gesprächsähnlicher Ablauf dazu (z. B.
            KI-geführt); für jetzt ist es eine klare Liste von Fragen, die du in
            deinem eigenen Tempo angehen kannst.
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
