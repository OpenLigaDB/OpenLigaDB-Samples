import { OLDB, type OldbData } from "@wgd/oldb";

const oldbClient = new OLDB({
     leagueShorts: ['bl1', 'bl2']
     // baseUrl: settings.baseUrl,
     // topic: settings.topic,
     // port: settings.port
})

oldbClient.on('oldb:update', (msg: OldbData) => {
    console.log(msg)
})