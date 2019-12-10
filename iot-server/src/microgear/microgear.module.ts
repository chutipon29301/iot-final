import { Module } from '@nestjs/common';
import { MicrogearService } from './microgear.service';
import { MicrogearController } from './microgear.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [MicrogearService],
  controllers: [MicrogearController],
  exports: [MicrogearService],
})
export class MicrogearModule {}
