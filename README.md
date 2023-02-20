# Dokumentation zur OpenligaDB und zu deren Api

## Allgemeines

Zum Abrufen der Liga-Daten der OpenligaDB werden im wesentlichen folgende Parameter verwendet:
- **LeagueShortcut**  - ein vom Ersteller der Liga vergebener, kurzer string, für die 1. Fußball-Bundesliga z.B. 'bl1'
- **LeagueSeason** - die Jahreszahl der Saison der Liga
- **GroupOrderId** - Die OrderId der 'Gruppierung' - entspricht z.B. in der Fußball-Bundesliga dem 'Spieltag' 

Der Abruf der Daten per JSON-Api erfolgt dann je nach Detailtiefe dem Schema

> https://api.openligadb.de/getmatchdata/LeagueShortcut/LeagueSeason/GroupOrderId

Eine Swagger-Online-Dokumentation der Api gibt es unter https://api.openligadb.de/

### Berechtigungen
Jeder angemeldete User darf Ligen anlegen, ist dann der "Administrator" seiner Ligen und nur dieser darf Teams und Spielansetzungen hinzufügen sowie die Ergebnistypen für seine Ligen festlegen. 

Anders ist es bei den Spielergebnissen, diese können von JEDEM angemeldeten User editiert werden. Nach einer Zeit von 6 Tagen nach Spielende ist das Editieren der Ergebnisse nur noch dem Administrator der Liga möglich.

Auf [Anfrage](mailto:&#079;&#112;&#101;&#110;&#076;&#105;&#103;&#097;&#068;&#066;&#064;&#109;&#115;&#105;&#103;&#103;&#105;&#046;&#100;&#101;) werden hier auch relativ "locker" Rechte zum Editieren der Spielansetzungen für Ligen verteilt, um
die Arbeit auf mehrere Schultern zu verteilen. Es kann also auch mehrere Administratoren einer Liga geben.

### Ligen-Priorität
Die OpenligaDB ermöglicht es jedem interessierten Nutzer, eine eigene Liga anzulegen und zu pflegen. Dies führt in vielen
Fällen zum Vorhandensein gleichartiger Ligen, welche dann unter Umständen nicht vollständig gepflegt werden.

Um zu erkennen, welche Liga "produktiv" ist, gibt es intern eine Priorisierung der Ligen anhand der
Anzahl ihrer Abfragen. So erfolgt z.B. die Sortierung der Ligen im Auswahl-Fenster nach diesem
Prioritäts-Index - die "offiziellen" Ligen stehen hier oben. Dieser Index wird demnächst in weiteren Teilen
der Oberfläche Einzug halten und die Auswahl transparenter machen.

Für die Fußball-Bundesligen hat sich z.B. ein durchgehendes Namens-Schema entwickelt. So haben die erste bis
dritte Bundesliga stets den LeaguShortcut "bl1", "bl2" und "bl3". Der Parameter LeagueSeason bestimmt dann
die aktuelle Saison. Leider ist das z.B. bei der Champions League oder beim DFB-Pokal nicht so eindeutig
angelegt worden.


## Api-Schema
Nachfolgend wird das Api-Schema anhand von Beispielen dargestellt:

---
Spiele des aktuellen Spieltages der ersten Bundesliga:
> [https://api.openligadb.de/getmatchdata/bl1](https://api.openligadb.de/getmatchdata/bl1)

Der aktuelle Spieltag wird jeweils zur Hälfte der Zeit zwischen dem letzten Spiel des letzten Spieltages und dem ersten Spiel des nächsten Spieltages erhöht.

---
Spiele des 8. Spieltages der ersten Bundesliga 2022/2023:
> [https://api.openligadb.de/getmatchdata/bl1/2022/8](https://api.openligadb.de/getmatchdata/bl1/2022/8)

---
Alle Spiele der ersten Bundesliga 2022/2023:
> [https://api.openligadb.de/getmatchdata/bl1/2022](https://api.openligadb.de/getmatchdata/bl1/2022)

---
Spiel mit der Id 39738:
> [https://api.openligadb.de/getmatchdata/39738](https://api.openligadb.de/getmatchdata/39738)

---
Die aktuelle Group (entspricht z.B. bei der Fussball-Bundesliga dem 'Spieltag') des als Parameter zu übergebenden leagueShortcuts (z.B. 'bl1'):
> [https://api.openligadb.de/getcurrentgroup/bl1](https://api.openligadb.de/getcurrentgroup/bl1)

Der aktuelle Spieltag wird jeweils zur Hälfte der Zeit zwischen dem letzten Spiel des letzten Spieltages und dem ersten Spiel des nächsten Spieltages erhöht.


---
Eine Liste der Spiel-Einteilungen (Spieltag, Vorrunde, Finale, ...) der als Parameter zu übergebenden Liga + Saison
> [https://api.openligadb.de/getavailablegroups/bl1/2022](https://api.openligadb.de/getavailablegroups/bl1/2022)

---
Datum und Uhrzeit der letzten Änderung in den Daten des 8. Spieltages der ersten Bundesliga 2022/2023.
> [https://api.openligadb.de/getlastchangedate/bl1/2022/8](https://api.openligadb.de/getlastchangedate/bl1/2022/8)

Diese Methode dient zur Ermittlung der Änderung von Spieldaten, um unnötiges Pollen der o.g. Service-Methoden zu vermeiden.

---
Das nächste anstehende Spiel des als Parameter zu übergebenden Teams der ebenfalls zu übergebenen Liga:
> [https://api.openligadb.de/getnextmatchbyleagueteam/3005/7](https://api.openligadb.de/getnextmatchbyleagueteam/3005/7)

- '3005' entspricht der LeagueId der 1. Fußball Bundesliga 2016/2017
- '7' entspricht der TeamId von Borussia Dortmund

---
Alle Teams einer Liga:
> [https://api.openligadb.de/getavailableteams/bl1/2022](https://api.openligadb.de/getavailableteams/bl1/2022)


---
Die Spiele, bei welchen die als Parameter übergebenen Teams gegeneinander spielten:
> [https://api.openligadb.de/getmatchdata/40/7](https://api.openligadb.de/getmatchdata/40/7)

---
Die Torschützen der übergebenen Liga:
> [https://api.openligadb.de/getgoalgetters/bl1/2022](https://api.openligadb.de/getgoalgetters/bl1/2022)


---
Die Tabelle ersten Bundesliga 2022/2023
> [https://api.openligadb.de/getbltable/bl1/2022](https://api.openligadb.de/getbltable/bl1/2022)






