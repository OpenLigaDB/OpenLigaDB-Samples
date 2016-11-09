# Dokumentation zur OpenligaDB und zu deren Api

## Allgemeines

Zum Abrufen der Liga-Daten der OpenligaDB werden im wesentlichen folgende Parameter verwendet:
- **LeagueShortcut**  - ein vom Ersteller der Liga vergebener, kurzer string, für die 1. Fußball-Bundesliga z.B. 'bl1'
- **LeagueSeason** - die Jahreszahl der Saison der Liga
- **GroupOrderId** - Die OrderId der 'Gruppierung' - entspricht z.B. in der Fußball-Bundesliga dem 'Spieltag' 

Der Abruf der Daten per JSON-Api erfolgt dann je nach Detailtiefe dem Schema

> https://www.openligadb.de/api/getmatchdata/LeagueShortcut/LeagueSeason/GroupOrderId

Der nachfolgende Anschnitt soll dies Anhand von Beispielen verdeutlichen. Zusätzlich ist der Abruf der Daten 
per Soap-Webservice über die Url [https://www.OpenLigaDB.de/Webservices/Sportsdata.asmx](https://www.OpenLigaDB.de/Webservices/Sportsdata.asmx) abrufbar.



## Api-Schema
---
Spiele des 8. Spieltages der ersten Bundesliga 2016/2017:
> [https://www.openligadb.de/api/getmatchdata/bl1/2016/8](https://www.openligadb.de/api/getmatchdata/bl1/2016/8)
---
Alle Spiele der ersten Bundesliga 2016/2017
> [https://www.openligadb.de/api/getmatchdata/bl1/2016](https://www.openligadb.de/api/getmatchdata/bl1/2016)
---
Datum und Uhrzeit der letzten Änderung in den Daten des 8. Spieltages der ersten Bundesliga 2016/2017.
> [https://www.openligadb.de/api/getlastchangedate/bl1/2016/8](https://www.openligadb.de/api/getlastchangedate/bl1/2016/8)

Diese Methode dient zur Ermittlung der Änderung von Spieldaten, um unnötiges Pollen der o.g. Service-Methoden zu vermeiden.

---
Der aktuelle Spieltag der ersten Bundesliga.
> [https://www.openligadb.de/api/getcurrentgroup/bl1](https://www.openligadb.de/api/getcurrentgroup/bl1)











