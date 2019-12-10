import { Module } from '@nestjs/common';
import { MicrogearService } from './microgear.service';
import { MicrogearController } from './microgear.controller';

@Module({
  providers: [MicrogearService],
  controllers: [MicrogearController]
})
export class MicrogearModule {}
