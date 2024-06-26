# Small MQTT wrapper for OpenLigaDB 
## BETA
This package connects to the mqtt channel of [openLigaDB](https://www.openligadb.de/) and automatically receives live updates. It provides you to specify topics you're interested in and only emits those data to your system.

### Installation
The package is hosted on [JSR](https://jsr.io/@wgd/oldb) and not npm, so follow the instructions there for your runtime. 

#### Examples
**Connect to OLDB with current mqtt data and receive all updates**
```Typescript
import { OLDB, type OldbData } from "@wgd/oldb";

const oldbClient = new OLDB()

oldbClient.on('oldb:update', (msg: OldbData) => {
    // You receive ALL updates from OLDB
    // your code here
})
```

**Sign to leagues**
```Typescript
import { OLDB, type OldbData } from "@wgd/oldb";

const oldbClient = new OLDB({
     leagueShorts: ['bl1', 'bl2']
})

oldbClient.on('oldb:update', (msg: OldbData) => {
    // You only receive updates for the OLDB.leagueShortcut you choose
    // your code here
})
```

**If mqtt data changes**
you also can pass in connection infos, which will overwrite the standard.
```Typescript
import { OLDB } from "@wgd/oldb";

const oldbClient = new OLDB({
     baseUrl: settings.baseUrl,
     topic: settings.topic,
     port: settings.port
})
```

**Logging**
you also can pass in your logger if you wish, defaults to console. 
It does not log very much though.
```Typescript
const oldbClient = new OLDB({
     logger: myPrivatePinoLogger
})
```