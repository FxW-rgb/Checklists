# audimax events – Checklisten

Mobile Arbeitshilfe mit sieben Checklisten für Aufbau, Pausenvorbereitung, Vorbestellungen und Abbau. Eine statische Website mit Suche, Filtern, lokalen Tagesständen, Fotos und Anleitungsvideos. Kein Build erforderlich.

## Aktueller Stand vom 12. November 2026

- Aufbau Alea: 21 Hauptschritte. Materialabholung und Kassenverteilung mit der Schichtleitung abstimmen; Bürovorgaben haben Vorrang. Kassentablet und EC-Gerät müssen dieselbe Nummer haben. Kassenladen an der Alea aufsteigend, an der schwarzen Bar mit den höchsten eingesetzten Nummern zuordnen.
- Aufbau Schwarze Bar und Stehtische: acht Hauptschritte. Ein Kühlelement ab etwa 650 Gästen, zwei ab etwa 1.000 Gästen. Tablets ergonomisch platzieren; das EC-Lesegerät muss für Gäste zugänglich auf der Theke liegen.
- Vorbereitung Getränke und Lager: drei Schritte für Bestandsprüfung, Auffüllen und Pausennachschub.
- Pausenvorbereitung: sechs Hauptschritte für beide Teams gemeinsam. Kaffee nur im Vorverkauf; Reinigung des Abklopfbehälters und Kaffeeabschluss nach dem Vorverkauf.
- Pausenvorbestellungen: fünf Schritte für Prüfung/Druck, Küchenabstimmung, Getränkevorbereitung, Speisenabholung und Tischbelieferung mit Vollständigkeitskontrolle.
- Abbau Alea: 20 Schritte. Arbeitsflächen, Fronten, Betriebsmittel und Backraum bereits vor Veranstaltungsende reinigen beziehungsweise verräumen. Nach Veranstaltungsende abschließend spülen, Spülmaschine abpumpen, Filter und Sprüharme reinigen und ausschalten.
- Abbau Schwarze Bar: acht Hauptschritte, möglichst vor Veranstaltungsende abschließen; Transporte und Kassenübergabe mit Alea abstimmen.

Aufbau und Abbau Aperol Bar sowie Abbau Getränke und Lager sind entfernt. Nicht mehr benötigte Anleitungen für Pausenvorbestellungen, Kassenstationen/Snackboxen, Kühlschrank Kasse 3 und Bar-Elemente sind entfernt. Die Kaffeeanleitung bleibt für Vorbereitung und Reinigung erhalten; am Einschalt-Schritt ist sie nicht verlinkt.

## Kassenverteilung als Richtwert

Gästeaufkommen, Personaleinsatz und Art der Veranstaltung gemeinsam berücksichtigen. Bei geballtem Gästeaufkommen mehr Stationen einplanen. Maßgeblich bleiben die Vorgaben im Büro.

| Gästezahl | Kassenladen | Verteilung |
| --- | --- | --- |
| Unter 650 | 1–2 | Beide an der Alea |
| 650–850 | 1–3 | Zwei an der Alea; Kassenlade 3 an der schwarzen Bar mit Kassentablet und EC-Gerät 4 |
| 851–1.000 | 1–4 | Drei an der Alea, eine an der schwarzen Bar |
| Mehr als 1.000 | 1–5 | Drei an der Alea, zwei an der schwarzen Bar |

## Backanleitungen

Cookies und Brezen haben getrennte Anleitungen mit jeweils passenden Videos und der fotografierten Programmübersicht. Die Einzelschritte wurden aus den vier bereitgestellten Videos und dem Bedienerblatt abgeleitet.

- Cookies: Programm 11, 160 °C, 13 Minuten; Teigportionen auf der markierten Backmatte verteilen und nach dem Backen auskühlen lassen.
- Brezen: Programm 1, 210 °C, 15 Minuten; Salzen durch Bestreuen oder durch kurzes Eindrücken der Oberseite in Salz entsprechend den beiden Varianten.

