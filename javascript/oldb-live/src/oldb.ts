import mitt, { type Emitter } from 'mitt';
import mqtt from "mqtt";
import type { OldbData } from './types';
import { useLogMessage } from './log-messages';

type OldbLogger = Pick<Console, 'info' | 'error' | 'warn'> 

export type OldbSettings = {
    leagueShorts?: string[],
    logger?: OldbLogger
    baseUrl?: string
    topic?: string
    port?: string
}

type Events = { 'oldb:update': OldbData }

export class OLDB{
    private baseUrl: string
    private topic: string
    private port: string
    private client: mqtt.MqttClient
    private leagueShorts: string[] = []
    private logger: OldbLogger = console
    private emitter: Emitter<Events> 

    constructor(settings: OldbSettings = {}){
        this.baseUrl = settings.baseUrl || 'mqtts://broker.hivemq.com'
        this.topic = settings.topic || 'openligadb'
        this.port = settings.port || '8883'
        this.leagueShorts = settings.leagueShorts || []
        this.client = mqtt.connect(`${ this.baseUrl }:${ this.port }`);
        this.emitter = mitt<Events>()
        this.logger = settings.logger || console
        this.setEvents()
    }

    private setEvents(): void{
        this.client.on('disconnect', () => {
            this.logger.info(useLogMessage('disconnect'))
        })
        
        this.client.on('error', (error) => { this.logger.error({ message: useLogMessage('error'), error }) })
        this.client.on('offline', () => { this.logger.error(useLogMessage('offline')) })
        
        this.client.on('connect', () => {
            this.client.subscribe(this.topic, (err) => {
                if (err) { this.logger.error(err); }
                this.logger.info(useLogMessage('connect')); 
            });
        });
        
        this.client.on('message', (_, message) => {
            const msg: OldbData = JSON.parse(message.toString());
            const league = msg.leagueShortcut
            
            if(this.leagueShorts.includes(league) || this.leagueShorts.length === 0){
                this.emitter.emit('oldb:update', msg)
            }
        });
    }
    on(event: keyof Events, callback: any){
        this.emitter.on(event, callback)
    }
}