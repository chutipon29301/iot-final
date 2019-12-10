import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Card from '../entity/card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService extends TypeOrmCrudService<Card>{
    constructor(@InjectRepository(Card) private readonly cardRepository: Repository<Card>) {
        super(cardRepository);
    }
}
