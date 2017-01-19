# Dokumentation zur OpenligaDB und zu deren Api

## Allgemeines

Zum Abrufen der Liga-Daten der OpenligaDB werden im wesentlichen folgende Parameter verwendet:
- **LeagueShortcut**  - ein vom Ersteller der Liga vergebener, kurzer string, für die 1. Fußball-Bundesliga z.B. 'bl1'
- **LeagueSeason** - die Jahreszahl der Saison der Liga
- **GroupOrderId** - Die OrderId der 'Gruppierung' - entspricht z.B. in der Fußball-Bundesliga dem 'Spieltag' 

Der Abruf der Daten per JSON-Api erfolgt dann je nach Detailtiefe dem Schema

> https://www.openligadb.de/api/getmatchdata/LeagueShortcut/LeagueSeason/GroupOrderId

Der Server liefert je nach Accept-Header JSON oder XML zurück (Stichwort [Content Negotiation](https://weblog.west-wind.com/posts/2012/aug/21/an-introduction-to-aspnet-web-api#ContentNegotiation))

Zusätzlich ist der Abruf der Daten 
per Soap-Webservice über die Url [https://www.OpenLigaDB.de/Webservices/Sportsdata.asmx](https://www.OpenLigaDB.de/Webservices/Sportsdata.asmx) abrufbar.



## Api-Schema
Nachfolgend wird das Api-Schema anhand von Beispielen dargestellt:

---
Spiele des aktuellen Spieltages der ersten Bundesliga:
> [https://www.openligadb.de/api/getmatchdata/bl1](https://www.openligadb.de/api/getmatchdata/bl1)

Der aktuelle Spieltag wird jeweils zur Hälfte der Zeit zwischen dem letzten Spiel des letzten Spieltages und dem ersten Spiel des nächsten Spieltages erhöht.

---
Spiele des 8. Spieltages der ersten Bundesliga 2016/2017:
> [https://www.openligadb.de/api/getmatchdata/bl1/2016/8](https://www.openligadb.de/api/getmatchdata/bl1/2016/8)

---
Alle Spiele der ersten Bundesliga 2016/2017:
> [https://www.openligadb.de/api/getmatchdata/bl1/2016](https://www.openligadb.de/api/getmatchdata/bl1/2016)

---
Spiel mit der Id 39738:
> [https://www.openligadb.de/api/getmatchdata/39738](https://www.openligadb.de/api/getmatchdata/39738)

---
Die aktuelle Group (entspricht z.B. bei der Fussball-Bundesliga dem 'Spieltag') des als Parameter zu übergebenden leagueShortcuts (z.B. 'bl1'):
> [https://www.openligadb.de/api/getcurrentgroup/bl1](https://www.openligadb.de/api/getcurrentgroup/bl1)

Der aktuelle Spieltag wird jeweils zur Hälfte der Zeit zwischen dem letzten Spiel des letzten Spieltages und dem ersten Spiel des nächsten Spieltages erhöht.


---
Eine Liste der Spiel-Einteilungen (Spieltag, Vorrunde, Finale, ...) der als Parameter zu übergebenden Liga + Saison zurueck
> [https://www.openligadb.de/api/getavailablegroups/bl1/2016](https://www.openligadb.de/api/getavailablegroups/bl1/2016)

---
Datum und Uhrzeit der letzten Änderung in den Daten des 8. Spieltages der ersten Bundesliga 2016/2017.
> [https://www.openligadb.de/api/getlastchangedate/bl1/2016/8](https://www.openligadb.de/api/getlastchangedate/bl1/2016/8)

Diese Methode dient zur Ermittlung der Änderung von Spieldaten, um unnötiges Pollen der o.g. Service-Methoden zu vermeiden.

---
Das nächste anstehende Spiel des als Parameter zu übergebenden Teams der ebenfalls zu übergebenen Liga:
> [https://www.openligadb.de/api/getnextmatchbyleagueteam/3005/7](https://www.openligadb.de/api/getnextmatchbyleagueteam/3005/7)

- '3005' entspricht der LeagueId der 1. Fußball Bundesliga 2016/2017
- '7' entspricht der TeamId von Borussia Dortmund

---
Alle Teams einer Liga:
> [https://www.openligadb.de/api/getavailableteams/bl1/2016](https://www.openligadb.de/api/getavailableteams/bl1/2016)
