Die Programmeinstellungen sind im jeweiligen Bedienvideo sichtbar. Bereitschaftssignal/OK-Anzeige, Türtaste und START/STOP entsprechen dem fotografierten Bedienerblatt. Es wurden keine zusätzlichen, nicht belegten Geräteparameter ergänzt.

## Bedienung und Speicherung

Erste Filterzeile: alle oder nur offene Aufgaben. Zweite Zeile: Aufbau, Pausenvorbereitung oder Abbau; erneutes Antippen hebt die Phasenauswahl auf. Suche und Filter sind kombinierbar.

Die Info-Buttons öffnen Hinweise, Referenzbilder und verknüpfte Anleitungen. Ein Schritt kann mehrere Anleitungen enthalten. Videos laden erst bei Nutzung und pausieren beim Schließen des Dialogs. Fotos lassen sich in voller Größe öffnen.

Arbeitsstände bleiben lokal im Browser und sind nach Datum getrennt. Aktueller Tag: Europe/Berlin. Datumsauswahl und normaler Speicherhinweis sind ausgeblendet; Speicherfehler bleiben sichtbar. Keine geräteübergreifende Synchronisierung. Speicherschlüssel: `audimax-workdays-v2-local`.

Unveränderte Aufgaben behalten ihre IDs; neue Arbeitsumfänge haben neue IDs. Entfernte Aufgaben bleiben in gespeicherten Browserdaten erhalten, werden aber nicht angezeigt.

## Medien

Die Bilderübersicht enthält 43 Bildverweise mit vorhandenen Dateien, einschließlich der markierten Preistafeln und des Pustet-Aufbaus. Das bestehende Foto „Getränkelager Audimax · Lagerplätze“ dient zugleich als Referenz für Leergutpaletten. Neue Geräte- und Kassenstationsfotos sind als offene Bildplätze gekennzeichnet.

Das Originalfoto der Preistafeln bleibt erhalten. Eine zusätzliche, mit dem eingebauten Bildwerkzeug annotierte Fassung liegt unter `assets/photos/alea-prices-marked.png`. Der Bildauftrag und die Quellen sind in `assets/README.md` dokumentiert.

Vier komprimierte MP4-Videos liegen unter `assets/videos/` (H.264/AAC, maximal 960 Pixel Kantenlänge, zusammen rund 23 MB). Originaldateien im Download-Ordner bleiben unverändert.

## Dateien und Vorschau

- `index.html`: drei Ansichten
- `data.js`: aktuelle Inhalte und Medienverweise
- `app.js`: Bedienung und Dialoge
- `styles.css`: responsive Gestaltung
- `state.js` und `search.js`: Speicherung, Suche und Filter
- `CHECKLISTEN.md`: vollständige Lesefassung
- `tests.cjs`: automatisierte Prüfungen

Im Projektordner einen statischen Webserver starten, zum Beispiel `python -m http.server 8000`, und `http://localhost:8000` öffnen. Für GitHub Pages die Website-Dateien einschließlich `assets/` und `.nojekyll` übernehmen. Ansichten funktionieren auch unter einer Repository-Unteradresse.

Die Änderungen wurden lokal vorgenommen; kein Push und keine Veröffentlichung.

## Zugangsschutz

Keine PIN-Abfrage. Eine geheime PIN-Prüfung benötigt eine Serverfunktion. Weder PIN noch öffentlicher Prüfwert sind hinterlegt.

## Prüfung

`node --test tests.cjs` prüft 29 Fälle, unter anderem die sieben Listen, Kassenverteilung, geänderte Reihenfolgen, getrennte Backanleitungen, entfernte Hilfsverweise, gültige Medienverweise, Suche und lokale Speicherung.

Weitere gelb markierte Varianten des Alea-Fotos zeigen die Kassenstationen, die Zuckeretagere mit Rührstäbchen sowie Glasvitrine und Getränkedisplay. Sie sind an den jeweiligen Aufbauschritten und in der Kaffeeanleitung verlinkt. Die angekündigte Personalansicht der Kassenstationen bleibt als eigener offener Bildplatz bestehen.
