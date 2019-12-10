import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { CardModule } from './card/card.module';
import { MicrogearModule } from './microgear/microgear.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.mySQLUrl,
        port: 3306,
        username: configService.mySQLUser,
        password: configService.mySQLPassword,
        database: configService.mySQLDatabase,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    ConfigModule,
    UserModule,
    AccessModule,
    CardModule,
    MicrogearModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
