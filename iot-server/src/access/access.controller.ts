import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import Access from '../entity/access.entity';
import { AccessService } from './access.service';

@Crud({
    model: {
        type: Access,
    },
})
@Controller('access')
export class AccessController implements CrudController<Access> {
    constructor(public service: AccessService) { }

    @Get('scan/:cardNumber')
    public async scanCard(@Param('cardNumber') cardNumber: string) {
        this.service.sendScanResult(cardNumber);
    }

    @Get('lock')
    public async lock() {
        this.service.lock();
    }

    @Get('unlock')
    public async unlock() {
        this.service.unlock();
    }
}
