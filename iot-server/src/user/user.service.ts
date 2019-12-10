import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import User from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository);
    }
}
