import { Injectable } from '@nestjs/common';
import * as Microgear from 'microgear';
import { ConfigService } from '../config/config.service';
import { BehaviorSubject, Observable } from 'rxjs';

export enum MicrogearTopic {
    RFID_UUID = '/cardReader/readResult',
}

@Injectable()
export class MicrogearService {

    private microgear: any;

    private scanCardId: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private readonly configService: ConfigService) {

        this.microgear = Microgear.create({
            key: configService.netpieKey,
            secret: configService.netpieSecret,
        });

        this.microgear.on('message', (topic: string, body: string) => {
            console.log('incoming : ' + topic + ' : ' + body);
            switch (topic) {
                case `/IotFinalProject${MicrogearTopic.RFID_UUID}`:
                    console.log(body.toString());
                    this.scanCardId.next(body.toString());
                    break;
                default:
                    break;
            }
        });

        this.microgear.connect(configService.netpieAppId);

        this.microgear.on('connected', () => {
            this.microgear.subscribe(MicrogearTopic.RFID_UUID);
        });
    }

    public get cardId(): Observable<string> {
        return this.scanCardId.asObservable();
    }
}
