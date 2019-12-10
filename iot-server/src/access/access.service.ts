import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Access from '../entity/access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccessService extends TypeOrmCrudService<Access> {
    constructor(@InjectRepository(Access) private readonly accessRepository: Repository<Access>) {
        super(accessRepository);
    }
}
