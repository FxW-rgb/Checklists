# audimax events – Checklisten

Mobile Arbeitshilfe für Aufbau, Pausenvorbereitung und Abbau. Eine statische Website mit Suche, kombinierbaren Filtern, lokalen Tagesständen, Anleitungen, Fotos und Videos. Kein Build und keine Paketinstallation erforderlich.

## Inhalte

Die drei Aufbaulisten für Alea, schwarze Bar und Getränke/Lager wurden am 10. November 2026 anhand der bereitgestellten Aufbauvorlage überarbeitet. Die übrigen Checklisten bleiben erhalten. Insgesamt gibt es zehn Checklisten.

- Alea: Material und Waren aus dem UNIKAT, Geräte, Backwaren, Kassenstationen, Personenleitsystem und Garderobe; 21 Hauptschritte mit einzelnen Unteraufgaben.
- Schwarze Bar und Stehtische: acht Hauptschritte; ein Kühlelement ab etwa 650 Gästen, zwei ab etwa 1.000 Gästen. Die widersprüchliche Kassenverteilung aus der Vorlage wurde nach Rücksprache nicht übernommen. Alea nutzt Kassen 1–3, die schwarze Bar Kassen 4–5.
- Getränke und Lager: Bestände prüfen, Fehlmengen auffüllen und Pausennachschub bereitstellen. Entnahmen aus dem gekühlten UNIKAT-Kernbestand werden wieder aufgefüllt. Richtwert: drei Kästen pro Getränkeart für Alea und ein Kasten pro Getränkeart und Kasse an der schwarzen Bar.

Der Zusatzkühlschrank an Alea-Kasse 3 ist für mehr als 1.000 Gäste vorgesehen. Das Personenleitsystem wird bei mehr als 600 Gästen aufgebaut und darf aus Brandschutzgründen nur bis zur ersten Betonsäule in den Gang reichen.

Abbau Alea wurde am 11. November 2026 anhand der neuen Vorlage mit 18 Hauptschritten überarbeitet. Die vorbereitenden Schritte 01–09 und die Abschlussarbeiten 10–18 sind mit Zeitbedingungen gekennzeichnet. Garderobe, Kaffeeabschluss und Restwaren bleiben als Unteraufgaben erhalten. Auch Abbau Schwarze Bar wurde anhand der neuen Vorlage mit acht Hauptschritten überarbeitet: möglichst vor Veranstaltungsende abschließen, Getränkebestand vor der Einlagerung auffüllen und Kassen sowie Betriebsmittel zur Alea übergeben. Vorbestellungsabschluss und Rückgabe von Kissen/Kisten bleiben als Unteraufgaben erhalten. Nur Abbau Aperol Bar und Getränke/Lager bleiben Entwürfe. Die Aperol-Ausstattung und konkrete Geräteabschlussverfahren sind weiterhin zu ergänzen.

## Bedienung

Die erste Filterzeile wählt alle oder nur offene Aufgaben. Die zweite Zeile schränkt nach Aufbau, Pausenvorbereitung oder Abbau ein; erneutes Antippen einer ausgewählten Phase hebt diese Einschränkung auf. Suche und Filter lassen sich kombinieren.

Jeder Arbeitsschritt hat einen Info-Button für Hinweise, Bilder und verknüpfte Anleitungen. Die Bilderübersicht gliedert echte Fotos nach Verkaufsbereichen, Lagerplätzen und aufgeräumten Bereichen. Detailfotos können in voller Größe geöffnet werden. Für Backwaren stehen vier Anleitungsvideos mit Wiedergabesteuerung bereit. Videos laden erst bei Nutzung und pausieren beim Schließen oder Wechseln des Dialogs.

## Speicherung

Arbeitsstände bleiben lokal im Browser, nach Datum getrennt. Der aktuelle Tag wird in Europe/Berlin bestimmt. Die Datumsauswahl und der normale Speicherhinweis sind ausgeblendet; Speicherfehler werden weiterhin angezeigt. Es gibt keine geräteübergreifende Synchronisierung.

