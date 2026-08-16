import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartCtaLink } from "@/components/StartCtaLink";
import { SubpageStickyCta } from "@/components/SubpageStickyCta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufig gestellte Fragen zu When I Die™: Loslegen, Preise, Funktionsweise, Teilen deines Plans und mehr.",
};

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Wie mache ich mit?",
    answer: (
      <p>
        Klick auf <strong>Start</strong> und leg los. Du könntest morgen sterben
        – oder aus reinem Trotz 103 werden. So oder so: Ein Plan kann nicht
        schaden.
      </p>
    ),
  },
  {
    question: "Ist es wirklich kostenlos?",
    answer: (
      <p>
        Ja. Ein Konto ist und bleibt kostenlos. Wir finden, jeder sollte seinen
        Liebsten das Geschenk eines Plans machen können – nicht nur die, die
        bereit sind, für ein weiteres Abo zu zahlen. Seelenfrieden sollte nicht
        hinter einer Bezahlschranke stecken.
      </p>
    ),
  },
  {
    question: "Wie funktioniert das?",
    answer: (
      <>
        <p>
          Sobald du dabei bist, landest du auf deinem Dashboard. Dort siehst du
          deinen Fortschritt, beantwortest anstehende Fragen und verwaltest, mit
          wem du deinen Plan geteilt hast.
        </p>
        <p>
          Wir stellen kleine, machbare Fragen zu deiner Beerdigung, Gedenkfeier,
          deinem Vermächtnis und den Dingen, die deine Liebsten wissen müssen.
          Fang mit etwas Leichtem an – deinem Einzugslied oder der
          Kleiderordnung – und Stück für Stück wird daraus dein Plan.
        </p>
        <p>
          Kein riesiger Fragebogen. Kein Ordner mit drei Ringen. Du musst deinen
          ganzen Tod nicht an einem Nachmittag lösen.
        </p>
      </>
    ),
  },
  {
    question: "Muss ich eine App herunterladen?",
    answer: (
      <>
        <p>
          Nein. Alles passiert in deinem privaten Portal auf unserer Website. Es
          gibt keine App zum Herunterladen, und du beantwortest auch keine
          Fragen per SMS oder E-Mail.
        </p>
        <p>
          Melde dich einfach an, wann immer du bereit bist. Deine Fragen,
          Antworten und dein Fortschritt warten dort auf dich – leise, wie ein
          höflicher kleiner Geist.
        </p>
      </>
    ),
  },
  {
    question: "Muss ich jede Woche Fragen beantworten?",
    answer: (
      <>
        <p>
          Auf keinen Fall. Beantworte eine Frage, beantworte zehn, oder
          verschwinde drei Monate, weil das Leben dazwischenkam. Dein
          Fortschritt bleibt gespeichert, und deine unbeantworteten Fragen
          warten geduldig.
        </p>
        <p>
          Wenn es eine Weile her ist, schicken wir dir vielleicht eine sanfte
          Erinnerung. Wir stupsen an; du entscheidest, wann du dich mit deiner
          Sterblichkeit befasst. Der Tod mag unausweichlich sein – das hier muss
          trotzdem nicht bis Freitag fertig sein.
        </p>
      </>
    ),
  },
  {
    question: "Kann ich meine Antworten ändern?",
    answer: (
      <>
        <p>Klar. Du kannst jede Antwort jederzeit aktualisieren.</p>
        <p>
          Wechsle die Blumen. Tausch die Playlist. Lade den einen Cousin wieder
          aus. Lade ihn wieder ein. Dein Plan ist lebendig, nicht einlaminiert.
        </p>
      </>
    ),
  },
  {
    question: "Wie bekommen meine Liebsten meinen Plan?",
    answer: (
      <>
        <p>
          Du teilst ihn, während du noch quicklebendig bist – genau das ist der
          Punkt. Sie erhalten eine Benachrichtigung, und du entscheidest, ob sie
          deinen gesamten Plan sehen dürfen oder nur ausgewählte Teile.
        </p>
        <p>
          Niemand meldet uns deinen Tod, und nach deinem Ableben wird nichts
          automatisch freigegeben. Dein Plan nützt nur etwas, wenn die richtigen
          Menschen wissen, dass es ihn gibt – wähl also Menschen, denen du
          zutraust, nach deinen Wünschen zu handeln.
        </p>
        <p>
          Wir helfen dir, deinen Plan festzuhalten und zu teilen, aber wir
          können niemanden zwingen, sich daran zu halten. Unsere Kräfte sind
          beeindruckend, aber weder rechtlich noch übernatürlich bindend.
        </p>
        <p>
          Und wähl nicht nur eine Person. Selbst dein zuverlässigster Freund
          könnte sein Handy verlieren, ins Kloster ziehen oder unter Druck
          aussteigen. Backups: nicht nur für Festplatten.
        </p>
      </>
    ),
  },
  {
    question: "Kann ich meinen Plan herunterladen oder ausdrucken?",
    answer: (
      <p>
        Auf jeden Fall. Bevorzugst du gutes altmodisches Papier? Lade deinen
        Plan herunter, druck ihn aus, und bewahr ihn dort auf, wo deine Liebsten
        ihn auch wirklich finden – nicht unter einem mysteriösen Stapel
        Bedienungsanleitungen.
      </p>
    ),
  },
  {
    question: "Ist das ein rechtsgültiges Testament?",
    answer: (
      <>
        <p>
          Nein. Dein Plan hilft dir, deine Wünsche festzuhalten und zu
          kommunizieren, ersetzt aber kein rechtsgültiges Testament oder andere
          offizielle Dokumente.
        </p>
        <p>
          Sieh uns als die extrem hilfreiche Gebrauchsanweisung – nicht als die
          Rechtsunterlagen.
        </p>
      </>
    ),
  },
  {
    question: "Kann ich mein Konto und meine Daten löschen?",
    answer: (
      <>
        <p>
          Auf jeden Fall. Du kannst dein Konto und deine Daten jederzeit
          endgültig löschen.
        </p>
        <p>
          Kein schlechtes Gewissen, keine unangenehme Trennung und keine
          spukenden E-Mails von uns.
        </p>
      </>
    ),
  },
  {
    question: "Was unterscheidet euch von anderen End-of-Life-Tools?",
    answer: (
      <>
        <p>
          Wir nehmen es todernst, Planung menschlich – und sogar lustig – zu
          machen, damit du es wirklich durchziehst.
        </p>
        <p>
          Statt dir einen Berg Papierkram in die Hand zu drücken und dir viel
          Glück zu wünschen, helfen wir dir, deinen Plan eine kleine Frage nach
          der anderen aufzubauen. Und wir hören nicht bei der Dokumentation auf.
          Mit der Zeit kannst du deine Wünsche mit Bestattungs-, Gedenk- und
          Vermächtnis-Diensten verknüpfen – damit deine Liebsten deinem Plan
          folgen können, statt ratlos herumzustehen und zu fragen: &bdquo;Was,
          glaubst du, hätten sie gewollt?&ldquo;
        </p>
      </>
    ),
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
                src="/assets/logo.png"
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
          </div>

          <div className="faq-flat-list">
            {FAQ_ITEMS.map((item) => (
              <article className="faq-flat-item" key={item.question}>
                <h2>{item.question}</h2>
                <div className="faq-flat-answer">{item.answer}</div>
              </article>
            ))}
          </div>

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
