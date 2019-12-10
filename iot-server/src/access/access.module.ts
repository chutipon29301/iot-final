import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Access from '../entity/access.entity';
import { MicrogearModule } from '../microgear/microgear.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [MicrogearModule, CardModule, TypeOrmModule.forFeature([Access])],
  providers: [AccessService],
  controllers: [AccessController],
})
export class AccessModule { }
