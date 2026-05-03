# OpenLigaDB Issue-Mapping

Dieses Dokument bildet alle offenen Issues aus [OpenLigaDB-Samples](https://github.com/OpenLigaDB/OpenLigaDB-Samples/issues) auf konkrete Änderungsbedarfe im Hauptprojekt **OpenLigaDB/OpenLigaDB** ab.

Letzte Aktualisierung: 2026-05-03 | 21 offene Issues analysiert

---

## Zusammenfassung nach Kategorie

| Kategorie | Anzahl |
|---|---|
| API-Erweiterung (Feature Request) | 11 |
| Datenqualität | 3 |
| Bug (API / OpenAPI-Spec) | 3 |
| Bug (UI / Backend) | 3 |
| Datendopplung / Konsistenz | 1 |

---

## 1. API-Erweiterungen (Feature Requests)

### #101 · Aktuellen Spieltag früher hochzählen
**Bereich:** API-Backend · **Priorität:** Hoch

Der Endpunkt `/getcurrentgroup/{league}` wechselt zum nächsten Spieltag erst zur Hälfte der Zeit zwischen letztem und nächstem Spiel. Nutzer berichten, dass dies in der Praxis zu einer Verzögerung von >2 Tagen führt.

**Vorschlag:** Spieltag direkt nach dem letzten Spiel oder max. 6–12 Stunden danach hochzählen.

**Betroffene Komponenten:** `GroupOrderId`-Berechnungslogik im Backend

---

### #99 · Übertragungsinformationen (TV/Mediathek) je Spiel
**Bereich:** API-Schema · Daten · **Priorität:** Mittel

Nutzer wünschen pro Spiel Angaben zu Sender (ARD, ZDF, DAZN, Sky) und ggf. Mediathek-Links.

**Vorschlag:** Neues optionales Feld `matchTransmission` im `Match`-Objekt:
```json
"matchTransmission": {
  "broadcaster": "ZDF",
  "mediathekUrl": "https://www.zdf.de/sport/live"
}
```
**Betroffene Komponenten:** `Match`-Schema, Datenpflege, OpenAPI-Spec

---

### #97 · Filtern von `getavailableleagues` nach Saison
**Bereich:** API-Endpunkt · **Priorität:** Mittel

`/getavailableleagues` liefert alle Ligen inkl. vergangener Saisons ohne Filtermöglichkeit.

**Vorschlag:** Optionaler Parameter:
- `/getavailableleagues/{season}` z. B. `/getavailableleagues/2025`
- oder Query-Parameter `?season=2025`

**Betroffene Komponenten:** `LeagueController`, Routing

---

### #73 · Property `goalFor` im Goal-Objekt
**Bereich:** API-Schema · **Priorität:** Mittel

Für die Auswertung, für welches Team ein Tor gefallen ist (inklusive Eigentore), fehlt ein direktes Feld. Derzeit muss dies clientseitig aus dem Torstandverlauf berechnet werden.

**Vorschlag:** Neues Feld `goalFor: "home" | "away"` im `Goal`-Objekt.

**Betroffene Komponenten:** `Goal`-Schema, Berechnung beim Speichern eines Tores, OpenAPI-Spec

---

### #72 · Locationdaten für Spiele vollständiger befüllen
**Bereich:** Daten · **Priorität:** Mittel

Das `location`-Feld ist bei den meisten Spielen `null`. Nutzer benötigen Standortdaten (Stadion), um z. B. alle Spiele in einem bestimmten Stadion zu finden.

**Vorschlag:**
1. Daten für alle bl1/bl2/bl3-Spiele nachpflegen
2. Alternativ: separaten Endpunkt `/getmatchesbylocation/{locationId}` anbieten

**Betroffene Komponenten:** Datenpflege, ggf. neuer Endpunkt

---

### #70 · Tabellenstände für Turniergruppen (EM, WM, CL)
**Bereich:** API-Endpunkt · **Priorität:** Mittel

`/getbltable` funktioniert nur für Ligabetrieb mit Auf-/Abstieg, nicht für Turniergruppen (Gruppe A, B, …).

**Vorschlag:** Gruppen als eigene `GroupOrderId` modellieren und `/getbltable` um Gruppenunterstützung erweitern, alternativ neuen Endpunkt `/gettable/{leagueShortcut}/{season}/{groupOrderId}`.

**Betroffene Komponenten:** `TableController`, Datenmodell

---

### #58 · Import historischer Ligen
**Bereich:** UI / Backend · **Priorität:** Niedrig

Beim Anlegen einer Liga sind nur die Jahreszahlen 2020–2024 wählbar. Historische Ligen vor 2020 können nicht angelegt werden.

**Vorschlag:** Jahresauswahl auf beliebige Jahreszahl erweitern (z. B. ab 1900).

**Betroffene Komponenten:** Liga-Anlegen-Formular im Frontend, Validierung im Backend

---

### #56 · Tabelle nach Spieltag / Heim-Auswärtstabelle
**Bereich:** API-Endpunkt · **Priorität:** Mittel

Nutzer wünschen:
1. Tabellenstände zu einem bestimmten Spieltag (z. B. „Wer stand nach Spieltag 5 auf Platz 1?")
2. Separate Heim- und Auswärtstabellen

**Vorschlag:**
- `/getbltable/{leagueShortcut}/{season}/{groupOrderId}` für Tabellenstand nach Spieltag
- `/getbltable/{leagueShortcut}/{season}?type=home|away` für Heim-/Auswärtstabelle

**Betroffene Komponenten:** `TableController`, Tabellenberechnung

---

### #11 · Eckball-Daten
**Bereich:** API-Schema · **Priorität:** Niedrig

Ecken werden in der API nicht erfasst.

**Vorschlag:** Neues Objekt `corners` im `Match`-Objekt oder als separater Endpunkt.

**Betroffene Komponenten:** `Match`-Schema, Datenpflege

---

### #10 · Gelbe und rote Karten
**Bereich:** API-Schema · **Priorität:** Niedrig

Karten-Ereignisse (gelb, gelb-rot, rot) werden nicht über die API bereitgestellt.

**Vorschlag:** Neues Array `cards` im `Match`-Objekt mit Feldern `cardType`, `matchMinute`, `playerName`, `teamId`.

**Betroffene Komponenten:** `Match`-Schema, Datenpflege

---

### #4 · Spieler-Endpunkte (alle Spieler / Spieler eines Teams)
**Bereich:** API-Endpunkt · **Priorität:** Niedrig

Es gibt keinen Endpunkt zum Abrufen aller Spieler oder der Spieler eines bestimmten Teams.

**Vorschlag:**
- `/getplayers/{leagueShortcut}/{season}` – alle Spieler einer Liga/Saison
- `/getplayers/team/{teamId}` – Spieler eines Teams

**Betroffene Komponenten:** Neuer `PlayerController`, Datenmodell

---

## 2. Datenqualität

### #100 · Logo 1. FC Union Berlin (teamID 80) mit weißem Hintergrund
**Bereich:** Daten · **Priorität:** Hoch

Das aktuelle Logo (JPG) hat einen weißen Hintergrund, der bei Dark-Theme-Anwendungen unschön wirkt.

**Vorschlag:** Logo-URL auf ein transparentes SVG aktualisieren:
`https://upload.wikimedia.org/wikipedia/commons/4/44/1._FC_Union_Berlin_Logo.svg`

**Betroffene Komponenten:** Team-Datensatz teamID=80

---

### #57 · Fehlende Tabellendaten in älteren Ligen
**Bereich:** Daten · **Priorität:** Mittel

Tabellen-Endpunkt liefert leere oder Nullwerte für:
- bl1: Saisons 2002–2009
- bl2: Saisons 2006–2010
- bl3: Saisons 2008–2011

**Vorschlag:** Historische Punktestände nachpflegen oder Tabellen aus vorhandenen Spieldaten (Tore, Ergebnisse) retrospektiv berechnen.

**Betroffene Komponenten:** Datenpflege, ggf. Batch-Recalculation

---

### #33 · Torschützenliste – Datenkonsistenz
**Bereich:** Daten · **Priorität:** Mittel

Gleichnamige Spieler mit unterschiedlicher Schreibweise werden als separate Einträge geführt, was die Torjäger-Statistik verfälscht.

**Vorschlag:**
1. Spieler-Deduplizierung (Merge-Tool für Admins)
2. Spieler-ID als eindeutigen Schlüssel konsequent verwenden (→ zusammen mit Feature #4 Spieler-Endpunkt)

**Betroffene Komponenten:** Spieler-Datenmodell, Admin-UI

---

## 3. Bugs (API / OpenAPI-Spezifikation)

### #96 · `location` nicht als nullable in OpenAPI-Spec definiert
**Bereich:** OpenAPI-Spec · **Priorität:** Hoch · Label: `in progress`

Die API gibt `location: null` zurück, obwohl die OpenAPI-Spezifikation `location` als nicht-nullable definiert. Client-Generatoren brechen dadurch.

**Fix:** OpenAPI-Spec anpassen:
```json
"location": {
  "$ref": "#/components/schemas/Location",
  "nullable": true
}
```
**Betroffene Komponenten:** `openapi.json`/`swagger.json`, ggf. Controller-Rückgabetyp

---

### #14 · Eigentore zählen fälschlicherweise in Torschützenliste
**Bereich:** API-Logik · **Priorität:** Mittel

`/getgoalgetters` zählt Eigentore als Tore für den Spieler, der das Eigentor erzielt hat.

**Fix:** Tore mit `isOwnGoal == true` aus der Torschützen-Aggregation ausschließen.

**Betroffene Komponenten:** `GoalGetterController` / Datenbankabfrage

---

### #13 · Torschütze ändern korrigiert alten Eintrag nicht
**Bereich:** API-Backend · **Priorität:** Mittel

Wird der Torschütze eines Tores geändert, bleibt der alte Eintrag in der Torschützenzählung bestehen. Tore werden nur addiert, nie subtrahiert.

**Fix:** Beim Update eines Tores den alten Torschützen dekrementieren und den neuen inkrementieren (oder Aggregation on-the-fly berechnen statt inkrementell speichern).

**Betroffene Komponenten:** Goal-Update-Logik im Backend

---

## 4. Bugs (UI / Backend)

### #89 · JavaScript-Fehler beim Speichern von Liga-Metadaten
**Bereich:** UI · **Priorität:** Hoch · Label: `in progress`

In Chrome 128 führt das Bearbeiten einer bestehenden Liga zu einem JavaScript-Fehler, der das Speichern verhindert.

**Fix:** JavaScript-Fehler im Liga-Bearbeitungs-Formular identifizieren und beheben (Browser-Konsole / Sentry).

**Betroffene Komponenten:** Liga-Bearbeitung im Frontend

---

### #30 · Tor löschen in der Ergebnis-Eingabe nicht möglich
**Bereich:** UI · **Priorität:** Mittel

In der Ergebnis-Eingabeoberfläche gibt es keine Möglichkeit, ein bereits gesetztes Tor zu löschen (nur Ändern des Torschützen ist möglich).

**Fix:** Löschen-Funktion für Tore in der Admin-UI implementieren.

**Betroffene Komponenten:** Ergebnis-Eingabe im Frontend

---

### #25 · Zeitzonenproblem in der GUI
**Bereich:** UI · **Priorität:** Niedrig

Spielzeiten werden in der eingegebenen lokalen Zeitzone gespeichert, die GUI ignoriert dabei die Zeitzone des Client-Browsers. Dadurch werden Zeiten falsch dargestellt.

**Fix:** Alle Datumsangaben konsistent als UTC speichern und im Frontend mit Timezone-Aware-Rendering anzeigen.

**Betroffene Komponenten:** Datums-/Uhrzeitverarbeitung im Frontend und Backend

---

## 5. Datendopplung / Konsistenz

### #54 · Teamvergleich enthält Spiele aus doppelten Ligen
**Bereich:** API-Logik · **Priorität:** Mittel

`/getmatchdata/{teamA}/{teamB}` liefert Spiele aus mehreren Liga-Instanzen, die dieselbe Liga repräsentieren (z. B. zwei WM-Einträge, die Fußball und Handball mischen).

**Fix:**
1. Ligen-Priorität (bereits intern vorhanden laut README) beim Teamvergleich anwenden
2. Optional: Filterparameter `?leagueShortcut=bl1` ergänzen

**Betroffene Komponenten:** `MatchController` (Teamvergleich-Query)

---

## Offene Punkte ohne Lösungsvorschlag

| Issue | Titel | Status |
|---|---|---|
| #72 | Locationdaten vollständig befüllen | Datenerfassung unklar |
| #99 | TV-Übertragungsdaten | Datenquelle unklar |
| #70 | Turniergruppen-Tabellen | Datenmodell muss diskutiert werden |

---

## Empfohlene Umsetzungsreihenfolge

1. **Sofort (Bugs mit hoher Sichtbarkeit)**
   - #96 OpenAPI nullable fix
   - #89 JS-Fehler Liga-Speichern
   - #100 Union Berlin Logo

2. **Kurzfristig (häufig gefragte Features)**
   - #101 Spieltag-Timing
   - #13 / #14 Torschützen-Logik korrigieren
   - #97 Saisonfilter für Ligen

3. **Mittelfristig**
   - #56 Tabelle nach Spieltag
   - #73 `goalFor` im Goal-Objekt
   - #54 Teamvergleich Dopplung
   - #30 Tor löschen in UI

4. **Langfristig / Größere Vorhaben**
   - #4 Spieler-Endpunkte
   - #33 Spieler-Deduplizierung
   - #70 Turniergruppen-Tabellen
   - #10 / #11 Karten / Ecken
   - #57 Historische Tabellen nachpflegen
   - #58 Historische Ligen importieren
   - #99 TV-Übertragungsinfos
   - #25 Zeitzonenproblem
