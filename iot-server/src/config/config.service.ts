import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

    public get mySQLUrl(): string {
        return process.env.MYSQL_URL;
    }

    public get mySQLDatabase(): string {
        return process.env.MYSQL_DATABASE;
    }

    public get mySQLUser(): string {
        return process.env.MYSQL_USER;
    }

    public get mySQLPassword(): string {
        return process.env.MYSQL_PASSWORD;
    }

    public get netpieAppId(): string {
        return process.env.NETPIE_APPID;
    }

    public get netpieKey(): string {
        return process.env.NETPIE_KEY;
    }

    public get netpieSecret(): string {
        return process.env.NETPIE_SECRET;
    }

}
