import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Access from '../entity/access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MicrogearService } from '../microgear/microgear.service';
import { CardService } from '../card/card.service';

@Injectable()
export class AccessService extends TypeOrmCrudService<Access> {

    constructor(
        @InjectRepository(Access) private readonly accessRepository: Repository<Access>,
        private readonly microgearService: MicrogearService,
        private readonly cardService: CardService,
    ) {
        super(accessRepository);
        microgearService.cardId.subscribe({
            next: async (cardNumber: string) => {
                const card = await cardService.findOneOrCreate(cardNumber);
                const access = new Access();
                access.card = card;
                if(card.cardOwner && microgearService.doorLock.value) {
                    microgearService.changeDoorLock(false);
                    setTimeout(() => {
                        microgearService.changeDoorLock(true);
                    }, 3000);
                }
                await accessRepository.save(access);
            },
        });
    }

    public sendScanResult(cardNumber: string) {
        this.microgearService.sendCardResult(cardNumber);
    }

    public lock() {
        this.microgearService.changeDoorLock(true);
    }

    public unlock() {
        this.microgearService.changeDoorLock(false);
    }

    public unlockByFace() {
        if(this.microgearService.doorLock.value) {
            this.microgearService.changeDoorLock(false);
            setTimeout(() => {
                this.microgearService.changeDoorLock(true);
            }, 3000);
        }
    }
}
