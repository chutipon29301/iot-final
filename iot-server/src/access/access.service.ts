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
        this.microgearService.cardId.subscribe({
            next: async (cardNumber: string) => {
                const card = await cardService.findOneOrCreate(cardNumber);
                const access = new Access();
                access.card = card;
                await this.accessRepository.save(access);
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
}
