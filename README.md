# audimax events – mobile Arbeitshilfe

Zehn Checklisten, separate Anleitungs- und Zielbildansichten in einer `index.html`. Die feste Menüleiste wechselt die Ansicht ohne Sprungmarken. Original-Logo, Claim „Guter Service beginnt mit Überblick“, dunkles Audimax-Design mit warmer heller Schrift und Bernstein statt Rot.

## Aktuelle Checklisten

| Phase | Checkliste |
| --- | --- |
| Aufbau | Aufbau Alea |
| Aufbau | Aufbau Schwarze Bar |
| Aufbau | Aufbau Aperol Bar |
| Aufbau | Aufbau Getränke & Lager |
| Pausenvorbereitung | Nachbereitung Vorverkauf & Vorbereitung Pausenverkauf |
| Pausenvorbereitung | Vorbereitung Vorbestellungen |
| Abbau | Abbau Alea (inkl. Garderobe) |
| Abbau | Abbau Schwarze Bar (inkl. Pausenvorbestellungen) |
| Abbau | Abbau Aperol Bar |
| Abbau | Abbau Getränke & Lager |

Garderobe ist in den Alea-Listen integriert; Aufbau und Abbau der Pausenvorbestellungen gehören zur schwarzen Bar. Eigenständige Checklisten für Vorverkauf, Garderobenbetrieb und Pausenverkauf sind entfernt. Diese Inhalte stehen als eigene Anleitungen weiterhin zur Verfügung.

Die Abbau-Listen sind aus dem bisherigen Aufbau abgeleitete Entwürfe. Rückgabeplätze, Geräteabschluss und konkrete Aperol-Bar-Ausstattung müssen noch betrieblich abgeglichen werden. Die Hinweise stehen auch direkt in den jeweiligen Checklisten. Es wurden keine unbekannten Reinigungsprogramme, Geräteeinstellungen oder verbindlichen Kassenabschlussverfahren erfunden.

`CHECKLISTEN.md` enthält eine lesbare Fassung aller zehn Listen mit sämtlichen Hinweisen.

## Getränke & Lager

Der Aufbau ist auf vier Hauptpunkte verdichtet:

1. Material aus dem Unikat holen – mit vier Unteraufgaben für Brezen, Wäsche, Kassenladen und Sandwiches
2. Getränkebestände prüfen – Alea, schwarze Bar und aufgebauter Kühlschrank an Kasse 3 zusammengefasst
3. Fehlende Getränke für den Vorverkauf auffüllen – Getränkekühlung Unikat; Rotwein im Trockenlager Unikat oder Lager Tiefgarage, Schlüssel am Fleischerhaken in der Küche
4. Pausennachschub organisieren und bereitstellen – Keller Audimax, Mengen, Transportwagen und Platzierung neben den Verkaufsbereichen in einem Arbeitsschritt

Sandwiches sind keine frei optionale Aufgabe: Wenn die Unikat-Küche geöffnet ist, werden sie immer vorbereitet und abgeholt. Diese Einsatzbedingung steht in einer kleinen Hinweisbox.

Die frühere eigenständige Platzierungsaufgabe ist in den letzten Hauptpunkt integriert. Dessen Info-Dialog enthält auch die beiden Nachschub-Zielbilder; außerdem erscheinen sie am Ende der vollständigen Liste.

## Hinweise und Bedienung

„Bei Bedarf“ steht ausschließlich in kleinen Bedingungskästen, nicht in Aufgabenbezeichnungen oder Fließtexten. Bei Teilaufgaben ist der Bezug ausdrücklich genannt, beispielsweise „Auffüllen: bei Bedarf“.

Jede Aufgabe hat einen Info-Button. Hinweise, verknüpfte Anleitungen und Zielbilder öffnen sich in einem Dialog; die Liste bleibt dahinter erhalten. Aus einer Anleitung kann zum Arbeitsschritt zurückgekehrt werden.

Suche, Phasenfilter und „Nur offene Aufgaben“ lassen sich kombinieren. Gesucht wird in Checklisten-Titeln, Aufgaben, übergeordneten Aufgaben, Bedingungen und Info-Texten. Umlaute und Groß-/Kleinschreibung werden normalisiert. Oberpunkte in gefilterten Ergebnissen verändern nur die sichtbaren Unteraufgaben. Die Fortschrittsanzeige zählt weiterhin die gesamte Checkliste.

Die aufklappbaren Listen behalten ihre Reihenfolge; ausgearbeitete Hauptpunkte sind nummeriert. Vollständige Listen zeigen ihre Abschluss-Zielbilder, Such- und Nur-offene-Ansichten konzentrieren sich auf die passenden Aufgaben.

## Speicherung und vorhandene Stände

Die Speicherung bleibt ausschließlich lokal im Browser und nach Datum getrennt. Standarddatum ist der aktuelle Tag in Europe/Berlin. Ein Datum entspricht einem lokalen Arbeitsstand. Bei Einsätzen über Mitternacht das ursprüngliche Datum beibehalten.

