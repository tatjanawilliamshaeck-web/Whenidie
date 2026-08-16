import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "So funktioniert's",
  description:
    "So funktioniert When I Die™: eine kleine Frage nach der anderen, ein lebendiger Plan, einfaches Teilen. Kostenlos beitreten. Kein schlechtes Gewissen.",
};

export default function HowItWorksPageDe() {
  return (
    <main id="main-content" className="page-how-it-works">
      <PageHero
        crumb="So funktioniert's"
        eyebrow="So funktioniert's"
        title="Einfache Schritte, wann immer du Lust hast"
        tagline="Wir wissen — niemand will seinen Samstag mit Beerdigungsplanung verbringen. Deshalb haben wir es lustig, menschlich und überraschend angenehm gemacht."
        locale="de"
      >
        <p className="section-copy section-intro">
          Fragen kommen per E-Mail oder auf der Website — deine Wahl. Beantworte sie, wenn es passt.
          Dein Plan aktualisiert sich mit der Zeit. Keine deprimierenden Broschüren.
        </p>
        <p className="section-copy" style={{ marginTop: "0.75rem" }}>
          Du siehst deinen Fortschritt auf einen Blick: wie viele Fragen du beantwortet hast, was
          als Nächstes kommt, und wen (falls überhaupt jemanden) du eingeladen hast, deinen Plan zu
          sehen. Alles an einem Ort — deinem Dashboard — damit du nie den Überblick verlierst.
        </p>
      </PageHero>

      <section className="section muted">
        <div className="container">
          <p className="eyebrow">Die drei Säulen</p>
          <h2 className="section-title">Fragen → Plan → Menschen</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div>
                <h3>Beantworte eine kleine Frage nach der anderen</h3>
                <p>
                  Einzugslied, Snacks, wer sprechen soll und wer lieber nicht — sanfte Fragen, die
                  die Tür öffnen. Jede Frage kommt mit Beispielen, damit du nie ratlos vor einem
                  leeren Feld sitzt. Die meisten dauern ein bis drei Minuten. Schreib mehr, wenn dir
                  danach ist, oder klick auf &bdquo;Überspringen&ldquo; und komm später zurück.
                  Keine Serien, kein schlechtes Gewissen.
                </p>
                <p className="step-detail">
                  Beispielfragen, die dich erwarten: <em>&bdquo;Wenn deine Beerdigung eine Stimmung
                  hätte — welche wäre das?&ldquo;</em> ·{" "}
                  <em>&bdquo;Welches Lied sollte auf keinen Fall laufen?&ldquo;</em> ·{" "}
                  <em>&bdquo;Wo sollte jemand zuerst nach wichtigen Unterlagen suchen?&ldquo;</em> ·{" "}
                  <em>&bdquo;Wer sollte sprechen — und wer lieber nicht?&ldquo;</em> Eine Mischung
                  aus Persönlichem und Praktischem, mit ein bisschen Humor, damit du nachdenkst und
                  dabei lächelst.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div>
                <h3>Sieh zu, wie ein lebendiger Plan entsteht</h3>
                <p>
                  Jede Antwort fließt in einen übersichtlichen, verständlichen Plan, der klingt wie
                  du. Eine Mischung aus Konkretem (wo alles ist, wie man an Konten kommt) und
                  Persönlichem (Briefe, Geschichten, &bdquo;bitte nicht dieses eine Foto
                  verwenden&ldquo;). Ändere jederzeit alles — dein Plan lebt, er ist nicht
                  einlaminiert.
                </p>
                <p className="step-detail">
                  In deinem Dashboard siehst du genau, wo du stehst: welche Fragen du beantwortet
                  hast, welche noch kommen, und eine einfache &bdquo;Dein Plan bisher&ldquo;-Ansicht.
                  Später kommen Export (PDF, Druck) und die Möglichkeit dazu, Wünsche verbindlich
                  festzulegen und mit Dienstleistern zu verknüpfen, damit deine Liebsten dem Plan
                  folgen können, statt zu raten.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div>
                <h3>Teile, wenn du bereit bist</h3>
                <p>
                  Lade deine Leute ein und bestimme, was sie sehen: alles, oder nur das Wichtigste.
                  Du kannst Ansichts-, Bearbeitungs- oder &bdquo;im Notfall&ldquo;-Rollen vergeben.
                  Füge jederzeit Menschen hinzu oder entferne sie. Sie werden es dir später danken.
                </p>
                <p className="step-detail">
                  In deinem Dashboard gibt es einen Bereich &bdquo;Mit wem du geteilt hast&ldquo;: sieh, wer
                  Zugriff hat, welche Rolle sie haben, und wann du sie eingeladen hast. Zugriff
                  entziehen oder jemand Neues hinzufügen — in wenigen Klicks. Niemand sieht deinen
                  Plan, bevor du ihn einlädst — und du kannst ihn so lange privat halten, wie du
                  möchtest.
                </p>
              </div>
            </li>
          </ol>

          <div className="plan-mock" aria-hidden="true">
            <p className="plan-mock-title">Dein Plan bisher</p>
            <ul className="plan-mock-list">
              <li>
                <span className="plan-check" aria-hidden="true">✓</span> Einzugslied
              </li>
              <li>
                <span className="plan-check" aria-hidden="true">✓</span> Snacks &amp; Stimmung
              </li>
              <li>
                <span className="plan-check" aria-hidden="true">✓</span> Wer sprechen soll
              </li>
              <li>
                <span className="plan-dot" aria-hidden="true">○</span> Wen man anrufen soll
              </li>
              <li>
                <span className="plan-dot" aria-hidden="true">○</span> Wo alles ist
              </li>
            </ul>
          </div>

          <p className="section-copy small-link" style={{ marginTop: "2rem" }}>
            <Link href="/de#what-you-get" className="small-link-a">
              Sieh, was du bekommst →
            </Link>
          </p>

          <hr className="section-divider" aria-hidden="true" />

          <p className="eyebrow">Das siehst du auf der Website</p>
          <h2>Dein Dashboard: Fortschritt, Fragen und wer im Bilde ist</h2>
          <p className="section-copy section-intro">
            Sobald du ein Konto hast, bekommst du einen einzigen Ort, um zu sehen, wo du stehst und
            was als Nächstes kommt.
          </p>
          <ul className="detail-list">
            <li>
              <strong>Fortschritt</strong> — Ein klares &bdquo;X von Y beantwortet&ldquo;, damit du
              weißt, wo du stehst. Kein schlechtes Gewissen, wenn du eine Woche aussetzt — die Zahl
              wartet einfach auf dich.
            </li>
            <li>
              <strong>Kommende Fragen</strong> — Die nächsten Fragen, die du noch nicht beantwortet
              hast. Tippe auf eine, um sie jetzt zu beantworten, oder lass sie für später liegen.
            </li>
            <li>
              <strong>Beantwortet</strong> — Alles, was du bereits geschrieben hast. Jederzeit
              bearbeitbar. Dein Plan aktualisiert sich mit der Zeit.
            </li>
            <li>
              <strong>Mit wem du geteilt hast</strong> — Menschen, die du eingeladen hast, deinen
              Plan zu sehen (oder dir zu helfen). Sieh, wer Zugriff hat, und ändere es, wann immer
              du willst.
            </li>
          </ul>
          <p className="section-copy">
            Wir bauen das so, dass es sich menschlich und leicht anfühlt — nicht wie eine
            Tabellenkalkulation oder ein Formular. Eines Tages kommt vielleicht ein
            persönlicherer, gesprächsähnlicher Ablauf dazu (z. B. KI-geführt); für jetzt ist es
            eine klare Liste von Fragen, die du in deinem eigenen Tempo angehen kannst.
          </p>
        </div>
      </section>

      <SectionCta locale="de" />
      <SubpageStickyCta
        text="Bring deine Angelegenheiten in Ordnung. Kostenlos."
        loggedOutText="Kostenlos beitreten"
        loggedInText="Zu deinem Plan"
      />
    </main>
  );
}
