import { Injectable } from '@nestjs/common';
import * as Microgear from 'microgear';
import { ConfigService } from '../config/config.service';
import { BehaviorSubject, Observable } from 'rxjs';

export enum MicrogearTopic {
    RFID_UUID = '/cardReader/readResult',
    DOOR_LOCK = '/lock/status',
    IR = '/lock/ir',
}

@Injectable()
export class MicrogearService {

    private microgear: any;

    private scanCardId: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public doorLock: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public ir: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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
                case `/IotFinalProject${MicrogearTopic.DOOR_LOCK}`:
                    console.log(body.toString());
                    this.doorLock.next(body.toString() === 'true');
                    break;
                case `/IotFinalProject${MicrogearTopic.IR}`:
                    console.log(body.toString());
                    this.ir.next(body.toString() === '1');
                    break;
                default:
                    break;
            }
        });

        this.microgear.connect(configService.netpieAppId);

        this.microgear.on('connected', () => {
            this.microgear.subscribe(MicrogearTopic.RFID_UUID);
            this.microgear.subscribe(MicrogearTopic.DOOR_LOCK);
            this.microgear.subscribe(MicrogearTopic.IR);
        });
    }

    public get cardId(): Observable<string> {
        return this.scanCardId.asObservable();
    }

    public sendCardResult(cardNumber: string) {
        this.microgear.publish(MicrogearTopic.RFID_UUID, cardNumber);
    }

    public changeDoorLock(isLock: boolean) {
        this.microgear.publish(MicrogearTopic.DOOR_LOCK, `${isLock}`);
    }
}