Der bestehende Speicherschlüssel bleibt unverändert. Entfernte Aufgaben und Checklisten werden nicht aus gespeicherten Browserdaten gelöscht, aber in der Oberfläche nicht mehr angezeigt. Unveränderte Aufgaben behalten ihre IDs und Häkchen. Die zusammengefasste Bestandsprüfung und die um die Platzierung erweiterte Nachschubaufgabe verwenden neue IDs, damit frühere Teilstände nicht fälschlich als vollständige Erledigung gelten. Auch die neu ausgearbeiteten Abbauaufgaben haben eigene IDs.

Archiv, nachträgliche Prüffunktion sowie Export-/Importdialog bleiben entfernt. Browserdatenlöschung, Privatmodus und Wechsel der Website-Adresse können lokale Stände unzugänglich machen. Es gibt keine gemeinsame Geräte-Synchronisierung und keinen vollständigen Offline-Start. Google Sheets bleibt der vorgesehene zweite Schritt und ist noch nicht angebunden.

## Zentrale Inhaltsdatei

Alle aktuell gültigen Checklisten, Hinweise, Anleitungen und Bildverweise stehen nun gemeinsam in `data.js`. Frühere schrittweise Ergänzungsdateien sind im aktuellen Paket nicht mehr enthalten. Damit gibt es keine sich gegenseitig überschreibenden Inhaltsdefinitionen.

| Feld | Bedeutung |
| --- | --- |
| `id` | Dauerhaft stabile, global eindeutige Aufgaben-ID |
| `label` | Aufgabenbezeichnung ohne optionale Floskeln |
| `info` | Hinweise für den Info-Dialog |
| `condition` | Kleine Bedingungsbox an der Aufgabe |
| `children` | Weitere Unteraufgaben |
| `guide` | Verknüpfte Anleitung |
| `photos` | Verknüpfte Zielbilder |
| `notes` | Allgemeine Hinweise an der Checkliste |
| `conditions` | Kleine Bedingungsboxen an der Checkliste |
| `finalPhotos` | Bilder am Ende der vollständigen Checkliste |

Neue Aufgaben erhalten neue IDs. Die Bedeutung bereits verwendeter IDs nicht nachträglich ändern. Gezählt und gespeichert werden die Endpunkte der Aufgabenbäume.

## Bilder und offene Angaben

Alle 17 bisherigen Bildreferenzen bleiben erhalten. Originalfotos fehlen weiterhin und werden eindeutig als Platzhalter dargestellt. Originalfotos nach `assets/` kopieren und im passenden `photos`-Eintrag von `data.js` den relativen Pfad unter `src` setzen.

Noch offen sind insbesondere die Geräteanleitung für Temperatur und Licht am Kühlschrank Kasse 3, markierte Schalter-/Steckerbilder, konkrete Backofenparameter und der genaue Geräteabschluss. Die Aperol-Bar-Ausstattung und ihre Rückgabeplätze sind noch nicht detailliert vorgegeben.

Die Gästegrenzen bleiben: bis 800 Gäste Alea-Kassen, bei 801–999 Gästen zusätzlich Thekenelement 1, ab 1.000 Gästen Thekenelemente 1 und 2. Thekenelement 3 ist an erwarteten hohen Sekt-/Weinverkauf gebunden. Der zusätzliche Kühlschrank an Alea-Kasse 3 ist erst bei mehr als 1.000 Gästen vorgesehen. Einsatzbedingungen werden angezeigt; eine Gästezahleingabe gibt es nicht.

## Dateien und Veröffentlichung

- `index.html`: Grundgerüst und drei getrennte Ansichten
- `styles.css`: Responsive Gestaltung
- `data.js`: sämtliche Inhalte und Bildreferenzen
- `state.js`: lokale Tagesstände
- `search.js`: Suche und Filterung
- `app.js`: Bedienung, Ansichtswechsel und Info-Dialoge
- `CHECKLISTEN.md`: Lesefassung aller zehn Listen
- `tests.cjs`: automatisierte Prüfungen

ZIP in einen neuen Ordner entpacken. Für eine lokale Vorschau im Projektordner `python3 -m http.server 8000` ausführen und `http://localhost:8000` öffnen. Kein Build oder Paketinstallation erforderlich.

Für GitHub Pages die Website-Dateien einschließlich `assets/` und `.nojekyll` ins Hauptverzeichnis des Repositorys übernehmen. Pages auf den gewünschten Branch und das Hauptverzeichnis einstellen. Relative Pfade und Ansichten über `?view=checklists`, `?view=guides` und `?view=photos` funktionieren auch unter einer Repository-Unteradresse. Es wurde keine GitHub-Veröffentlichung vorgenommen.

## Prüfung

`node --test tests.cjs` prüft zwanzig Fälle, darunter die zehn verbleibenden Checklisten, genau vier Abbau-Listen, integrierte Garderobe/Vorbestellungen, Lagerorte, Sandwich-Bedingung, Hinweise ausschließlich als Kästen, Suche und lokale Speicherung.

Im Browser geprüft: konsolidierte Übersicht, Sandwich- und Lagerhinweise sowie die mobile Abbauansicht ohne horizontalen Überlauf bei 390 Pixel Framebreite (375 Pixel nutzbar). Originalbilder, echte Mobilgeräte und die betriebliche Freigabe der abgeleiteten Abbauabläufe stehen noch aus.
