import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Warum es When I Die™ gibt: Klarheit ist Liebe, kleine Schritte schlagen Überforderung, und es ist okay, es zu deinem eigenen zu machen. Eine freundlichere Art zu planen.",
};

export default function AboutPageDe() {
  return (
    <main id="main-content" className="page-about">
      <PageHero
        crumb="Über uns"
        eyebrow="Warum das wichtig ist"
        title="Wir nehmen den Tod ernst. Uns selbst eher nicht."
        tagline="Deine Liebsten verdienen einen Plan. Keinen posthumen Escape Room."
        locale="de"
      >
        <p
          className="section-copy"
          style={{ maxWidth: "48rem", marginTop: "1rem" }}
        >
          When I Die™ ist nicht einfach Nachlassplanung oder ein digitaler
          Tresor. Es ist{" "}
          <strong>Lebensabschluss-Planung mit Persönlichkeit</strong> — das
          erste Tool, das sich nicht anfühlt, als hätte es eine Anwaltskanzlei
          oder eine Hospiz-Broschüre entworfen. Wir haben es gebaut, nachdem wir
          gesehen haben, wie chaotisch es wird, wenn jemand stirbt und niemand
          weiß, was er oder sie sich gewünscht hat. Das nimmt das Rätselraten
          weg und macht den Prozess überraschend angenehm.
        </p>
        <p
          className="section-copy"
          style={{ maxWidth: "48rem", marginTop: "0.75rem" }}
        >
          Du bekommst ein echtes Konto und Dashboard: Beantworte Fragen in
          deinem eigenen Tempo, sieh deinen Fortschritt, und wenn du bereit
          bist, lade die Menschen ein, denen du vertraust, um deinen Plan zu
          sehen. Wir starten mit einer einfachen Liste von Fragen, die du laden
          und beantworten kannst; später kommt vielleicht ein persönlicherer,
          gesprächsähnlicher Ablauf (z. B. KI-geführt) dazu, damit sich die
          Erfahrung noch mehr an dich anpasst.
        </p>
        <div className="section-copy why-grid">
          <div className="why-item">
            <h3>Klarheit ist Liebe</h3>
            <p>
              Deine Liebsten müssen nicht raten oder streiten. Sie wissen, wie
              sie für dich — und füreinander — da sein können. Wenn es so weit
              ist, ist ein klarer Plan eines der liebevollsten Dinge, die du
              hinterlassen kannst.
            </p>
          </div>
          <div className="why-item">
            <h3>Weniger Chaos für alle</h3>
            <p>
              Kleine Schritte schlagen große Vorsätze. Zwei Minuten pro Woche
              reichen. Keine riesige Checkliste, kein &bdquo;irgendwann&ldquo; —
              nur eine kleine Frage nach der anderen. Komm zurück, wann immer du
              willst; dein Plan verliert nie den Fortschritt.
            </p>
          </div>
          <div className="why-item">
            <h3>Dein Tod. Deine Regeln.</h3>
            <p>
              Von Playlists bis zu Grenzen — es ist okay, spezifisch zu sein.
              &bdquo;Keine Reden vor den Snacks&ldquo; ist eine valide Ansage.
              Du bringst die Geschichten und die Stimmung; wir bringen die
              Struktur (und die Konfetti-Playlist).
            </p>
          </div>
        </div>
      </PageHero>

      <section className="section founder-story">
        <div className="container">
          <p className="eyebrow">Warum ich das gebaut habe</p>
          <h2>
            Als mein Vater starb, war ich für eine einfache Antwort besonders
            dankbar.
          </h2>
          <div className="founder-story-content">
            <p>
              Er hatte mir gesagt, wie er beerdigt werden wollte. In einem der
              schwersten Momente meines Lebens gab mir dieses kleine Detail
              Erleichterung. Ich musste nicht raten. Ich wusste, dass ich das
              Richtige für ihn tat.
            </p>
            <p>
              Mir wurde klar, wie mächtig dieses Gefühl ist — und wie selten.
              Die meisten Familien müssen bei allem raten. Also wollte ich etwas
              bauen, das es Menschen leichter macht, zu teilen, was sie sich
              wünschen, bevor sie nicht mehr da sind.
            </p>
            <p>
              Das Seltsame daran? Über die eigene Planung will fast niemand
              sprechen. Bestattungsinstitute sind dunkel, braun, still und
              traurig. Meine Generation will den letzten Moment des Lebens nicht
              in einem Raum planen, der sich wie ein Wartezimmer für Trauer
              anfühlt.
            </p>
            <p>
              Wir planen Urlaube auf die Minute genau. Flüge. Hotels.
              Restaurants. Aktivitäten. Aber irgendwie planen wir nicht die eine
              Reise, die wir <strong>garantiert alle antreten</strong>.
            </p>
            <p>
              Soweit irgendjemand weiß, weiß niemand wirklich, was nach dem Tod
              passiert. Warum muss sich dann alles darum so deprimierend
              anfühlen? Vielleicht ist das Lebensende nicht nur etwas zum
              Fürchten. Vielleicht ist es etwas, auf das wir uns mit
              Ehrlichkeit, Neugier — und sogar ein bisschen Humor — vorbereiten
              können.
            </p>
            <p>
              When I Die™ gibt es, um dieses Gespräch leichter zu machen. Es ist
              ein Ort, um deine Wünsche, deine Geschichten und die Details
              festzuhalten, bei denen deine Liebsten nicht raten sollten. Und
              das auf eine Art, die menschlich, hell und vielleicht sogar ein
              bisschen lustig ist.
            </p>
            <p className="founder-bio">
              <strong>Tatjana</strong> gründete When I Die™, nachdem sie selbst
              erlebt hatte, wie viel Erleichterung ein klar geäußerter Wunsch
              mitten in der Trauer geben kann.
            </p>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <p className="section-fun">
            Denk an &bdquo;Eventplaner&ldquo;, nur dass die Party dein
            Vermächtnis ist.
          </p>
          <p className="eyebrow">Was ist When I Die™?</p>
          <h2>
            Plane die einzige Party, bei der du garantiert nicht zu spät kommst.
          </h2>
          <p className="section-copy section-intro">
            Die meisten Tools hören bei &bdquo;schreib deine Wünsche auf&ldquo;
            auf. Wir gehen weiter — irgendwann kannst du deine Wünsche
            verbindlich festlegen und mit Dienstleistern verknüpfen, damit deine
            Liebsten dem Plan folgen können, statt zu raten.
          </p>
          <div className="feature-grid">
            <article className="feature">
              <h3>Freundlicher planen</h3>
              <p>
                Statt einer riesigen, verstaubten Checkliste beantwortest du
                eine freundliche Frage pro Woche. Maximal zwei Minuten. Deine
                Antworten wachsen zu einem klaren, menschlichen Plan. Kein
                Weltuntergang, kein schlechtes Gewissen — nur kleine Schritte,
                die sich summieren.
              </p>
            </article>
            <article className="feature">
              <h3>Praktisch und persönlich</h3>
              <p>
                Eine Mischung aus Konkretem (wo alles ist, wie man an Konten
                kommt) und Persönlichem (Briefe, Zusammenhänge, Geschichten,
                &bdquo;bitte nicht dieses eine Foto von mir bei meiner
                Beerdigung&ldquo;). Ein Ort für das, was wirklich zählt.
              </p>
            </article>
            <article className="feature">
              <h3>Privat bis ins Grab</h3>
              <p>
                Teile nur, was du willst, wann du willst. Lade vertraute
                Menschen später ein — oder noch nicht. Es ist dein Plan. Du
                entscheidest, wer was sieht, und kannst es jederzeit ändern.
              </p>
            </article>
          </div>
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
