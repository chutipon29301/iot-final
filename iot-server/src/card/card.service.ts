import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Card from '../entity/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {

    constructor(@InjectRepository(Card) private readonly cardRepository: Repository<Card>) {
        super(cardRepository);
    }

    public async findOneOrCreate(cardNumber: string): Promise<Card> {
        const card = await this.cardRepository.findOne({ cardNumber });
        if (card) {
            return card;
        } else {
            const newCard = new Card();
            newCard.cardNumber = cardNumber;
            await this.cardRepository.save(newCard);
            return newCard;
        }
    }

}