Der Speicherschlüssel `audimax-workdays-v2-local` bleibt unverändert. Unveränderte Aufgaben behalten ihre IDs. Neu zusammengefasste oder wesentlich erweiterte Arbeitsumfänge haben neue IDs, damit alte Häkchen nicht als vollständig erledigte neue Aufgaben gelten. Nicht mehr angezeigte Aufgaben bleiben in vorhandenen Browserdaten erhalten.

## Bilder und Videos

37 ausgewählte Originalfotos liegen unter `assets/photos/`. Sie wurden korrekt ausgerichtet, auf höchstens 1.800 Pixel Kantenlänge verkleinert und ohne Übernahme von EXIF-Metadaten gespeichert. Bildausschnitte und betriebliche Details wurden nicht künstlich verändert. Doppelte Fotos, Alarmanlagenaufnahmen und die nicht benötigte Pustet-Aufbauaufnahme wurden nicht übernommen.

Vier MP4-Videos unter `assets/videos/` wurden für die Website mit maximal 960 Pixel Kantenlänge und H.264/AAC neu codiert. Zusammen sind sie etwa 23 MB statt rund 313 MB groß. Die Originaldateien im Download-Ordner bleiben unverändert. Kein einzelnes Video überschreitet die GitHub-Dateigrößengrenze.

Wo keine passende Aufnahme vorliegt, bleibt am jeweiligen Detailhinweis ein ausdrücklicher Bildplatz. Fehlende Bilder erscheinen nicht als leere Karten in der Bilderübersicht. Die fotografierte Backanleitung und die Videos ersetzen keine erfundenen Geräteparameter; konkrete Einstellwerte werden nicht aus undeutlichen Bildstellen abgeleitet.

## Dateien

- `index.html`: Grundgerüst und drei Ansichten
- `styles.css`: responsive Gestaltung
- `data.js`: Checklisten, Hinweise, Anleitungen und Medienverweise
- `state.js`: lokale Tagesstände
- `search.js`: Suche und Filter
- `app.js`: Bedienung, Ansichtswechsel und Mediendialoge
- `CHECKLISTEN.md`: lesbare Fassung der aktuellen Listen
- `tests.cjs`: Inhalts-, Speicher-, Such- und Medienprüfungen

## Vorschau und Veröffentlichung

Im Projektordner einen statischen Webserver starten, zum Beispiel `python -m http.server 8000`, und `http://localhost:8000` öffnen. Für GitHub Pages die Website-Dateien einschließlich `assets/` und `.nojekyll` übernehmen. Die Ansichten funktionieren auch unter einer Repository-Unteradresse.

Die Überarbeitung wurde lokal vorgenommen. Eine Veröffentlichung oder ein Push zu GitHub ist damit nicht verbunden.

## Zugangsschutz

Es gibt weiterhin keine PIN-Abfrage. Eine geheime PIN-Prüfung ist mit rein statischem GitHub Pages nicht möglich. Dafür ist eine Serverfunktion mit geheimer Konfiguration nötig. Weder PIN noch öffentlicher Prüfwert werden im Projekt hinterlegt.

## Prüfung

`node --test tests.cjs` prüft 26 Fälle: stabile und eindeutige IDs, gültige Hilfsverweise, neue Aufbauinhalte, bestätigte Gästegrenzen, Suche, kombinierte Filter, lokale Speicherung und vorhandene Mediendateien. Zusätzlich wird die Darstellung in Desktop- und mobiler Vorschau geprüft.

## Pausenvorbereitung und Vorbestellungen

Am 11. November 2026 ergänzt: sechs Schritte für die gemeinsame Pausenvorbereitung von schwarzer Bar und Alea. Kaffeeabschluss nach dem Vorverkauf mit Blindsieb-Reinigung und Hinweis zu Milch-/Kaffeesatzresten in der Spülmaschine. Garderobenmaterial mit bestehendem Lagerfoto verknüpft.

Vorbestellungen: Prüfung etwa zehn Minuten nach Veranstaltungsbeginn, Bon-Druck mit 80 × 150 mm Papierformat, direkte Küchenweitergabe mit Zielzeit zehn Minuten vor der Pause. Vorbereitung startet etwa 15 Minuten vor der Pause; Speisen kommen etwa zehn Minuten, Getränke fünf bis zehn Minuten vor Pausenbeginn an die Tische. Die verknüpften Anleitungen sind entsprechend aktualisiert.
