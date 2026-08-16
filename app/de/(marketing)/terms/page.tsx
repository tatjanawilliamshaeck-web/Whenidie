import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen für die When I Die™ Website und Warteliste.",
};

export default function TermsPageDe() {
  return (
    <LegalPage crumb="AGB" title="Allgemeine Geschäftsbedingungen" updated="März 2025" locale="de">
      <p>
        Danke, dass du When I Die™ nutzt. Diese Bedingungen gelten für die Website und die
        Warteliste. Mit der Nutzung der Seite oder der Anmeldung stimmst du ihnen zu. Wir haben
        sie bewusst kurz gehalten.
      </p>

      <h2>Was When I Die™ ist</h2>
      <p>
        When I Die™ ist eine Web-App, die dir hilft, durch kleine wöchentliche Fragen einen
        persönlichen Plan zu erstellen. Der Plan ist für dich und die Menschen, mit denen du ihn
        teilen möchtest. Er ist <strong>kein</strong> Testament, keine Patientenverfügung und
        keine rechtliche oder medizinische Beratung. Er ergänzt diese, ersetzt sie aber nicht.
        Wende dich für rechtliche oder medizinische Entscheidungen an eine Anwältin oder einen
        Arzt.
      </p>

      <h2>Konten und deine Inhalte</h2>
      <p>
        Wenn du ein Konto erstellst, bist du dafür verantwortlich, dein Passwort sicher zu
        verwahren und für die Inhalte, die du hinzufügst (deine Antworten). Lade nichts hoch, das
        Rechte anderer verletzt oder illegal oder belästigend ist. Wir können Konten sperren oder
        kündigen, die gegen diese Bedingungen verstoßen.
      </p>

      <h2>Nutzung der Website und Warteliste</h2>
      <p>
        Du darfst diese Website für persönliche, nicht kommerzielle Zwecke nutzen. Wenn du der
        Warteliste beitrittst oder die App nutzt, gibst du uns deine E-Mail-Adresse, und wir
        speichern deine Plandaten, damit du darauf zugreifen und sie mit anderen teilen kannst.
        Du kannst dich jederzeit von Marketing-E-Mails abmelden. Unsere{" "}
        <a href="/de/privacy">Datenschutzerklärung</a> erklärt, wie wir mit deinen Daten umgehen.
      </p>

      <h2>Zulässige Nutzung</h2>
      <p>
        Nutze die Seite nicht, um Gesetze zu brechen, jemanden zu belästigen, Spam zu versenden
        oder unsere Systeme oder andere Nutzer zu gefährden. Wir können den Zugriff sperren oder
        einschränken, wenn wir glauben, dass du gegen diese Bedingungen verstoßen hast.
      </p>

      <h2>Keine Gewährleistung</h2>
      <p>
        Die Seite und jede zukünftige App werden &bdquo;wie besehen&ldquo; bereitgestellt. Wir
        geben unser Bestes, um alles sicher und funktionsfähig zu halten, garantieren aber keinen
        unterbrechungs- oder fehlerfreien Dienst. Nutzung auf eigenes Risiko.
      </p>

      <h2>Haftungsbeschränkung</h2>
      <p>
        Soweit gesetzlich zulässig, haften When I Die™ und dessen Betreiber nicht für indirekte,
        beiläufige oder Folgeschäden, die aus der Nutzung der Seite oder des Dienstes entstehen.
      </p>

      <h2>Änderungen</h2>
      <p>
        Wir können diese Bedingungen aktualisieren. Wir veröffentlichen die neue Version hier.
        Die fortgesetzte Nutzung nach Änderungen bedeutet, dass du sie akzeptierst. Bei größeren
        Änderungen versuchen wir, dich zu benachrichtigen (z. B. per E-Mail, falls vorhanden).
      </p>

      <h2>Kontakt</h2>
      <p>
        Fragen? <a href="mailto:hello@whenidie.us">hello@whenidie.us</a>.
      </p>
    </LegalPage>
  );
}
